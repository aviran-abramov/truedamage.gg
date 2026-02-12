"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { createMatch } from "@/lib/actions/matches";
import { FormField } from "../../FormField";
import { FormSelectGameField } from "../../FormSelectGameField";
import { Game } from "@/lib/generated/prisma/client";
import { MatchFormData, MatchSchema } from "@/lib/validators/match";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "../../FormInputField";
import { FormSelectField } from "../../FormSelectField";
import { FieldSeparator } from "@/components/ui/field";

interface CreateMatchProps {
    games: Game[];
}

export function CreateMatch({ games }: CreateMatchProps) {
    const form = useForm({
        resolver: zodResolver(MatchSchema),
        defaultValues: {
            date: "",
            time: "",
            gameName: "",
            tournament: "",
            bestOf: "",
            teamAName: "",
            teamBName: "",
            winnerPrediction: ""
        }
    });

    const onSubmit = async (data: MatchFormData) => {
        const result = await createMatch(data);

        if (result.success) {
            form.reset();
            toast.success("Match created successfully!", { position: "top-center" });
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else {
            toast.error("Failed to create match.", { position: "top-center" })
        }
    }

    const gameSelectItems = games.map((game) => {
        return {
            id: game.id,
            label: game.name,
            value: game.name
        }
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <FormInputField
                    control={form.control}
                    controllerName="date"
                    fieldLabel="Match Date"
                    placeholder="2026-01-12"
                />

                <FormInputField
                    control={form.control}
                    controllerName="time"
                    fieldLabel="Match Time"
                    placeholder="11:00"
                />
            </div>

            <FormInputField
                control={form.control}
                controllerName="tournament"
                fieldLabel="Tournament"
                placeholder="LoL Champions Korea (LCK) Cup 2026"
            />



            <div className="flex items-center gap-3">
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
                    controllerName="bestOf"
                    fieldLabel="Best of"
                    placeholder="3"
                />
            </div>

            <FormInputField
                control={form.control}
                controllerName="teamAName"
                fieldLabel="Team A"
                placeholder="Gen.G"
            />

            <FormInputField
                control={form.control}
                controllerName="teamBName"
                fieldLabel="Team B"
                placeholder="Dplus KIA"
            />

            <FormInputField
                control={form.control}
                controllerName="winnerPrediction"
                fieldLabel="Winner Prediction"
                placeholder="Gen.G"
            />

            <FieldSeparator />

            <Button type="submit" className="w-full cursor-pointer">Create Match</Button>

        </form>
    )
}