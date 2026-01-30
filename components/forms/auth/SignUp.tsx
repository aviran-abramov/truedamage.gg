"use client";

import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/actions/auth";
import { FormField } from "../FormField";
import { CreateSignUpSchema } from "@/lib/schemas/auth/signUp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignUpForm() {
    const router = useRouter();

    const handleSignUp = async (formData: FormData) => {
        const newSignUp = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string
        };

        const result = CreateSignUpSchema.safeParse(newSignUp);
        if (!result.success) {
            toast.warning(result.error.issues[0].message, { position: "top-center" });
            return;
        }

        const response = await signUp(result.data);
        if (response?.error) {
            toast.error(response.error, { position: "top-center" });
            return;
        }

        toast.success("Signed up successfully!", { position: "top-center" });
        setTimeout(() => {
            router.push("/");
        }, 1500);
    }

    return (
        <form action={handleSignUp} className='space-y-4'>
            <FormField
                name="name"
                label="Username"
                type="text"
                placeholder="johndoe"
            />

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
                CREATE ACCOUNT
            </Button>
        </form>
    )
}
