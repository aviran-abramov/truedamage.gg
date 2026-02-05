import { Button } from "@/components/ui/button"
import { FilterTitle } from "./FilterTitle"
import Image from "next/image"

export const TournamentsFilter = () => {

    return (
        <div className="rounded-sm p-4 text-black dark:text-white text-sm bg-[#F1F1F5] dark:bg-[#191921]">
            <FilterTitle>Tournaments</FilterTitle>
            <ul className="flex items-center flex-wrap gap-2">
                <li>
                    <Button variant={"outline"} className="cursor-pointer rounded-sm">
                        <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                        LCK
                    </Button>
                </li>
                <li>
                    <Button variant={"outline"} className="cursor-pointer rounded-sm">
                        <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                        LPL
                    </Button>
                </li>
                <li>
                    <Button variant={"outline"} className="cursor-pointer rounded-sm">
                        <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                        IEM
                    </Button>
                </li>
                <li>
                    <Button variant={"outline"} className="cursor-pointer rounded-sm">
                        <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                        NCS
                    </Button>
                </li>
                <li>
                    <Button variant={"outline"} className="cursor-pointer rounded-sm">
                        <Image className="dark:invert" src={"/icons/x.png"} alt={`League name logo`} height={20} width={20} />
                        CCT EU
                    </Button>
                </li>
            </ul>
        </div>
    )
}