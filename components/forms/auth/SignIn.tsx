"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth";
import { SignInFormData, SignInSchema } from "@/lib/validators/auth/signIn";
import { toast } from "sonner";
import { AuthModalType } from "@/lib/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "../FormInputField";

interface SignInFormProps {
    onAuthModalToShowClick: (type: AuthModalType) => void;
}

export function SignInForm({ onAuthModalToShowClick }: SignInFormProps) {
    const form = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: SignInFormData) => {
        const result = await signIn(data);

        if (result.success) {
            form.reset();
            toast.success("Signed in successfully!", { position: "top-center" });
            setTimeout(() => window.location.href = "/", 1500);
        } else {
            toast.error("Failed signing in.", { position: "top-center" });
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormInputField
                control={form.control}
                controllerName="email"
                fieldLabel="Email Address"
                type="email"
                placeholder="johndoe@gmail.com"
            />

            <FormInputField
                control={form.control}
                controllerName="password"
                fieldLabel="Password"
                type="password"
                placeholder="password"
                hasAdditionalButton={true}
                additionalButtonLabel="Forgot password"
                onAuthModalToShowClick={onAuthModalToShowClick}
            />

            <Button type="submit" className="w-full cursor-pointer">
                SIGN IN
            </Button>
        </form>
    )
}
