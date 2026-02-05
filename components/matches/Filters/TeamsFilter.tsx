"use client";

import { Team } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";

interface TeamsFilterProps {
    teams: Team[];
}

export const TeamsFilter = ({ teams }: TeamsFilterProps) => {
    const [visibleTeams, setVisibleTeams] = useState(teams.slice(0, 6));

    return (
        <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921] space-y-3 flex flex-col w-full">
            <FilterTitle>Teams</FilterTitle>

            <ul className="flex items-center flex-wrap gap-2">
                {visibleTeams.map((team) => (
                    <li key={team.id}>
                        <Button variant={"outline"} className="cursor-pointer rounded-sm">
                            <Image
                                className="dark:invert"
                                src={"/icons/x.png"}
                                alt={`${team.name} logo`}
                                height={20}
                                width={20}
                            />
                            <span>{team.name}</span>
                        </Button>
                    </li>
                ))}
            </ul>

            <InputGroup className="max-w-xs rounded-sm">
                <InputGroupInput placeholder="Search for teams" className="w-full" />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">{teams.length} results</InputGroupAddon>
            </InputGroup>
        </div>
    )
}