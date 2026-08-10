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



import { SpotifyLogo, YoutubeMusicLogo } from './icons/CustomLogos';

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
        <div className="text-xs sm:text-sm font-medium tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] select-none">
          {timeStr}
        </div>
      </div>

      {/* Center: Live Online Status (Absolute Center - No Background/Border) */}
      <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">
            <strong className="font-semibold text-emerald-400">{onlineCount}</strong> online
          </span>
        </div>
      </div>

      {/* Right: Platform Action Links & Controls (No Background/Borders) */}
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
        {/* Mute Quick Toggle */}
        <button
          onClick={toggleMute}
          className="p-1 text-white/90 hover:text-white transition-all drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
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
          className="hidden sm:flex p-1 text-white/90 hover:text-white transition-all drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize04Icon className="w-4 h-4" /> : <Maximize04Icon className="w-4 h-4" />}
        </button>

        {/* Spotify Link */}
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white hover:text-emerald-300 transition-all drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] group"
        >
          <SpotifyLogo className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="hidden xs:inline">Spotify</span>
          <ArrowUpRight01Icon className="w-3 h-3 text-white/70 group-hover:text-white transition-colors" />
        </a>

        {/* YT Music Link */}
        <a
          href="https://music.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white hover:text-red-400 transition-all drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] group"
        >
          <YoutubeMusicLogo className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="hidden xs:inline">YT Music</span>
          <ArrowUpRight01Icon className="w-3 h-3 text-white/70 group-hover:text-white transition-colors" />
        </a>
      </div>
    </header>
  );
}
