import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6),
})

export const SignInSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6),
})