import { CreateMatch } from "@/components/forms/match/CreateMatch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createMatch } from "@/lib/actions/matches";

export default function CreateMatchPage() {
    return (
        <div className="max-w-md mx-auto py-10">
            <Card className="">
                <CardHeader>
                    <h2 className="text-center text-2xl font-bold">Create Match</h2>
                </CardHeader>

                <CardContent>
                    <CreateMatch />
                </CardContent>
            </Card>
        </div>

    )
}