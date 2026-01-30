export const createGameSlug = (name: string) => {
    const nameInLowerCase = name.toLocaleLowerCase();
    const slug = nameInLowerCase.split(" ").join("-");

    return slug;
};

export const generateFiveNumbers = () => Math.floor(10000 + Math.random() * 90000);

export const createTeamSlug = (name: string) => {
    const nameInLowerCaseWithHyphens = name
        .toLocaleLowerCase()
        .split(" ")
        .join("-");
    const numbers = generateFiveNumbers();
    const slug = `${numbers}-${nameInLowerCaseWithHyphens}`;

    return slug;
};