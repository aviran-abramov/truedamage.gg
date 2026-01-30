"use server";

import prisma from "../db";
import { Prisma } from "../generated/prisma/client";
import { redirect } from "next/navigation";
import { CreateMatchSchema } from "../schemas/match";

type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; errorMessage: string };

export async function createMatch(newMatch: unknown) {
    try {
        const result = CreateMatchSchema.safeParse(newMatch);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue) => {
                errorMessage += `${issue.path}: ${issue.message}`
            });

            return {
                error: errorMessage
            };
        }

        const { date, time, league, gameName, bestOf, teamAName, teamBName, winnerPrediction } = result.data;

        const game = await prisma.game.findFirst({
            where: {
                name: gameName
            }
        });
        if (!game) throw new Error("Game not found")

        const teamA = await prisma.team.findFirst({
            where: {
                name: teamAName
            }
        });
        if (!teamA) throw new Error("Team A not found")

        const teamB = await prisma.team.findFirst({
            where: {
                name: teamBName
            }
        });
        if (!teamB) throw new Error("Team B not found")

        await prisma.match.create({
            data: {
                date,
                time,
                gameId: game.id,
                league,
                bestOf,
                teamAId: teamA.id,
                teamBId: teamB.id,
                winnerPrediction
            }
        })
    } catch (error) {
        console.error(`createMatch failed:`, error);
        return;
    }

    return {
        success: true
    };
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