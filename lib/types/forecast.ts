export interface Forecast {
  id: string;
  matchId: string;
  matchDate: string;
  matchTime: string;
  gameName: string;
  leagueName: string;
  teamAName: string;
  teamBName: string;
  bestOf: number;
  forecastedWinnerName?: string;
  confidence?: number; // 0-100 percentage
  createdAt?: string;
  updatedAt?: string;
}

// For future when we have full team/league objects
export interface ForecastWithDetails {
  id: string;
  matchId: string;
  matchDate: string;
  matchTime: string;
  game: string;
  league: {
    id: string;
    name: string;
    region: string;
  };
  teamA: {
    id: string;
    name: string;
    logo?: string;
  };
  teamB: {
    id: string;
    name: string;
    logo?: string;
  };
  bestOf: number;
  forecastedWinner?: {
    id: string;
    name: string;
  };
  confidence?: number;
  createdAt: string;
  updatedAt: string;
}
