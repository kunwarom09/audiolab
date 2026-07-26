import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }

    const backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/upload`;

    // Package the file inside a new FormData body to forward to FastAPI
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    const response = await fetch(targetUrl, {
      method: 'POST',
      body: backendFormData
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.detail || 'Upload forwarding failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js API Upload Proxy Error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to connect to file upload service.' },
      { status: 500 }
    );
  }
}
