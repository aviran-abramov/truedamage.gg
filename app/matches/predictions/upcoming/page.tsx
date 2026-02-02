import { AppContainer } from "@/components/layout/AppContainer";
import { FilterByGame } from "@/components/matches/Filters/FilterByGame";
import { PredictionList } from "@/components/matches/predictions/PredictionList";
import { PageBanner } from "@/components/PageBanner";
import { PageTitle } from "@/components/PageTitle";
import { getMatchesWithPredictions } from "@/lib/actions/matches";

export default async function UpcomingPredictionsPage() {
    const matchesWithPredictions = await getMatchesWithPredictions();

    return (
        <AppContainer>
            <PageBanner />

            <section className="flex flex-col max-w-5xl w-full">
                <PageTitle>Upcoming Predictions</PageTitle>

                <FilterByGame />

                {
                    matchesWithPredictions.success ? (
                        <PredictionList predictions={matchesWithPredictions.data} />
                    ) : (
                        <p>{matchesWithPredictions.errorMessage}</p>
                    )
                }
            </section>
        </AppContainer>
    )
}
