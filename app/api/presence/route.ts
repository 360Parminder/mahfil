import { NextResponse } from 'next/server';

// In-memory store for active visitor sessions (session ID -> last seen timestamp)
const activeSessions = new Map<string, number>();

// Inactivity threshold (12 seconds)
const INACTIVITY_TIMEOUT_MS = 12000;

function cleanupStaleSessions() {
  const now = Date.now();
  for (const [id, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > INACTIVITY_TIMEOUT_MS) {
      activeSessions.delete(id);
    }
  }
}

export async function GET() {
  cleanupStaleSessions();
  // Ensure minimum count of 1 for the current user
  const count = Math.max(1, activeSessions.size);
  return NextResponse.json({ onlineCount: count });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const visitorId = body.visitorId || 'guest-' + Math.random().toString(36).substring(2, 9);
    
    activeSessions.set(visitorId, Date.now());
    cleanupStaleSessions();

    const count = Math.max(1, activeSessions.size);
    return NextResponse.json({ onlineCount: count, visitorId });
  } catch (error) {
    cleanupStaleSessions();
    return NextResponse.json({ onlineCount: Math.max(1, activeSessions.size) });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const visitorId = searchParams.get('visitorId');
    if (visitorId) {
      activeSessions.delete(visitorId);
    }
    cleanupStaleSessions();
    return NextResponse.json({ success: true, onlineCount: Math.max(1, activeSessions.size) });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
