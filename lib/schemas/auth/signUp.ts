import * as z from "zod";

export const CreateSignUpSchema = z.object({
    name: z
        .string()
        .trim()
        .min(4, { error: "Username must be at least 4 characters." }),
    email: z.email(),
    password: z
        .string()
        .min(8, { error: "Password field must be at least 8 characters." })
});