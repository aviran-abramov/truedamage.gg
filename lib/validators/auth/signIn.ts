import * as z from "zod";

export const SignInSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, { error: "Password field must be at least 8 characters." })
})

export type SignInFormData = z.infer<typeof SignInSchema>;