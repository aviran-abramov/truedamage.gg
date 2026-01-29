"use server";

import { redirect } from "next/navigation";
import prisma from "../db";

const createGameSlug = (name: string) => {
    const nameInLowerCase = name.toLocaleLowerCase();
    const slug = nameInLowerCase.split(" ").join("-");

    return slug;
};

export async function createGame(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const slug = createGameSlug(name);
        const iconUrl = `/icons/games/${slug}.svg`;

        await prisma.game.create({
            data: {
                name,
                slug,
                iconUrl
            }
        })
    } catch (error) {
        console.log("Error creating game", error);
    }

    redirect("/");
}

export async function getAllGames() {
    try {
        console.log("Attempting to get all games");

        const games = await prisma.game.findMany();
        if (!games) throw new Error("Could not retrieve all available games");

        console.log("Success!");
        return games;
    } catch (error) {
        console.error("Error: Could not retrieve all available games", error);
    }
}