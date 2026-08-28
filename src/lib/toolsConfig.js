export const TOOLS = {
  'song-extractor': {
    slug: 'song-extractor',
    title: 'Song Finder – Identify Any Song from a Video',
    shortTitle: 'Song Finder',
    description: 'Find the song used in an Instagram Reel, TikTok, Facebook Reel, or Snapchat video. Paste a video link into ILoveAudios Song Finder and identify the song and artist.',
    icon: 'Music2',
    color: 'from-blue-600 to-cyan-500',
    category: 'AI Tools',
    isCustomPage: true,
    badge: 'Popular',
    faq: [
      {
        q: "How does the AI Song Extractor work?",
        a: "It downloads the audio from your provided reel or video link, extracts a fingerprint, and matches it against Shazam's acoustic database. If there's no match, it falls back to parsing captions and scanning lyrics APIs."
      },
      {
        q: "What social media platforms are supported?",
        a: "You can paste public links from Instagram Reels, TikTok, Facebook Reels, and Snapchat Spotlight."
      }
    ]
  },
  'mp3-to-wav': {
    slug: 'mp3-to-wav',
    title: 'MP3 to WAV Converter',
    shortTitle: 'MP3 → WAV',
    description: 'Convert MP3 audio files to high-fidelity lossless WAV format in seconds.',
    fromFormat: 'MP3',
    toFormat: 'WAV',
    icon: 'FileAudio',
    color: 'from-purple-600 to-indigo-500',
    category: 'Audio Converters',
    acceptedMimes: ['audio/mpeg', 'audio/mp3'],
    faq: [
      {
        q: "Will I lose audio quality converting MP3 to WAV?",
        a: "No. MP3 is lossy, while WAV is lossless. While converting to WAV cannot restore details lost in the original MP3 encoding, it preserves 100% of the current quality without any further compression."
      },
      {
        q: "What is the maximum file upload size?",
        a: "You can upload files up to 500MB per file with completely unlimited free conversions."
      }
    ]
  },
  'wav-to-mp3': {
    slug: 'wav-to-mp3',
    title: 'WAV to MP3 Converter',
    shortTitle: 'WAV → MP3',
    description: 'Convert raw WAV audio files to highly compressed, high-quality MP3 files.',
    fromFormat: 'WAV',
    toFormat: 'MP3',
    icon: 'FileAudio',
    color: 'from-indigo-600 to-blue-500',
    category: 'Audio Converters',
    acceptedMimes: ['audio/wav', 'audio/x-wav'],
    faq: [
      {
        q: "How can I get the best audio quality for my MP3 output?",
        a: "We recommend selecting 320 kbps in the advanced settings to ensure the highest possible quality for the compressed MP3 file."
      }
    ]
  },
  'flac-to-mp3': {
    slug: 'flac-to-mp3',
    title: 'FLAC to MP3 Converter',
    shortTitle: 'FLAC → MP3',
    description: 'Compress lossless FLAC files into universally compatible MP3 audio format.',
    fromFormat: 'FLAC',
    toFormat: 'MP3',
    icon: 'FileAudio',
    color: 'from-emerald-600 to-teal-500',
    category: 'Audio Converters',
    acceptedMimes: ['audio/flac', 'audio/x-flac'],
    faq: [
      {
        q: "Why convert FLAC to MP3?",
        a: "While FLAC provides lossless quality, it results in large file sizes and isn't supported by all devices. MP3 is highly compatible and much smaller, making it perfect for mobile storage."
      }
    ]
  },
  'aac-to-mp3': {
    slug: 'aac-to-mp3',
    title: 'AAC to MP3 Converter',
    shortTitle: 'AAC → MP3',
    description: 'Easily convert Apple AAC files to standard MP3 format.',
    fromFormat: 'AAC',
    toFormat: 'MP3',
    icon: 'FileAudio',
    color: 'from-amber-500 to-orange-500',
    category: 'Audio Converters',
    acceptedMimes: ['audio/aac', 'audio/x-aac', 'audio/m4a'],
    faq: [
      {
        q: "Is AAC better than MP3?",
        a: "AAC generally offers better sound quality than MP3 at the same bitrate, but MP3 enjoys broader support across older hardware and legacy media players."
      }
    ]
  },
  'ogg-to-mp3': {
    slug: 'ogg-to-mp3',
    title: 'OGG to MP3 Converter',
    shortTitle: 'OGG → MP3',
    description: 'Convert OGG Vorbis audio files to standard MP3 format.',
    fromFormat: 'OGG',
    toFormat: 'MP3',
    icon: 'FileAudio',
    color: 'from-pink-600 to-rose-500',
    category: 'Audio Converters',
    acceptedMimes: ['audio/ogg', 'audio/x-ogg', 'application/ogg'],
    faq: [
      {
        q: "Is the OGG conversion process free?",
        a: "Yes, all OGG to MP3 conversions are 100% free with premium options available for batch processing."
      }
    ]
  },
  'm4a-to-mp3': {
    slug: 'm4a-to-mp3',
    title: 'M4A to MP3 Converter',
    shortTitle: 'M4A → MP3',
    description: 'Convert MPEG-4 M4A audio files to standard MP3 format.',
    fromFormat: 'M4A',
    toFormat: 'MP3',
    icon: 'FileAudio',
    color: 'from-cyan-600 to-blue-500',
    category: 'Audio Converters',
    acceptedMimes: ['audio/m4a', 'audio/x-m4a', 'audio/mp4'],
    faq: [
      {
        q: "Can I convert M4A files from iTunes?",
        a: "Yes, standard M4A files can be converted easily. However, DRM-protected files (.m4p) from Apple Music are not supported."
      }
    ]
  },
  'mp4-to-mp3': {
    slug: 'mp4-to-mp3',
    title: 'MP4 to MP3 Converter',
    shortTitle: 'MP4 → MP3',
    description: 'Extract high-quality MP3 audio track from MP4 video files.',
    introduction: 'Convert MP4 to MP3 online with ILOVEAUDIOS. Extract the audio from your MP4 video and save it as an MP3 file. Upload your MP4 file, start the conversion, and download the resulting audio.',
    fromFormat: 'MP4',
    toFormat: 'MP3',
    icon: 'Video',
    color: 'from-red-600 to-pink-500',
    category: 'Video to Audio',
    acceptedMimes: ['video/mp4'],
    howTo: [
      {
        step: 1,
        title: 'Upload your MP4 file',
        text: 'Drag and drop your MP4 video into the converter or select a file from your device.'
      },
      {
        step: 2,
        title: 'Start the conversion',
        text: 'ILOVEAUDIOS extracts the audio track from your MP4 video and converts it into MP3 format.'
      },
      {
        step: 3,
        title: 'Download your MP3',
        text: 'Once processing is complete, download the resulting MP3 audio file.'
      }
    ],
    whyConvert: {
      title: 'Why Convert MP4 to MP3?',
      description: 'MP4 files contain both video and audio. If you only need the audio—for example, for listening to a recording, saving a soundtrack, or reducing file size—converting the MP4 to MP3 removes the video portion and produces an audio-only file.',
      benefits: [
        {
          title: 'Reduce File Size by 90%+',
          text: 'Stripping out high-resolution video frames reduces file weight drastically, saving device storage and bandwidth.'
        },
        {
          title: 'Save Soundtracks & Audio',
          text: 'Capture music, live concert performances, background tracks, and commentary into standalone audio.'
        },
        {
          title: 'Portable Audio on Any Device',
          text: 'Listen to lectures, podcasts, webinars, and audio notes anywhere—even in background mode or on car stereos.'
        }
      ]
    },
    features: [
      {
        icon: 'Sparkles',
        title: 'Studio Quality (Up to 320kbps)',
        description: 'Export pristine audio with configurable bitrates from 128kbps up to studio-grade 320kbps.'
      },
      {
        icon: 'Zap',
        title: 'Fast FFmpeg Engine',
        description: 'Accelerated conversion extracts and encodes audio streams in seconds without lagging.'
      },
      {
        icon: 'Globe',
        title: '100% Free & Online',
        description: 'No software installation, no watermarks, and no mandatory account registration required.'
      },
      {
        icon: 'ShieldCheck',
        title: 'Secure & Auto-Deleted',
        description: 'Files are processed in secure temporary storage and automatically deleted shortly after conversion.'
      },
      {
        icon: 'Sliders',
        title: 'Advanced Customization',
        description: 'Customize audio sample rates (44.1kHz / 48kHz), channels (stereo/mono), and volume normalization.'
      },
      {
        icon: 'Smartphone',
        title: 'Universal Compatibility',
        description: 'Your exported MP3 files are universally playable on iPhone, Android, Mac, Windows, and media players.'
      }
    ],
    comparison: {
      title: 'MP4 vs MP3',
      description: 'Compare the multimedia video container with the world standard audio format:',
      headers: ['Attribute', 'MP4 (Video Container)', 'MP3 (Audio Format)'],
      rows: [
        {
          feature: 'File Format Type',
          format1: 'Multimedia Container (Video + Audio + Text)',
          format2: 'Compressed Audio Bitstream'
        },
        {
          feature: 'Contained Media',
          format1: 'Visual Frames, Audio Tracks, Subtitles',
          format2: 'Pure Sound / Music / Voice Only'
        },
        {
          feature: 'Typical File Size',
          format1: 'Large (typically 50MB – 1GB+)',
          format2: 'Compact (typically 3MB – 15MB)'
        },
        {
          feature: 'Primary Use Case',
          format1: 'Watching movies, tutorials, video clips',
          format2: 'Music listening, podcasts, audiobooks'
        },
        {
          feature: 'Playback Devices',
          format1: 'Devices with video screens & players',
          format2: 'Universal (every phone, car stereo, audio player)'
        },
        {
          feature: 'Audio Compression',
          format1: 'Usually AAC or MP3 within container',
          format2: 'MPEG-1 Audio Layer III'
        }
      ]
    },
    faq: [
      {
        q: 'What is an MP4 to MP3 converter?',
        a: 'An MP4 to MP3 converter is an online tool that extracts the sound stream from an MP4 video file, discards the visual video frames, and encodes the audio into a standalone MP3 audio file.'
      },
      {
        q: 'How do I convert MP4 to MP3?',
        a: 'Upload your MP4 file by dragging and dropping it into the converter box, select your preferred audio bitrate (e.g. 192kbps or 320kbps), click "Convert File to MP3", and download the finished MP3 audio track.'
      },
      {
        q: 'Is the MP4 to MP3 converter free?',
        a: 'Yes! ILOVEAUDIOS provides 100% free MP4 to MP3 conversions with no credit cards, subscriptions, or forced account registration required.'
      },
      {
        q: 'What MP4 files are supported?',
        a: 'You can upload all standard MP4 video formats recorded on iPhones, Android devices, DSLR cameras, screen capture utilities, Zoom meetings, or downloaded online videos.'
      },
      {
        q: 'What MP3 quality can I choose?',
        a: 'You can select custom output bitrates ranging from standard 128kbps, high-quality 192kbps (default), to studio-grade 320kbps, along with custom sample rates (44.1kHz / 48kHz) and stereo/mono channels.'
      },
      {
        q: 'How large can my MP4 file be?',
        a: 'You can upload video files up to 500MB per file with completely unlimited free conversions.'
      },
      {
        q: 'Are my uploaded files stored?',
        a: 'No. Uploaded videos and converted MP3 files are processed in secure temporary storage solely to complete the conversion, and are automatically deleted shortly after processing.'
      }
    ],
    relatedTools: ['mov-to-mp3', 'webm-to-mp3', 'avi-to-mp3', 'm4a-to-mp3', 'wav-to-mp3', 'song-extractor']
  },
  'mov-to-mp3': {
    slug: 'mov-to-mp3',
    title: 'MOV to MP3 Converter',
    shortTitle: 'MOV → MP3',
    description: 'Convert Apple QuickTime MOV videos to MP3 audio streams.',
    fromFormat: 'MOV',
    toFormat: 'MP3',
    icon: 'Video',
    color: 'from-violet-600 to-indigo-500',
    category: 'Video to Audio',
    acceptedMimes: ['video/quicktime'],
    faq: [
      {
        q: "Can I convert high definition MOV files?",
        a: "Yes, our engine extracts the raw audio track and ignores video frames, so even high resolution 4K MOV videos are processed quickly."
      }
    ]
  },
  'avi-to-mp3': {
    slug: 'avi-to-mp3',
    title: 'AVI to MP3 Converter',
    shortTitle: 'AVI → MP3',
    description: 'Convert classic AVI videos into compact MP3 audio files.',
    fromFormat: 'AVI',
    toFormat: 'MP3',
    icon: 'Video',
    color: 'from-sky-600 to-cyan-500',
    category: 'Video to Audio',
    acceptedMimes: ['video/x-msvideo', 'video/avi'],
    faq: [
      {
        q: "What AVI codecs are supported?",
        a: "We support all common AVI audio codecs (MP3, AC3, PCM, etc.) via our backend FFmpeg engine."
      }
    ]
  },
  'mkv-to-mp3': {
    slug: 'mkv-to-mp3',
    title: 'MKV to MP3 Converter',
    shortTitle: 'MKV → MP3',
    description: 'Extract multi-channel audio from MKV videos and convert to MP3.',
    fromFormat: 'MKV',
    toFormat: 'MP3',
    icon: 'Video',
    color: 'from-emerald-600 to-green-500',
    category: 'Video to Audio',
    acceptedMimes: ['video/x-matroska'],
    faq: [
      {
        q: "Will it select the correct audio stream from a multi-audio MKV?",
        a: "By default, our engine extracts the primary audio stream. If you need advanced selection, keep check of future upgrades."
      }
    ]
  },
  'webm-to-mp3': {
    slug: 'webm-to-mp3',
    title: 'WebM to MP3 Converter',
    shortTitle: 'WebM → MP3',
    description: 'Convert HTML5 WebM videos or audio clips to standard MP3.',
    fromFormat: 'WebM',
    toFormat: 'MP3',
    icon: 'Video',
    color: 'from-rose-600 to-amber-500',
    category: 'Video to Audio',
    acceptedMimes: ['video/webm', 'audio/webm'],
    faq: [
      {
        q: "Can I convert WebM files recorded on mobile screens?",
        a: "Yes. WebM format captured via browser or mobile recordings can be seamlessly converted to MP3."
      }
    ]
  }
};
