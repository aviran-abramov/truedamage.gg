"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth";
import { FormField } from "../FormField";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateForgotPasswordSchema } from "@/lib/schemas/auth/forgotPassword";

export function ForgotPasswordForm() {
    const router = useRouter();

    const handleForgotPassword = async (formData: FormData) => {
        const newForgotPasswordRequest = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        };

        const result = CreateForgotPasswordSchema.safeParse(newForgotPasswordRequest);
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
            router.push("/");
        }, 1500);
    }

    return (
        <form action={handleForgotPassword} className='space-y-4'>
            <FormField
                name="email"
                label="Email Address"
                type="email"
                placeholder="johndoe@gmail.com"
            />

            <Button type="submit" className="w-full cursor-pointer">
                SIGN IN
            </Button>
        </form>
    )
}
