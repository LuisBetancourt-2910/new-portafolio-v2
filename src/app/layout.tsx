import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { AnimatedTitle } from '@/components/AnimatedTitle';
import { siteConfig } from '@/config/site';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
  adjustFontFallback: true,
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
    icon: [
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon-96x96.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        type: 'image/png',
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
  },
  other: {
    'msapplication-TileColor': '#0F172A',
    'theme-color': '#0F172A',
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Critical CSS para FCP - Inline styles para render inmediato */}
        <style dangerouslySetInnerHTML={{__html: `
          body {
            margin: 0;
            background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%);
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
          }
          .dark body {
            background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%);
          }
        `}} />
        
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
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
              "image": "https://betanworks.dev/icon.svg",
              "logo": "https://betanworks.dev/icon.svg",
              "sameAs": [
                siteConfig.socials.github,
                siteConfig.socials.linkedin
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
        <AnimatedTitle title={t('animatedTitle')} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
