/**
 * EXAMPLE: Next.js API Route
 *
 * This file shows how to create API routes in Next.js 13+ App Router
 * Location: app/api/forecasts/upcoming/route.ts
 *
 * This would be accessed at: http://localhost:3000/api/forecasts/upcoming
 *
 * To use this example:
 * 1. Rename to route.ts
 * 2. Install Prisma: npm install @prisma/client
 * 3. Set up your database and Prisma schema
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // You'll create this
import type { Forecast } from '@/lib/types';

// ============================================================================
// EXAMPLE 1: Simple API Route with Mock Data
// ============================================================================

export async function GET() {
  try {
    // Mock data (for testing before database is ready)
    const mockData: Forecast[] = [
      {
        id: "1",
        matchId: "match-001",
        matchDate: "2026-01-12",
        matchTime: "11:00",
        gameName: "League of Legends",
        leagueName: "LCK CL 2026 Kickoff",
        teamAName: "BIG Academy",
        teamBName: "BRION Challengers",
        bestOf: 3,
        forecastedWinnerName: "BRION Challengers",
        confidence: 67,
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockData,
      count: mockData.length,
    });
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch forecasts',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 2: Real API Route with Database (Prisma)
// ============================================================================

export async function GET_WITH_DATABASE() {
  try {
    // Fetch from database
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
            homeTeam: {
              select: {
                id: true,
                name: true,
                logo: true,
                shortName: true,
              },
            },
            awayTeam: {
              select: {
                id: true,
                name: true,
                logo: true,
                shortName: true,
              },
            },
            league: {
              select: {
                name: true,
                region: true,
              },
            },
          },
        },
      },
      orderBy: {
        match: {
          date: 'asc',
        },
      },
      take: 50,
    });

    // Transform to match your Forecast type
    const transformedForecasts: Forecast[] = forecasts.map(forecast => ({
      id: forecast.id,
      matchId: forecast.matchId,
      matchDate: forecast.match.date.toISOString().split('T')[0],
      matchTime: forecast.match.time,
      gameName: forecast.match.game,
      leagueName: forecast.match.league.name,
      teamAName: forecast.match.homeTeam.name,
      teamBName: forecast.match.awayTeam.name,
      bestOf: forecast.match.bestOf,
      forecastedWinnerName: forecast.predictedWinnerId
        ? (forecast.predictedWinnerId === forecast.match.homeTeam.id
            ? forecast.match.homeTeam.name
            : forecast.match.awayTeam.name)
        : undefined,
      confidence: forecast.confidence ?? undefined,
      createdAt: forecast.createdAt.toISOString(),
      updatedAt: forecast.updatedAt.toISOString(),
    }));

    return NextResponse.json(
      {
        success: true,
        data: transformedForecasts,
        count: transformedForecasts.length,
        timestamp: new Date().toISOString(),
      },
      {
        // Add caching headers
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Database error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development'
          ? (error as Error).message
          : 'Failed to fetch forecasts',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 3: With Query Parameters
// ============================================================================

export async function GET_WITH_FILTERS(request: Request) {
  try {
    // Parse URL query parameters
    const { searchParams } = new URL(request.url);
    const game = searchParams.get('game');
    const league = searchParams.get('league');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Build dynamic where clause
    const where: any = {
      match: {
        date: {
          gte: startDate ? new Date(startDate) : new Date(),
          ...(endDate && { lte: new Date(endDate) }),
        },
        ...(game && { game }),
        ...(league && {
          league: {
            slug: league,
          },
        }),
      },
    };

    // Get total count for pagination
    const totalCount = await prisma.forecast.count({ where });

    // Fetch paginated results
    const forecasts = await prisma.forecast.findMany({
      where,
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
      skip: (page - 1) * limit,
      take: limit,
    });

    // Transform data...
    const transformedForecasts: Forecast[] = forecasts.map(/* ... */);

    return NextResponse.json({
      success: true,
      data: transformedForecasts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch forecasts' },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 4: POST Request (Create Forecast)
// ============================================================================

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const { matchId, predictedWinnerId, confidence } = body;

    if (!matchId || !predictedWinnerId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: matchId, predictedWinnerId',
        },
        { status: 400 }
      );
    }

    // Validate confidence is between 0-100
    if (confidence !== undefined && (confidence < 0 || confidence > 100)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Confidence must be between 0 and 100',
        },
        { status: 400 }
      );
    }

    // Create forecast in database
    const newForecast = await prisma.forecast.create({
      data: {
        matchId,
        predictedWinnerId,
        confidence,
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
    });

    // Transform and return
    const transformed: Forecast = {
      id: newForecast.id,
      matchId: newForecast.matchId,
      matchDate: newForecast.match.date.toISOString().split('T')[0],
      matchTime: newForecast.match.time,
      gameName: newForecast.match.game,
      leagueName: newForecast.match.league.name,
      teamAName: newForecast.match.homeTeam.name,
      teamBName: newForecast.match.awayTeam.name,
      bestOf: newForecast.match.bestOf,
      forecastedWinnerName: newForecast.predictedWinnerId === newForecast.match.homeTeam.id
        ? newForecast.match.homeTeam.name
        : newForecast.match.awayTeam.name,
      confidence: newForecast.confidence ?? undefined,
      createdAt: newForecast.createdAt.toISOString(),
      updatedAt: newForecast.updatedAt.toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: transformed,
        message: 'Forecast created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create forecast error:', error);

    // Handle Prisma specific errors
    if (error instanceof Error && error.message.includes('Foreign key constraint')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid matchId or predictedWinnerId',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create forecast',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 5: Protected Route (with Authentication)
// ============================================================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET_PROTECTED() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized. Please log in.',
        },
        { status: 401 }
      );
    }

    // Check user role/permissions (optional)
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden. Admin access required.',
        },
        { status: 403 }
      );
    }

    // Proceed with authorized request
    const forecasts = await prisma.forecast.findMany({
      where: {
        userId: session.user.id, // User-specific data
      },
    });

    return NextResponse.json({
      success: true,
      data: forecasts,
    });
  } catch (error) {
    console.error('Protected route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// USAGE IN YOUR SERVICE FILE
// ============================================================================

/**
 * Once you have this API route, update your forecast-service.ts:
 *
 * export async function getUpcomingForecasts(): Promise<Forecast[]> {
 *   const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/forecasts/upcoming`, {
 *     next: { revalidate: 60 }, // Cache for 60 seconds
 *   });
 *
 *   if (!response.ok) {
 *     throw new Error('Failed to fetch forecasts');
 *   }
 *
 *   const data = await response.json();
 *   return data.data; // Access the 'data' field from the API response
 * }
 *
 * OR, even better, fetch directly from database in Server Components:
 * (No API route needed! See forecast-service.example.ts Pattern 1B)
 */
