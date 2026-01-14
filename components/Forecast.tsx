import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"
import Image from "next/image"
import { Match } from "@/lib/generated/prisma/client"

export const Forecast = ({ forecast }: { forecast: Match }) => {
    return (
        <li className="list-none w-full">
            {/* TOP PART */}
            <Alert className="rounded-b-none text-black dark:text-white">
                <AlertTitle className="flex items-center gap-2">
                    <Image className="dark:invert" src={`/icons/games/league-of-legends.svg`} alt={`${forecast.game} logo`} width={20} height={20} />
                    <AlertTitle className="font-semibold">{forecast.game} - {forecast.league}</AlertTitle>
                </AlertTitle>
            </Alert>

            {/* BOTTOM PART */}
            <Alert className="rounded-t-none grid grid-cols-[1fr_auto_1fr] items-center bg-[#F1F1F5] text-black ">
                {/* LEFT - TEAM A */}
                <div className="flex flex-col items-center gap-0.5">
                    <p className={`text-xl font-bold ${forecast.winnerPrediction === forecast.teamA ? "text-green-600" : ""}`}>{forecast.teamA}</p>
                    <div className="flex items-center gap-1">
                        <Image src={`https://flagcdn.com/w20/us.png`} alt={`United States flag`} width={20} height={20} />
                        <p>United States</p>
                    </div>
                </div>

                {/* VS DATA */}
                <div className="text-center space-y-1">
                    <p>{forecast.matchDate} {forecast.matchTime}</p>
                    <p className="font-extrabold text-4xl">VS</p>
                    <p className="text-sm font-semibold">Best of {forecast.bestOf}</p>
                </div>

                {/* RIGHT - TEAM B */}
                <div className="flex flex-col items-center gap-0.5">
                    <p className={`text-xl font-bold ${forecast.winnerPrediction === forecast.teamB ? "text-green-600" : ""}`}>{forecast.teamB}</p>
                    <div className="flex items-center gap-1">
                        <Image src="https://flagcdn.com/w20/us.png" alt={`United States flag`} width={20} height={20} />
                        <p>United States</p>
                    </div>
                </div>

                {/* <AlertTitle className="flex items-center gap-2">
                    <PopcornIcon className="h-4 w-4 text-yellow-400" />
                    Winner Prediction: {forecastedWinner}
                </AlertTitle> */}
            </Alert>
        </li>
    )
}
