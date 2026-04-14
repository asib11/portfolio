import type { Metadata } from "next";
import { IBM_Plex_Mono, Meow_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ParticleExplosion from "@/components/ui/ParticleExplosion";
import JsonLd from "@/components/seo/JsonLd";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const signatureFont = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

const SITE_URL = "https://asibahmed.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Asib Ahmed | Software Engineer — Django, Python, Golang & Full-Stack Developer",
    template: "%s | Asib Ahmed",
  },
  description:
    "Portfolio of Asib Ahmed — a Software Engineer from Dhaka, Bangladesh specializing in Django, Python, DRF, Django Channels, React, PostgreSQL, Docker, and AWS. Building scalable backend systems and full-stack web applications.",
  keywords: [
    "Asib Ahmed",
    "Software Engineer",
    "Backend Developer",
    "Full-Stack Developer",
    "Django Developer",
    "Python Developer",
    "Django REST Framework",
    "React Developer",
    "Go Developer",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Dhaka Bangladesh",
    "Bangladesh Software Engineer",
    "Web Developer Bangladesh",
    "BUBT",
    "asibahmed.me",
  ],
  authors: [{ name: "Asib Ahmed", url: SITE_URL }],
  creator: "Asib Ahmed",
  publisher: "Asib Ahmed",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Asib Ahmed — Portfolio",
    title: "Asib Ahmed | Software Engineer — Django, Python, Golang & Full-Stack Developer",
    description:
      "Software Engineer from Dhaka, Bangladesh. Expert in Django, Python, DRF, Django Channels, React, PostgreSQL, Docker, and AWS. Building scalable, high-performance web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asib Ahmed — Software Engineer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asib Ahmed | Software Engineer — Django, Python, Golang & Full-Stack Developer",
    description:
      "Portfolio of Asib Ahmed — Software Engineer from Dhaka, Bangladesh. Django, Python, Golang, React, Docker, AWS.",
    images: ["/og-image.png"],
    creator: "@asib_ahmed",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${ibmPlexMono.variable} ${signatureFont.variable} font-sans antialiased text-foreground bg-background min-h-screen flex flex-col`}
      >
        <JsonLd />
        <ParticleExplosion />
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
