"use client";

import { Team } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";

interface TeamsFilterProps {
    teams: Team[];
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

    return (
        <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921] space-y-3 flex flex-col w-full">
            <FilterTitle>Teams</FilterTitle>

            <VisibleTeamsList teams={visibleTeams} />

            <SearchByTeamFilter availableTeams={searchFilterOptions} onSearchByFilterPick={handleSearchByFilterPick} />
        </div>
    )
}

interface VisibleTeamsListProps {
    teams: Team[];
}

const VisibleTeamsList = ({ teams }: VisibleTeamsListProps) => {

    return (
        <ul className="flex items-center flex-wrap gap-2">
            {teams.map((team) => (
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
    )
}

interface SearchByTeamFilterProps {
    availableTeams: Team[];
    onSearchByFilterPick: (id: string) => void
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

        // TODO: Make it look like this input group
        // <InputGroup className="max-w-xs rounded-sm">
        //     <InputGroupInput placeholder="Search for teams" className="w-full" />
        //     <InputGroupAddon>
        //         <Search />
        //     </InputGroupAddon>
        //     <InputGroupAddon align="inline-end">{teams.length} results</InputGroupAddon>
        // </InputGroup>
    )
}