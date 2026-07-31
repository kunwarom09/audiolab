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

    def download_reel_video(self, reel_url: str, title: str = "video", artist: str = "unknown") -> str:
        """
        Downloads the full video from Reel, TikTok, Snapchat, or video URL using yt-dlp.
        Returns local video file path.
        """
        temp_dir = tempfile.gettempdir()
        clean_filename = re.sub(r'[^\w\s-]', '', f"{artist} - {title}").strip() or "video"
        unique_id = str(uuid.uuid4())[:8]
        output_template = os.path.join(temp_dir, f"{clean_filename}_{unique_id}.%(ext)s")

        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        ]

        last_exception = None

        for ua in user_agents:
            ydl_opts = {
                'format': 'bestvideo[ext=mp4][height<=720]+bestaudio[ext=m4a]/best[ext=mp4][height<=720]/best',
                'outtmpl': output_template,
                'merge_output_format': 'mp4',
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
                    ydl.extract_info(reel_url, download=True)
                    video_path = os.path.join(temp_dir, f"{clean_filename}_{unique_id}.mp4")
                    if not os.path.exists(video_path):
                        for ext in ['mp4', 'mkv', 'webm', 'mov']:
                            possible = os.path.join(temp_dir, f"{clean_filename}_{unique_id}.{ext}")
                            if os.path.exists(possible):
                                video_path = possible
                                break

                    if os.path.exists(video_path):
                        return video_path
            except Exception as e:
                last_exception = e
                continue

        raise last_exception or Exception("Failed to download video from provided link.")

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
            'extract_flat': False,
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(query, download=False)
                if 'entries' in info and len(info['entries']) > 0:
                    entry = info['entries'][0]
                    video_id = entry.get('id')
                    video_url = entry.get('url') or f"https://www.youtube.com/watch?v={video_id}"
                    video_title = entry.get('title')
                    video_description = entry.get('description')
                    thumbnail = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
                    return {
                        'video_id': video_id,
                        'url': video_url,
                        'title': video_title,
                        'description': video_description,
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
            'description': None,
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

    def extract_lyrics_from_description(self, description: str) -> str:
        """
        Parses lyrics from YouTube description text, matching common headers or lyric structures.
        """
        if not description:
            return None

        lines = description.splitlines()
        
        lyrics_markers = [
            r'\blyrics\b', r'\blyric\b', r'l\s*y\s*r\s*i\s*c\s*s', r'शब्द\s*[:ः]?', r'गीत\s*[:ः]?', 
            r'\blyrics\s*in\s*nepali\b', r'\blyrics\s*in\s*english\b', r'lyrics\s*-\s*', 
            r'lyricist\s*[:ः]?', r'lyrics\s*[:ः]'
        ]
        
        marker_index = -1
        for i, line in enumerate(lines):
            line_lower = line.lower().strip()
            if any(re.search(marker, line_lower) for marker in lyrics_markers):
                # If it's a credit line (contains colon and next lines also contain colons like a credit list), skip it
                has_colon_in_next = False
                non_empty_count = 0
                for j in range(i + 1, len(lines)):
                    next_line = lines[j].strip()
                    if not next_line:
                        continue
                    non_empty_count += 1
                    if ':' in next_line or 'ः' in next_line:
                        has_colon_in_next = True
                        break
                    if non_empty_count >= 3:
                        break
                if has_colon_in_next:
                    continue
                    
                marker_index = i
                break
                
        if marker_index != -1:
            extracted_lines = []
            consecutive_empty = 0
            for line in lines[marker_index + 1:]:
                stripped = line.strip()
                if any(k in stripped.lower() for k in [
                    'http://', 'https://', 'subscribe', 'follow on', 'facebook:', 'instagram:', 
                    'twitter:', 'singer:', 'vocal:', 'music:', 'composer:', 'arrange:', 
                    'director:', 'cast:', 'producer:', 'presents:', 'copyright', 'all rights'
                ]):
                    if len(extracted_lines) >= 4:
                        break
                    else:
                        continue
                        
                if not stripped:
                    consecutive_empty += 1
                    if consecutive_empty > 2 and len(extracted_lines) >= 4:
                        break
                    if extracted_lines:
                        extracted_lines.append("")
                    continue
                    
                consecutive_empty = 0
                extracted_lines.append(stripped)
                
            while extracted_lines and not extracted_lines[-1]:
                extracted_lines.pop()
                
            if len(extracted_lines) >= 4:
                return "\n".join(extracted_lines).strip()

        # Fallback: Heuristically look for blocks of lyric lines
        current_block = []
        best_block = []
        
        for line in lines:
            stripped = line.strip()
            line_lower = stripped.lower()
            
            is_lyric_like = (
                len(stripped) > 0 
                and 8 <= len(stripped) <= 80
                and not (':' in stripped or 'ः' in stripped)
                and '#' not in stripped
                and not any(k in line_lower for k in [
                    'http', 'subscribe', 'follow', 'cast', 'starring', 'singer', 
                    'music', 'vocal', 'directed', 'produced', 'rights reserved',
                    'copyright', 'audio on', 'download', 'stream', 'lyrics', 'शब्द', 
                    'credits', 'director', 'choreographer', 'editor', 'cinematographer', 'model',
                    'crbt', 'prbt', 'smart-tel', 'smartcell', 'ncell', 'ntc', 'dial', 'ringback'
                ])
            )
            
            if is_lyric_like:
                current_block.append(stripped)
            else:
                if not stripped and current_block:
                    current_block.append("")
                else:
                    while current_block and not current_block[-1]:
                        current_block.pop()
                    if len(current_block) > len(best_block):
                        best_block = current_block
                    current_block = []
                    
        if current_block:
            while current_block and not current_block[-1]:
                current_block.pop()
            if len(current_block) > len(best_block):
                best_block = current_block
                
        if len(best_block) >= 6:
            return "\n".join(best_block).strip()
            
        return None

    def parse_youtube_title(self, yt_title: str):
        """
        Parses clean song title, artist list, and album name from YouTube title.
        """
        clean_title = re.sub(
            r'\s*[([][^)\]]*(?:official|video|audio|lyric|hd|full|song|released|music|exclusive|remix|cover|clip|premiere|भिडियो|गीत|ट्रेलर)[^)\]]*[)\]]', 
            '', 
            yt_title, 
            flags=re.IGNORECASE
        )
        
        main_segments = [s.strip() for s in clean_title.split('|') if s.strip()]
        if not main_segments:
            return yt_title, "Various Artists", "Single"
            
        song_title = ""
        artists = []
        album = "Single"
        
        artist_indicators = {
            'vaidya', 'chettri', 'chetri', 'kunwar', 'rai', 'majhi', 'bishwakarma', 'shiwakoti', 
            'pandey', 'narayan', 'gopal', 'adhikari', 'thapa', 'gurung', 'suman', 'vek', 'yabesh', 
            'karki', 'lama', 'sherpa', 'tamang', 'shrestha', 'jha', 'singh', 'kumar', 'sharma', 
            'devi', 'dixit', 'pradhan', 'rana', 'malla', 'sen', 'shah', 'basnet', 'khadka', 
            'thakuri', 'panta', 'gautam', 'bhattarai', 'koirala', 'dahal', 'neupane', 'acharya', 
            'poudel', 'regmi', 'ghimire', 'rimal', 'bhandari', 'dhakal', 'subedi', 'lamichhane', 
            'bhatta', 'joshi', 'kandel', 'paudel', 'devkota', 'khanal', 'vocal', 'singer', 
            'feat', 'ft', '&', 'and', 'music by'
        }
        
        # Generic descriptors to skip or clean
        noise_keywords = [
            'official video', 'official audio', 'hd', 'full video', 'full audio', 
            'lyrical', 'video song', 'movie song', 'nepali movie', 'nepali song', 
            'new song', 'lok dohori', 'teej song', 'status video', 'नेपाली', 
            'गीत', 'चलचित्र', 'म्युजिक भिडियो', 'lyrics', 'live', 'session', 
            'unplugged', 'acoustic', 'cover', 'remix', 'karaoke', 'instrumental', 
            'performance', 'teaser', 'trailer'
        ]
        
        cleaned_segments = []
        for s in main_segments:
            s_lower = s.lower()
            if any(k in s_lower for k in noise_keywords):
                if 'movie' in s_lower or 'चलचित्र' in s_lower:
                    album = re.sub(r'(?:nepali|movie|song|चलचित्र|गीत)', '', s, flags=re.IGNORECASE).strip()
                continue
            cleaned_segments.append(s)
            
        if not cleaned_segments:
            cleaned_segments = main_segments
            
        first_seg = cleaned_segments[0]
        
        sub_delimiters = [r'\s*-\s*', r'\s*–\s*', r'\s*—\s*', r'\s*~\s*', r'\s*•\s*']
        sub_pattern = '|'.join(sub_delimiters)
        sub_parts = [p.strip() for p in re.split(sub_pattern, first_seg) if p.strip()]
        
        if len(sub_parts) > 1:
            cleaned_sub_parts = []
            for p in sub_parts:
                p_lower = p.lower()
                if any(k in p_lower for k in noise_keywords):
                    continue
                cleaned_sub_parts.append(p)
                
            if not cleaned_sub_parts:
                cleaned_sub_parts = sub_parts
                
            if len(cleaned_sub_parts) > 1:
                part_a, part_b = cleaned_sub_parts[0], cleaned_sub_parts[1]
                part_a_lower, part_b_lower = part_a.lower(), part_b.lower()
                
                is_a_artist = any(ind in part_a_lower for ind in artist_indicators)
                is_b_artist = any(ind in part_b_lower for ind in artist_indicators)
                
                is_a_devanagari = bool(re.search(r'[\u0900-\u097F]', part_a))
                is_b_devanagari = bool(re.search(r'[\u0900-\u097F]', part_b))
                
                is_translation = (is_a_devanagari != is_b_devanagari) and not (is_a_artist or is_b_artist)
                
                if is_translation:
                    song_title = f"{part_a} ({part_b})" if is_b_devanagari else f"{part_b} ({part_a})"
                elif is_a_artist and not is_b_artist:
                    song_title = part_b
                    artists.append(part_a)
                elif is_b_artist and not is_a_artist:
                    song_title = part_a
                    artists.append(part_b)
                else:
                    song_title = part_a
                    artists.append(part_b)
                    
                for p in cleaned_sub_parts[2:]:
                    artists.append(p)
            else:
                song_title = cleaned_sub_parts[0]
        else:
            song_title = first_seg
            
        for seg in cleaned_segments[1:]:
            seg_lower = seg.lower()
            if any(ind in seg_lower for ind in artist_indicators) or len(seg.split()) <= 4:
                artists.append(seg)
            elif album == "Single" and len(seg.split()) <= 3:
                album = seg
            else:
                artists.append(seg)
                
        seen_artists = set()
        final_artists = []
        for a in artists:
            a_clean = re.sub(r'^(?:singer[s]?|vocal[s]?|music|composer|lyrics|by)\s*[:ः]?\s*', '', a, flags=re.IGNORECASE).strip()
            a_norm = a_clean.lower()
            if a_norm and a_norm not in seen_artists and a_norm != song_title.lower():
                seen_artists.add(a_norm)
                final_artists.append(a_clean)
                
        artist_str = ", ".join(final_artists) if final_artists else "Various Artists"
        
        return song_title, artist_str, album

    def extract_song_candidates_from_text(self, text: str, uploader: str = "") -> list:
        """
        Extracts high-probability candidate song titles from social media captions/titles.
        """
        if not text:
            return []

        # Clean URLs and Hashtags
        clean_text = re.sub(r'https?://\S+', '', text)
        clean_text = re.sub(r'#\w+', '', clean_text)
        
        # Clean up metrics with K/M/B multipliers (e.g. 8K views, 1.4M likes, 673 reactions)
        clean_text = re.sub(
            r'\b\d+[\d,.]*[KMB]?\s*(reactions|likes|comments|views|shares|plays|followers)\b', 
            '', 
            clean_text, 
            flags=re.IGNORECASE
        )

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
            if len(cp_clean) >= 3:
                candidates.append(cp_clean)

        # 2b. Extract Devanagari words/phrases with N-gram generator for longer blocks
        devanagari_blocks = re.findall(r'[\u0900-\u097F]+(?:\s+[\u0900-\u097F]+)*', clean_text)
        for block in devanagari_blocks:
            words = block.split()
            if len(words) <= 4:
                candidates.append(block)
            else:
                for n in [2, 3, 4]:
                    for idx in range(len(words) - n + 1):
                        phr = " ".join(words[idx : idx + n])
                        candidates.append(phr)

        # 3. Clauses split by |, -, –, —, •, :, \n, comma, period, question mark, or Nepali Danda (।)
        clauses = re.split(r'[|\-–—•:\n,\.\?।]', clean_text)
        for c in clauses:
            c_clean = c.strip()
            if uploader and uploader.lower() in c_clean.lower():
                c_clean = re.sub(re.escape(uploader), '', c_clean, flags=re.IGNORECASE).strip()

            if 3 <= len(c_clean) <= 60:
                candidates.append(c_clean)

        # Clean and filter candidates
        ignored_keywords = {
            'there are', 'remains one of', 'where every', 'brings back', 'revisiting', 
            'nepali song', 'new nepali song', 'nepali movie', 'nepali status', 'nepali video', 
            'tiktok nepali', 'nepali movie song', 'superhit nepali song', 'nepali lyrics', 
            'lok dohori', 'teej song', 'dashain song', 'नेपाली गीत', 'नेपाली गीतहरु', 
            'नयाँ नेपाली गीत', 'नेपाली चलचित्र', 'तीजको गीत', 'दशैंको गीत', 'लोक दोहोरी'
        }

        seen = set()
        final_candidates = []
        for cand in candidates:
            # Strip leading/trailing quote/punctuation or bullet points
            cand_clean = re.sub(r'^["\'\s\-\•\:\,।·]+|["\'\s\-\•\:\,।·]+$', '', cand).strip()
            
            # Remove emojis and other special pictorial characters
            cand_clean = re.sub(r'[^\w\s\-\,\.\'\(\)\&\!\?\u0900-\u097F]', '', cand_clean)
            
            # Clean common social media tags (POV, FYP, viral, etc.)
            for tag in ['pov', 'fyp', 'viral', 'trending', 'trend', 'challenge', 'reels', 'reel', 'status']:
                cand_clean = re.sub(rf'\b{tag}\b', '', cand_clean, flags=re.IGNORECASE).strip()
                # Clean up double spaces that might result
                cand_clean = re.sub(r'\s+', ' ', cand_clean).strip()
                
            norm = cand_clean.lower()
            if norm and norm not in seen and len(cand_clean) >= 2:
                if norm in ignored_keywords or any(ignore in norm for ignore in ['follow me on', 'subscribe to', 'all rights reserved']):
                    continue
                seen.add(norm)
                final_candidates.append(cand_clean)

        return final_candidates

    def devanagari_to_romanized(self, text: str) -> str:
        if not text:
            return ""
        mapping = {
            'अ': 'a', 'आ': 'a', 'इ': 'i', 'ई': 'i', 'उ': 'u', 'ऊ': 'u', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
            'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
            'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'yna',
            'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
            'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
            'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
            'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
            'ा': 'a', 'ि': 'i', 'ी': 'i', 'ु': 'u', 'ू': 'u', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
            'ं': 'n', 'ः': 'h', '्': ''
        }
        
        result = []
        for char in text:
            if '\u0900' <= char <= '\u097F':
                result.append(mapping.get(char, ''))
            else:
                result.append(char.lower())
        return "".join(result)

    def validate_search_match(self, query: str, match_title: str, match_artist: str, match_lyrics: str = None, match_description: str = None) -> bool:
        """
        Validates if the search result matches key words from the candidate query phonetically.
        Supports matching Romanized caption queries against Devanagari lyrics or titles.
        """
        query_clean = re.sub(r'https?://\S+', '', query)
        query_words = [w.lower() for w in re.findall(r'[\w\u0900-\u097F]+', query_clean) if len(w) >= 2]
        
        # Stop words to ignore during matching
        stop_words = {
            'song', 'video', 'music', 'official', 'nepali', 'new', 'status', 'lyrics', 'cover', 
            'remix', 'dohori', 'teej', 'film', 'movie', 'गीत', 'नेपाली', 'चलचित्र', 'म्युजिक',
            'la', 'auta', 'ta', 'ko', 'ma', 'le', 'lai', 'ra' # common Nepali particles/fillers
        }
        query_words = [w for w in query_words if w not in stop_words]
        
        if not query_words:
            return True # If no unique keywords left, default to True to allow the search result
            
        match_text_pieces = [match_title, match_artist]
        if match_lyrics:
            match_text_pieces.append(match_lyrics)
        if match_description:
            match_text_pieces.append(match_description)
            
        raw_match_text = " ".join(match_text_pieces).lower()
        romanized_match_text = self.devanagari_to_romanized(raw_match_text)
        
        # Check match against both raw and Romanized match texts
        for word in query_words:
            if word in raw_match_text or word in romanized_match_text:
                return True
                
            # For spelling variations (Romanized query searching inside Romanized lyrics/title), check first 4 letters
            if len(word) >= 4 and not re.search(r'[\u0900-\u097F]', word):
                shortened = word[:4]
                if shortened in romanized_match_text:
                    return True
                    
        return False

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
                    lyrics = track.get("plainLyrics")

                    # Validate search matches to prevent false positives when searching extracted queries
                    if original_url and not self.validate_search_match(query, song_title, artist_name, match_lyrics=lyrics):
                        return None

                    official_video = self.search_official_youtube_video(song_title, artist_name)
                    
                    if not lyrics or lyrics.strip() == "" or "unavailable" in lyrics.lower():
                        lyrics = self.extract_lyrics_from_description(official_video.get('description'))
                    
                    if not lyrics:
                        lyrics = "Lyrics unavailable."

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
            if official_video and official_video.get('video_id') is not None:
                raw_yt_title = official_video.get('title')
                song_title, artist_name, album_name = self.parse_youtube_title(raw_yt_title)

                lyrics = self.get_lrclib_lyrics(song_title, artist_name)
                description = official_video.get('description')
                if not lyrics:
                    lyrics = self.extract_lyrics_from_description(description)

                # Validate search matches to prevent false positives when searching extracted queries
                if original_url and not self.validate_search_match(query, song_title, artist_name, match_lyrics=lyrics, match_description=description):
                    return None

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

            # Step 3: Find Official YouTube Music Video Link and Spotify Link
            official_video = self.search_official_youtube_video(song_title, artist_name)
            spotify_link = self.generate_spotify_link(song_title, artist_name, track=track)

            if not lyrics and official_video:
                lyrics = self.extract_lyrics_from_description(official_video.get('description'))

            if not lyrics:
                lyrics = None

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
