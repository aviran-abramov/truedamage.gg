"use server";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageBanner } from "@/components/PageBanner";
import { PageTitle } from "@/components/PageTitle";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMatches, MatchWithRelations } from "@/lib/actions/matches";
import { getAllTeams } from "@/lib/actions/teams";
import { Game, Team } from "@/lib/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function UpcomingMatchesPage() {
    const matches = (await getMatches()) ?? [];
    const teams = (await getAllTeams()) ?? [];
    const games: Game[] = [];


    for (const match of matches) {
        const game = match.game;
        const isGameAlreadyExists = games.find(game => game.id === match.game.id);

        if (!isGameAlreadyExists) {
            games.push(game);
        }
    }

    return (
        <AppContainer>
            <PageBanner />

            <section className="flex flex-col max-w-7xl w-full bg-[#242430] p-8 rounded">
                <PageTitle>Upcoming Matches</PageTitle>

                <div className="grid grid-cols-12 gap-4">
                    <MatchPreviewList matches={matches} />
                    <Filters games={games} teams={teams} />
                </div>
            </section>
        </AppContainer>
    )
}

interface MatchPreviewListProps {
    matches: MatchWithRelations[];
}

const MatchPreviewList = ({ matches = [] }: MatchPreviewListProps) => {

    return (
        <ul className="col-span-8 flex flex-col gap-2 w-full">
            {matches.map((match) => (
                <MatchPreview
                    key={match.id}
                    match={match}
                />
            ))}
        </ul>
    )
}

interface MatchPreviewProps {
    match: MatchWithRelations;
}

const MatchPreview = ({ match }: MatchPreviewProps) => {

    return (
        <li>
            {/* CHANGE TO SLUG LATER */}
            <Link href={`/matches/${match.id}`}>
                {/* UPPER PART */}
                <MatchPreviewHeader
                    gameIconPath={match.game.iconUrl ? match.game.iconUrl : "/icons/x.png"}
                    gameName={match.game.name}
                    league={match.league}
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
    league: string;
    bestOf: number;
    date: string;
    time: string;
}

const MatchPreviewHeader = ({
    gameIconPath,
    gameName,
    league,
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
                    <h4 className="font-semibold">{gameName} - {league}</h4>
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

interface FiltersProps {
    games: Game[];
    teams: Team[];
}

const Filters = ({ games, teams }: FiltersProps) => {

    return (
        <aside className="col-span-4 space-y-6">
            {/* GAMES */}
            <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921]">
                <FilterTitle>Games</FilterTitle>
                <ul className="flex items-center flex-wrap gap-2">
                    {games.map((game) => (
                        <li key={game.id}>
                            <Button variant={"outline"} className="cursor-pointer rounded-sm">
                                <Image className="dark:invert" src={game.iconUrl || "/icons/x.png"} alt={`${game.name} logo`} height={20} width={20} />
                                {game.shortName}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* TEAMS */}
            <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921]">
                <FilterTitle>Teams</FilterTitle>
                <ul className="flex items-center flex-wrap gap-2">
                    {teams.slice(0, 6).map((team) => (
                        <li key={team.id}>
                            <Button variant={"outline"} className="cursor-pointer rounded-sm">
                                <Image className="dark:invert" src={"/icons/x.png"} alt={`${team.name} logo`} height={20} width={20} />
                                {team.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* TOURNAMENTS */}
            <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921]">
                <FilterTitle>Tournaments</FilterTitle>
                <ul className="flex items-center flex-wrap gap-2">
                    <li>
                        <Button variant={"outline"} className="cursor-pointer rounded-sm">
                            <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                            LCK
                        </Button>
                    </li>
                    <li>
                        <Button variant={"outline"} className="cursor-pointer rounded-sm">
                            <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                            LPL
                        </Button>
                    </li>
                    <li>
                        <Button variant={"outline"} className="cursor-pointer rounded-sm">
                            <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                            IEM
                        </Button>
                    </li>
                    <li>
                        <Button variant={"outline"} className="cursor-pointer rounded-sm">
                            <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                            NCS
                        </Button>
                    </li>
                    <li>
                        <Button variant={"outline"} className="cursor-pointer rounded-sm">
                            <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                            CCT EU
                        </Button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

interface FilterTitleProps {
    children: string;
}

const FilterTitle = ({ children }: FilterTitleProps) => {

    return <h4 className="text-2xl font-semibold mb-2">{children}</h4>
}