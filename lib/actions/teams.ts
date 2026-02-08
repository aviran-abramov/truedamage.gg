"use server";

import prisma from "../db";
import { createIdWithNumbers } from "../helpers";
import { CreateTeamSchema } from "../validators/team";

export async function createTeam(newTeam: unknown) {
    try {
        const result = CreateTeamSchema.safeParse(newTeam);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue) => {
                errorMessage += `${issue.path}: ${issue.message}`
            });

            return {
                error: errorMessage
            }
        }

        const { name, gameName, countryName, countryCode } = result.data;
        const slug = createIdWithNumbers(name);
        const game = await prisma.game.findFirst({
            where: {
                name: gameName
            }
        })

        if (!game) throw new Error("Game not found");

        await prisma.team.create({
            data: {
                gameId: game.id,
                name,
                slug,
                countryName,
                countryCode
            }
        })
    } catch (error) {
        console.log(error);
    }

    return {
        success: true
    };
}

export async function getAllTeams() {
    try {
        console.log("Attempting to get all teams");

        const teams = await prisma.team.findMany();
        if (!teams) throw new Error("Could not retrieve all available teams");

        console.log("Success!");
        return teams;
    } catch (error) {
        console.error("Error: Could not retrieve all available teams", error);
    }
}

export async function getAllTeamsWithGames() {
    try {
        console.log("Attempting to get all teams");

        const teams = await prisma.team.findMany({
            include: {
                game: true
            }
        });

        if (!teams) throw new Error("Could not retrieve all available teams");

        console.log("Success!");
        return teams;
    } catch (error) {
        console.error("Error: Could not retrieve all available teams", error);
    }
}