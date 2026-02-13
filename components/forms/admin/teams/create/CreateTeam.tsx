"use client";

import { FormInputField } from "@/components/forms/FormInputField";
import { FormSelectField } from "@/components/forms/FormSelectField";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { createTeam } from "@/lib/actions/teams";
import { Game } from "@/lib/generated/prisma/client";
import { TeamFormData, TeamSchema } from "@/lib/validators/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateTeamFormProps {
    games: Game[];
}

export function CreateTeamForm({ games }: CreateTeamFormProps) {
    const form = useForm<TeamFormData>({
        resolver: zodResolver(TeamSchema),
        defaultValues: {
            gameName: "",
            name: "",
            countryName: "",
            countryCode: ""
        }
    });

    const onSubmit = async (data: TeamFormData) => {
        const result = await createTeam(data);

        if (result.success) {
            form.reset();
            toast.success("Team created successfully!");
            setTimeout(() => window.location.href = "/", 1500);
        } else {
            toast.error("Failed to create team.");
        }
    };

    const gameSelectItems = games.map((game) => {
        return {
            id: game.id,
            label: game.name,
            value: game.name
        }
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormSelectField
                control={form.control}
                controllerName="gameName"
                fieldLabel="Game"
                placeholder="Select a game"
                selectLabel="Games"
                items={gameSelectItems}
            />

            <FormInputField
                control={form.control}
                controllerName="name"
                fieldLabel="Name"
                placeholder="Team Vitality"
            />

            <FormInputField
                control={form.control}
                controllerName="countryName"
                fieldLabel="Country Name"
                placeholder="South Korea"
            />

            <FormInputField
                control={form.control}
                controllerName="countryCode"
                fieldLabel="Country Code"
                placeholder="KR"
            />

            <FieldSeparator />

            <Button type="submit" className="w-full cursor-pointer">Create Team</Button>
        </form>
    )
}
