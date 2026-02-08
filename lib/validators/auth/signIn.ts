import * as z from "zod";

export const CreateSignInSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, { error: "Password field must be at least 8 characters." })
})