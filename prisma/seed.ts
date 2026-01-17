import { games } from "@/lib/data/seed/games";
import { matches } from "@/lib/data/seed/matches";
import { teams } from "@/lib/data/seed/teams";
import prisma from "@/lib/db";

async function main() {
    try {
        for (const game of games) {
            await prisma.game.create({
                data: {
                    name: game.name,
                    slug: game.slug,
                    iconUrl: game.iconUrl
                }
            });
        }

        for (const team of teams) {
            const game = await prisma.game.findUnique({
                where: {
                    name: team.game
                }
            });

            if (!game) {
                throw new Error(`Game not found for team: ${team.name}`);
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

        for (const match of matches) {
            const game = await prisma.game.findUnique({
                where: {
                    name: match.game
                }
            });

            if (!game) {
                throw new Error(`Game not found for match: ${match.game}`);
            }

            await prisma.match.create({
                data: {
                    matchDate: match.matchDate,
                    matchTime: match.matchTime,
                    league: match.league,
                    teamA: match.teamA,
                    teamB: match.teamB,
                    gameId: game.id,
                    bestOf: match.bestOf,
                    winnerPrediction: match.winnerPrediction
                }
            });
        }

        console.log('Seed data has been inserted successfully!');
    } catch (error) {
        console.log(`ERROR: Could not create seed. ${error}`);
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