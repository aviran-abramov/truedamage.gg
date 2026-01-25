import { Prediction } from "./Prediction"
import { MatchWithRelations } from "@/lib/actions/matches"

interface PredictionListProps {
    predictions: MatchWithRelations[]
}

export const PredictionList = ({ predictions = [] }: PredictionListProps) => {
    if (predictions.length === 0) return <EmptyPredictions />;

    return (
        <ul className="w-full space-y-8">
            {predictions.map((prediction) => (
                <Prediction key={prediction.id} prediction={prediction} />
            ))}
        </ul>
    )
}

const EmptyPredictions = () => {
    return (
        <div className="text-center py-12 text-gray-500">
            <p>No predictions available yet.</p>
            <p className="text-sm mt-2">Check back soon for upcoming matches!</p>
        </div>
    )
}