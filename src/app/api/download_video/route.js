import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || '';
    const title = searchParams.get('title') || 'Video';
    const artist = searchParams.get('artist') || 'Unknown';

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'Missing video URL parameter.' },
        { status: 400 }
      );
    }

    let backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    if (backendBase.endsWith('/api/extract')) {
      backendBase = backendBase.replace('/api/extract', '');
    }

    const queryParams = new URLSearchParams({
      url,
      title,
      artist
    });

    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/download_video?${queryParams.toString()}`;
    const response = await fetch(targetUrl, {
      redirect: 'follow'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: errorData.detail || errorData.error || 'Video download failed' },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('Content-Type') || 'video/mp4';
    const videoBlob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set(
      'Content-Disposition',
      response.headers.get('Content-Disposition') || `attachment; filename="${artist} - ${title}.mp4"`
    );

    return new NextResponse(videoBlob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Next.js Video Download Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to stream video download. Backend server may be offline.' },
      { status: 500 }
    );
  }
}
