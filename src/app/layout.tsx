import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AnimatedTitle } from '@/components/AnimatedTitle';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://betanworks.dev'),
  title: {
    default: "José Luis García Betancourt — Full Stack Developer | Portafolio",
    template: "%s — José Luis García Betancourt",
  },
  description: "Portafolio profesional de Luis Betancourt (José Luis García Betancourt), Full Stack Developer e Ingeniero en Sistemas Computacionales. Especializado en JavaScript, TypeScript, React, Angular, Node.js, PHP, Laravel, .NET, C#, AWS, SQL Server y MySQL. Desarrollo de aplicaciones web empresariales, sistemas ERP, plataformas de gestión y soluciones cloud.",
  keywords: [
    'Luis Betancourt',
    'José Luis García Betancourt',
    'Full Stack Developer',
    'Desarrollador Full Stack',
    'Ingeniero en Sistemas',
    'JavaScript',
    'TypeScript',
    'React',
    'Angular',
    'Node.js',
    'PHP',
    'Laravel',
    '.NET',
    'C#',
    'AWS',
    'SQL Server',
    'MySQL',
    'Desarrollo Web',
    'Sistemas ERP',
    'Portafolio',
    'betanworks',
    'Durango',
    'México',
  ],
  authors: [{ name: 'José Luis García Betancourt', url: 'https://betanworks.dev' }],
  creator: 'José Luis García Betancourt',
  publisher: 'José Luis García Betancourt',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/avatar.png",
  },
  openGraph: {
    title: "José Luis García Betancourt — Full Stack Developer",
    description: "Full Stack Developer especializado en JavaScript, TypeScript, React, Angular, Node.js, PHP, Laravel, .NET y AWS. Portafolio de proyectos y CV.",
    url: "https://betanworks.dev",
    siteName: "José Luis García Betancourt — Portafolio",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: 'https://betanworks.dev/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'José Luis García Betancourt — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "José Luis García Betancourt — Full Stack Developer",
    description: "Full Stack Developer especializado en JavaScript, TypeScript, React, Angular, Node.js, PHP, Laravel, .NET y AWS.",
    images: ['https://betanworks.dev/opengraph-image'],
  },
  alternates: {
    canonical: 'https://betanworks.dev',
    languages: {
      'es': 'https://betanworks.dev/es',
      'en': 'https://betanworks.dev/en',
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/avatar.png" as="image" type="image/png" fetchPriority="high" />
        {/* JSON-LD Structured Data para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "José Luis García Betancourt",
              "alternateName": "Luis Betancourt",
              "url": "https://betanworks.dev",
              "image": "https://betanworks.dev/avatar.png",
              "logo": "https://betanworks.dev/icon.svg",
              "sameAs": [
                "https://github.com/LuisBetancourt-2910",
                "https://www.linkedin.com/in/luisbetancourt2910"
              ],
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "BetanWorks"
              },
              "knowsAbout": [
                "JavaScript",
                "TypeScript",
                "React",
                "Angular",
                "Node.js",
                "PHP",
                "Laravel",
                ".NET",
                "C#",
                "AWS",
                "SQL Server",
                "MySQL"
              ],
              "description": "Full Stack Developer e Ingeniero en Sistemas Computacionales especializado en desarrollo web empresarial, sistemas ERP y soluciones cloud."
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AnimatedTitle />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
