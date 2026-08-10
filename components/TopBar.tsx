'use client';

import { useState, useEffect } from 'react';
import {
  ArrowUpRight01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
  Maximize04Icon,
  Minimize04Icon,
  SpotifyIcon,
  YoutubeIcon,
} from 'hugeicons-react';



interface TopBarProps {
  onlineCount: number;
  isMuted: boolean;
  toggleMute: () => void;
}

export default function TopBar({
  onlineCount,
  isMuted,
  toggleMute,
}: TopBarProps) {
  const [timeStr, setTimeStr] = useState<string>('12:37 am');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now
        .toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .toLowerCase();
      setTimeStr(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between pointer-events-none">
      {/* Left: Clock */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="text-xs sm:text-sm font-medium tracking-wide text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
          {timeStr}
        </div>
      </div>

      {/* Center: Live Online Status Pill */}
      <div className="pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-xs border border-white/10 text-xs sm:text-sm font-medium text-white/95 shadow-md select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">
            <strong className="font-semibold text-emerald-400">{onlineCount}</strong> online
          </span>
        </div>
      </div>

      {/* Right: Platform Action Pills & Controls */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {/* Mute Quick Toggle */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/50 transition-all"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeOffIcon className="w-4 h-4 text-rose-400" />
          ) : (
            <VolumeHighIcon className="w-4 h-4 text-emerald-400" />
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="hidden sm:flex p-2 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/50 transition-all"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize04Icon className="w-4 h-4" /> : <Maximize04Icon className="w-4 h-4" />}
        </button>


        {/* Spotify Pill */}
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90 hover:text-white hover:bg-black/50 hover:border-emerald-500/40 transition-all group"
        >
          <SpotifyIcon className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="hidden xs:inline">Spotify</span>
          <ArrowUpRight01Icon className="w-3 h-3 text-white/50 group-hover:text-white transition-colors" />
        </a>

        {/* YT Music Pill */}
        <a
          href="https://music.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90 hover:text-white hover:bg-black/50 hover:border-red-500/40 transition-all group"
        >
          <YoutubeIcon className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
          <span className="hidden xs:inline">YT Music</span>
          <ArrowUpRight01Icon className="w-3 h-3 text-white/50 group-hover:text-white transition-colors" />
        </a>
      </div>
    </header>
  );
}
