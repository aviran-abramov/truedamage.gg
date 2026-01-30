import * as z from "zod";

export const CreateTeamSchema = z.object({
    game: z
        .string()
        .trim()
        .min(1, { message: "Game name field is required." })
        .max(100, { message: "Game name field must be 100 characters or less." }),
    name: z
        .string()
        .trim()
        .min(1, { message: "Team name field is required." })
        .max(255, { message: "Team name field must be 255 characters or less." }),
    countryName: z
        .string()
        .trim()
        .min(1, { message: "Country name field is required." })
        .max(100, { message: "Country name field must be 100 characters or less." }),
    countryCode: z
        .string()
        .trim()
        .toLowerCase()
        .length(2, { message: "Country code field must be exactly 2 characters" })
});