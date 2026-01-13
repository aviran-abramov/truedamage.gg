export interface MatchProps {
    id: string;
    matchDate: string;
    matchTime: string;
    game: string;
    league: string;
    teamA: string;
    teamB: string;
    bestOf: number;
    winnerPrediction?: string;
}