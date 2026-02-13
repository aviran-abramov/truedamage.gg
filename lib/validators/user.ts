import * as z from "zod";

export const USER_ROLES = ["USER", "ADMIN"];

export const UserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(4, { error: "Username must be at least 4 characters." }),
    email: z.email({ error: "Please enter a valid email address." }),
    password: z
        .string()
        .min(8, { error: "Password field must be at least 8 characters." }),
    role: z.enum(USER_ROLES, { error: "Please select a user role." })
});

export type UserFormData = z.infer<typeof UserSchema>;