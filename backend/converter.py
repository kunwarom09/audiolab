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
        Convert file to output format using FFmpeg with specific configuration options.
        """
        options = options or {}
        bitrate = options.get('bitrate', '192k')
        sample_rate = options.get('sample_rate', '44100')
        channels = options.get('channels', 'stereo')
        normalize = options.get('normalize', False)
        preserve_metadata = options.get('preserve_metadata', True)

        # Get total duration for progress updates
        duration = self.get_duration(input_path)
        logger.info(f"Starting conversion of {input_path} to {output_path} (Duration: {duration}s)")

        # Build FFmpeg command
        cmd = ['ffmpeg', '-y', '-i', input_path]

        # Audio quality
        is_wav = output_path.lower().endswith('.wav')
        if is_wav:
            # WAV is lossless PCM
            cmd.extend(['-acodec', 'pcm_s16le'])
        else:
            # Compressed audio formats (MP3, OGG, AAC)
            cmd.extend(['-ab', bitrate])

        # Sample rate and channels
        cmd.extend(['-ar', sample_rate])
        if channels == 'mono':
            cmd.extend(['-ac', '1'])
        else:
            cmd.extend(['-ac', '2'])

        # Audio Normalization filter
        if normalize:
            cmd.extend(['-filter:a', 'loudnorm'])

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

            return code == 0 if (code := process.wait()) is not None else False
        except Exception as e:
            logger.error(f"FFmpeg process execution failed: {e}")
            return False

converter_instance = AudioConverter()
