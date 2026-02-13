"use server";

import prisma from "../db";
import { Prisma } from "../generated/prisma/client";
import { MatchSchema } from "../validators/match";

type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; errorMessage: string };

export async function createMatch(data: unknown) {
    try {
        const result = MatchSchema.safeParse(data);
        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue) => {
                errorMessage += `${issue.path}: ${issue.message}`
            });

            return {
                error: errorMessage
            };
        }

        const { date, time, tournament, gameName, bestOf, teamAName, teamBName, winnerPrediction } = result.data;

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
                tournament,
                bestOf,
                teamAId: teamA.id,
                teamBId: teamB.id,
                winnerPrediction
            }
        })
    } catch (error) {
        console.error(`createMatch failed:`, error);
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

export async function getMatches() {
    try {
        const matches = await prisma.match.findMany({
            include: {
                game: true,
                teamA: true,
                teamB: true
            },
            orderBy: {
                date: "desc"
            }
        });

        return matches
    } catch (error) {
        console.error("getMatches failed:", error);
        return [];
    }
}

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