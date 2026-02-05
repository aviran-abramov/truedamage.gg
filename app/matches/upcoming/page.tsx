"use server";

import { AppContainer } from "@/components/layout/AppContainer";
import { UpcomingMatchesFilters } from "@/components/matches/Filters/UpcomingMatchesFilters";
import { MatchPreviewList } from "@/components/matches/upcoming/MatchPreviewList";
import { PageBanner } from "@/components/PageBanner";
import { PageTitle } from "@/components/PageTitle";
import { getMatches } from "@/lib/actions/matches";
import { getAllTeams } from "@/lib/actions/teams";
import { Game } from "@/lib/generated/prisma/client";

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
                    <UpcomingMatchesFilters games={games} teams={teams} />
                </div>
            </section>
        </AppContainer>
    )
}