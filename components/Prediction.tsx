import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"
import Image from "next/image"
import { Game, Match, Team } from "@/lib/generated/prisma/client"

export const Prediction = ({ prediction }: { prediction: Match & { game: Game, teamA: Team, teamB: Team } }) => {
    return (
        <li className="list-none w-full">
            {/* TOP PART */}
            <Alert className="rounded-b-none text-black dark:text-white">
                <AlertTitle className="flex items-center gap-2">
                    <Image className="dark:invert" src={`${prediction.game.iconUrl}`} alt={`${prediction.game.name} logo`} width={20} height={20} />
                    <AlertTitle className="font-semibold">{prediction.game.name} - {prediction.league}</AlertTitle>
                </AlertTitle>
            </Alert>

            {/* BOTTOM PART */}
            <Alert className="rounded-t-none grid grid-cols-[1fr_auto_1fr] items-center bg-[#F1F1F5] text-black ">
                {/* LEFT - TEAM A */}
                <div className="flex flex-col items-center gap-0.5">
                    <p className={`text-xl font-bold ${prediction.winnerPrediction === prediction.teamA.name ? "text-green-600" : ""}`}>{prediction.teamA.name}</p>
                    <div className="flex items-center gap-1">
                        <Image src={`https://flagcdn.com/w20/${prediction.teamA.countryCode}.png`} alt={`${prediction.teamA.countryName} flag`} width={20} height={20} />
                        <p>{prediction.teamA.countryName}</p>
                    </div>
                </div>

                {/* VS DATA */}
                <div className="text-center space-y-1">
                    <p>{prediction.matchDate} {prediction.matchTime}</p>
                    <p className="font-extrabold text-4xl">VS</p>
                    <p className="text-sm font-semibold">Best of {prediction.bestOf}</p>
                </div>

                {/* RIGHT - TEAM B */}
                <div className="flex flex-col items-center gap-0.5">
                    <p className={`text-xl font-bold ${prediction.winnerPrediction === prediction.teamB.name ? "text-green-600" : ""}`}>{prediction.teamB.name}</p>
                    <div className="flex items-center gap-1">
                        <Image src={`https://flagcdn.com/w20/${prediction.teamB.countryCode}.png`} alt={`${prediction.teamB.countryName} flag`} width={20} height={20} />
                        <p>{prediction.teamB.countryName}</p>
                    </div>
                </div>

                {/* <AlertTitle className="flex items-center gap-2">
                    <PopcornIcon className="h-4 w-4 text-yellow-400" />
                    Winner Prediction: {predictedWinner}
                </AlertTitle> */}
            </Alert>
        </li>
    )
}
