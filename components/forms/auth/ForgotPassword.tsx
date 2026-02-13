"use client";

import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/actions/auth";
import { toast } from "sonner";
import { ForgotPasswordFormData, ForgotPasswordSchema } from "@/lib/validators/auth/forgotPassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "../FormInputField";

export function ForgotPasswordForm() {
    const form = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        const result = await forgotPassword(data);

        if (result.success) {
            form.reset();
            toast.success("Email sent successfully!");
            setTimeout(() => window.location.href = "/", 1500);
        } else {
            toast.error("Failed sending email.");
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

            <Button type="submit" className="w-full cursor-pointer">
                RESET PASSWORD
            </Button>
        </form>
    )
}
