import { Forecast as ForecastType } from "@/lib/types"
import { Forecast } from "./Forecast"

interface ForecastListProps {
    forecasts: ForecastType[]
}

export const ForecastList = ({ forecasts }: ForecastListProps) => {
    if (forecasts.length === 0) {
        return (
            <section className="flex flex-col items-center max-w-4xl w-full">
                <p className="text-2xl mb-4 py-4">Upcoming Forecasts</p>
                <p className="text-muted-foreground">No upcoming forecasts available.</p>
            </section>
        )
    }

    return (
        <section className="flex flex-col items-center max-w-4xl w-full">
            <p className="text-2xl mb-4 py-4">Upcoming Forecasts</p>

            <ul className="w-full space-y-8">
                {forecasts.map((forecast) => (
                    <Forecast key={forecast.id} {...forecast} />
                ))}
            </ul>
        </section>
    )
}
