"use server";

import prisma from "../db";
import { Prisma } from "../generated/prisma/client";

export type MatchWithRelations = Prisma.MatchGetPayload<{
    include: {
        game: true,
        teamA: true,
        teamB: true
    }
}>;

type GetMatchesWithForecastsResult =
    | { success: true; data: MatchWithRelations[] }
    | { success: false, errorMessage: string };

export async function getMatchesWithForecasts(): Promise<GetMatchesWithForecastsResult> {
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
        console.error("ACTIONS: matches.ts - getMatchesWithForecasts function - Failed to get matches with forecasts.", error);
        return {
            success: false,
            errorMessage: "Failed to fetch matches with forecasts"
        }
    }
}