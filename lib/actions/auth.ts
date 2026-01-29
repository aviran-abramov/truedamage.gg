"use server";

import { redirect } from "next/navigation"
import { auth } from "../auth";
import { headers } from "next/headers";

export async function signUp(formData: FormData) {
    try {
        console.log("Attempting to sign up a new user via form");

        const { user } = await auth.api.signUpEmail({
            body: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string
            }
        });
        if (!user) throw new Error("Could not sign up the new user via form");

        console.log("Success!");
    } catch (error) {
        console.error("Error: Could not sign up the new user via form", error);
    }

    redirect("/");
}

export async function signIn(formData: FormData) {
    try {
        console.log("Attempting to sign in a user via form");

        const { user } = await auth.api.signInEmail({
            body: {
                email: formData.get("email") as string,
                password: formData.get("password") as string
            },
        });
        if (!user) throw new Error("Could not sign in the new user via form");

        console.log("Success!");
    } catch (error) {
        console.error("Error: Could not sign in the new user via form", error);
    }

    redirect("/");
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