import prisma from "@/lib/db";
import { ListFilter } from "lucide-react";
import Image from "next/image";

export async function FilterByGame() {
    const games = await prisma.game.findMany();

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-bold text-muted-foreground">
                <ListFilter size={20} />
                <p>Filter by game:</p>
            </div>

            <ul className="flex items-center gap-2">
                {games.map((game) => (
                    <li key={game.id} className="cursor-pointer">
                        <div className="flex items-center justify-center rounded-full border border-muted-foreground w-8 h-8 transition duration-200 hover:bg-gray-700">
                            <Image className="dark:invert" src={`${game.iconUrl}`} alt={`${game.name} logo`} height={20} width={20} />
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}