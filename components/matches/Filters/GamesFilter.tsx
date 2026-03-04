"use client";

import { Game } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface GamesFilterProps {
  games: Game[];
}

export const GamesFilter = ({ games }: GamesFilterProps) => {
  const [selectedGames, setSelectedGames] = useState(games);

  const handleGameRemovalClick = (gameId: string) => {
    setSelectedGames((prevState) => prevState.filter((g) => g.id !== gameId));
  };

  return (
    <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921]">
      <FilterTitle>Games</FilterTitle>
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
    </div>
  );
};
