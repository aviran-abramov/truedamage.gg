import { CreateGameForm } from "@/components/forms/admin/games/create/CreateGame";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateGamePage() {

    return (
        <div className="max-w-md mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Create Game</CardTitle>
                    <CardDescription className="text-center">Add a new game to the platform</CardDescription>
                </CardHeader>

                <CardContent>
                    <CreateGameForm />
                </CardContent>
            </Card>
        </div>
    )
}