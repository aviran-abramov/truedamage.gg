"use server";

import prisma from "../db";
import { Prisma } from "../generated/prisma/browser";
import { createErrorMessage } from "../helpers/zod";
import { ActionResult, ActionResultWithData } from "../types/actions";
import { MatchSchema } from "../validators/match";

export type MatchWithRelations = Prisma.MatchGetPayload<{
    include: {
        game: true,
        teamA: true,
        teamB: true
    }
}>;

export async function createMatch(data: unknown): Promise<ActionResult> {
    try {
        const result = MatchSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                error: createErrorMessage(result.error.issues)
            };
        }

        const { date, time, tournament, gameName, bestOf, teamAName, teamBName, winnerPrediction } = result.data;

        const game = await prisma.game.findFirst({ where: { name: gameName } });
        if (!game) throw new Error("Game not found.");

        const teamA = await prisma.team.findFirst({ where: { name: teamAName } });
        if (!teamA) throw new Error("Team A not found.");

        const teamB = await prisma.team.findFirst({ where: { name: teamBName } });
        if (!teamB) throw new Error("Team B not found.");

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
        });

        return {
            success: true
        };
    } catch (error) {
        console.error(`createMatch failed:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create match."
        };
    }
}

export async function getMatches(): Promise<ActionResultWithData<MatchWithRelations[]>> {
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

        return {
            success: true,
            data: matches
        }
    } catch (error) {
        console.error("getMatches failed:", error);
        return {
            success: false,
            error: "Failed to get matches."
        }
    }
}

export async function getMatchesWithPredictions(): Promise<ActionResultWithData<MatchWithRelations[]>> {
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
            error: "Failed to fetch matches with predictions."
        }
    }
}