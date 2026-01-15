import prisma from "@/lib/db"
import { Forecast } from "./Forecast"


export const ForecastList = async () => {
    const forecasts = await prisma.match.findMany({
        where: {
            winnerPrediction: {
                not: null
            }
        }
    });

    return (
        <section className="flex flex-col items-center max-w-4xl w-full">
            <p className="text-2xl mb-4 py-4">Upcoming Forecasts</p>

            <ul className="w-full space-y-8">
                {forecasts.map((forecast) => (
                    <Forecast key={forecast.id} forecast={forecast} />
                ))}
            </ul>
        </section>
    )
}
