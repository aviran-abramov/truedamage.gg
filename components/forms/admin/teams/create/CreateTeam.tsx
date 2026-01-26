import { FormField } from "@/components/forms/FormField";
import { FormSelectGameField } from "@/components/forms/FormSelectGameField";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { CreateTeam } from "@/lib/actions/teams";
import prisma from "@/lib/db";

export async function CreateTeamForm() {
    const games = await prisma.game.findMany();

    return (
        <form action={CreateTeam} className="flex flex-col gap-4">
            <FormSelectGameField
                label="Game"
                name="game"
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

                <Button variant="outline" className="w-full cursor-pointer">
                    Reset Form
                </Button>
            </CardFooter>
        </form>
    )
}