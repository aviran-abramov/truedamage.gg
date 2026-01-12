import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { MatchProps } from "@/lib/types/match"
import Image from "next/image"

export const Forecast = ({
    id,
    matchDate,
    matchTime,
    gameName = "League of Legends",
    leagueName = "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
    teamAName = "BIG Academy",
    teamBName = "BRION Challengers",
    bestOf = 3,
    forecastedWinnerName = "BRION Challengers",
}: MatchProps) => {

    return (
        <li className="list-none w-full">
            {/* TOP PART */}
            <Alert className="rounded-b-none text-black dark:text-white">
                <AlertTitle className="flex items-center gap-2">
                    <Image className="dark:invert" src={`/lol_small_icon.svg`} alt={`${gameName} logo`} width={20} height={20} />
                    <AlertTitle className="font-semibold">{gameName} - {leagueName}</AlertTitle>
                </AlertTitle>
            </Alert>

            {/* BOTTOM PART */}
            <Alert className="rounded-t-none grid grid-cols-[1fr_auto_1fr] items-center bg-[#F1F1F5] text-black ">
                {/* LEFT - TEAM A */}
                <div>
                    <p className={`text-xl font-bold ${forecastedWinnerName === teamAName ? "text-green-600" : ""}`}>{teamAName}</p>
                </div>

                {/* VS DATA */}
                <div className="text-center space-y-1">
                    <p>{matchDate} {matchTime}</p>
                    <p className="font-extrabold text-4xl">VS</p>
                    <p className="text-sm font-semibold">Best of {bestOf}</p>
                </div>

                {/* RIGHT - TEAM B */}
                <div className="text-right">
                    <p className={`text-xl font-bold ${forecastedWinnerName === teamBName ? "text-green-600" : ""}`}>{teamBName}</p>
                </div>

                {/* <AlertTitle className="flex items-center gap-2">
                    <PopcornIcon className="h-4 w-4 text-yellow-400" />
                    Winner Prediction: {forecastedWinner}
                </AlertTitle> */}
            </Alert>
        </li>
    )
}
