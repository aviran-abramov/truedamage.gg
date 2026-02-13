"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "@/components/forms/FormInputField";
import { USER_ROLES, UserFormData, UserSchema } from "@/lib/validators/user";
import { FormSelectField } from "@/components/forms/FormSelectField";
import { createUser } from "@/lib/actions/user";

export function CreateUserForm() {
    const form = useForm({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: ""
        }
    });

    const onSubmit = async (data: UserFormData) => {
        const result = await createUser(data);

        if (result.success) {
            form.reset();
            toast.success("User created successfully!");
            setTimeout(() => window.location.href = "/", 1500);
        } else {
            toast.error("Failed creating user.");
        }

    }

    const userSelectItems = USER_ROLES.map(role => {
        return {
            id: role,
            label: `${role.slice(0, 1)}${role.slice(1).toLowerCase()}`,
            value: role
        }
    });

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

            <FormSelectField
                control={form.control}
                controllerName="role"
                fieldLabel="Role"
                placeholder="Select a role"
                selectLabel="Roles"
                items={userSelectItems}
            />

            <Button type="submit" className="w-full cursor-pointer">
                CREATE ACCOUNT
            </Button>
        </form>
    )
}
