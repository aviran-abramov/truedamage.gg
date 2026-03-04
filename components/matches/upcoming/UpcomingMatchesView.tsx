"use client";

import { MatchWithRelations } from "@/lib/actions/matches";
import { Game } from "@/lib/generated/prisma/client";
import { TeamWithGame } from "@/lib/types/teams";
import { MatchPreviewList } from "./MatchPreviewList";
import { UpcomingMatchesFilters } from "../Filters/UpcomingMatchesFilters";

interface UpcomingMatchesViewProps {
  matches: MatchWithRelations[];
  games: Game[];
  teams: TeamWithGame[];
}

export function UpcomingMatchesView({
  matches,
  games,
  teams,
}: UpcomingMatchesViewProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <MatchPreviewList matches={matches} />
      <UpcomingMatchesFilters games={games} teams={teams} />
    </div>
  );
}
