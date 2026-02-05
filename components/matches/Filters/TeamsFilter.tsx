import { Team } from "@/lib/generated/prisma/client";
import { FilterTitle } from "./FilterTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface TeamsFilterProps {
    teams: Team[];
}

export const TeamsFilter = ({ teams }: TeamsFilterProps) => {

    return (
        <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921]">
            <FilterTitle>Teams</FilterTitle>
            <ul className="flex items-center flex-wrap gap-2">
                {teams.slice(0, 6).map((team) => (
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
        </div>
    )
}