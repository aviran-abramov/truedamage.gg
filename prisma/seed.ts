import { auth } from "@/lib/auth";
import { games } from "@/lib/data/seed/games";
import { matches } from "@/lib/data/seed/matches";
import { teams } from "@/lib/data/seed/teams";
import prisma from "@/lib/db";
import { createIdWithNumbers } from "@/lib/helpers";

async function seedUserTable() {
    try {
        await auth.api.signUpEmail({
            body: {
                name: "johndoe",
                email: "johndoe@gmail.com",
                password: "123123123",
                role: "ADMIN"
            }
        });

        const user = await prisma.user.findFirst({
            where: { email: "johndoe@gmail.com" }
        });

        if (!user) throw new Error("Could not get the user seeded to the db.")

        await prisma.user.update({
            where: { email: user.email },
            data: { role: "ADMIN" }
        })

        console.log("Seed user table - success");
    } catch (error) {
        console.log(error);
    }
}

async function seedGameTable() {
    try {
        for (const game of games) {
            await prisma.game.create({
                data: {
                    id: createIdWithNumbers(game.name),
                    name: game.name,
                    shortName: game.shortName || game.name,
                    slug: game.slug,
                    iconUrl: game.iconUrl
                }
            });
        }

        console.log("Seed game table - success");
    } catch (error) {
        console.log(error);
    }
}

async function seedTeamTable() {
    try {
        for (const team of teams) {
            const game = await prisma.game.findUnique({
                where: {
                    name: team.game
                }
            });

            if (!game) {
                throw new Error(`SEED: Create Teams - Game not found for team: ${team.name}`);
            }

            await prisma.team.create({
                data: {
                    name: team.name,
                    slug: team.slug,
                    countryCode: team.countryCode,
                    countryName: team.countryName,
                    gameId: game.id
                }
            });
        }

        console.log("Seed team table - success");
    } catch (error) {
        console.log(error);
    }
}

async function seedMatchTable() {
    try {
        for (const match of matches) {
            const game = await prisma.game.findUnique({
                where: {
                    name: match.game
                }
            });

            if (!game) {
                throw new Error(`SEED: Create Matches - Game not found for match: ${match.game}`);
            }

            const teamA = await prisma.team.findFirst({
                where: {
                    name: match.teamAName
                }
            });

            if (!teamA) {
                throw new Error(`SEED: Create matches - Team A not found for match: ${match.game}`)
            }

            const teamB = await prisma.team.findFirst({
                where: {
                    name: match.teamBName
                }
            });

            if (!teamB) {
                throw new Error(`SEED: Create matches - Team B not found for match: ${match.game}`)
            }

            await prisma.match.create({
                data: {
                    date: match.date,
                    time: match.time,
                    tournament: match.tournament,
                    teamAId: teamA.id,
                    teamBId: teamB.id,
                    gameId: game.id,
                    bestOf: match.bestOf,
                    winnerPrediction: match.winnerPrediction
                }
            });
        }

        console.log("Seed match table - success");
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    try {
        await seedUserTable();
        await seedGameTable();
        await seedTeamTable();
        await seedMatchTable();

        console.log('Seed data has been inserted successfully!');
    } catch (error) {
        console.error(`ERROR: Could not create seed. ${error}`);
        throw new Error("ERROR: Could not create seed. ${error}");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });