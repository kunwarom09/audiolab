import os
import sys
import uuid
import asyncio
import tempfile
import re
import urllib.parse
import requests
import yt_dlp
import static_ffmpeg

# Ensure static ffmpeg binary paths are set up before importing Shazam / pydub
try:
    static_ffmpeg.add_paths()
except Exception as e:
    print(f"Warning adding static_ffmpeg paths: {e}")

from shazamio import Shazam

class SongExtractor:
    def __init__(self):
        self.shazam = Shazam()

    def download_reel_audio(self, reel_url: str):
        """
        Downloads audio stream from Reel, TikTok, Snapchat, or Video URL using yt-dlp.
        Returns (audio_path, video_info_dict).
        """
        temp_dir = tempfile.gettempdir()
        unique_id = str(uuid.uuid4())[:8]
        output_template = os.path.join(temp_dir, f"reel_song_{unique_id}.%(ext)s")

        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        ]

        last_exception = None

        for ua in user_agents:
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': output_template,
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
                'quiet': True,
                'no_warnings': True,
                'nocheckcertificate': True,
                'user_agent': ua,
                'headers': {
                    'User-Agent': ua,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                }
            }

            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(reel_url, download=True)
                    audio_path = os.path.join(temp_dir, f"reel_song_{unique_id}.mp3")
                    if not os.path.exists(audio_path):
                        for ext in ['mp3', 'm4a', 'wav', 'opus', 'aac']:
                            possible = os.path.join(temp_dir, f"reel_song_{unique_id}.{ext}")
                            if os.path.exists(possible):
                                audio_path = possible
                                break

                    if os.path.exists(audio_path):
                        return audio_path, info
            except Exception as e:
                last_exception = e
                continue

        raise last_exception or Exception("Failed to download audio from provided reel/video link.")

    def download_song_mp3(self, title: str, artist: str, video_url: str = None) -> str:
        """
        Downloads high-quality MP3 audio of the song using yt-dlp.
        Returns local MP3 file path.
        """
        temp_dir = tempfile.gettempdir()
        clean_filename = re.sub(r'[^\w\s-]', '', f"{artist} - {title}").strip() or "song"
        unique_id = str(uuid.uuid4())[:8]
        output_template = os.path.join(temp_dir, f"{clean_filename}_{unique_id}.%(ext)s")

        query = video_url if (video_url and 'youtube.com' in video_url) else f"ytsearch1:{artist} {title} official audio"

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_template,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'quiet': True,
            'no_warnings': True,
            'nocheckcertificate': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.extract_info(query, download=True)
            mp3_path = os.path.join(temp_dir, f"{clean_filename}_{unique_id}.mp3")
            if os.path.exists(mp3_path):
                return mp3_path

            for ext in ['mp3', 'm4a', 'opus', 'wav']:
                possible = os.path.join(temp_dir, f"{clean_filename}_{unique_id}.{ext}")
                if os.path.exists(possible):
                    return possible

        raise FileNotFoundError("Could not generate MP3 audio file.")

    async def recognize_song_from_audio(self, audio_path: str):
        """
        Recognizes song details using Shazam API fingerprinting.
        """
        result = await self.shazam.recognize(audio_path)
        return result

    def get_lrclib_lyrics(self, title: str, artist: str) -> str:
        """
        Fetches fallback lyrics from LRCLIB API.
        """
        try:
            query = f"{artist} {title}".strip()
            encoded_query = urllib.parse.quote(query)
            url = f"https://lrclib.net/api/search?q={encoded_query}"
            res = requests.get(url, timeout=5)
            if res.status_code == 200:
                data = res.json()
                if data and isinstance(data, list) and len(data) > 0:
                    for track in data:
                        plain_lyrics = track.get("plainLyrics")
                        synced_lyrics = track.get("syncedLyrics")
                        if plain_lyrics and len(plain_lyrics.strip()) > 0:
                            return plain_lyrics.strip()
                        if synced_lyrics and len(synced_lyrics.strip()) > 0:
                            lines = []
                            for line in synced_lyrics.splitlines():
                                if ']' in line:
                                    lines.append(line.split(']', 1)[1].strip())
                                else:
                                    lines.append(line.strip())
                            return "\n".join(lines).strip()
        except Exception as e:
            print(f"LRCLIB lyrics lookup error: {e}")
        return None

    def search_official_youtube_video(self, title: str, artist: str) -> dict:
        """
        Searches YouTube for official music video using ytsearch1.
        """
        query = f"ytsearch1:{artist} {title} official music video"
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': True,
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(query, download=False)
                if 'entries' in info and len(info['entries']) > 0:
                    entry = info['entries'][0]
                    video_id = entry.get('id')
                    video_url = entry.get('url') or f"https://www.youtube.com/watch?v={video_id}"
                    video_title = entry.get('title')
                    thumbnail = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
                    return {
                        'video_id': video_id,
                        'url': video_url,
                        'title': video_title,
                        'thumbnail': thumbnail,
                        'embed_url': f"https://www.youtube.com/embed/{video_id}"
                    }
        except Exception as e:
            print(f"YouTube video search error: {e}")

        search_query_encoded = urllib.parse.quote(f"{artist} {title} official music video")
        return {
            'video_id': None,
            'url': f"https://www.youtube.com/results?search_query={search_query_encoded}",
            'title': f"{artist} - {title} (Official Music Video)",
            'thumbnail': None,
            'embed_url': None
        }

    def generate_spotify_link(self, title: str, artist: str, track: dict = None) -> dict:
        """
        Generates Spotify track link or search URL.
        """
        spotify_url = None
        if track and isinstance(track, dict):
            hub = track.get('hub', {})
            providers = hub.get('providers', [])
            for provider in providers:
                if provider.get('type') == 'SPOTIFY':
                    actions = provider.get('actions', [])
                    for act in actions:
                        uri = act.get('uri')
                        if uri:
                            if uri.startswith('spotify:track:'):
                                track_id = uri.split(':')[-1]
                                spotify_url = f"https://open.spotify.com/track/{track_id}"
                                break
                            elif uri.startswith('http'):
                                spotify_url = uri
                                break
                if spotify_url:
                    break

        clean_artist = re.sub(r'[^\w\s]', '', artist).strip()
        clean_title = re.sub(r'[^\w\s]', '', title).strip()
        query_str = f"{clean_artist} {clean_title}".strip() or f"{artist} {title}".strip()
        search_query_encoded = urllib.parse.quote(query_str)
        search_url = f"https://open.spotify.com/search/{search_query_encoded}"

        final_url = spotify_url or search_url
        return {
            'url': final_url,
            'search_url': search_url,
            'title': f"{artist} - {title} on Spotify"
        }

    def parse_youtube_title(self, yt_title: str):
        """
        Parses clean song title, artist list, and album name from YouTube title.
        """
        parts = [p.strip() for p in yt_title.split('|') if p.strip()]
        if not parts:
            return yt_title, "Various Artists", "Single"

        song_title = parts[0]
        artists = []
        album = "Single"

        for p in parts[1:]:
            p_lower = p.lower()
            if any(k in p_lower for k in ['official video', 'official audio', 'hd', 'full video', 'full audio', 'lyrical', 'video song']):
                continue
            elif 'movie' in p_lower or 'film' in p_lower:
                continue
            elif album == "Single" and len(p.split()) <= 3 and not any(c in p_lower for c in ['&', 'feat', 'ft']):
                album = p
            else:
                artists.append(p)

        artist_str = ", ".join(artists) if artists else "Various Artists"
        return song_title, artist_str, album

    def extract_song_candidates_from_text(self, text: str, uploader: str = "") -> list:
        """
        Extracts high-probability candidate song titles from social media captions/titles.
        """
        if not text:
            return []

        clean_text = re.sub(r'https?://\S+', '', text)
        clean_text = re.sub(r'#\w+', '', clean_text)
        clean_text = re.sub(r'\d+[\d,.]*\s*(reactions|likes|comments|views|shares|plays|followers)\s*\|?', '', clean_text, flags=re.IGNORECASE)

        candidates = []

        # 1. Quoted titles "Title" or 'Title'
        quoted = re.findall(r'["\u201c\u201d\u2018\u2019\']([^"\u201c\u201d\u2018\u2019\']{3,60})["\u201c\u201d\u2018\u2019\']', text)
        for q in quoted:
            candidates.append(q.strip())

        # 2. Extract multi-word Capitalized phrases (e.g. "Pirati Ko Mitho Trisana")
        cap_phrases = re.findall(r'\b[A-Z][a-zA-Z0-9\']*(?:\s+[A-Z][a-zA-Z0-9\']*)+\b', clean_text)
        for cp in cap_phrases:
            cp_clean = cp.strip()
            if uploader and uploader.lower() in cp_clean.lower():
                continue
            if len(cp_clean) >= 3 and cp_clean.lower() not in {'there are', 'nepali cinema', 'movie song', 'official video'}:
                candidates.append(cp_clean)

        # 3. Clauses split by |, -, –, —, •, :, \n, comma, period
        clauses = re.split(r'[|\-–—•:\n,\.]', clean_text)
        for c in clauses:
            c_clean = c.strip()
            if uploader and uploader.lower() in c_clean.lower():
                c_clean = re.sub(re.escape(uploader), '', c_clean, flags=re.IGNORECASE).strip()

            if 3 <= len(c_clean) <= 60:
                if not any(w in c_clean.lower() for w in ['there are', 'remains one of', 'where every', 'brings back', 'revisiting']):
                    candidates.append(c_clean)

        # Priority deduplication
        seen = set()
        final_candidates = []
        for cand in candidates:
            norm = cand.lower().strip()
            if norm and norm not in seen and len(norm) >= 3:
                seen.add(norm)
                final_candidates.append(cand.strip())

        return final_candidates

    def search_song_by_query(self, query: str, original_url: str = None) -> dict:
        """
        Fallback search for song metadata using LRCLIB and YouTube.
        """
        try:
            clean_q = re.sub(r'https?://[^\s]+', '', query)
            clean_q = clean_q.replace('@', '').replace('/', ' ').replace('_', ' ').replace('-', ' ').strip()
            
            if not clean_q:
                clean_q = query

            encoded_query = urllib.parse.quote(clean_q)
            url = f"https://lrclib.net/api/search?q={encoded_query}"
            res = requests.get(url, timeout=5)
            if res.status_code == 200:
                data = res.json()
                if data and isinstance(data, list) and len(data) > 0:
                    track = data[0]
                    song_title = track.get("trackName", clean_q)
                    artist_name = track.get("artistName", "Unknown Artist")
                    album = track.get("albumName", "Single")
                    lyrics = track.get("plainLyrics") or "Lyrics unavailable."

                    official_video = self.search_official_youtube_video(song_title, artist_name)
                    spotify_link = self.generate_spotify_link(song_title, artist_name)

                    return {
                        'success': True,
                        'song': {
                            'title': song_title,
                            'artist': artist_name,
                            'album': album,
                            'genre': 'Music',
                            'release_year': None,
                            'label': None,
                            'cover_art': official_video.get('thumbnail'),
                            'preview_url': None,
                            'lyrics': lyrics,
                            'shazam_url': None,
                            'spotify_url': spotify_link.get('url'),
                        },
                        'official_video': official_video,
                        'spotify': spotify_link,
                        'reel_source': {
                            'url': original_url or query,
                            'title': f"Track metadata: {song_title} - {artist_name}",
                            'uploader': 'ReelSong Extractor'
                        }
                    }
        except Exception as e:
            print(f"LRCLIB search error for '{query}': {e}")

        # YouTube metadata fallback
        try:
            official_video = self.search_official_youtube_video(query, "")
            if official_video and official_video.get('title'):
                raw_yt_title = official_video.get('title')
                song_title, artist_name, album_name = self.parse_youtube_title(raw_yt_title)

                lyrics = self.get_lrclib_lyrics(song_title, artist_name)
                if not lyrics:
                    lyrics = None

                spotify_link = self.generate_spotify_link(song_title, artist_name)

                return {
                    'success': True,
                    'song': {
                        'title': song_title,
                        'artist': artist_name,
                        'album': album_name,
                        'genre': 'Music',
                        'release_year': None,
                        'label': None,
                        'cover_art': official_video.get('thumbnail'),
                        'preview_url': None,
                        'lyrics': lyrics,
                        'shazam_url': None,
                        'spotify_url': spotify_link.get('url'),
                    },
                    'official_video': official_video,
                    'spotify': spotify_link,
                    'reel_source': {
                        'url': original_url or query,
                        'title': song_title,
                        'uploader': 'ReelSong Extractor'
                    }
                }
        except Exception as e:
            print(f"Final YouTube fallback error for '{query}': {e}")

        return None

    def extract_platform_query(self, url: str) -> str:
        """
        Extracts searchable terms from Instagram, Facebook, TikTok, Snapchat, or YouTube links.
        """
        parsed = urllib.parse.urlparse(url)
        path = parsed.path
        
        ignored = {'video', 'videos', 'reel', 'reels', 'p', 'watch', 'spotlight', 'story', 'status', 'v', 'shorts', 'add'}

        parts = [p for p in path.split('/') if p and p.lower() not in ignored and not p.isdigit()]
        if parts:
            clean_parts = [p.replace('@', '').replace('_', ' ').replace('-', ' ') for p in parts]
            return " ".join(clean_parts).strip()

        return ""

    async def process_reel(self, reel_url: str) -> dict:
        """
        Full extraction pipeline with audio fingerprinting and fallback.
        """
        audio_path = None
        video_info = {}

        try:
            is_url = reel_url.startswith("http://") or reel_url.startswith("https://")
            
            if not is_url:
                search_res = self.search_song_by_query(reel_url)
                if search_res:
                    return search_res
                raise Exception(f"No results found for query '{reel_url}'")

            # Step 1: Attempt audio extraction via yt-dlp
            try:
                audio_path, video_info = self.download_reel_audio(reel_url)
            except Exception as download_err:
                print(f"Audio download failed for {reel_url}: {download_err}")
                
                extracted_query = self.extract_platform_query(reel_url)
                if extracted_query and len(extracted_query.strip()) > 0:
                    fallback_result = self.search_song_by_query(extracted_query, reel_url)
                    if fallback_result:
                        return fallback_result

                fallback_result = self.search_song_by_query(reel_url, reel_url)
                if fallback_result:
                    return fallback_result

                raise Exception("Could not extract audio directly from this link. Please ensure the post is public, or try searching by song name.")

            # Step 2: Shazam Audio Fingerprint Recognition
            shazam_data = await self.recognize_song_from_audio(audio_path)

            track = shazam_data.get('track', {})
            reel_title = video_info.get('title', 'Unknown Audio')
            uploader = video_info.get('uploader', 'Creator')

            if not track:
                print(f"Shazam returned no track fingerprint match for {reel_url}. Trying candidate text extraction from title: {reel_title}")

                # Extract candidate song phrases from caption/title
                candidates = self.extract_song_candidates_from_text(reel_title, uploader)
                for cand in candidates:
                    fallback_res = self.search_song_by_query(cand, reel_url)
                    if fallback_res:
                        return fallback_res

                # Fallback: Query full reel title
                fallback_res = self.search_song_by_query(f"{uploader} {reel_title}", reel_url)
                if fallback_res:
                    return fallback_res

                return {
                    'success': False,
                    'message': 'Audio extracted, but could not identify song from fingerprint.',
                    'reel_info': {
                        'title': reel_title,
                        'uploader': uploader,
                        'webpage_url': reel_url
                    }
                }

            song_title = track.get('title', 'Unknown Title')
            artist_name = track.get('subtitle', 'Unknown Artist')

            images = track.get('images', {})
            cover_art = images.get('coverarthdq') or images.get('coverart') or images.get('background')

            sections = track.get('sections', [])
            lyrics = None
            album = None
            genre = track.get('genres', {}).get('primary')
            label = None
            release_year = None

            for section in sections:
                if section.get('type') == 'LYRICS':
                    lyric_lines = section.get('text', [])
                    if lyric_lines:
                        lyrics = "\n".join(lyric_lines)
                elif section.get('type') == 'SONG':
                    metadata = section.get('metadata', [])
                    for item in metadata:
                        title_key = item.get('title', '').lower()
                        if title_key == 'album':
                            album = item.get('text')
                        elif title_key == 'label':
                            label = item.get('text')
                        elif title_key == 'released':
                            release_year = item.get('text')

            if not lyrics:
                lyrics = self.get_lrclib_lyrics(song_title, artist_name)

            if not lyrics:
                lyrics = None

            # Step 3: Find Official YouTube Music Video Link and Spotify Link
            official_video = self.search_official_youtube_video(song_title, artist_name)
            spotify_link = self.generate_spotify_link(song_title, artist_name, track=track)

            preview_url = None
            hub = track.get('hub', {})
            actions = hub.get('actions', [])
            for action in actions:
                if action.get('type') == 'uri' and 'uri' in action:
                    preview_url = action.get('uri')
                    break

            return {
                'success': True,
                'song': {
                    'title': song_title,
                    'artist': artist_name,
                    'album': album or 'Single',
                    'genre': genre or 'Music',
                    'release_year': release_year,
                    'label': label,
                    'cover_art': cover_art,
                    'preview_url': preview_url,
                    'lyrics': lyrics,
                    'shazam_url': track.get('url'),
                    'spotify_url': spotify_link.get('url'),
                },
                'official_video': official_video,
                'spotify': spotify_link,
                'reel_source': {
                    'url': reel_url,
                    'title': video_info.get('title', 'Reel Video'),
                    'uploader': video_info.get('uploader', 'Creator')
                }
            }

        finally:
            if audio_path and os.path.exists(audio_path):
                try:
                    os.remove(audio_path)
                except Exception as e:
                    print(f"Error removing temp audio file: {e}")

extractor_instance = SongExtractor()
