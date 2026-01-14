import prisma from "@/lib/db";

async function main() {
    const matches = [
        {
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

    const teams = [
        {
            name: "BIG Academy",
            slug: "big-academy",
            country: "Germany",

            game: "League of Legends",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: "BRION Challengers",
            slug: "brion-challengers",
            country: "South Korea",
            game: "League of Legends",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: "T1 Esports Academy",
            slug: "t1-esports-academy",
            country: "South Korea",
            game: "League of Legends",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: "BNK FEARX Youth",
            slug: "bnk-fearx-youth",
            country: "South Korea",
            game: "League of Legends",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: "All for One Gaming",
            slug: "all-for-one-gaming",
            country: "Germany",
            game: "League of Legends",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: "Second Time Alive",
            slug: "second-time-alive",
            country: "Germany",
            game: "League of Legends",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ]

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

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });