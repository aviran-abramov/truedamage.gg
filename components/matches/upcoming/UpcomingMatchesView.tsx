"use client";

import { MatchWithRelations } from "@/lib/actions/matches";
import { Game } from "@/lib/generated/prisma/client";
import { TeamWithGame } from "@/lib/types/teams";
import { MatchPreviewList } from "./MatchPreviewList";
import { UpcomingMatchesFilters } from "../Filters/UpcomingMatchesFilters";
import { useState } from "react";

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
  const [selectedGames, setSelectedGames] = useState(games);
  const [unSelectedGames, setUnselectedGames] = useState<Game[]>([]);

  const handleGameRemovalClick = (gameId: string) => {
    const clickedGame = selectedGames.find((game) => game.id === gameId);
    if (clickedGame) {
      setSelectedGames((prevState) => prevState.filter((g) => g.id !== gameId));
      setUnselectedGames((prevState) => [...prevState, clickedGame]);
    }
  };

  const handleGameAddClick = (gameId: string) => {
    const clickedGame = unSelectedGames.find((game) => game.id === gameId);
    if (clickedGame) {
      setSelectedGames((prevState) => [...prevState, clickedGame]);
      setUnselectedGames((prevState) =>
        prevState.filter((g) => g.id !== gameId)
      );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <MatchPreviewList matches={matches} />
      <UpcomingMatchesFilters
        games={games}
        selectedGames={selectedGames}
        unSelectedGames={unSelectedGames}
        teams={teams}
        onGameRemovalClick={handleGameRemovalClick}
        onGameAddClick={handleGameAddClick}
      />
    </div>
  );
}
