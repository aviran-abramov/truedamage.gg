import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { createMatch } from "@/lib/actions/matches";
import { FormField } from "../../FormField";
import { FormSelectGameField } from "../../FormSelectGameField";
import { getAllGames } from "@/lib/actions/games";
import * as z from "zod";

export async function CreateMatch() {
    const games = await getAllGames();
    if (!games) return;

    return (
        <form action={createMatch} className="flex flex-col gap-4">
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
                    name="game"
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

                <Button variant="outline" className="w-full cursor-pointer">
                    Reset Form
                </Button>
            </CardFooter>
        </form>
    )
}