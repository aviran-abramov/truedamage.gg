"use server";

import prisma from "../db";
import { createId } from "../helpers";
import { CreateTeamSchema } from "../schemas/team";

export async function CreateTeam(newTeam: unknown) {
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
        const slug = createId(name);
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