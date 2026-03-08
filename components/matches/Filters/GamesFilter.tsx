"use client";

import { Game } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { FilterSubTitle } from "./FilterSubTitle";

interface GamesFilterProps {
  games: Game[];
}

export const GamesFilter = ({ games }: GamesFilterProps) => {
  const [selectedGames, setSelectedGames] = useState(games);
  const [unSelectedGames, setUnselectedGames] = useState<Game[]>([]);

  const handleGameRemovalClick = (gameId: string) => {
    const clickedGame = selectedGames.find((game) => game.id === gameId);
    if (clickedGame) {
      setSelectedGames((prevState) => prevState.filter((g) => g.id !== gameId));
      setUnselectedGames((prevState) => [...prevState, clickedGame]);
    }
  };

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
                  onClick={() => handleGameRemovalClick(game.id)}
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
                  onClick={() => handleGameRemovalClick(game.id)}
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
    </div>
  );
};
