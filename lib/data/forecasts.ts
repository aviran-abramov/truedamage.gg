import { Forecast } from "@/lib/types/forecast";

/**
 * Mock forecast data for upcoming matches
 * TODO: Replace with actual API calls when backend is ready
 */
export const mockUpcomingForecasts: Forecast[] = [
  {
    id: "1",
    matchId: "match-001",
    matchDate: "2026-01-12",
    matchTime: "11:00",
    gameName: "League of Legends",
    leagueName: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
    teamAName: "BIG Academy",
    teamBName: "BRION Challengers",
    bestOf: 3,
    forecastedWinnerName: "BRION Challengers",
    confidence: 67,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "2",
    matchId: "match-002",
    matchDate: "2026-01-13",
    matchTime: "14:00",
    gameName: "League of Legends",
    leagueName: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
    teamAName: "BNK FEARX Youth",
    teamBName: "T1 Esports Academy",
    bestOf: 3,
    forecastedWinnerName: "T1 Esports Academy",
    confidence: 82,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "3",
    matchId: "match-003",
    matchDate: "2026-01-14",
    matchTime: "16:00",
    gameName: "League of Legends",
    leagueName: "LoL Champions Korea Challengers League (LCK CL) 2026 Kickoff",
    teamAName: "All for One Gaming",
    teamBName: "Second Time Alive",
    bestOf: 5,
    forecastedWinnerName: "All for One Gaming",
    confidence: 73,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",
  },
];
