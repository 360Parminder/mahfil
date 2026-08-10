'use client';

import { useState, useEffect } from 'react';

export function useRealtimePresence() {
  const [onlineCount, setOnlineCount] = useState<number>(1);

  useEffect(() => {
    // Generate or retrieve session visitorId
    let visitorId = typeof window !== 'undefined' ? sessionStorage.getItem('mahfil_visitor_id') : null;
    if (!visitorId) {
      visitorId = 'visitor-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now();
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('mahfil_visitor_id', visitorId);
      }
    }

    const sendHeartbeat = async () => {
      try {
        const res = await fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.onlineCount === 'number') {
            setOnlineCount(data.onlineCount);
          }
        }
      } catch (err) {
        // Fallback to 1 if network request fails
      }
    };

    // Initial heartbeat
    sendHeartbeat();

    // Periodic heartbeat every 4 seconds
    const interval = setInterval(sendHeartbeat, 4000);

    // Cross-tab BroadcastChannel sync for multi-tab testing
    let bc: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      bc = new BroadcastChannel('mahfil_presence_channel');
      bc.onmessage = (event) => {
        if (event.data && typeof event.data.onlineCount === 'number') {
          setOnlineCount(event.data.onlineCount);
        }
      };
    }

    // Handle tab close / leave
    const handleLeave = () => {
      if (visitorId) {
        navigator.sendBeacon(`/api/presence?visitorId=${encodeURIComponent(visitorId)}`);
      }
    };

    window.addEventListener('beforeunload', handleLeave);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleLeave);
      if (bc) bc.close();
    };
  }, []);

  return onlineCount;
}
