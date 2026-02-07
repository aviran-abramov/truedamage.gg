import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MatchWithRelations } from "@/lib/actions/matches";
import { Team } from "@/lib/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

interface MatchPreviewProps {
    match: MatchWithRelations;
}

export const MatchPreview = ({ match }: MatchPreviewProps) => {

    return (
        <li>
            {/* CHANGE TO SLUG LATER */}
            <Link href={`/matches/${match.id}`}>
                {/* UPPER PART */}
                <MatchPreviewHeader
                    gameIconPath={match.game.iconUrl ? match.game.iconUrl : "/icons/x.png"}
                    gameName={match.game.name}
                    tournament={match.tournament}
                    date={match.date}
                    time={match.time}
                    bestOf={match.bestOf}
                />

                {/* CONTENT PART */}
                <MatchPreviewContent teamA={match.teamA} teamB={match.teamB} />

            </Link>
        </li>
    )
}

interface MatchHeaderProps {
    gameIconPath: string;
    gameName: string;
    tournament: string;
    bestOf: number;
    date: string;
    time: string;
}

const MatchPreviewHeader = ({
    gameIconPath,
    gameName,
    tournament,
    bestOf,
    date,
    time
}: MatchHeaderProps) => {

    return (
        <Alert className="rounded-none text-black dark:text-white text-sm">
            <AlertTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        className="dark:invert"
                        src={gameIconPath}
                        alt={`${gameName} game icon`}
                        width={16}
                        height={16}
                    />
                    <span>-</span>
                    <Badge variant={"default"}>BO{bestOf}</Badge>
                    <h4 className="font-semibold">{gameName} - {tournament}</h4>
                </div>
                <time className="block text-sm font-bold" dateTime={`${date}T${time}`}>
                    {date} at {time}
                </time>
            </AlertTitle>
        </Alert>
    )
}

interface MatchPreviewContentProps {
    teamA: Team;
    teamB: Team;
}

const MatchPreviewContent = ({ teamA, teamB }: MatchPreviewContentProps) => {
    const teamAflagUrl = teamA.countryCode !== "unknown" ? `https://flagcdn.com/w20/${teamA.countryCode}.png` : "/icons/flags/unknown.png";
    const teamBflagUrl = teamB.countryCode !== "unknown" ? `https://flagcdn.com/w20/${teamB.countryCode}.png` : "/icons/flags/unknown.png";

    return (
        <div className="rounded-none text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921] grid grid-cols-[1fr_auto_1fr] items-center p-4 gap-4">
            {/* RIGHT */}
            <div className="flex items-center gap-2 ml-auto">
                <Image
                    src={teamAflagUrl}
                    alt={`${teamA.countryName} flag`}
                    width={20}
                    height={20}
                />
                <p className="text-black dark:text-white font-bold text-lg">{teamA.name}</p>
                <Image
                    src={"/icons/x.png"}
                    alt="Team logo"
                    height={60}
                    width={60}
                    className="dark:bg-white"
                />
            </div>

            <p className="text-black dark:text-[#7B7E89] font-extrabold text-2xl">VS</p>

            <div className="flex items-center gap-2 mr-auto">
                <Image
                    src={"/icons/x.png"}
                    alt="Team logo"
                    height={60}
                    width={60}
                    className="dark:bg-white"
                />
                <p className="text-black dark:text-white font-bold text-lg">{teamB.name}</p>
                <Image
                    src={teamBflagUrl}
                    alt={`${teamB.countryName} flag`}
                    width={20}
                    height={20}
                />
            </div>
        </div>
    )
}