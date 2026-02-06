import { Prisma } from "../generated/prisma/client";

export type TeamsWithGamesRelation = Prisma.TeamGetPayload<{
    include: {
        game: true
    }
}>;