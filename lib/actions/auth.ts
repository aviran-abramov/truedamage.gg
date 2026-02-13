"use server";

import { redirect } from "next/navigation"
import { auth } from "../auth";
import { headers } from "next/headers";
import { SignInSchema } from "../validators/auth/signIn";
import { SignUpSchema } from "../validators/auth/signUp";

export async function signUp(data: unknown) {
    try {
        console.log("Attempting to sign up a new user via form");

        const result = SignUpSchema.safeParse(data);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue) => {
                errorMessage += `${issue.path}: ${issue.message}`
            });

            return {
                error: errorMessage
            };
        }

        const { name, email, password } = result.data;

        const { user } = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        });
        if (!user) throw new Error("Could not sign up the new user via form");

        console.log("Success!");
    } catch (error) {
        console.error("Error: Could not sign up the new user via form", error);
    }

    return {
        success: true
    };
}

export async function signIn(data: unknown) {
    try {
        console.log("Attempting to sign in a user via form");

        const result = SignInSchema.safeParse(data);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((error) => {
                errorMessage += `${error.path}: ${error.message}`
            });

            return {
                error: errorMessage
            };
        }
        const { email, password } = result.data;

        const { user } = await auth.api.signInEmail({
            body: {
                email,
                password
            },
        });
        if (!user) throw new Error("Could not sign in the new user via form");

        console.log("Success!");
    } catch (error) {
        console.error("Error: Could not sign in the new user via form", error);
    }

    return {
        success: true
    };
}

export async function signInWithOAuth(provider: "google" | "facebook") {
    let url: string | undefined;

    try {
        console.log("Attempting to move user to OAuth login");

        const result = await auth.api.signInSocial({
            body: {
                provider
            }
        });
        if (!result) throw new Error("Could not sign in the user via OAuth");
        url = result.url;
    } catch (error) {
        console.error("Error: Could not sign in the user via OAuth", error);
    }

    if (url) {
        console.log("Success!");
        redirect(url);
    }
    redirect("/");
}

export async function signOut() {
    try {
        console.log("Attempting to sign out a user");

        const { success } = await auth.api.signOut({
            headers: await headers()
        });
        if (!success) throw new Error("Could not sign out the user");

        console.log("Success!");
    } catch (error) {
        console.error("Error: Could not sign out the user", error);
    }

    redirect("/");
}

export async function forgotPassword(data: unknown) {
    try {
        console.log("Attempting to sign in a user via form");

        const result = SignInSchema.safeParse(data);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((error) => {
                errorMessage += `${error.path}: ${error.message}`
            });

            return {
                error: errorMessage
            };
        }

        // ADD LOGIC LATER


        console.log("Success!");
    } catch (error) {
        console.error("Error: Could not sign in the new user via form", error);
    }

    return {
        success: true
    };
}