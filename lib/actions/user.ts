"use server";

import { auth } from "../auth";
import { createErrorMessage } from "../helpers/zod";
import { UserSchema } from "../validators/user";

export async function createUser(data: unknown) {
    try {
        const result = UserSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                error: createErrorMessage(result.error.issues)
            }
        }

        const { name, email, password, role } = result.data;

        const { user } = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                role
            }
        });

        if (!user) throw new Error("Could not sign up the new user via admin form");
    } catch (error) {
        console.error("Error: Could not sign up the new user via admin form", error);
        return {
            success: false
        }
    }

    return {
        success: true
    };
}