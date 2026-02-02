"use server";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageBanner } from "@/components/PageBanner";
import { PageTitle } from "@/components/PageTitle";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getMatches, MatchWithRelations } from "@/lib/actions/matches";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function UpcomingMatchesPage() {
    const matches = await getMatches();

    return (
        <AppContainer>
            <PageBanner />

            <section className="flex flex-col max-w-5xl w-full">
                <PageTitle>Upcoming Matches</PageTitle>

                <MatchPreviewList matches={matches} />

            </section>
        </AppContainer>
    )
}

interface MatchPreviewListProps {
    matches: MatchWithRelations[];
}

const MatchPreviewList = ({ matches = [] }: MatchPreviewListProps) => {

    return (
        <ul className="p-2 bg-sky-950 bg- flex flex-col gap-2 w-full">
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
                />

                {/* CONTENT PART */}
                <MatchPreviewContent>
                    {/* RIGHT */}
                    <div className="flex items-center gap-1 ml-auto">
                        <p className="text-black">{match.teamA.name}</p>
                        <Image
                            src={"/icons/x.png"}
                            alt="Team logo"
                            height={20}
                            width={20}
                        />
                    </div>

                    <p className="text-black font-bold text-2xl">VS</p>

                    <div className="flex items-center gap-1 mr-auto">
                        <Image
                            src={"/icons/x.png"}
                            alt="Team logo"
                            height={20}
                            width={20}
                        />
                        <p className="text-black">{match.teamB.name}</p>
                    </div>
                </MatchPreviewContent>
            </Link>
        </li>
    )
}

interface MatchHeaderProps {
    gameIconPath: string;
    gameName: string;
    league: string;
}

const MatchPreviewHeader = ({ gameIconPath, gameName, league }: MatchHeaderProps) => {

    return (
        <Alert className="rounded-none text-black dark:text-white text-sm">
            <AlertTitle className="flex items-center gap-2">
                <Image
                    className="dark:invert"
                    src={gameIconPath}
                    alt={`${gameName} game icon`}
                    width={16}
                    height={16}
                />
                <h3 className="font-semibold">{gameName} - {league}</h3>
            </AlertTitle>
        </Alert>
    )
}

interface MatchPreviewContentProps {
    children: React.ReactNode;
}

const MatchPreviewContent = ({ children }: MatchPreviewContentProps) => {

    return (
        <div className="rounded-none text-black dark:text-white text-sm bg-white grid grid-cols-[1fr_auto_1fr] px-4 py-2 gap-14">
            {children}
        </div>
    )
}

interface MatchPreviewTeamProps {
    name: string;
    imageUrl?: string;
    className?: string;
}

const MatchPreviewTeam = ({ name, imageUrl = "/icons/x.png", className }: MatchPreviewTeamProps) => {

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <Image
                src={imageUrl}
                alt="Team logo"
                height={20}
                width={20}
            />
            <p className="text-black">{name}</p>
        </div>
    )
}

//  {/* <div className="flex flex-col items-center">
//                             <time className="block text-sm font-bold" dateTime={match.time}>
//                                 {match.time}
//                             </time>
//                             <Badge variant={"default"}>BO{match.bestOf}</Badge>
//                         </div> */}