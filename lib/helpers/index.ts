// Removes unnecessary spaces, lower cases, replacing special characters with hyphens
export const createSlug = (name: string) => name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const generateFiveNumbers = () => Math.floor(10000 + Math.random() * 90000);

export const createIdWithNumbers = (name: string) => `${generateFiveNumbers()}-${createSlug(name)}`;