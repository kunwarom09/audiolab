import os
import re
import asyncio
from flask import Flask, request, jsonify, send_file, after_this_request
from flask_cors import CORS
from extractor import extractor_instance

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'SongExtractor Backend API',
        'version': '1.0.0'
    }), 200

@app.route('/api/extract', methods=['POST'])
def extract_song():
    data = request.get_json() or {}
    url = data.get('url', '').strip()

    if not url:
        return jsonify({
            'success': False,
            'error': 'Please provide a valid reel URL or song query.'
        }), 400

    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(extractor_instance.process_reel(url))
        loop.close()

        if result.get('success'):
            return jsonify(result), 200
        else:
            return jsonify(result), 422

    except Exception as e:
        print(f"Extraction error for input '{url}': {e}")
        return jsonify({
            'success': False,
            'error': f"{str(e)}"
        }), 500

@app.route('/api/download', methods=['GET', 'POST'])
def download_mp3():
    if request.method == 'POST':
        data = request.get_json() or {}
        title = data.get('title', 'Unknown')
        artist = data.get('artist', 'Unknown')
        video_url = data.get('video_url')
    else:
        title = request.args.get('title', 'Unknown')
        artist = request.args.get('artist', 'Unknown')
        video_url = request.args.get('video_url')

    try:
        mp3_path = extractor_instance.download_song_mp3(title, artist, video_url)
        clean_name = re.sub(r'[^\w\s-]', '', f"{artist} - {title}").strip() or "song"
        download_filename = f"{clean_name}.mp3"

        @after_this_request
        def remove_file(response):
            try:
                if os.path.exists(mp3_path):
                    os.remove(mp3_path)
            except Exception as e:
                print(f"Error deleting temp MP3 file: {e}")
            return response

        return send_file(
            mp3_path,
            as_attachment=True,
            download_name=download_filename,
            mimetype='audio/mpeg'
        )

    except Exception as e:
        print(f"MP3 Download error for '{artist} - {title}': {e}")
        return jsonify({
            'success': False,
            'error': f"Failed to download MP3: {str(e)}"
        }), 500

@app.route('/api/auth/google/verify', methods=['POST'])
def verify_google_auth():
    data = request.get_json() or {}
    code = data.get('code')
    email = data.get('email')
    name = data.get('name')

    if not email and not code:
        return jsonify({
            'success': False,
            'error': 'Missing authorization code or email.'
        }), 400

    # Simulate backend user verification and JWT token creation
    user_email = email or 'google.user@gmail.com'
    user_name = name or user_email.split('@')[0]
    session_token = f"jwt_token_google_{user_email.replace('@', '_')}"

    return jsonify({
        'success': True,
        'user': {
            'email': user_email,
            'name': user_name,
            'provider': 'google',
            'session_token': session_token
        }
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🎵 SongExtractor Flask API starting on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
