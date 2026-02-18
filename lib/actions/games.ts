"use server";

import prisma from "../db";
import { GameSchema } from "../validators/game";
import { createIconUrl, createSlug } from "../helpers";
import { Game } from "../generated/prisma/browser";
import { ActionResult, ActionResultWithData } from "../types/actions";
import { createErrorMessage } from "../helpers/zod";

export async function createGame(data: unknown): Promise<ActionResult> {
    try {
        const result = GameSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                error: createErrorMessage(result.error.issues)
            }
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

        return {
            success: true
        };
    } catch (error) {
        console.log("Error creating game", error);
        return {
            success: false,
            error: "Failed to create game."
        };
    }
}

export async function getAllGames(): Promise<ActionResultWithData<Game[]>> {
    try {
        const games = await prisma.game.findMany();

        return {
            success: true,
            data: games
        };
    } catch (error) {
        console.error("Error: Could not retrieve all available games", error);
        return {
            success: false,
            error: "Failed to get all available games."
        };
    }
}