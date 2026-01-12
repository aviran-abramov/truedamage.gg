/**
 * @deprecated Use Forecast from '@/lib/types/forecast' instead
 * This interface is kept for backward compatibility
 */
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

// Re-export for convenience
export type { Forecast } from './forecast';