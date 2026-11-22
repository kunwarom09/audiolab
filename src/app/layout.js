import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import AppClientWrapper from "@/components/AppClientWrapper";
import "./globals.css";
import { SITE_URL } from "@/lib/siteConfig";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const sourceSerifLogo = Source_Serif_4({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

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
  authors: [{ name: "iLoveAudios Team" }],
  creator: "iLoveAudios",
  publisher: "iLoveAudios",
  applicationName: "iLoveAudios",
  category: "technology",
  manifest: "/manifest.json",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
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
    logo: `${SITE_URL}/icon-512x512.png`,
  };

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerifLogo.variable} h-full antialiased`}
    >
      <head>
        <script
          data-cfasync="false"
          src="https://bauval.org/14/83440adbaab9d77714f0312be2bbbb95"
          async
        />
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
