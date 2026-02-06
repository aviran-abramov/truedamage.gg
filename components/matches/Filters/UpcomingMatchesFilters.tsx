import { Game, Prisma, Team } from "@/lib/generated/prisma/client";
import { GamesFilter } from "./GamesFilter";
import { TeamsFilter } from "./TeamsFilter";
import { TournamentsFilter } from "./TournamentsFilter";

type TeamsWithGameRelation = Prisma.TeamGetPayload<{
    include: {
        game: true
    }
}>;

interface UpcomingMatchesFiltersProps {
    games: Game[];
    teams: TeamsWithGameRelation[];
}

export const UpcomingMatchesFilters = ({ games, teams }: UpcomingMatchesFiltersProps) => {

    return (
        <aside className="col-span-4 space-y-6">
            <GamesFilter games={games} />

            <TeamsFilter teams={teams} />

            <TournamentsFilter />
        </aside>
    )
}