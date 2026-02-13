# **TrueDamage.gg**
Get the latest esports news, live tournament coverage, match schedules, expert predictions for League of Legends, CS2, Valorant, Dota 2, and more!

[![Live Demo](https://img.shields.io/badge/Live_Demo-truedamage.gg-blue?style=for-the-badge)](https://truedamage-gg.vercel.app/)

## Table of Contents
* [Overview](#overview)  
* [Tech Stack](#tech-stack)  
* [Features](#features)  
* [Getting Started](#getting-started)  
* [Environment Variables](#environment-variables)
* [Architecture](#architecture)

## Overview
Instead of tutorial CRUD YouTube projects that most of the juniors do and use the "copy paste" method, I decided to work on a field that I know very well and like as a hobby to create a real project.

### Why I built this project
As a former heavy gamer, and as a persoson who is working with computer 24/7 since the age of 3, I decided to build a project about eSports. I created a website which provides data about games, tournaments, teams, players and even predict which team is going to win the match with my own formula.

## Tech Stack
### Both frontend and backend
* **[NextJS 16](https://nextjs.org)** - Full-Stack React Framework with CSR and SSR, including server actions
* **[Zod 4](https://zod.dev)** - Data validation and schemas

### Frontend Only
* **[ShadCN](https://ui.shadcn.com)** - UI library
* **[TailwindCSS 4](https://tailwindcss.com)** - CSS framework
* **[React-Hook-Form](https://react-hook-form.com)** - Form state management

### Backend & Services
* **[Prisma](https://www.prisma.io)** - Database ORM
* **[PostgreSQL](https://www.postgresql.org)** - Relational database
* **[Better Auth](https://www.better-auth.com)** - Authentication
* **[Resend](https://resend.com)** - Email service


### Development & Deployment
* **[TypeScript](https://www.typescriptlang.org)** - Type safety
* **[Vercel](https://vercel.com)** - Deployment

## Features
### Authentication with Better-Auth
* Google authentication support
* Facebook authentication support
* Sign in - manual 
* Sign up - manual  
* Sign out
* Account linking (OAuth with manual registration)
* TO-FINISH: Forgot password
* TODO: Email verification on manual sign up
* TODO: Remember me - persistent sessions
* TODO: Two-factor authentication (2FA)

### Admin features
* Create: game, team, match, prediction
* TODO: Edit: game, team, match, prediciton
* TODO: Delete: game, team, match, prediction
* TODO: Fetch specific game (scraper project)
* TODO: Dashboard with analytics (user count, match, team stats)
* TODO: User management (ban, roles, permissions)

### User features
* TODO: User profile
* TODO: Follow favorite teams
* TODO: Alerts for favorite teams


### UI
* Theme - dark / light mode
* Toast notifications 
* Filters - by game, team, tournament
* TODO: Responsiveness and mobile design
* TODO: Bulk import/export data
* TODO: Navbar - Search (teams, matches)


## Getting Started
Follow these steps to make this project work on your machine.  
**Cloning the repository**

```bash
git clone git@github.com:aviran-abramov/truedamage.gg.git
```

**Installation**
```bash
npm install
```

## Environment Variables
**Set up environment variables**  
1. Create a new file in the root folder, and call it ```.env```
2. Paste and add the required content:

```bash
# Database
DATABASE_URL=

# Better Auth
BETTER_AUTH_URL="http://localhost:3000"

# Google (Auth)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Facebook (Auth)
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# Resend Email Service
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Email Address - For now only I can get emails (costs money)
MY_EMAIL_ADDRESS="aviranabramov@gmail.com"
```

## Architecture
### Database Schema
I used PostgreSQL with Prisma ORM.

### Tables

#### Better Auth Tables
* **User**
* **Session**
* **Account**
* **Verification**

#### App Tables
* **Game**  
* **Team**  
* **Match**  


<!-- REMOVE AT THE END -->

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
