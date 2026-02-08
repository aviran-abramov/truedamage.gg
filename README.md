# **TrueDamage.gg**

## Table of Contents
<ol>
    <li>
        <a href="#about-the-project">About The Project</a>
    </li>
    <li>
        <a href="#tech-stack">Tech Stack</a>
    </li>
    <li>
        <a href="#features">Features</a>
    </li>
</ol>

## About The Project
<p>Instead of tutorial CRUD YouTube projects that most of the juniors do and use the "copy paste" method, I decided to work on a field that I know very well and like as a hobby to create a real project.</p>

### Why I built this project
<p>As a former heavy gamer, and as a person who is working with computer 24/7 since the age of 3, I decided to build a project about eSports. I created a website which provides data about games, tournaments, teams, players and even predict which team is going to win the match with my own formula.</p>

## Tech Stack

<ul>
    <li>NextJS - Framework for both backend and frontend</li>
    <li>TypeScript</li>
    <li>Prisma - Database ORM</li>
    <li>PostgreSQL - Relational database</li>
    <li>Zod - Data validation</li>
    <li>React-Hook-Form - Form state management</li>
    <li>Better Auth - Authentication</li>
    <li>Resend - Email service</li>
    <li>ShadCN - UI library</li>
    <li>TailwindCSS - CSS framework</li>
    <li>Vercel - Deployment</li>
</ul>

## Features

### Authentication with Better-Auth
<ul>
    <li>Sign in</li>
    <li>Sign up</li>
    <li>Sign out</li>
    <li>Forgot password</li>
</ul>

### Admin features
<ul>
    <li>Create: game, team, match, prediction</li>
</ul>

### UI
<ul>
    <li>Theme - dark / light mode</li>
</ul>


## Installation - Getting Started
Follow these steps to make this project work on your machine.

<b>Cloning the repository</b>
```bash
git clone git@github.com:aviran-abramov/truedamage.gg.git
```

<b>Installation</b>
```bash
npm install
```

<b>Set up environment variables</b>
<ol>
    <li>Create a new file in the root folder, and call it ```.env```</li>
    <li>Paste and add the required content:</li>
</ol> 

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
