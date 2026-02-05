"use client";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { createGame } from "@/lib/actions/games";
import { CreateGameSchema } from "@/lib/schemas/game";
import { toast } from "sonner";

export function CreateGameForm() {
    const handleCreateGame = async (formData: FormData) => {
        const name = formData.get("name") as string;
        const shortNameInput = formData.get("shortName") as string;

        const newGame = {
            name,
            shortName: shortNameInput?.trim() || undefined
        };

        const result = CreateGameSchema.safeParse(newGame);
        if (!result.success) {
            toast.warning(result.error.issues[0].message, { position: "top-center" });
            return;
        }

        const response = await createGame(result.data);
        if (response?.error) {
            toast.error(response.error, { position: "top-center" });
            return;
        }

        toast.success("Game created successfully!", { position: "top-center" });
        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    }

    return (
        <form action={handleCreateGame} className="flex flex-col gap-4">
            <FormField
                name="name"
                label="Name"
                type="text"
                placeholder="League of Legends"
            />

            <FormField
                name="shortName"
                label="Short Name (optional)"
                type="text"
                placeholder="LoL"
            />

            <CardFooter className="flex flex-col gap-2 border-t">
                <Button type="submit" className="w-full cursor-pointer">
                    Create Game
                </Button>
            </CardFooter>
        </form>
    )
}