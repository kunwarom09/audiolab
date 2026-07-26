import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Unknown';
    const artist = searchParams.get('artist') || 'Unknown';
    const videoUrl = searchParams.get('video_url') || '';

    let backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    if (backendBase.endsWith('/api/extract')) {
      backendBase = backendBase.replace('/api/extract', '');
    }

    const queryParams = new URLSearchParams({
      title,
      artist,
      ...(videoUrl ? { video_url: videoUrl } : {})
    });

    const response = await fetch(`${backendBase.replace(/\/$/, '')}/api/download?${queryParams.toString()}`, {
      redirect: 'follow'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: errorData.detail || errorData.error || 'MP3 download failed' },
        { status: response.status }
      );
    }

    const audioBlob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', 'audio/mpeg');
    headers.set('Content-Disposition', response.headers.get('Content-Disposition') || `attachment; filename="${artist} - ${title}.mp3"`);

    return new NextResponse(audioBlob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Next.js Download Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to stream MP3 download. Backend server may be offline.' },
      { status: 500 }
    );
  }
}
