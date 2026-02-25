import { CreateMatch } from "@/components/forms/admin/match/create/CreateMatch";
import { FormPageContainer } from "@/components/layout/FormPageContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllGames } from "@/lib/actions/games";

export default async function CreateMatchPage() {
  const gamesData = await getAllGames();
  if (!gamesData.success) return "ERROR: No games found";

  return (
    <FormPageContainer>
      <Card className="">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Create Match</h2>
        </CardHeader>

        <CardContent>
          <CreateMatch games={gamesData.data} />
        </CardContent>
      </Card>
    </FormPageContainer>
  );
}
