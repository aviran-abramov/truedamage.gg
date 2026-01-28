import { FilterByGame } from "@/components/matches/Filters/FilterByGame";
import { PredictionList } from "@/components/matches/predictions/PredictionList";
import { getMatchesWithPredictions } from "@/lib/actions/matches";
import Image from "next/image"

export default async function UpcomingPredictionsPage() {
    const matchesWithPredictions = await getMatchesWithPredictions();

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
            <Image
                src="/lol_banner.webp"
                alt="Upcoming Matches"
                width={1416}
                height={248.16}
                loading="eager"
            />

            <section className="flex flex-col max-w-5xl w-full">
                <p className="text-3xl font-bold mb-4 py-4 text-center">Upcoming Predictions</p>

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