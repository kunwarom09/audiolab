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

import { SITE_URL } from "@/lib/siteConfig";

export const metadata = {
  title: {
    default: "iLoveAudios — Free Online Audio Tools & Converters",
    template: "%s | iLoveAudios",
  },
  description: "Free online audio converter & song finder. Convert MP4, WAV, FLAC to MP3 up to 320kbps, trim audio, and identify songs with no signup.",
  keywords: [
    "audio converter",
    "audio converter online",
    "free audio converter",
    "mp3 to wav",
    "wav to mp3",
    "mp4 to mp3",
    "flac to mp3",
    "song finder",
    "iloveaudios",
    "i love audios",
    "iloveaudios.com",
    "online audio tools"
  ],
  authors: [{ name: "iLoveAudios Engine" }],
  creator: "iLoveAudios",
  publisher: "iLoveAudios",
  applicationName: "iLoveAudios",
  category: "technology",
  manifest: "/manifest.json",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder",
  },
  openGraph: {
    title: "iLoveAudios — Free Online Audio Tools & Converters",
    description: "Free online audio converter & song finder. Convert MP4, WAV, FLAC to MP3 up to 320kbps, trim audio, and identify songs with no signup.",
    url: SITE_URL,
    siteName: "iLoveAudios",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iLoveAudios — Free Online Audio Tools & Converters",
    description: "Free online audio converter & song finder. Convert MP4, WAV, FLAC to MP3 up to 320kbps, trim audio, and identify songs with no signup.",
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
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'iLoveAudios',
    url: SITE_URL,
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'iLoveAudios',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="YpwmWLxkPcG4Tcx0budEkw"
          async
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c')
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c')
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AppClientWrapper>{children}</AppClientWrapper>
      </body>
    </html>
  );
}

