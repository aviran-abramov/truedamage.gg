import { Game } from "@/lib/generated/prisma/client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "../ui/select";
import { Field, FieldLabel } from "../ui/field";

interface FormSelectGameFieldProps {
    label: string;
    name: string;
    placeholder: string;
    title: string;
    games: Game[]
}

export function FormSelectGameField({ label, name, placeholder, title, games }: FormSelectGameFieldProps) {

    return (
        <Field className="gap-2.5">
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