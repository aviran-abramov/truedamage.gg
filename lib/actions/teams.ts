"use server";

import { success } from "zod";
import prisma from "../db";
import { CreateTeamSchema } from "../schemas/team";

const generateFiveNumbers = () => Math.floor(10000 + Math.random() * 90000);

const createTeamSlug = (name: string) => {
    const nameInLowerCaseWithHyphens = name
        .toLocaleLowerCase()
        .split(" ")
        .join("-");
    const numbers = generateFiveNumbers();
    const slug = `${numbers}-${nameInLowerCaseWithHyphens}`;

    return slug;
};

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
        const slug = createTeamSlug(name);
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