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

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.iloveaudios.com";
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

export const metadata = {
  title: {
    default: "iLoveAudios — Free Online Audio Tools & Converters",
    template: "%s | iLoveAudios",
  },
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
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder",
  },
  openGraph: {
    title: "iLoveAudios — Free Online Audio Tools & Converters",
    description: "Convert audio formats, extract audio from videos, search lyrics, and identify songs with iLoveAudios browser-based suite.",
    url: siteUrl,
    siteName: "iLoveAudios",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iLoveAudios — Free Online Audio Tools & Converters",
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
  const currentSiteUrl = siteUrl;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'iLoveAudios',
    url: currentSiteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${currentSiteUrl}/tools/{search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'iLoveAudios',
    url: currentSiteUrl,
    logo: `${currentSiteUrl}/icon.svg`
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '2.0.0',
    description: 'Free online audio tools and converters to convert, edit, and identify audio files.',
    url: currentSiteUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'AI Song Identification & Extraction from Reels, TikTok & Shorts',
      'MP4 to MP3 Audio Extraction',
      'MP4 to WAV Lossless Audio Extraction',
      'MOV to MP3 & MOV to WAV Audio Extraction',
      'AVI, MKV, WebM, 3GP, WMV to MP3 Converters',
      'MP3 to WAV & WAV to MP3 Conversion',
      'FLAC to MP3 & FLAC to WAV Audio Conversion',
      'M4A to MP3 & M4A to WAV Apple Audio Conversion',
      'AAC, OGG, WMA, OPUS, M4R Audio Converters',
      'Studio Quality 320kbps MP3 Bitrate Support',
      'Synchronized Song Lyrics Lookup',
      'Fast Cloud-Accelerated Audio Processing'
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c')
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AppClientWrapper>{children}</AppClientWrapper>
      </body>
    </html>
  );
}

