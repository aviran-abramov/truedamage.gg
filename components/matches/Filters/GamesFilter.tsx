"use client";

import { Game } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { FilterSubTitle } from "./FilterSubTitle";
import { FilterListItem } from "./FilterListItem";

interface GamesFilterProps {
  games: Game[];
  selectedGames: Game[];
  unSelectedGames: Game[];
  onGameRemovalClick: (gameId: string) => void;
  onGameAddClick: (gameId: string) => void;
}

export const GamesFilter = ({
  games = [],
  selectedGames,
  unSelectedGames,
  onGameRemovalClick,
  onGameAddClick,
}: GamesFilterProps) => {
  return (
    <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921]">
      <FilterTitle>Games</FilterTitle>
      {selectedGames.length > 0 && (
        <>
          <FilterSubTitle>Included</FilterSubTitle>
          <ul className="flex items-center flex-wrap gap-2">
            {selectedGames.map((game) => (
              <FilterListItem
                key={game.id}
                id={game.id}
                type={"X"}
                itemLabel={game.shortName}
                itemName={game.name}
                iconUrl={game.iconUrl ?? undefined}
                onClick={onGameRemovalClick}
              />
            ))}
          </ul>
        </>
      )}

      {unSelectedGames.length > 0 && (
        <>
          <FilterSubTitle>Not Included</FilterSubTitle>
          <ul className="flex items-center flex-wrap gap-2">
            {unSelectedGames.map((game) => (
              <FilterListItem
                key={game.id}
                id={game.id}
                type={"+"}
                itemLabel={game.shortName}
                itemName={game.name}
                iconUrl={game.iconUrl ?? undefined}
                onClick={onGameAddClick}
              />
            ))}
          </ul>
        </>
      )}

      {games.length === 0 && (
        <p className="text-muted-foreground">No games found yet.</p>
      )}
    </div>
  );
};
