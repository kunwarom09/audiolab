const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

export const metadata = {
  title: 'AI Song Finder & Reel Audio Extractor — Free Online Tool',
  description: 'Identify background songs from Instagram Reels, TikTok videos, Facebook Reels, and Snapchat Spotlight links instantly. Retrieve full synchronized lyrics and download high-quality MP3s.',
  keywords: [
    'song finder',
    'reel song extractor',
    'instagram reel audio downloader',
    'tiktok song finder',
    'identify song from video',
    'find song in video',
    'extract audio from reel',
    'shazam online',
    'free song identifier'
  ],
  alternates: {
    canonical: `${siteUrl}/tools/song-extractor`,
  },
  openGraph: {
    title: 'AI Song Finder & Reel Audio Extractor — iLoveAudios',
    description: 'Identify background songs from Instagram Reels, TikTok videos, Facebook Reels, and Snapchat Spotlight links instantly. Retrieve synchronized lyrics and download MP3s.',
    url: `${siteUrl}/tools/song-extractor`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Song Finder & Reel Audio Extractor — iLoveAudios',
    description: 'Extract and identify background music from Instagram Reels, TikTok, and Facebook videos for free.',
  },
};

export default function SongExtractorLayout({ children }) {
  return children;
}
