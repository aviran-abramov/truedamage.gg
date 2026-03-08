import { Game } from "@/lib/generated/prisma/client";
import { GamesFilter } from "./GamesFilter";
import { TeamsFilter } from "./TeamsFilter";
import { TournamentsFilter } from "./TournamentsFilter";
import { TeamWithGame } from "@/lib/types/teams";

interface UpcomingMatchesFiltersProps {
  games: Game[];
  selectedGames: Game[];
  unSelectedGames: Game[];
  teams: TeamWithGame[];
  onGameRemovalClick: (gameId: string) => void;
  onGameAddClick: (gameId: string) => void;
}

export const UpcomingMatchesFilters = ({
  games,
  teams,
  selectedGames,
  unSelectedGames,
  onGameRemovalClick,
  onGameAddClick,
}: UpcomingMatchesFiltersProps) => {
  return (
    <aside className="col-span-4 space-y-6">
      <GamesFilter
        games={games}
        selectedGames={selectedGames}
        unSelectedGames={unSelectedGames}
        onGameRemovalClick={onGameRemovalClick}
        onGameAddClick={onGameAddClick}
      />

      <TeamsFilter teams={teams} />

      <TournamentsFilter />
    </aside>
  );
};
