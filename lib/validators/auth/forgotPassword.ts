import * as z from "zod";

export const ForgotPasswordSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, { error: "Password field must be at least 8 characters." })
})

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;