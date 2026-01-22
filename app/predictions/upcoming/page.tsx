import { PredictionList } from "@/components/PredictionList";
import { getMatchesWithPredictions } from "@/lib/actions/matches";
import Image from "next/image"

export default async function UpcomingPredictionsPage() {
    const result = await getMatchesWithPredictions();

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
            <Image src="/lol_banner.webp" alt="Upcoming Matches" width={1416} height={248.16} loading="eager" />

            {
                result.success ? (
                    <PredictionList predictions={result.data} />
                ) : (
                    <p>{result.errorMessage}</p>
                )
            }
        </div>
    )
}