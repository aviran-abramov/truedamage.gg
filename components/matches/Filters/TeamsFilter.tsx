"use client";

import { Prisma, Team } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { TeamsWithGamesRelation } from "@/lib/types/teams";


interface TeamsFilterProps {
    teams: TeamsWithGamesRelation[];
}

export const TeamsFilter = ({ teams }: TeamsFilterProps) => {
    const [visibleTeams, setVisibleTeams] = useState(teams.slice(0, 6));
    const [searchFilterOptions, setSearchFilterOptions] = useState(teams.slice(6));

    const handleSearchByFilterPick = (id: string) => {
        const team = teams.find(t => t.id === id);
        const optionsWithoutPick = searchFilterOptions.filter(t => t.id !== id)

        if (team) {
            setVisibleTeams(prevState => [...prevState, team]);
            setSearchFilterOptions(optionsWithoutPick);
        }
    }

    const handleVisibleTeamClick = (id: string) => {
        const selectedTeam = teams.find(team => team.id === id);

        if (selectedTeam) {
            setVisibleTeams(prevState => prevState.filter(t => t.id !== id));
            setSearchFilterOptions(prevState => [...prevState, selectedTeam]);
        }
    };

    return (
        <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921] space-y-3 flex flex-col w-full">
            <FilterTitle>Teams</FilterTitle>

            <VisibleTeamsList teams={visibleTeams} onTeamClick={handleVisibleTeamClick} />

            <SearchByTeamFilter availableTeams={searchFilterOptions} onSearchByFilterPick={handleSearchByFilterPick} />
        </div>
    )
}

interface VisibleTeamsListProps {
    teams: Team[];
    onTeamClick: (id: string) => void;
}

const VisibleTeamsList = ({ teams, onTeamClick }: VisibleTeamsListProps) => {

    return (
        <ul className="flex items-center flex-wrap gap-2">
            {teams.map((team) => (
                <li key={team.id}>
                    <Button variant={"outline"} onClick={() => onTeamClick(team.id)} className="cursor-pointer rounded-sm">
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
    )
}

interface SearchByTeamFilterProps {
    availableTeams: TeamsWithGamesRelation[];
    onSearchByFilterPick: (id: string) => void;
}

const SearchByTeamFilter = ({ availableTeams, onSearchByFilterPick }: SearchByTeamFilterProps) => {

    return (
        <Combobox items={availableTeams}>
            <ComboboxInput placeholder="Search for Teams" />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(team: Team) => (
                        <ComboboxItem key={team.id} value={team.name} onClick={() => onSearchByFilterPick(team.id)} >
                            <div className="flex items-center justify-between">
                                <p>{team.name}</p>
                            </div>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}