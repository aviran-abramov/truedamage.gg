"use server";

import prisma from "../db";
import { Prisma } from "../generated/prisma/client";
import { redirect } from "next/navigation";

type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; errorMessage: string };

export async function createMatch(formData: FormData) {
    try {
        const rawFormData = {
            matchDate: formData.get('matchDate') as string,
            matchTime: formData.get('matchTime') as string,
            game: formData.get('game') as string,
            league: formData.get('league') as string,
            bestOf: Number(formData.get('bestOf')),
            teamAName: formData.get('teamAName') as string,
            teamBName: formData.get('teamBName') as string,
            winnerPrediction: formData.get("winnerPrediction") as string
        }

        const game = await prisma.game.findFirst({
            where: {
                name: rawFormData.game
            }
        });
        if (!game) throw new Error("Game not found")

        const teamA = await prisma.team.findFirst({
            where: {
                name: rawFormData.teamAName
            }
        });
        if (!teamA) throw new Error("Team A not found")

        const teamB = await prisma.team.findFirst({
            where: {
                name: rawFormData.teamBName
            }
        });
        if (!teamB) throw new Error("Team B not found")

        await prisma.match.create({
            data: {
                matchDate: rawFormData.matchDate,
                matchTime: rawFormData.matchTime,
                gameId: game.id,
                league: rawFormData.league,
                bestOf: rawFormData.bestOf,
                teamAId: teamA.id,
                teamBId: teamB.id,
                winnerPrediction: rawFormData.winnerPrediction
            }
        })
    } catch (error) {
        console.error(`createMatch failed:`, error);
        return;
    }

    redirect('/matches/upcoming');
}

export type MatchWithRelations = Prisma.MatchGetPayload<{
    include: {
        game: true,
        teamA: true,
        teamB: true
    }
}>;

export async function getMatchesWithForecasts(): Promise<ActionResult<MatchWithRelations[]>> {
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
                matchDate: "desc",
            }
        });

        return {
            success: true,
            data: forecasts
        }
    } catch (error) {
        console.error("getMatchesWithForecasts failed:", error);
        return {
            success: false,
            errorMessage: error instanceof Error ? error.message : "Failed to fetch matches with forecasts."
        }
    }
}