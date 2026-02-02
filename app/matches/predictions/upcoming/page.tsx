import { FilterByGame } from "@/components/matches/Filters/FilterByGame";
import { PredictionList } from "@/components/matches/predictions/PredictionList";
import { PageBanner } from "@/components/PageBanner";
import { PageTitle } from "@/components/PageTitle";
import { getMatchesWithPredictions } from "@/lib/actions/matches";
import Image from "next/image"

export default async function UpcomingPredictionsPage() {
    const matchesWithPredictions = await getMatchesWithPredictions();

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
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

        </div>
    )
}
