# 🎵 iLoveAudios — Free Online Audio Tools, Converters & AI Song Finder

**iLoveAudios** is a free web-based suite of audio converters, video-to-audio extractors, and AI-powered song identifier that identifies background music, retrieves complete song metadata, displays synchronized lyrics, embeds official YouTube music videos, and enables high-quality MP3 downloads from **Instagram Reels, Facebook Reels, TikTok videos, and Snapchat Spotlight links**.

---

## 🌟 Overview & Key Features

SongExtractor combines acoustic audio fingerprinting, natural language text extraction, and multi-API metadata synthesis to deliver a seamless Shazam-like experience on the web.

- 🎧 **Shazam Acoustic Engine**: Uses `shazamio` to fingerprint raw audio streams extracted from social media videos.
- 🔄 **Multi-Tiered Fallback System**: If Shazam fingerprinting fails (e.g. remix, voiceover, low volume), the system falls back to text candidate extraction from captions/titles, LRCLIB API lookups, and YouTube metadata parsing.
- 📜 **Full Synchronized Lyrics**: Displays complete song lyrics with real-time text searching and one-click copy to clipboard.
- 🎬 **Official YouTube Video Embed**: Automatically discovers and embeds the official music video with direct playback.
- 📥 **Direct 192kbps MP3 Downloader**: On-demand audio extraction and MP3 file download.
- 📜 **Extraction History Drawer**: Saves up to 20 past extractions locally in browser storage with instant reload capabilities.
- 🌓 **Dynamic Theme System**: Modern glassmorphism UI supporting both dark mode and light mode.
- 🔒 **Guest Trial Quota & Auth**: 3-extraction trial limit for guest users with integrated Google OAuth / Email authentication modal.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User([User Browser]) -->|Paste URL / Query| Frontend[Next.js 16 Frontend]
    Frontend -->|POST /api/extract| NextAPI[Next.js API Routes]
    NextAPI -->|POST /api/extract| Flask[Python 3 Flask Backend]
    
    subgraph "Backend Engine (Flask :5000)"
        Flask --> YtDlp[yt-dlp Audio Downloader]
        YtDlp --> Ffmpeg[FFmpeg / static-ffmpeg]
        Ffmpeg --> TempAudio[Temp MP3 Audio]
        TempAudio --> Shazam[Shazam API / shazamio]
        
        Shazam -->|Success| Metadata[Song Metadata & Lyrics]
        Shazam -->|No Match| TextNLP[Caption NLP Candidate Extractor]
        TextNLP --> LRCLIB[LRCLIB Lyrics API]
        LRCLIB -->|No Match| YTSearch[YouTube Metadata Fallback]
        
        Metadata --> YTVideo[YouTube Official Video Search]
        LRCLIB --> YTVideo
        YTSearch --> YTVideo
    end

    Backend Engine (Flask :5000) -->|JSON Response| NextAPI
    NextAPI -->|JSON Response| Frontend
    Frontend -->|GET /api/download| DownloadRoute[Next.js Download Route]
    DownloadRoute -->|GET /api/download| Flask
    Flask -->|Stream MP3| User
```

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 16.2.11 (React 19.2.4) using App Router
- **Styling**: Tailwind CSS v4 with custom Glassmorphism & Shazam dark design tokens (`globals.css`)
- **Iconography**: Lucide React (`lucide-react`) + SVG platform icons
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`) with LocalStorage persistence

### **Backend**
- **Server**: Python 3 Flask with `flask-cors`
- **Audio Extraction**: `yt-dlp` with rotating User-Agent headers
- **Audio Processing**: `static-ffmpeg` and `tempfile`
- **Recognition**: `shazamio` (Shazam API wrapper)
- **Metadata & Lyrics**: LRCLIB API (`https://lrclib.net`)
- **Video Discovery**: YouTube Search (`ytsearch1` via `yt-dlp`)

---

## 📁 Repository Structure

```
SongExtractor/
├── backend/
│   ├── app.py                 # Flask REST API endpoints (/api/extract, /api/download, /api/auth)
│   └── extractor.py           # Core extraction engine (yt-dlp, Shazam, LRCLIB, YT fallbacks)
├── src/
│   ├── app/
│   │   ├── api/               # Next.js API route proxies
│   │   │   ├── auth/          # Google OAuth authentication routes
│   │   │   ├── download/      # Proxy for MP3 download requests
│   │   │   └── extract/       # Proxy for song extraction requests
│   │   ├── favicon.ico        # Site favicon
│   │   ├── globals.css        # Core design tokens, glassmorphism, animations
│   │   ├── layout.js          # Root HTML layout & font settings
│   │   ├── page.js            # Main application page & state coordinator
│   │   ├── robots.js          # SEO Robots configuration
│   │   └── sitemap.js         # SEO Sitemap generator
│   └── components/
│       ├── ExtractionHistory.jsx # History drawer slide-over component
│       ├── FaqSection.jsx        # FAQ Accordion component
│       ├── Header.jsx            # Top navigation header with theme & auth state
│       ├── HeroCard.jsx          # Shazam-style hero section container
│       ├── LoginModal.jsx        # Auth modal (Google OAuth & Email login)
│       ├── LyricsViewer.jsx      # Line-numbered lyrics display with copy/search
│       ├── OfficialVideoCard.jsx # Embedded YouTube player card
│       ├── ProgressTracker.jsx   # Animated extraction progress indicator
│       ├── ReelInput.jsx         # Input field with URL validation & sample buttons
│       └── SongResultCard.jsx    # Comprehensive song result presentation card
├── public/                    # Static public assets
├── .env.local                 # Local environment variables
├── AGENTS.md                  # Project agent guidelines
├── package.json               # Frontend dependencies & scripts
├── run.sh                     # Full stack launcher script (Flask + Next.js)
└── README.md                  # Application documentation
```

---

## ⚡ API Endpoints Reference

### **Next.js Proxy API Routes**

| Route | Method | Description |
| :--- | :--- | :--- |
| `/api/extract` | `POST` | Forwards social reel URL or query to Flask backend |
| `/api/download` | `GET / POST` | Proxies MP3 download request to Flask backend |
| `/api/auth/google` | `GET` | Initiates Google OAuth sign-in flow |
| `/api/auth/google/callback` | `GET` | Handles Google OAuth callback code verification |

### **Python Flask Backend (`http://localhost:5000`)**

| Route | Method | Request Body / Parameters | Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | None | Returns backend service status and version |
| `/api/extract` | `POST` | `{ "url": "https://..." }` | Processes reel audio and returns full song JSON |
| `/api/download` | `GET` | `?title=...&artist=...&video_url=...` | Streams high-quality MP3 file attachment |
| `/api/auth/google/verify` | `POST` | `{ "email": "...", "name": "..." }` | Verifies user session and returns JWT token |

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js**: v18.0.0 or higher
- **Python**: v3.9 or higher
- **FFmpeg**: Handled automatically via `static-ffmpeg` Python package

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SongExtractor
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   Ensure your Python environment has the required packages:
   ```bash
   pip install flask flask-cors yt-dlp static-ffmpeg shazamio requests
   ```

---

## 🏃 Running the Application

### **Option 1: Using the automated runner script (Recommended)**
```bash
chmod +x run.sh
./run.sh
```
This script launches both the Python Flask Backend (`http://localhost:5000`) and the Next.js Dev Server (`http://localhost:3000`) in parallel.

### **Option 2: Running servers manually**

**Terminal 1 — Python Flask Backend**:
```bash
python3 backend/app.py
```

**Terminal 2 — Next.js Frontend**:
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔒 Guest Limits & Authentication

- Unauthenticated guest users are allowed up to **3 free extractions**.
- Upon reaching 3 extractions, the app automatically presents the **Login Modal**.
- Users can authenticate via **Google OAuth** or **Email/Password**.
- Once logged in, extractions are unlimited and saved to user session storage.

---

## 📄 License & Credits

- **Shazam Recognition**: Powered by [`shazamio`](https://github.com/dotX20/shazamio)
- **Audio Extraction**: Powered by [`yt-dlp`](https://github.com/yt-dlp/yt-dlp)
- **Lyrics Engine**: Powered by [`LRCLIB`](https://lrclib.net/)
