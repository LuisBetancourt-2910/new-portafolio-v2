import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Luis Betancourt — Portafolio",
    template: "%s — Luis Betancourt",
  },
  description: "Portafolio profesional de Luis Betancourt",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Luis Betancourt — Portafolio",
    description: "Portafolio profesional de Luis Betancourt",
    url: "https://betanworks.dev",
    siteName: "Luis Betancourt — Portafolio",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Betancourt — Portafolio",
    description: "Portafolio profesional de Luis Betancourt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
