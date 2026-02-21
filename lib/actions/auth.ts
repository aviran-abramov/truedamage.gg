"use server";

import { redirect } from "next/navigation"
import { auth } from "../auth"
import { headers } from "next/headers"
import { SignInSchema } from "../validators/auth/signIn"
import { SignUpSchema } from "../validators/auth/signUp"
import { ActionResult } from "../types/actions"
import { createErrorMessage } from "../helpers/zod"

export async function signUp(data: unknown): Promise<ActionResult> {
    const result = SignUpSchema.safeParse(data)

    if (!result.success) {
        return {
            success: false,
            error: createErrorMessage(result.error.issues)
        }
    }

    try {
        const { name, email, password } = result.data

        await auth.api.signUpEmail({ body: { name, email, password } })

        return { success: true }
    } catch (error) {
        console.error("Error: Could not sign up the new user via form", error)
        return {
            success: false,
            error: "Error: Could not sign up the new user via form."
        }
    }
}

export async function signIn(data: unknown): Promise<ActionResult> {
    try {
        const result = SignInSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                error: createErrorMessage(result.error.issues)
            }
        }

        const { email, password } = result.data;

        await auth.api.signInEmail({
            body: {
                email,
                password
            },
        });

        return {
            success: true
        };
    } catch (error) {
        console.error("Error: Could not sign in new user via form", error);
        return {
            success: false,
            error: "Error: could not sign in the user via form."
        };
    }
}

export async function signInWithOAuth(provider: "google" | "facebook") {
    let url: string | undefined;

    try {
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
        redirect(url);
    }
    redirect("/");
}

export async function signOut() {
    try {
        const { success } = await auth.api.signOut({
            headers: await headers()
        });

        if (!success) throw new Error("Could not sign out the user");
    } catch (error) {
        console.error("Error: Could not sign out the user", error);
    }

    redirect("/");
}

export async function forgotPassword(data: unknown): Promise<ActionResult> {
    try {
        const result = SignInSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                error: createErrorMessage(result.error.issues)
            }
        }

        return {
            success: true
        };
    } catch (error) {
        console.error("Error: Could not recover password", error);
        return {
            success: false,
            error: "Failed to recover password."
        };
    }
}