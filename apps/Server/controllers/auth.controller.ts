import bcrypt from "bcrypt";
import { SignUpSchema, SignInSchema } from "@triggerflow/common";
import { UserModel } from "db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req, res) => {
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

        res.status(201).json({
            message: "Signup successful",
            id: user._id,
            token
        });
    } catch {
        res.status(500).json({
            message: "Signup failed"
        });
    }
};

export const login = async (req, res) => {
    const parsed = SignInSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid request data"
        });
    }

    const { username, password } = parsed.data;

    try {
        const user = await UserModel.findOne({ username }).select("+passwordHash");
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            message: "Login successful",
            id: user._id
        });
    } catch {
        res.status(500).json({
            message: "Login failed"
        });
    }
};
