import * as z from "zod";

export const GameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, {
            error: "Game name is required."
        })
        .max(100, {
            error: "Game name must be 100 characters or less."
        }),
    shortName: z
        .string()
        .trim()
        .max(10, {
            error: "Short name must be 10 characters or less."
        })
});

export type GameFormData = z.infer<typeof GameSchema>;