import prisma from "@/lib/db";

async function main() {
    const matches = [
        {
            id: "1",
            matchDate: "2026-01-12",
            matchTime: "11:00",
            game: "League of Legends",
            league: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
            teamA: "BIG Academy",
            teamB: "BRION Challengers",
            bestOf: 3,
            winnerPrediction: "BRION Challengers",
        },
        {
            id: "2",
            matchDate: "2026-01-13",
            matchTime: "14:00",
            game: "League of Legends",
            league: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
            teamA: "BNK FEARX Youth",
            teamB: "T1 Esports Academy",
            bestOf: 3,
            winnerPrediction: "T1 Esports Academy",
        },
        {
            id: "3",
            matchDate: "2026-01-14",
            matchTime: "16:00",
            game: "League of Legends",
            league: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
            teamA: "All for One Gaming",
            teamB: "Second Time Alive",
            bestOf: 5,
            winnerPrediction: "All for One Gaming",
        }
    ];

    for (const match of matches) {
        await prisma.match.create({
            data: match
        });
    }

    console.log('Seed data has been inserted successfully!');

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });