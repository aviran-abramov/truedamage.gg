# **TrueDamage.gg**

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
* **NextJS 16** - Full-Stack React Framework with CSR and SSR, including server actions
* **Zod 4** - Data validation and schemas

### Frontend Only
* **ShadCN** - UI library
* **TailwindCSS 4** - CSS framework
* **React-Hook-Form** - Form state management

### Backend & Services
* **Prisma** - Database ORM
* **PostgreSQL** - Relational database
* **Better Auth** - Authentication
* **Resend** - Email service


### Development & Deployment
* **TypeScript** - Type safety
* **Vercel** - Deployment

## Features
### Authentication with Better-Auth
* Sign in  
* Sign up  
* Sign out  
* TO-FINISH: Forgot password
* TODO: 2FA

### Admin features
* Create: game, team, match, prediction
* TODO: Edit: game, team, match, prediciton
* TODO: Delete: game, team, match, prediction
* TODO: Fetch specific game (scraper project)

### UI
* Theme - dark / light mode  

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
