import { CreateMatch } from "@/components/forms/admin/match/CreateMatch";
import { FormPageContainer } from "@/components/layout/FormPageContainer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllGames } from "@/lib/actions/games";

export default async function CreateMatchPage() {
    const games = await getAllGames();
    if (!games) return;

    return (
        <FormPageContainer>
            <Card className="">
                <CardHeader>
                    <h2 className="text-center text-2xl font-bold">Create Match</h2>
                </CardHeader>

                <CardContent>
                    <CreateMatch games={games} />
                </CardContent>
            </Card>
        </FormPageContainer>

    )
}