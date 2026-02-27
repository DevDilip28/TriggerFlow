import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({
            message: "You are not logged in"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (e) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}
