import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { file_id, output_format, options = {} } = body;

    if (!file_id || !output_format) {
      return NextResponse.json({ success: false, error: 'Missing file_id or output_format.' }, { status: 400 });
    }

    const backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/convert`;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_id, output_format, options })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.detail || 'Conversion forwarding failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js API Convert Proxy Error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to connect to audio conversion service.' },
      { status: 500 }
    );
  }
}
