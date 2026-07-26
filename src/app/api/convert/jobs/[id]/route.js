import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing job ID.' }, { status: 400 });
    }

    const backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/convert/jobs/${id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.detail || 'Job status fetching failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js API Jobs Proxy Error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to connect to conversion status service.' },
      { status: 500 }
    );
  }
}
