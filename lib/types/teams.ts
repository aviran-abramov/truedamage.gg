import { Prisma } from "../generated/prisma/client";

export type TeamWithGame = Prisma.TeamGetPayload<{
    include: {
        game: true
    }
}>;