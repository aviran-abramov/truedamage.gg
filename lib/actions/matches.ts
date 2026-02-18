"use server";

import prisma from "../db";
import { Prisma } from "../generated/prisma/browser";
import { Match } from "../generated/prisma/client";
import { createErrorMessage } from "../helpers/zod";
import { ActionResult, ActionResultWithData } from "../types/actions";
import { MatchSchema } from "../validators/match";

export async function createMatch(data: unknown): Promise<ActionResult> {
    try {
        const result = MatchSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                error: createErrorMessage(result.error.issues)
            }
        }

        const { date, time, tournament, gameName, bestOf, teamAName, teamBName, winnerPrediction } = result.data;

        const game = await prisma.game.findFirstOrThrow({
            where: { name: gameName }
        });

        const teamA = await prisma.team.findFirstOrThrow({
            where: { name: teamAName }
        });

        const teamB = await prisma.team.findFirstOrThrow({
            where: { name: teamBName }
        });

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

        return {
            success: true
        }
    } catch (error) {
        console.error(`createMatch failed:`, error);
        return {
            success: false,
            error: "Failed to create match."
        }
    }
}

export async function getMatches(): Promise<ActionResultWithData<Match[]>> {
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

export type MatchWithRelations = Prisma.MatchGetPayload<{
    include: {
        game: true,
        teamA: true,
        teamB: true
    }
}>;

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