import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { file_id, start_time, duration, async_mode = true } = body;

    if (!file_id || typeof file_id !== 'string' || file_id.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid file_id.' },
        { status: 400 }
      );
    }

    let backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    if (backendBase.endsWith('/api/extract')) {
      backendBase = backendBase.replace('/api/extract', '');
    }
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/identify-file`;

    // Forward request to FastAPI file identification engine
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_id: file_id.trim(),
        start_time: typeof start_time === 'number' ? start_time : undefined,
        duration: typeof duration === 'number' ? duration : undefined,
        async_mode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.detail || data.error || data.message || 'File identification failed.' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js API Identify-File Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to connect to audio identification service. Please check backend connection.',
      },
      { status: 500 }
    );
  }
}
