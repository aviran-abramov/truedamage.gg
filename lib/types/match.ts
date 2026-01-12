export interface MatchProps {
    id: string;
    matchDate: string;
    matchTime: string;
    gameName: string;
    leagueName: string;
    teamAName: string;
    teamBName: string;
    bestOf: number;
    forecastedWinnerName?: string;
}