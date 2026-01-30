"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth";
import { FormField } from "../FormField";
import { CreateSignInSchema } from "@/lib/schemas/auth/signIn";
import { toast } from "sonner";

export function SignInForm() {
    const handleSignIn = async (formData: FormData) => {
        const newSignIn = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        };

        const result = CreateSignInSchema.safeParse(newSignIn);
        if (!result.success) {
            toast.warning(result.error.issues[0].message, { position: "top-center" });
            return;
        }

        const response = await signIn(result.data);
        if (response?.error) {
            toast.error(response.error, { position: "top-center" });
            return;
        }

        toast.success("Signed in successfully!", { position: "top-center" });
        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    }

    return (
        <form action={handleSignIn} className='space-y-4'>
            <FormField
                name="email"
                label="Email Address"
                type="email"
                placeholder="johndoe@gmail.com"
            />

            <FormField
                name="password"
                label="Password"
                type="password"
                placeholder="password"
            />

            <Button type="submit" className="w-full cursor-pointer">
                SIGN IN
            </Button>
        </form>
    )
}
