#!/usr/bin/env bash
echo "🚀 Starting Extractor App Stack..."

PYTHON_CMD="python3"

# Start Python FastAPI API backend in background
echo "🎵 Starting Python FastAPI Engine on http://localhost:8000..."
$PYTHON_CMD -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Start Next.js frontend dev server
echo "⚡ Starting Next.js App on http://localhost:3000..."
npm run dev &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

wait
