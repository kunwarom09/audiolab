const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iloveaudios.com';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

export const metadata = {
  title: 'Song Finder – Identify Songs from Reels & Videos | ILoveAudios',
  description: 'Find the song used in an Instagram Reel, TikTok, Facebook Reel, or Snapchat video. Paste a video link into ILoveAudios Song Finder and identify the song and artist.',
  keywords: [
    'song finder',
    'song finder from video',
    'song finder from reel',
    'identify song from video',
    'identify song from Instagram Reel',
    'find song from TikTok',
    'find song from Facebook Reel',
    'identify music from video',
    'music finder',
    'song identifier',
    'find a song by video'
  ],
  alternates: {
    canonical: `${siteUrl}/tools/song-extractor`,
  },
  openGraph: {
    title: 'Song Finder – Identify Songs from Reels & Videos | ILoveAudios',
    description: 'Find the song used in an Instagram Reel, TikTok, Facebook Reel, or Snapchat video. Paste a video link into ILoveAudios Song Finder and identify the song and artist.',
    url: `${siteUrl}/tools/song-extractor`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Song Finder – Identify Songs from Reels & Videos | ILoveAudios',
    description: 'Find the song used in an Instagram Reel, TikTok, Facebook Reel, or Snapchat video. Paste a video link into ILoveAudios Song Finder and identify the song and artist.',
  },
};

export default function SongExtractorLayout({ children }) {
  return children;
}
