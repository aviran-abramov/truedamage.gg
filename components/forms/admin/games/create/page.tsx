import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { createGame } from "@/lib/actions/games";

export function CreateGameForm() {

    return (
        <form action={createGame} className="flex flex-col gap-4">
            <FormField
                name="name"
                label="Name"
                type="text"
                placeholder="League of Legends"
            />

            <CardFooter className="flex flex-col gap-2 border-t">
                <Button type="submit" className="w-full cursor-pointer">
                    Create
                </Button>

                <Button variant="outline" className="w-full cursor-pointer">
                    Reset Form
                </Button>
            </CardFooter>
        </form>
    )
}