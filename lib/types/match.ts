import { MatchWithRelations } from "../actions/matches";
import { Game, Match, Team } from "../generated/prisma/client";

export interface PredictionListProps {
    predictions: MatchWithRelations[]
}

export interface PredictionProps {
    prediction: Match & {
        game: Game;
        teamA: Team;
        teamB: Team;
    }
}

export interface PredictionHeaderProps {
    gameIconPath: string;
    gameName: string;
    tournament: string
}

export interface PredictionContentProps {
    children: React.ReactNode
}

export interface PredictionTeamProps {
    name: string;
    countryName: string;
    countryCode: string;
    isPredictedWinner: boolean;
}

export interface PredictionMatchDetailsProps {
    date: string;
    time: string;
    bestOf: number;
}