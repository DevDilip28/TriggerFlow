import bcrypt from "bcrypt";
import { SignUpSchema, SignInSchema } from "@triggerflow/common";
import { UserModel } from "@triggerflow/db";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET!;

//new users registration 
export const signup = async (req: Request, res: Response) => {
    const parsed = SignUpSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid request data"
        });
    }

    const { username, password } = parsed.data;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            username,
            passwordHash
        });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: ".up.railway.app",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "Signup successful",
            id: user._id
        });
    } catch {
        res.status(500).json({
            message: "Signup failed"
        });
    }
};

//existing users login
export const login = async (req: Request, res: Response) => {
    const parsed = SignInSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const { username, password } = parsed.data;

    const user = await UserModel.findOne({ username }).select("+passwordHash");
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".up.railway.app",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
        message: "Login successful",
        id: user._id
    });
};

export const logout = (req: Request, res: Response) => {

    res.cookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".up.railway.app",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ message: "Logout successful" });
};
