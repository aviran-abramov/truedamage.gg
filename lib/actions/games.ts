"use server";

import prisma from "../db";
import { CreateGameSchema } from "../schemas/game";
import { createId, createSlug } from "../helpers";

export async function createGame(newGame: unknown) {
    try {
        const result = CreateGameSchema.safeParse(newGame);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue) => {
                errorMessage += `${issue.path}: ${issue.message}.`
            })

            return {
                error: errorMessage
            };
        }

        const { name, shortName } = result.data;
        const slug = createSlug(name);
        const iconUrl = `/icons/games/${slug}.svg`;
        const id = createId(name);

        await prisma.game.create({
            data: {
                id,
                name,
                shortName: shortName || name,
                slug,
                iconUrl
            }
        });
    } catch (error) {
        console.log("Error creating game", error);
        return {
            error: "Failed to create game."
        };
    }

    return {
        success: true
    };
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