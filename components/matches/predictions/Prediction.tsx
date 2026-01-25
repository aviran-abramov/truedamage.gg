import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"
import { PredictionContentProps, PredictionHeaderProps, PredictionMatchDetailsProps, PredictionProps, PredictionTeamProps } from "@/lib/types/match";
import Image from "next/image"

export const Prediction = ({ prediction }: PredictionProps) => {
    const gameIconPath = `/icons/games/${prediction.game.slug}.svg`;

    return (
        <li
            className="list-none w-full"
        >
            <PredictionHeader
                gameIconPath={gameIconPath}
                gameName={prediction.game.name}
                league={prediction.league}
            />

            <PredictionContent>
                <TeamDisplay
                    name={prediction.teamA.name}
                    countryName={prediction.teamA.countryName || "unknown"}
                    countryCode={prediction.teamA.countryCode || "unknown"}
                    isPredictedWinner={prediction.winnerPrediction === prediction.teamA.name}
                />

                {/* VS DATA */}
                <MatchDetails
                    date={prediction.date}
                    time={prediction.time}
                    bestOf={prediction.bestOf}
                />

                <TeamDisplay
                    name={prediction.teamB.name}
                    countryName={prediction.teamB.countryName || "unknown"}
                    countryCode={prediction.teamB.countryCode || "unknown"}
                    isPredictedWinner={prediction.winnerPrediction === prediction.teamB.name}
                />
            </PredictionContent>
        </li>
    )
}

const PredictionHeader = ({ gameIconPath, gameName, league }: PredictionHeaderProps) => {

    return (
        <Alert className="rounded-b-none text-black dark:text-white">
            <AlertTitle className="flex items-center gap-2">
                <Image
                    className="dark:invert"
                    src={gameIconPath}
                    alt={`${gameName} game icon`}
                    width={20}
                    height={20}
                />
                <h3 className="font-semibold">{gameName} - {league}</h3>
            </AlertTitle>
        </Alert>
    )
}

const PredictionContent = ({ children }: PredictionContentProps) => {

    return (
        <Alert className="rounded-t-none grid grid-cols-[1fr_auto_1fr] items-center bg-[#F1F1F5] text-black">
            {children}
        </Alert>
    )
}

const TeamDisplay = ({ name, countryName, countryCode, isPredictedWinner }: PredictionTeamProps) => {
    const flagUrl = countryCode !== "unknown" ? `https://flagcdn.com/w20/${countryCode}.png` : "/icons/flags/unknown.png";

    return (
        <div className="flex flex-col items-center gap-0.5">
            <p
                className={`text-xl font-bold ${isPredictedWinner ? "text-green-600" : ""}`}
            >{name}</p>

            <div className="flex items-center gap-1">
                <Image
                    src={flagUrl}
                    alt={`${countryName} flag`}
                    width={20}
                    height={20}
                />

                <p className="text-sm">{countryName}</p>
            </div>
        </div>
    )
}

const MatchDetails = ({ date, time, bestOf }: PredictionMatchDetailsProps) => {

    return (
        <div className="text-center space-y-1">
            <time className="block text-sm" dateTime={`${date}T${time}`}>
                {date} {time}
            </time>

            <p className="font-extrabold text-4xl">VS</p>

            <p className="text-sm font-semibold">Best of {bestOf}</p>
        </div>
    )
}