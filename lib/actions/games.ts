"use server";

import prisma from "../db";
import { GameSchema } from "../validators/game";
import { createIconUrl, createSlug } from "../helpers";

type CreateGameResult =
    | { success: true; }
    | { success: false; error: string }

export async function createGame(data: unknown): Promise<CreateGameResult> {
    try {
        const result = GameSchema.safeParse(data);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue) => {
                errorMessage += `${issue.path}: ${issue.message}.`
            })

            return {
                success: false,
                error: errorMessage
            };
        }

        const { name, shortName } = result.data;
        const slug = createSlug(name);
        const iconUrl = createIconUrl(slug);
        const id = createSlug(name);

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
            success: false,
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