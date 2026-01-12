import { Forecast } from "@/lib/types/forecast";
import { mockUpcomingForecasts } from "@/lib/data/forecasts";

/**
 * Service layer for forecast-related data fetching
 * This abstraction allows easy switching from mock data to real API calls
 */

/**
 * Fetches upcoming forecasts
 * @returns Promise<Forecast[]> Array of upcoming forecasts
 *
 * TODO: Replace with actual API call
 * Example: return fetch('/api/forecasts/upcoming').then(res => res.json())
 */
export async function getUpcomingForecasts(): Promise<Forecast[]> {
  // Simulate API delay (remove in production)
  await new Promise(resolve => setTimeout(resolve, 100));

  return mockUpcomingForecasts;
}

/**
 * Fetches a single forecast by ID
 * @param id - Forecast ID
 * @returns Promise<Forecast | null>
 *
 * TODO: Replace with actual API call
 * Example: return fetch(`/api/forecasts/${id}`).then(res => res.json())
 */
export async function getForecastById(id: string): Promise<Forecast | null> {
  await new Promise(resolve => setTimeout(resolve, 100));

  const forecast = mockUpcomingForecasts.find(f => f.id === id);
  return forecast || null;
}

/**
 * Fetches user's personal forecasts (for authenticated users)
 * @returns Promise<Forecast[]>
 *
 * TODO: Implement when authentication is ready
 */
export async function getMyForecasts(): Promise<Forecast[]> {
  // Placeholder - will require authentication
  return [];
}
