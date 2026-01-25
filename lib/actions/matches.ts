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
            date: formData.get('date') as string,
            time: formData.get('time') as string,
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
                date: rawFormData.date,
                time: rawFormData.time,
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

    redirect('/matches/predictions/upcoming');
}

export type MatchWithRelations = Prisma.MatchGetPayload<{
    include: {
        game: true,
        teamA: true,
        teamB: true
    }
}>;

export async function getMatchesWithPredictions(): Promise<ActionResult<MatchWithRelations[]>> {
    try {
        const predictions = await prisma.match.findMany({
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
                date: "desc",
            }
        });

        return {
            success: true,
            data: predictions
        }
    } catch (error) {
        console.error("getMatchesWithPredictions failed:", error);
        return {
            success: false,
            errorMessage: error instanceof Error ? error.message : "Failed to fetch matches with predictions."
        }
    }
}