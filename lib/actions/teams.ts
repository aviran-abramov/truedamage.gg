"use server";

import prisma from "../db";
import { Team } from "../generated/prisma/browser";
import { createIdWithNumbers } from "../helpers";
import { createErrorMessage } from "../helpers/zod";
import { ActionResult, ActionResultWithData } from "../types/actions";
import { TeamWithGame } from "../types/teams";
import { TeamSchema } from "../validators/team";

export async function createTeam(data: unknown): Promise<ActionResult> {
  const result = TeamSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  const { name, gameName, countryName, countryCode } = result.data;
  const slug = createIdWithNumbers(name);

  try {
    const game = await prisma.game.findFirst({ where: { name: gameName } });
    if (!game) throw new Error("Game not found");

    await prisma.team.create({
      data: {
        gameId: game.id,
        name,
        slug,
        countryName,
        countryCode,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create team.",
    };
  }
  return { success: true };
}

export async function getAllTeams(): Promise<ActionResultWithData<Team[]>> {
  try {
    const teams = await prisma.team.findMany();

    return {
      success: true,
      data: teams,
    };
  } catch (error) {
    console.error("Error: Could not retrieve all available teams", error);
    return {
      success: false,
      error: "Failed to get all teams.",
    };
  }
}

export async function getAllTeamsWithGames(): Promise<
  ActionResultWithData<TeamWithGame[]>
> {
  try {
    const teams = await prisma.team.findMany({
      include: {
        game: true,
      },
    });

    return {
      success: true,
      data: teams,
    };
  } catch (error) {
    console.error("Error: Could not retrieve all available teams", error);
    return {
      success: false,
      error: "Failed to get all team with games.",
    };
  }
}
