import { MatchProps } from "@/lib/types/match"
import { Forecast } from "./Forecast"

const ForecastListData: MatchProps[] = [
    {
        id: "1",
        matchDate: "2026-01-12",
        matchTime: "11:00",
        gameName: "League of Legends",
        leagueName: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
        teamAName: "BIG Academy",
        teamBName: "BRION Challengers",
        bestOf: 3,
        forecastedWinnerName: "BRION Challengers",
    },
    {
        id: "2",
        matchDate: "2026-01-13",
        matchTime: "14:00",
        gameName: "League of Legends",
        leagueName: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
        teamAName: "BNK FEARX Youth",
        teamBName: "T1 Esports Academy",
        bestOf: 3,
        forecastedWinnerName: "T1 Esports Academy",
    },
    {
        id: "3",
        matchDate: "2026-01-14",
        matchTime: "16:00",
        gameName: "League of Legends",
        leagueName: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
        teamAName: "All for One Gaming",
        teamBName: "Second Time Alive",
        bestOf: 5,
        forecastedWinnerName: "All for One Gaming",
    }
];

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
