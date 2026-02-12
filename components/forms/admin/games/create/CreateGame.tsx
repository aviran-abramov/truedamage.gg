"use client";

import { Button } from "@/components/ui/button";
import { createGame } from "@/lib/actions/games";
import { GameFormData, GameSchema } from "@/lib/validators/game";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { FormInputField } from "@/components/forms/FormInputField";

export function CreateGameForm() {
    const form = useForm({
        resolver: zodResolver(GameSchema),
        defaultValues: {
            name: "",
            shortName: ""
        }
    });

    const onSubmit = async (data: GameFormData) => {
        const result = await createGame(data);

        if (result.success) {
            form.reset();
            toast.success("Game created successfully!", { position: "top-center" });
            setTimeout(() => window.location.href = "/", 1500);
        } else {
            toast.error("Failed to create game.", { position: "top-center" });
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    controllerName="name"
                    fieldLabel="Name"
                    placeholder="League of Legends"
                />

                <FormInputField
                    control={form.control}
                    controllerName="shortName"
                    fieldLabel="Short Name (optional)"
                    placeholder="LoL"
                />
            </FieldGroup>

            <FieldSeparator />

            <Button type="submit" className="w-full cursor-pointer">Create Game</Button>
        </form >
    )
}