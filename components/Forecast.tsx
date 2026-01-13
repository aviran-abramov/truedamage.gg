import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { MatchProps } from "@/lib/types/match"
import Image from "next/image"
import { Match } from "@/lib/generated/prisma/client"

export const Forecast = ({
    id,
    matchDate,
    matchTime,
    game = "League of Legends",
    league = "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
    teamA = "BIG Academy",
    teamB = "BRION Challengers",
    bestOf = 3,
    winnerPrediction = "BRION Challengers",
}: Match) => {

    return (
        <li className="list-none w-full">
            {/* TOP PART */}
            <Alert className="rounded-b-none text-black dark:text-white">
                <AlertTitle className="flex items-center gap-2">
                    <Image className="dark:invert" src={`/lol_small_icon.svg`} alt={`${game} logo`} width={20} height={20} />
                    <AlertTitle className="font-semibold">{game} - {league}</AlertTitle>
                </AlertTitle>
            </Alert>

            {/* BOTTOM PART */}
            <Alert className="rounded-t-none grid grid-cols-[1fr_auto_1fr] items-center bg-[#F1F1F5] text-black ">
                {/* LEFT - TEAM A */}
                <div>
                    <p className={`text-xl font-bold ${winnerPrediction === teamA ? "text-green-600" : ""}`}>{teamA}</p>
                </div>

                {/* VS DATA */}
                <div className="text-center space-y-1">
                    <p>{matchDate} {matchTime}</p>
                    <p className="font-extrabold text-4xl">VS</p>
                    <p className="text-sm font-semibold">Best of {bestOf}</p>
                </div>

                {/* RIGHT - TEAM B */}
                <div className="text-right">
                    <p className={`text-xl font-bold ${winnerPrediction === teamB ? "text-green-600" : ""}`}>{teamB}</p>
                </div>

                {/* <AlertTitle className="flex items-center gap-2">
                    <PopcornIcon className="h-4 w-4 text-yellow-400" />
                    Winner Prediction: {forecastedWinner}
                </AlertTitle> */}
            </Alert>
        </li>
    )
}
