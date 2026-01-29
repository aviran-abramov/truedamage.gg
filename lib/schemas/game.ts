import * as z from "zod";

export const CreateGameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, {
            message: "Game name is required."
        })
        .max(100, {
            message: "Game name must be 100 characters or less."
        })
});