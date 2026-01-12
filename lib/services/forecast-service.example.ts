/**
 * REAL-WORLD EXAMPLES for forecast-service.ts
 *
 * This file shows different patterns for integrating with real APIs.
 * Choose the pattern that fits your architecture:
 *
 * 1. Next.js Internal API Routes (recommended for most cases)
 * 2. Direct External API calls (if you have a separate backend)
 * 3. With Authentication (when you add user accounts)
 */

import { Forecast } from "@/lib/types/forecast";

// ============================================================================
// PATTERN 1: Using Next.js Internal API Routes (Recommended)
// ============================================================================

/**
 * This is the most common pattern for Next.js apps.
 * Your Next.js app has API routes in app/api/ that talk to your database.
 *
 * Benefits:
 * - Server-side only (API keys/secrets never exposed to client)
 * - Built-in with Next.js
 * - Can use Server Components to fetch directly (no API route needed!)
 */

// Option 1A: Fetch from your own Next.js API route
export async function getUpcomingForecasts(): Promise<Forecast[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/forecasts/upcoming`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Next.js 13+ caching options
      next: {
        revalidate: 60, // Revalidate every 60 seconds
        tags: ['forecasts'], // For on-demand revalidation
      },
      // Or use no caching for always fresh data:
      // cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch forecasts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.forecasts || data; // Adjust based on your API response shape
  } catch (error) {
    console.error('Error fetching upcoming forecasts:', error);
    throw new Error('Failed to load upcoming forecasts. Please try again later.');
  }
}

// Option 1B: Direct database query in Server Component (BEST for Next.js 13+)
// No API route needed! Just import your ORM directly in Server Components
import { prisma } from '@/lib/prisma'; // You'll create this

export async function getUpcomingForecastsDirect(): Promise<Forecast[]> {
  try {
    const forecasts = await prisma.forecast.findMany({
      where: {
        match: {
          date: {
            gte: new Date(), // Only upcoming matches
          },
        },
      },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
            league: true,
          },
        },
      },
      orderBy: {
        match: {
          date: 'asc',
        },
      },
      take: 50, // Limit results
    });

    // Transform Prisma data to your Forecast type
    return forecasts.map(f => ({
      id: f.id,
      matchId: f.matchId,
      matchDate: f.match.date.toISOString().split('T')[0],
      matchTime: f.match.time,
      gameName: f.match.game,
      leagueName: f.match.league.name,
      teamAName: f.match.homeTeam.name,
      teamBName: f.match.awayTeam.name,
      bestOf: f.match.bestOf,
      forecastedWinnerName: f.predictedWinnerId === f.match.homeTeam.id
        ? f.match.homeTeam.name
        : f.match.awayTeam.name,
      confidence: f.confidence,
      createdAt: f.createdAt.toISOString(),
      updatedAt: f.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Database error fetching forecasts:', error);
    throw new Error('Failed to load forecasts from database');
  }
}

// ============================================================================
// PATTERN 2: External API (if you have a separate backend server)
// ============================================================================

/**
 * Use this if you have a separate backend API (e.g., Django, Express, FastAPI)
 *
 * Setup required:
 * 1. Create .env.local file:
 *    NEXT_PUBLIC_API_URL=https://api.truedamage.gg
 *    API_SECRET_KEY=your_secret_key_here
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_SECRET = process.env.API_SECRET_KEY; // Server-side only

export async function getUpcomingForecastsExternal(): Promise<Forecast[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/forecasts/upcoming`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authentication if needed (server-side only!)
        ...(API_SECRET && { 'Authorization': `Bearer ${API_SECRET}` }),
      },
      // Cache for 5 minutes
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(`API returned ${response.status}: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!Array.isArray(data)) {
      throw new Error('Invalid API response format');
    }

    return data;
  } catch (error) {
    // Log to monitoring service (Sentry, DataDog, etc.)
    if (error instanceof Error) {
      console.error('External API error:', error.message);
    }

    // Return empty array as fallback (or throw to show error to user)
    return [];

    // OR throw to propagate error to error.tsx boundary:
    // throw new Error('Unable to fetch forecasts. Please try again later.');
  }
}

// ============================================================================
// PATTERN 3: With Authentication & User Context
// ============================================================================

/**
 * For authenticated endpoints (e.g., user's personal forecasts)
 * Requires authentication system (NextAuth.js, Clerk, Auth0, etc.)
 */

import { getServerSession } from 'next-auth'; // Example using NextAuth
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getMyForecastsAuthenticated(): Promise<Forecast[]> {
  try {
    // Get user session (Server Component only)
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('User not authenticated');
    }

    // Fetch from API with auth token
    const response = await fetch(`${API_BASE_URL}/v1/users/${session.user.id}/forecasts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
      cache: 'no-store', // Don't cache user-specific data
    });

    if (response.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch user forecasts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user forecasts:', error);
    return []; // Return empty array for graceful degradation
  }
}

// ============================================================================
// PATTERN 4: Advanced Error Handling & Retry Logic
// ============================================================================

/**
 * Production-grade fetch with retry logic and detailed error handling
 */

interface FetchOptions {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

async function fetchWithRetry<T>(
  url: string,
  options: RequestInit & FetchOptions = {}
): Promise<T> {
  const { maxRetries = 3, retryDelay = 1000, timeout = 10000, ...fetchOptions } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Don't retry client errors (4xx), only server errors (5xx)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`Client error: ${response.status}`);
        }

        // Retry server errors
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      // Don't retry on last attempt
      if (attempt < maxRetries) {
        console.warn(`Fetch attempt ${attempt + 1} failed, retrying...`, lastError.message);
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError || new Error('Request failed after retries');
}

export async function getUpcomingForecastsRobust(): Promise<Forecast[]> {
  try {
    return await fetchWithRetry<Forecast[]>(
      `${API_BASE_URL}/v1/forecasts/upcoming`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        maxRetries: 3,
        retryDelay: 1000,
        timeout: 10000,
      }
    );
  } catch (error) {
    console.error('Failed to fetch forecasts after retries:', error);
    throw new Error('Service temporarily unavailable. Please try again later.');
  }
}

// ============================================================================
// PATTERN 5: Filtering & Pagination
// ============================================================================

interface ForecastFilters {
  game?: string;
  league?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export async function getFilteredForecasts(
  filters: ForecastFilters = {}
): Promise<{ forecasts: Forecast[]; total: number; page: number }> {
  const {
    game,
    league,
    startDate,
    endDate,
    page = 1,
    limit = 20
  } = filters;

  // Build query string
  const params = new URLSearchParams();
  if (game) params.append('game', game);
  if (league) params.append('league', league);
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const response = await fetch(`${API_BASE_URL}/v1/forecasts?${params}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch filtered forecasts');
  }

  return await response.json();
}

// ============================================================================
// HELPER: Create Prisma Client (for Pattern 1B)
// ============================================================================

/**
 * Save this as lib/prisma.ts
 *
 * import { PrismaClient } from '@prisma/client'
 *
 * const globalForPrisma = global as unknown as { prisma: PrismaClient }
 *
 * export const prisma = globalForPrisma.prisma || new PrismaClient()
 *
 * if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
 */

// ============================================================================
// HELPER: Environment Variables Setup
// ============================================================================

/**
 * Create .env.local file in your project root:
 *
 * # Database
 * DATABASE_URL="postgresql://user:password@localhost:5432/truedamage"
 *
 * # API Configuration
 * NEXT_PUBLIC_SITE_URL="http://localhost:3000"
 * NEXT_PUBLIC_API_URL="https://api.truedamage.gg"
 * API_SECRET_KEY="your_secret_key_here"
 *
 * # NextAuth (if using authentication)
 * NEXTAUTH_URL="http://localhost:3000"
 * NEXTAUTH_SECRET="your_nextauth_secret"
 *
 * Note:
 * - NEXT_PUBLIC_* variables are exposed to browser
 * - Variables without NEXT_PUBLIC_ are server-side only (safer for secrets)
 */
