import * as z from "zod";

export const TeamSchema = z.object({
    gameName: z
        .string()
        .trim()
        .min(1, { error: "Game name field is required." })
        .max(100, { error: "Game name field must be 100 characters or less." }),
    name: z
        .string()
        .trim()
        .min(1, { error: "Team name field is required." })
        .max(255, { error: "Team name field must be 255 characters or less." }),
    countryName: z
        .string()
        .trim()
        .min(1, { error: "Country name field is required." })
        .max(100, { error: "Country name field must be 100 characters or less." }),
    countryCode: z
        .string()
        .trim()
        .toLowerCase()
        .length(2, { error: "Country code field must be exactly 2 characters" })
});

export type TeamFormData = z.infer<typeof TeamSchema>;