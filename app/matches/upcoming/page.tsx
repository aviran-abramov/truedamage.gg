"use server";

import { AppContainer } from "@/components/layout/AppContainer";
import { UpcomingMatchesFilters } from "@/components/matches/Filters/UpcomingMatchesFilters";
import { MatchPreviewList } from "@/components/matches/upcoming/MatchPreviewList";
import { PageBanner } from "@/components/PageBanner";
import { PageTitle } from "@/components/PageTitle";
import { getMatches, MatchWithRelations } from "@/lib/actions/matches";
import { Game } from "@/lib/generated/prisma/client";
import { TeamWithGame } from "@/lib/types/teams";

function extractGames(matches: MatchWithRelations[]) {
  const games: Game[] = [];

  for (const match of matches) {
    const game = match.game;
    const isGameAlreadyExists = games.find((game) => game.id === match.game.id);

    if (!isGameAlreadyExists) {
      games.push(game);
    }
  }

  return games;
}

function extractTeams(matches: MatchWithRelations[]) {
  const teams: TeamWithGame[] = [];

  for (const match of matches) {
    const teamA: TeamWithGame = { ...match.teamA, game: match.game };
    const teamB: TeamWithGame = { ...match.teamB, game: match.game };

    if (!teams.find((team) => team.id === teamA.id)) {
      teams.push(teamA);
    }
    if (!teams.find((team) => team.id === teamB.id)) {
      teams.push(teamB);
    }
  }

  return teams;
}

export default async function UpcomingMatchesPage() {
  const matchesResult = await getMatches();
  if (!matchesResult.success) {
    return <p>Failed to get matches</p>;
  }

  const matches = matchesResult.data;
  const games = extractGames(matches);
  const teams = extractTeams(matches);

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
  );
}
