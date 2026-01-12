# TrueDamage.gg - Data Fetching Architecture Guide

## 🏗️ Architecture Patterns

You have **3 main options** for fetching data. Choose based on your needs:

---

## ⭐ **Pattern 1: Server Component + Direct Database (RECOMMENDED)**

**Best for:** Most use cases, simplest setup

```
┌─────────────────────────────────────────┐
│  Next.js Server Component               │
│  (app/forecasts/upcoming/page.tsx)      │
│                                          │
│  const data = await prisma.forecast...  │
└──────────────┬──────────────────────────┘
               │
               │ Direct query
               ▼
     ┌─────────────────────┐
     │   PostgreSQL DB     │
     │   (via Prisma ORM)  │
     └─────────────────────┘
```

### Implementation

**File: `app/forecasts/upcoming/page.tsx`**
```typescript
import { prisma } from '@/lib/prisma';

export default async function UpcomingForecastsPage() {
  // Fetch directly from database (Server Component!)
  const forecasts = await prisma.forecast.findMany({
    where: { match: { date: { gte: new Date() } } },
    include: { match: { include: { homeTeam: true, awayTeam: true } } }
  });

  return <ForecastList forecasts={forecasts} />;
}
```

**Pros:**
- ✅ Simplest implementation
- ✅ No API route needed
- ✅ Fastest (no extra network hop)
- ✅ Server-side only (secrets safe)
- ✅ Automatic caching with Next.js

**Cons:**
- ❌ Can't be called from Client Components
- ❌ Need to create separate API routes if you need client-side fetching

---

## 🔄 **Pattern 2: Server Component + API Route**

**Best for:** When you need the same data in both server AND client components

```
┌──────────────────────┐         ┌──────────────────────┐
│  Server Component    │────────▶│  API Route           │
│  (page.tsx)          │  fetch  │  (/api/forecasts/    │
└──────────────────────┘         │   upcoming/route.ts) │
                                 └──────────┬───────────┘
┌──────────────────────┐                    │
│  Client Component    │────────────────────┘
│  (use client)        │  fetch             │ Prisma query
└──────────────────────┘                    ▼
                               ┌────────────────────────┐
                               │   PostgreSQL Database  │
                               └────────────────────────┘
```

### Implementation

**File: `app/api/forecasts/upcoming/route.ts`**
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const forecasts = await prisma.forecast.findMany({
    // ... query
  });

  return NextResponse.json({ data: forecasts });
}
```

**File: `lib/services/forecast-service.ts`**
```typescript
export async function getUpcomingForecasts(): Promise<Forecast[]> {
  const response = await fetch('/api/forecasts/upcoming', {
    next: { revalidate: 60 }, // Cache 60 seconds
  });

  const data = await response.json();
  return data.data;
}
```

**File: `app/forecasts/upcoming/page.tsx`**
```typescript
import { getUpcomingForecasts } from '@/lib/services/forecast-service';

export default async function Page() {
  const forecasts = await getUpcomingForecasts();
  return <ForecastList forecasts={forecasts} />;
}
```

**Pros:**
- ✅ Can be used from both server and client components
- ✅ Good for building a REST API
- ✅ Easy to add authentication middleware

**Cons:**
- ❌ Extra network hop (slightly slower)
- ❌ More code to maintain

---

## 🌐 **Pattern 3: External Backend API**

**Best for:** When you have a separate backend (Django, Express, FastAPI)

```
┌──────────────────────┐
│  Next.js Frontend    │
│  (Server Component)  │
└──────────┬───────────┘
           │
           │ HTTPS
           │ fetch('https://api.truedamage.gg/...')
           ▼
┌────────────────────────┐         ┌──────────────────┐
│  External Backend API  │────────▶│  PostgreSQL DB   │
│  (Django/Express/etc)  │         └──────────────────┘
└────────────────────────┘
```

### Implementation

**File: `.env.local`**
```bash
NEXT_PUBLIC_API_URL=https://api.truedamage.gg
API_SECRET_KEY=your_secret_key_here
```

**File: `lib/services/forecast-service.ts`**
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUpcomingForecasts(): Promise<Forecast[]> {
  const response = await fetch(`${API_URL}/v1/forecasts/upcoming`, {
    headers: {
      'Authorization': `Bearer ${process.env.API_SECRET_KEY}`,
    },
    next: { revalidate: 60 },
  });

  return await response.json();
}
```

**Pros:**
- ✅ Separation of concerns
- ✅ Backend can serve multiple frontends
- ✅ Use your preferred backend language

**Cons:**
- ❌ More infrastructure to manage
- ❌ Extra network latency
- ❌ Need CORS configuration

---

## 🎯 **Quick Decision Guide**

| Scenario | Recommended Pattern |
|----------|---------------------|
| Building a simple app, just getting started | **Pattern 1** (Direct DB) |
| Need data in client components (real-time updates) | **Pattern 2** (API Routes) |
| Already have a backend API | **Pattern 3** (External API) |
| Building a public API for others | **Pattern 2** (API Routes) |
| Maximum performance needed | **Pattern 1** (Direct DB) |

---

## 🚀 **Current Setup (Your Project)**

Right now you're using: **Mock Data Pattern**

```typescript
// lib/services/forecast-service.ts
export async function getUpcomingForecasts(): Promise<Forecast[]> {
  return mockUpcomingForecasts; // Hardcoded data
}
```

### **Next Steps to Move to Real Data:**

### Option A: Start with Pattern 1 (Simplest)

1. **Install Prisma**
   ```bash
   npm install @prisma/client
   npm install -D prisma
   npx prisma init
   ```

2. **Set up database** (edit `.env`)
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/truedamage"
   ```

3. **Create Prisma schema** (`prisma/schema.prisma`)
   ```prisma
   model Team {
     id       String  @id @default(uuid())
     name     String
     logo     String?
     // ... other fields
   }

   model Forecast {
     id        String  @id @default(uuid())
     matchId   String
     // ... other fields
   }
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Create Prisma client** (`lib/prisma.ts`)
   ```typescript
   import { PrismaClient } from '@prisma/client';

   const globalForPrisma = global as unknown as { prisma: PrismaClient };

   export const prisma = globalForPrisma.prisma || new PrismaClient();

   if (process.env.NODE_ENV !== 'production') {
     globalForPrisma.prisma = prisma;
   }
   ```

6. **Update your page** (`app/forecasts/upcoming/page.tsx`)
   ```typescript
   import { prisma } from '@/lib/prisma';

   export default async function Page() {
     const forecasts = await prisma.forecast.findMany({
       include: { match: { include: { homeTeam: true, awayTeam: true } } }
     });

     return <ForecastList forecasts={forecasts} />;
   }
   ```

### Option B: Start with Pattern 2 (More Flexible)

1. Follow steps 1-5 from Option A
2. Create API route (see `app/api/forecasts/upcoming/route.example.ts`)
3. Update service to fetch from API (see `lib/services/forecast-service.example.ts`)

---

## 📚 **Additional Resources**

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 💡 **Pro Tips**

1. **Start Simple:** Use Pattern 1 (direct DB access) first
2. **Add API Routes Later:** Only when you need client-side fetching
3. **Use Server Components:** They're faster and more secure
4. **Cache Wisely:** Use `next: { revalidate: 60 }` for data that doesn't change often
5. **Error Boundaries:** Add `error.tsx` files for graceful error handling
6. **Loading States:** Add `loading.tsx` files for better UX

---

## 🔐 **Security Checklist**

- [ ] Never expose `DATABASE_URL` to the client (no `NEXT_PUBLIC_` prefix)
- [ ] API keys should only be in server-side code
- [ ] Use environment variables for all secrets
- [ ] Add rate limiting to API routes
- [ ] Validate all user input
- [ ] Use prepared statements (Prisma does this automatically)

---

## 🎨 **File Structure Reference**

```
truedamage.gg/
├── app/
│   ├── api/                          # API routes (Pattern 2)
│   │   └── forecasts/
│   │       └── upcoming/
│   │           └── route.ts          # GET /api/forecasts/upcoming
│   │
│   └── forecasts/
│       └── upcoming/
│           ├── page.tsx              # Server Component (fetches data)
│           ├── loading.tsx           # Loading UI
│           └── error.tsx             # Error handling
│
├── lib/
│   ├── prisma.ts                     # Prisma client instance
│   ├── services/
│   │   └── forecast-service.ts      # Service layer
│   ├── data/
│   │   └── forecasts.ts             # Mock data (temporary)
│   └── types/
│       └── forecast.ts              # TypeScript types
│
├── prisma/
│   └── schema.prisma                # Database schema
│
└── .env.local                       # Environment variables (gitignored)
```
