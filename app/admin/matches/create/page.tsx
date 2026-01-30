import { CreateMatch } from "@/components/forms/admin/match/CreateMatch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllGames } from "@/lib/actions/games";

export default async function CreateMatchPage() {
    const games = await getAllGames();
    if (!games) return;

    return (
        <div className="max-w-md mx-auto py-10">
            <Card className="">
                <CardHeader>
                    <h2 className="text-center text-2xl font-bold">Create Match</h2>
                </CardHeader>

                <CardContent>
                    <CreateMatch games={games} />
                </CardContent>
            </Card>
        </div>

    )
}