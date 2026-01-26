import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateTeam } from "@/lib/actions/teams";
import prisma from "@/lib/db";
import { Game } from "@/lib/generated/prisma/client";

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

interface FormSelectGameFieldProps {
    label: string;
    name: string;
    placeholder: string;
    title: string;
    games: Game[]
}

function FormSelectGameField({ label, name, placeholder, title, games }: FormSelectGameFieldProps) {

    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <Select name={name}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{title}</SelectLabel>
                        {games.map((game) => (
                            <SelectItem key={game.id} value={game.name}>{game.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
}