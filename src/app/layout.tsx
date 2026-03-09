import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASIB AHMED | Software Engineer",
  description: "Portfolio of Asib Ahmed, an aspiring Software Engineer with expertise in React, Next.js, Django, and Python.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased text-foreground bg-background min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
