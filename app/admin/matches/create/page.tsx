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
                    <form action={createMatch} className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel>Match Date</FieldLabel>
                            <Input name="date" type="text" placeholder="2026-01-12" />
                        </Field>

                        <Field>
                            <FieldLabel>Match Time</FieldLabel>
                            <Input name="time" type="text" placeholder="11:00" />
                        </Field>

                        <Field>
                            <FieldLabel>Game</FieldLabel>
                            <Input name="game" type="text" placeholder="League of Legends" />
                        </Field>

                        <Field>
                            <FieldLabel>League</FieldLabel>
                            <Input name="league" type="text" placeholder="LoL Champions Korea (LCK) Cup 2026" />
                        </Field>

                        <Field>
                            <FieldLabel>Best of</FieldLabel>
                            <Input name="bestOf" type="text" placeholder="3" />
                        </Field>

                        <Field>
                            <FieldLabel>Team A</FieldLabel>
                            <Input name="teamAName" type="text" placeholder="Gen.G" />
                        </Field>

                        <Field>
                            <FieldLabel>Team B</FieldLabel>
                            <Input name="teamBName" type="text" placeholder="Dplus KIA" />
                        </Field>

                        <Field>
                            <FieldLabel>Winner Prediction</FieldLabel>
                            <Input name="winnerPrediction" type="text" placeholder="Gen.G" />
                        </Field>

                        <CardFooter className="flex flex-col gap-2 border-t">
                            <Button type="submit" className="w-full cursor-pointer">
                                Create
                            </Button>
                            <Button variant="outline" className="w-full cursor-pointer">
                                Reset Form
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}

// model Match {
//   teamAId String
//   teamA   Team   @relation("TeamAMatches", fields: [teamAId], references: [id])

//   teamBId String
//   teamB   Team   @relation("TeamBMatches", fields: [teamBId], references: [id])

//   gameId String
//   game   Game   @relation(fields: [gameId], references: [id])
// }