"use server";

import prisma from "../db";
import { Team } from "../generated/prisma/browser";
import { createIdWithNumbers } from "../helpers";
import { createErrorMessage } from "../helpers/zod";
import { ActionResult, ActionResultWithData } from "../types/actions";
import { TeamWithGame } from "../types/teams";
import { TeamSchema } from "../validators/team";

export async function createTeam(data: unknown): Promise<ActionResult> {
    try {
        const result = TeamSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                error: createErrorMessage(result.error.issues)
            }
        }

        const { name, gameName, countryName, countryCode } = result.data;
        const slug = createIdWithNumbers(name);
        const game = await prisma.game.findFirstOrThrow({
            where: { name: gameName }
        })


        await prisma.team.create({
            data: {
                gameId: game.id,
                name,
                slug,
                countryName,
                countryCode
            }
        });

        return {
            success: true
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "Failed to create team."
        }
    }
}

export async function getAllTeams(): Promise<ActionResultWithData<Team[]>> {
    try {
        const teams = await prisma.team.findMany();

        return {
            success: true,
            data: teams
        }
    } catch (error) {
        console.error("Error: Could not retrieve all available teams", error);
        return {
            success: false,
            error: "Failed to get all teams."
        }
    }
}

export async function getAllTeamsWithGames(): Promise<ActionResultWithData<TeamWithGame[]>> {
    try {
        const teams = await prisma.team.findMany({
            include: {
                game: true
            }
        });

        return {
            success: true,
            data: teams
        }
    } catch (error) {
        console.error("Error: Could not retrieve all available teams", error);
        return {
            success: false,
            error: "Failed to get all team with games."
        }
    }
}