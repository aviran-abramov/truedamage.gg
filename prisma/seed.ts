import { games } from "@/lib/data/games";
import { matches } from "@/lib/data/matches";
import { teams } from "@/lib/data/teams";
import prisma from "@/lib/db";

async function main() {
    try {
        for (const game of games) {
            await prisma.game.create({
                data: game
            });
        }

        for (const team of teams) {
            await prisma.team.create({
                data: team
            });
        }

        for (const match of matches) {
            await prisma.match.create({
                data: match
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