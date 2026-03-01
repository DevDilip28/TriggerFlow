import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(3, "Name must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignInSchema = SignUpSchema;
 
export const CreateWorkflowSchema = z.object({
    name: z.string().min(1, "Workflow name is required"),
    nodes: z.array(z.object({
        id: z.string(),
        type: z.string(),
        position: z.object({
            x: z.number(),
            y: z.number(),
        }),
        // nodeId: z.string(),
        data: z.object({
            kind: z.enum(["Action", "Trigger"]),
            metadata: z.any(),
            credential: z.any(),
        }),
    })),
    edges: z.array(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string(),
    })),
});

export const UpdateWorkflowSchema = CreateWorkflowSchema;
