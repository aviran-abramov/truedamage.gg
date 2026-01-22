import { Prediction } from "./Prediction"
import { MatchWithRelations } from "@/lib/actions/matches"

export const PredictionList = ({ predictions }: { predictions: MatchWithRelations[] }) => {
    return (
        <section className="flex flex-col items-center max-w-5xl w-full">
            <p className="text-3xl font-bold mb-4 py-4">Upcoming Predictions</p>

            <ul className="w-full space-y-8">
                {predictions.map((prediction) => (
                    <Prediction key={prediction.id} prediction={prediction} />
                ))}
            </ul>
        </section>
    )
}
