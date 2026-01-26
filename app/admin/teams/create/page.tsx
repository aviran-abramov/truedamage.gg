import { CreateTeamForm } from "@/components/forms/admin/teams/create/CreateTeam";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CreateTeamPage() {

    return (
        <div className="max-w-md mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Create Team</CardTitle>
                    <CardDescription className="text-center">Add a new team to the platform</CardDescription>
                </CardHeader>

                <CardContent>
                    <CreateTeamForm />
                </CardContent>
            </Card>
        </div>
    )
}