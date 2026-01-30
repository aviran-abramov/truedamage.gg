import * as z from "zod";

export const CreateMatchSchema = z.object({
    date: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: "Date must be in format YYYY-MM-DD"
        }),
    time: z
        .string()
        .trim()
        .regex(/^\d{2}:\d{2}$/, {
            message: "Time must be in format HH:MM"
        }),
    league: z
        .string()
        .trim()
        .min(1, { message: "League name field is required." })
        .max(255, { message: "League name field must be 255 characters or less." }),
    game: z
        .string()
        .trim()
        .min(1, { message: "Game name field is required." })
        .max(100, { message: "Game name field must be 100 characters or less." }),
    bestOf: z
        .coerce.number()
        .int()
        .min(1, { message: "Best of field is required." })
        .max(9, { message: "Best of field must be between 1 and 9." }),
    teamAName: z
        .string()
        .trim()
        .min(1, { message: "Team A name field is required." })
        .max(255, { message: "Team A name field must be 255 characters or less." }),
    teamBName: z
        .string()
        .trim()
        .min(1, { message: "Team B name field is required." })
        .max(255, { message: "Team B name field must be 255 characters or less." }),
    winnerPrediction: z
        .string()
        .trim()
        .max(255, { message: "Winner prediction field must be 255 characters or less." })
})