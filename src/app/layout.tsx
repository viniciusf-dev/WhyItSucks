import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from '@vercel/analytics/next';

// Import the fonts properly using next/font/google
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const pixelSecondaryFont = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-secondary",
});

export const metadata: Metadata = {
  title: "WhyItSucks - Game Review Analyzer",
  description: "AI-powered negative game review analyzer that helps you understand common issues with games before buying them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelFont.variable} ${pixelSecondaryFont.variable}`}>
        <TooltipProvider>
          <div className="min-h-screen bg-retro-darkBlue text-foreground">
            {children}
            <Toaster />
            <Sonner />
          </div>
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}