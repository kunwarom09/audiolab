import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, async_mode = true } = body;

    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid Reel URL or song query.' },
        { status: 400 }
      );
    }

    let backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    if (backendBase.endsWith('/api/extract')) {
      backendBase = backendBase.replace('/api/extract', '');
    }
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/extract`;

    // Forward request to FastAPI extraction engine
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url.trim(), async_mode }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.detail || data.error || data.message || 'Extraction failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js API Extract Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to connect to song extraction service. Make sure the FastAPI backend is running.',
      },
      { status: 500 }
    );
  }
}
