"use client";

import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/actions/auth";
import { SignUpFormData, SignUpSchema } from "@/lib/validators/auth/signUp";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "../FormInputField";

export function SignUpForm() {
    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: SignUpFormData) => {
        const result = await signUp(data);

        if (result.success) {
            form.reset();
            toast.success("Signed up successfully!", { position: "top-center" });
            setTimeout(() => window.location.href = "/", 1500);
        } else {
            toast.error("Failed signing up.", { position: "top-center" });
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormInputField
                control={form.control}
                controllerName="name"
                fieldLabel="Username"
                placeholder="johndoe"
            />

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
            />

            <Button type="submit" className="w-full cursor-pointer">
                CREATE ACCOUNT
            </Button>
        </form>
    )
}
