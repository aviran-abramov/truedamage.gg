"use client";

import { Game } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FilterSubTitle } from "./FilterSubTitle";

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
              <li key={game.id}>
                <Button
                  variant={"outline"}
                  className="cursor-pointer rounded-sm"
                  onClick={() => onGameRemovalClick(game.id)}
                >
                  <span>✕</span>
                  <Image
                    className="dark:invert"
                    src={game.iconUrl || "/icons/x.png"}
                    alt={`${game.name} logo`}
                    height={20}
                    width={20}
                  />
                  <span>{game.shortName}</span>
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {unSelectedGames.length > 0 && (
        <>
          <FilterSubTitle>Not Included</FilterSubTitle>
          <ul className="flex items-center flex-wrap gap-2">
            {unSelectedGames.map((game) => (
              <li key={game.id}>
                <Button
                  variant={"outline"}
                  className="cursor-pointer rounded-sm"
                  onClick={() => onGameAddClick(game.id)}
                >
                  <span className="dark:invert">➕</span>
                  <Image
                    className="dark:invert"
                    src={game.iconUrl || "/icons/x.png"}
                    alt={`${game.name} logo`}
                    height={20}
                    width={20}
                  />
                  <span>{game.shortName}</span>
                </Button>
              </li>
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

type ButtonType = "X" | "+";

interface FilterListItemProps {
  id: string;
  type: ButtonType;
  itemLabel: string;
  itemName: string;
  url?: string;
  onClick: (itemId: string) => void;
}

function FilterListItem({
  id,
  type,
  itemLabel,
  itemName,
  url,
  onClick,
}: FilterListItemProps) {
  return (
    <li>
      <Button
        variant={"outline"}
        className="cursor-pointer rounded-sm"
        onClick={() => onClick(id)}
      >
        <span className="dark:invert">{type === "+" ? "➕" : "✕"}</span>
        <Image
          className="dark:invert"
          src={url || "/icons/x.png"}
          alt={`${itemName} logo`}
          height={20}
          width={20}
        />
        <span>{itemLabel}</span>
      </Button>
    </li>
  );
}
