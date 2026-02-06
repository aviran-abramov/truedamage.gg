"use client";

import { Game, Prisma, Team } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList } from "@/components/ui/combobox";
import { TeamsWithGamesRelation } from "@/lib/types/teams";
import { InputGroupAddon } from "@/components/ui/input-group";
import { Search } from "lucide-react";


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

const timezones = [
    {
        value: "Americas",
        items: [
            "(GMT-5) New York",
            "(GMT-8) Los Angeles",
            "(GMT-6) Chicago",
            "(GMT-5) Toronto",
            "(GMT-8) Vancouver",
            "(GMT-3) São Paulo",
        ],
    },
    {
        value: "Europe",
        items: [
            "(GMT+0) London",
            "(GMT+1) Paris",
            "(GMT+1) Berlin",
            "(GMT+1) Rome",
            "(GMT+1) Madrid",
            "(GMT+1) Amsterdam",
        ],
    },
    {
        value: "Asia/Pacific",
        items: [
            "(GMT+9) Tokyo",
            "(GMT+8) Shanghai",
            "(GMT+8) Singapore",
            "(GMT+4) Dubai",
            "(GMT+11) Sydney",
            "(GMT+9) Seoul",
        ],
    },
] as const

interface SearchByTeamFilterProps {
    availableTeams: TeamsWithGamesRelation[];
    onSearchByFilterPick: (id: string) => void;
}

interface ComboBoxData {
    value: string;
    items: string[];
}

const SearchByTeamFilter = ({ availableTeams, onSearchByFilterPick }: SearchByTeamFilterProps) => {
    const comboBoxTeamsData: ComboBoxData[] = [];

    for (const team of availableTeams) {
        const gameName = team.game.name;

        if (!comboBoxTeamsData.some(i => i.value === gameName)) {
            comboBoxTeamsData.push({
                value: gameName,
                items: [team.name]
            })
        }

    }

    return (
        <Combobox items={comboBoxTeamsData}>
            <ComboboxInput placeholder="Search for Teams">
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </ComboboxInput>
            <ComboboxContent alignOffset={-28} className="w-60">
                <ComboboxEmpty>No teams found.</ComboboxEmpty>
                <ComboboxList>
                    {(group) => (
                        <ComboboxGroup key={group.value} items={group.items}>
                            <ComboboxLabel>{group.value}</ComboboxLabel>
                            <ComboboxCollection>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxCollection>
                        </ComboboxGroup>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}