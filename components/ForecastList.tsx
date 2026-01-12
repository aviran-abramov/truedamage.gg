import { Forecast } from "./Forecast"
import { ForecastListData } from "@/lib/data/forecasts"


export const ForecastList = () => {
    return (
        <section className="flex flex-col items-center max-w-4xl w-full">
            <p className="text-2xl mb-4 py-4">Upcoming Forecasts</p>

            <ul className="w-full space-y-8">
                {ForecastListData.map((forecast) => (
                    <Forecast key={forecast.id} {...forecast} />
                ))}
            </ul>
        </section>
    )
}
