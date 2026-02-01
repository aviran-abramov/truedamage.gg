"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { createMatch } from "@/lib/actions/matches";
import { FormField } from "../../FormField";
import { FormSelectGameField } from "../../FormSelectGameField";
import { Game } from "@/lib/generated/prisma/client";
import { CreateMatchSchema } from "@/lib/schemas/match";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateMatchProps {
    games: Game[];
}

export function CreateMatch({ games }: CreateMatchProps) {
    const router = useRouter();

    const handleCreateMatch = async (formData: FormData) => {
        const newMatch = {
            date: formData.get('date') as string,
            time: formData.get('time') as string,
            gameName: formData.get('gameName') as string,
            league: formData.get('league') as string,
            bestOf: Number(formData.get('bestOf')),
            teamAName: formData.get('teamAName') as string,
            teamBName: formData.get('teamBName') as string,
            winnerPrediction: formData.get("winnerPrediction") as string
        }

        const result = CreateMatchSchema.safeParse(newMatch);
        if (!result.success) {
            toast.warning(result.error.issues[0].message, { position: "top-center" });
            return;
        }

        const response = await createMatch(result.data);
        if (response?.error) {
            toast.error(response.error, { position: "top-center" });
            return;
        }

        toast.success("Match created successfully!", { position: "top-center" });
        setTimeout(() => {
            router.push("/matches/predictions/upcoming");
        }, 1500);
    }

    return (
        <form action={handleCreateMatch} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <FormField
                    name="date"
                    label="Match Date"
                    type="text"
                    placeholder="2026-01-12"
                />

                <FormField
                    name="time"
                    label="Match Time"
                    type="text"
                    placeholder="11:00"
                />
            </div>

            <FormField
                name="league"
                label="League"
                type="text"
                placeholder="LoL Champions Korea (LCK) Cup 2026"
            />

            <div className="flex items-center gap-3">
                <FormSelectGameField
                    label="Game"
                    name="gameName"
                    placeholder="Select a game"
                    title="Games"
                    games={games}
                />

                <FormField
                    name="bestOf"
                    label="Best of"
                    type="text"
                    placeholder="3"
                />
            </div>

            <FormField
                name="teamAName"
                label="Team A"
                type="text"
                placeholder="Gen.G"
            />

            <FormField
                name="teamBName"
                label="Team B"
                type="text"
                placeholder="Dplus KIA"
            />

            <FormField
                name="winnerPrediction"
                label="Winner Prediction"
                type="text"
                placeholder="Gen.G"
            />


            <CardFooter className="flex flex-col gap-2 border-t">
                <Button type="submit" className="w-full cursor-pointer">
                    Create Match
                </Button>
            </CardFooter>
        </form>
    )
}