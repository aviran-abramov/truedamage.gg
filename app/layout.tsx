import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google";
import { AppHeader } from "@/components/layout/AppHeader/AppHeader";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Esports News, Tournaments & Predictions | TrueDamage.gg",
  description: "Get the latest esports news, live tournament coverage, match schedules, expert predictions for League of Legends, CS2, Valorant, Dota 2, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />

          <main className="">
            {children}
          </main>

          <footer>

          </footer>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
