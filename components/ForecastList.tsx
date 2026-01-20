import { Game, Match, Team } from "@/lib/generated/prisma/client"
import { Forecast } from "./Forecast"

interface MatchWithRelations extends Match {
    game: Game;
    teamA: Team;
    teamB: Team;
}

export const ForecastList = ({ forecasts }: { forecasts: MatchWithRelations[] }) => {
    return (
        <section className="flex flex-col items-center max-w-5xl w-full">
            <p className="text-3xl font-bold mb-4 py-4">Upcoming Forecasts</p>

            <ul className="w-full space-y-8">
                {forecasts.map((forecast) => (
                    <Forecast key={forecast.id} forecast={forecast} />
                ))}
            </ul>
        </section>
    )
}
