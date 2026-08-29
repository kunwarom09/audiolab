import os
import re
import json
import subprocess
import tempfile
import static_ffmpeg
from logger import logger

# Initialize static-ffmpeg paths
try:
    static_ffmpeg.add_paths()
except Exception as e:
    logger.warning(f"Error initializing static-ffmpeg paths: {e}")

class AudioConverter:
    def get_duration(self, file_path: str) -> float:
        """
        Extract total duration of media file in seconds using ffprobe.
        """
        try:
            cmd = [
                'ffprobe',
                '-v', 'error',
                '-show_entries', 'format=duration',
                '-of', 'default=noprint_wrappers=1:nokey=1',
                file_path
            ]
            result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
            output = result.stdout.strip()
            if output:
                return float(output)
        except Exception as e:
            logger.error(f"Failed to get duration for {file_path}: {e}")
        return 0.0

    def parse_ffmpeg_progress(self, line: str, total_duration: float) -> int:
        """
        Parse time string from ffmpeg output and calculate percentage.
        Example line: 'size=     256kB time=00:00:12.34 bitrate= 192.0kbits/s speed=12.3x'
        """
        if total_duration <= 0:
            return 0
        match = re.search(r'time=(\d+):(\d+):(\d+\.\d+)', line)
        if match:
            hours, minutes, seconds = map(float, match.groups())
            elapsed = (hours * 3600) + (minutes * 60) + seconds
            return min(99, int((elapsed / total_duration) * 100))
        return 0

    def convert(self, input_path: str, output_path: str, options: dict = None, progress_callback = None) -> bool:
        """
        Convert file to output format using high-speed multi-threaded FFmpeg.
        Supports format conversion, audio trimming (start/end time), and volume boosting.
        """
        options = options or {}
        bitrate = options.get('bitrate', '192k')
        if isinstance(bitrate, str) and not bitrate.endswith('k') and bitrate.isdigit():
            bitrate = f"{bitrate}k"
            
        sample_rate = str(options.get('sample_rate', '44100'))
        channels = options.get('channels', 'stereo')
        normalize = options.get('normalize', False)
        volume_gain = options.get('volume_gain') # e.g. 1.5, 2.0, or "+6dB"
        start_time = options.get('start_time') # e.g. "00:00:10" or 10.5
        end_time = options.get('end_time') # e.g. "00:01:30" or 90.0
        preserve_metadata = options.get('preserve_metadata', True)

        # Get total duration for progress updates
        duration = self.get_duration(input_path)
        logger.info(f"Starting ultra-fast conversion of {input_path} to {output_path} (Duration: {duration}s)")

        # Fast seeking if start_time is provided
        cmd = ['ffmpeg', '-y', '-threads', '0']
        
        if start_time is not None and str(start_time).strip():
            cmd.extend(['-ss', str(start_time)])
            
        if end_time is not None and str(end_time).strip():
            cmd.extend(['-to', str(end_time)])

        # Input file
        cmd.extend(['-i', input_path])

        # Optimize: Strip video/subtitles/data to speed up conversion by up to 5x
        cmd.extend(['-vn', '-sn', '-dn'])

        # Output format codec selection
        out_lower = output_path.lower()
        if out_lower.endswith('.wav'):
            cmd.extend(['-c:a', 'pcm_s16le'])
        elif out_lower.endswith('.flac'):
            cmd.extend(['-c:a', 'flac'])
        elif out_lower.endswith('.m4a') or out_lower.endswith('.aac') or out_lower.endswith('.m4r'):
            cmd.extend(['-c:a', 'aac', '-b:a', bitrate])
        elif out_lower.endswith('.ogg'):
            cmd.extend(['-c:a', 'libvorbis', '-b:a', bitrate])
        else: # Default MP3
            cmd.extend(['-c:a', 'libmp3lame', '-b:a', bitrate])

        # Sample rate and channels
        cmd.extend(['-ar', sample_rate])
        if channels == 'mono' or str(channels) == '1':
            cmd.extend(['-ac', '1'])
        else:
            cmd.extend(['-ac', '2'])

        # Audio filters (Normalization & Volume Gain)
        filters = []
        if volume_gain is not None:
            # e.g. 1.5, 2.0 or "+6dB"
            if isinstance(volume_gain, (int, float)):
                filters.append(f"volume={volume_gain}")
            elif str(volume_gain).endswith('dB') or str(volume_gain).endswith('db'):
                filters.append(f"volume={volume_gain}")
            else:
                filters.append(f"volume={volume_gain}")
        elif normalize:
            filters.append('loudnorm')

        if filters:
            cmd.extend(['-filter:a', ','.join(filters)])

        # Metadata option
        if not preserve_metadata:
            cmd.extend(['-map_metadata', '-1'])

        # Output file path
        cmd.append(output_path)

        # Execute FFmpeg process tracking progress in standard error
        try:
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1,
                universal_newlines=True
            )

            # Read stderr line-by-line for time progress updates
            while True:
                line = process.stderr.readline()
                if not line and process.poll() is not None:
                    break
                if progress_callback and line:
                    percentage = self.parse_ffmpeg_progress(line, duration)
                    if percentage > 0:
                        progress_callback(percentage)

            return (process.wait() == 0)
        except Exception as e:
            logger.error(f"FFmpeg process execution failed: {e}")
            return False

    def join_files(self, input_paths: list, output_path: str, options: dict = None, progress_callback = None) -> bool:
        """
        Merge / Concatenate multiple audio files into a single output audio track.
        """
        if not input_paths:
            return False
            
        options = options or {}
        bitrate = options.get('bitrate', '192k')
        if isinstance(bitrate, str) and not bitrate.endswith('k') and bitrate.isdigit():
            bitrate = f"{bitrate}k"

        # Create temporary concat text file list
        temp_dir = tempfile.mkdtemp(prefix='audio_join_')
        concat_file = os.path.join(temp_dir, 'concat_list.txt')
        
        try:
            with open(concat_file, 'w', encoding='utf-8') as f:
                for p in input_paths:
                    escaped_path = os.path.abspath(p).replace("'", "'\\''")
                    f.write(f"file '{escaped_path}'\n")

            cmd = [
                'ffmpeg', '-y', '-threads', '0',
                '-f', 'concat', '-safe', '0',
                '-i', concat_file,
                '-vn', '-sn', '-dn',
                '-c:a', 'libmp3lame', '-b:a', bitrate,
                '-ar', '44100', '-ac', '2',
                output_path
            ]
            
            logger.info(f"Merging {len(input_paths)} files into {output_path}")
            result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            return result.returncode == 0
        except Exception as e:
            logger.error(f"Audio join failed: {e}")
            return False
        finally:
            if os.path.exists(concat_file):
                os.remove(concat_file)
            if os.path.exists(temp_dir):
                os.rmdir(temp_dir)

converter_instance = AudioConverter()
