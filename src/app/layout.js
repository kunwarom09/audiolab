import { Geist, Geist_Mono } from "next/font/google";
import AppClientWrapper from "@/components/AppClientWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AudioLab — Free Online Audio Tools & Converters",
  description: "Free web-based audio converter and editor tool suite. Convert MP3, WAV, FLAC, M4A, MP4, WebM to other formats. Identify songs, view lyrics, and more.",
  keywords: [
    "audio converter",
    "audio converter online",
    "free audio converter",
    "mp3 to wav",
    "wav to mp3",
    "mp4 to mp3",
    "flac to mp3",
    "song finder",
    "audio lab",
    "audiolab",
    "online audio tools"
  ],
  authors: [{ name: "AudioLab Engine" }],
  creator: "AudioLab",
  publisher: "AudioLab",
  applicationName: "AudioLab",
  metadataBase: new URL("https://audiolab.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AudioLab — Free Online Audio Tools & Converters",
    description: "Convert audio formats, extract audio from videos, search lyrics, and identify songs with AudioLab's browser-based suite.",
    url: "https://audiolab.app",
    siteName: "AudioLab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioLab — Free Online Audio Tools & Converters",
    description: "Free web-based audio converter and editor tool suite.",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
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
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AudioLab',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    description: 'Free online audio tools and converters to convert, edit, and identify audio files.',
    url: 'https://audiolab.app',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AppClientWrapper>{children}</AppClientWrapper>
      </body>
    </html>
  );
}
