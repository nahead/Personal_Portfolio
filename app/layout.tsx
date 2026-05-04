import type { Metadata } from 'next';
import { Syne, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from './components/LenisProvider';
import CustomCursor from './components/effects/CustomCursor';
import LoadingScreen from './components/effects/LoadingScreen';
import SecretTerminal from './components/effects/SecretTerminal';
import KonamiAnimation from './components/effects/KonamiAnimation';
import HiddenTerminal from './components/effects/HiddenTerminal';
import LogoClickCounter from './components/effects/LogoClickCounter';
import { LanguageProvider } from './contexts/LanguageContext';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://naheadjokhio.vercel.app'),
  title: {
    default: 'Nahead Jokhio — AI Developer | Python | Next.js | FastAPI',
    template: '%s | Nahead Jokhio',
  },
  description:
    '18-year-old AI developer from Karachi building intelligent systems with Python, TypeScript, Next.js, FastAPI, MCP & OpenAI Agents SDK. Specialized in AI chatbots and full-stack development.',
  keywords: [
    'Nahead Jokhio',
    'AI Developer Karachi',
    'Python Developer Pakistan',
    'Next.js Developer',
    'FastAPI Developer',
    'MCP Integration',
    'OpenAI Agents SDK',
    'Gemini API',
    'Full Stack Developer',
    'TypeScript Developer',
    'AI Chatbot Developer',
    'Machine Learning Engineer',
    'Karachi Developer',
    'Pakistan Tech',
    'GIAIC Graduate',
  ],
  authors: [{ name: 'Nahead Jokhio', url: 'https://naheadjokhio.vercel.app' }],
  creator: 'Nahead Jokhio',
  publisher: 'Nahead Jokhio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://naheadjokhio.vercel.app',
    title: 'Nahead Jokhio — AI Developer | Python | Next.js | FastAPI',
    description:
      '18-year-old AI developer from Karachi building intelligent systems with Python, TypeScript, Next.js, FastAPI, MCP & OpenAI Agents SDK.',
    siteName: 'Nahead Jokhio Portfolio',
    images: [
      {
        url: '/og-image-v2.png',
        width: 1200,
        height: 630,
        alt: 'Nahead Jokhio - AI Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nahead Jokhio — AI Developer | Python | Next.js | FastAPI',
    description:
      '18-year-old AI developer from Karachi building intelligent systems with Python, TypeScript, Next.js, FastAPI, MCP & OpenAI Agents SDK.',
    creator: '@naheadjokhio',
    images: ['/og-image-v2.png'],
  },
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
  alternates: {
    canonical: 'https://naheadjokhio.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B1120" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Nahead Jokhio',
              url: 'https://naheadjokhio.vercel.app',
              image: 'https://naheadjokhio.vercel.app/og-image.png',
              jobTitle: 'AI Developer',
              description: '18-year-old AI developer from Karachi building intelligent systems with Python, TypeScript, Next.js, FastAPI, MCP & OpenAI Agents SDK',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Karachi',
                addressCountry: 'Pakistan',
              },
              alumniOf: {
                '@type': 'Organization',
                name: 'GIAIC - Governor Initiative for Artificial Intelligence',
              },
              knowsAbout: [
                'Artificial Intelligence',
                'Python Programming',
                'TypeScript',
                'Next.js',
                'FastAPI',
                'Model Context Protocol',
                'OpenAI Agents SDK',
                'Full Stack Development',
                'AI Chatbots',
              ],
              sameAs: [
                'https://github.com/nahead',
                'https://linkedin.com/in/nahead',
                'https://twitter.com/naheadjokhio',
              ],
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <LenisProvider>
            <CustomCursor />
            <SecretTerminal />
            <KonamiAnimation />
            <HiddenTerminal />
            <LogoClickCounter />
            {children}
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
