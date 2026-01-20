"use server";

import prisma from "../db";

export async function getMatchesWithForecasts() {
    try {
        const forecasts = await prisma.match.findMany({
            where: {
                winnerPrediction: {
                    not: null
                },
            },
            include: {
                game: true,
                teamA: true,
                teamB: true
            },
            orderBy: {
                matchDate: 'asc',
            }
        });

        return {
            success: true,
            data: forecasts
        }
    } catch (error) {
        console.error("ACTIONS: matches.ts - getMatchesWithForecasts function - Failed to get all matches with forecasts", error);
        return {
            success: false,
            error: "Failed to fetch all available matches with forecasts"
        }
    }
}