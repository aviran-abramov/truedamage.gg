import { CreateGameForm } from "@/components/forms/admin/games/create/CreateGame";
import { FormPageContainer } from "@/components/layout/FormPageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateGamePage() {

    return (
        <FormPageContainer>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Create Game</CardTitle>
                    <CardDescription className="text-center">Add a new game to the platform</CardDescription>
                </CardHeader>

                <CardContent>
                    <CreateGameForm />
                </CardContent>
            </Card>
        </FormPageContainer>
    )
}