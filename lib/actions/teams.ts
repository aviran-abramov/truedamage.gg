"use server";

import prisma from "../db";

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

export async function CreateTeam(formData: FormData) {
    try {
        const gameName = formData.get("game") as string;
        const name = formData.get("name") as string;
        const countryName = formData.get("countryName") as string;
        const countryCode = formData.get("countryCode") as string;
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
}