"use server";

import { redirect } from "next/navigation"
import { auth } from "../auth";
import { headers } from "next/headers";

export async function signUp(formData: FormData) {
    try {
        await auth.api.signUpEmail({
            body: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string
            }
        });
    } catch (error) {
        console.log(error);
    }

    redirect("/");
}

export async function signIn(formData: FormData) {
    try {
        await auth.api.signInEmail({
            body: {
                email: formData.get("email") as string,
                password: formData.get("password") as string
            },
        });
    } catch (error) {
        console.log(error);
    }

    redirect("/");
}

export async function signInWithOAuth(provider: "google" | "facebook") {
    const { url } = await auth.api.signInSocial({
        body: {
            provider
        }
    });

    if (url) redirect(url);
}

export async function signOut() {
    try {
        await auth.api.signOut({
            headers: await headers()
        });
    } catch (error) {
        console.log(error);
    }

    redirect("/");
}