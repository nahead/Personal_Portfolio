import type { Metadata } from 'next';
import { Syne, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from './components/LenisProvider';
import CustomCursor from './components/effects/CustomCursor';
import LoadingScreen from './components/effects/LoadingScreen';
import SecretTerminal from './components/effects/SecretTerminal';
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
  title: 'Nahead Jokhio — AI & Full Stack Developer',
  description:
    '18-year-old AI developer from Karachi, Pakistan. Python, Next.js, FastAPI, MCP & OpenAI Agents specialist.',
  keywords: [
    'Nahead Jokhio',
    'AI Developer',
    'Full Stack Developer',
    'Python',
    'TypeScript',
    'Next.js',
    'FastAPI',
    'MCP',
    'OpenAI Agents',
    'Gemini API',
    'Karachi',
    'Pakistan',
  ],
  authors: [{ name: 'Nahead Jokhio' }],
  creator: 'Nahead Jokhio',
  publisher: 'Nahead Jokhio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://naheadjokhio.com',
    title: 'Nahead Jokhio — AI & Full Stack Developer',
    description:
      '18-year-old AI developer from Karachi, Pakistan. Python, Next.js, FastAPI, MCP & OpenAI Agents specialist.',
    siteName: 'Nahead Jokhio Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nahead Jokhio — AI & Full Stack Developer',
    description:
      '18-year-old AI developer from Karachi, Pakistan. Python, Next.js, FastAPI, MCP & OpenAI Agents specialist.',
    creator: '@naheadjokhio',
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
  verification: {
    google: 'your-google-verification-code',
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
      </head>
      <body>
        <LanguageProvider>
          <LenisProvider>
            <CustomCursor />
            <SecretTerminal />
            {children}
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
