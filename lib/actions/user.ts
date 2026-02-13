"use server";

import { auth } from "../auth";
import { UserSchema } from "../validators/user";

export async function createUser(data: unknown) {
    try {
        console.log("Attempting to sign up a new user via admin form");

        const result = UserSchema.safeParse(data);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue) => {
                errorMessage += `${issue.path}: ${issue.message}`
            });

            return {
                error: errorMessage
            };
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

        console.log("Success!");
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