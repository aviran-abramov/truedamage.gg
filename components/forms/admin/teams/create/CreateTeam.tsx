"use client";

import { FormField } from "@/components/forms/FormField";
import { FormSelectGameField } from "@/components/forms/FormSelectGameField";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { createTeam } from "@/lib/actions/teams";
import { Game } from "@/lib/generated/prisma/client";
import { TeamSchema } from "@/lib/validators/team";
import { toast } from "sonner";

interface CreateTeamFormProps {
    games: Game[];
}

export function CreateTeamForm({ games }: CreateTeamFormProps) {
    const handleCreateTeam = async (formData: FormData) => {
        const newTeam = {
            gameName: formData.get("gameName") as string,
            name: formData.get("name") as string,
            countryName: formData.get("countryName") as string,
            countryCode: formData.get("countryCode") as string,
        };

        const result = TeamSchema.safeParse(newTeam);
        if (!result.success) {
            toast.warning(result.error.issues[0].message, { position: "top-center" });
            return;
        }

        const response = await createTeam(newTeam);
        if (response?.error) {
            toast.error(response.error, { position: "top-center" });
            return;
        }

        toast.success("Team created successfully!", { position: "top-center" });
        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    }

    return (
        <form action={handleCreateTeam} className="flex flex-col gap-4">
            <FormSelectGameField
                label="Game"
                name="gameName"
                placeholder="Select a game"
                title="Games"
                games={games}
            />

            <FormField
                name="name"
                label="Name"
                type="text"
                placeholder="Team Vitality"
            />

            <FormField
                name="countryName"
                label="Country Name"
                type="text"
                placeholder="South Korea"
            />

            <FormField
                name="countryCode"
                label="Country Code"
                type="text"
                placeholder="KR"
            />

            <CardFooter className="flex flex-col gap-2 border-t">
                <Button type="submit" className="w-full cursor-pointer">
                    Create Team
                </Button>
            </CardFooter>
        </form>
    )
}