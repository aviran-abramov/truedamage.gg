import * as z from "zod";

export const CreateGameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, {
            error: "Game name is required."
        })
        .max(100, {
            error: "Game name must be 100 characters or less."
        })
});