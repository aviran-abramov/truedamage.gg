"use client";

import { Button } from "@/components/ui/button";
import { createGame } from "@/lib/actions/games";
import { GameFormData, GameSchema } from "@/lib/validators/game";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function CreateGameForm() {
    const form = useForm({
        resolver: zodResolver(GameSchema),
        defaultValues: {
            name: "",
            shortName: ""
        }
    });

    const onSubmit = async (data: GameFormData) => {
        console.log(form);

        const result = await createGame(data);

        if (result.success) {
            form.reset();
            toast.success("Game created successfully!", { position: "top-center" });
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else {
            toast.error("Failed to create game.", { position: "top-center" });
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldContent>
                        </Field>
                    )}
                />

                <Controller
                    name="shortName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FieldContent>
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Short Name (optional)</FieldLabel>
                                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        </FieldContent>
                    )}
                />

                <FieldSeparator />

                <Button type="submit" className="w-full cursor-pointer">Create Game</Button>
            </FieldGroup>
        </form >
    )
}