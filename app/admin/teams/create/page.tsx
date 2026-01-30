import { CreateTeamForm } from "@/components/forms/admin/teams/create/CreateTeam";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";

export default async function CreateTeamPage() {
    const games = await prisma.game.findMany();

    return (
        <div className="max-w-md mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Create Team</CardTitle>
                    <CardDescription className="text-center">Add a new team to the platform</CardDescription>
                </CardHeader>

                <CardContent>
                    <CreateTeamForm games={games} />
                </CardContent>
            </Card>
        </div>
    )
}