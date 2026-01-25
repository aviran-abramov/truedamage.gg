import { PredictionList } from "@/components/matches/predictions/PredictionList";
import { getMatchesWithPredictions } from "@/lib/actions/matches";
import Image from "next/image"

export default async function UpcomingPredictionsPage() {
    const result = await getMatchesWithPredictions();

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
            <Image
                src="/lol_banner.webp"
                alt="Upcoming Matches"
                width={1416}
                height={248.16}
                loading="eager"
            />

            <section className="flex flex-col items-center max-w-5xl w-full">
                <p className="text-3xl font-bold mb-4 py-4">Upcoming Predictions</p>

                {
                    result.success ? (
                        <PredictionList predictions={result.data} />
                    ) : (
                        <p>{result.errorMessage}</p>
                    )
                }
            </section>

        </div>
    )
}