import * as z from "zod";

export const CreateMatchSchema = z.object({
    date: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            error: "Date must be in format YYYY-MM-DD"
        }),
    time: z
        .string()
        .trim()
        .regex(/^\d{2}:\d{2}$/, {
            error: "Time must be in format HH:MM"
        }),
    league: z
        .string()
        .trim()
        .min(1, { error: "League name field is required." })
        .max(255, { error: "League name field must be 255 characters or less." }),
    game: z
        .string()
        .trim()
        .min(1, { error: "Game name field is required." })
        .max(100, { error: "Game name field must be 100 characters or less." }),
    bestOf: z
        .coerce.number()
        .int()
        .min(1, { error: "Best of field is required." })
        .max(9, { error: "Best of field must be between 1 and 9." }),
    teamAName: z
        .string()
        .trim()
        .min(1, { error: "Team A name field is required." })
        .max(255, { error: "Team A name field must be 255 characters or less." }),
    teamBName: z
        .string()
        .trim()
        .min(1, { error: "Team B name field is required." })
        .max(255, { error: "Team B name field must be 255 characters or less." }),
    winnerPrediction: z
        .string()
        .trim()
        .max(255, { error: "Winner prediction field must be 255 characters or less." })
});