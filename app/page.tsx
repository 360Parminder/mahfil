'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import AudioPlayer from '@/components/AudioPlayer';
import { useRealtimePresence } from '@/hooks/useRealtimePresence';
import clsx from 'clsx';

export default function MahfilHome() {
  const [playlistId, setPlaylistId] = useState<string>('PLNZARFiARTKJZttN0PIZuUo6dV2sIFacS');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentBg, setCurrentBg] = useState<string>('/images/mahfil.png');

  // Real-time connected users tracking
  const onlineCount = useRealtimePresence();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <main className={clsx('relative', 'w-screen', 'h-screen', 'overflow-hidden', 'select-none', 'bg-black', 'flex', 'flex-col', 'items-center', 'justify-between')}>
      {/* Background Artwork Layer */}
      <div className={clsx('absolute', 'inset-0', 'z-0')}>
        <img
          src={currentBg}
          alt="Deelux Saloon Street Scene Backdrop"
          className={clsx('w-full', 'h-full', 'object-cover', 'object-center', 'filter', 'brightness-[0.95]', 'contrast-[1.05]', 'transition-all', 'duration-700')}
        />
        {/* Soft Vignette & Warm Lighting Gradients */}
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-t', 'from-black/80', 'via-black/15', 'to-black/50', 'pointer-events-none')} />
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-b', 'from-black/40', 'via-transparent', 'to-black/70', 'pointer-events-none')} />
        {/* Ambient Warm Golden Sun Shimmer */}
        <div className={clsx('absolute', '-top-20', '-left-20', 'w-96', 'h-96', 'bg-amber-500/10', 'rounded-full', 'blur-3xl', 'pointer-events-none')} />
        <div className={clsx('absolute', '-bottom-20', '-right-20', 'w-96', 'h-96', 'bg-rose-600/15', 'rounded-full', 'blur-3xl', 'pointer-events-none')} />
      </div>

      {/* Top Bar Navigation */}
      <TopBar
        onlineCount={onlineCount}
        isMuted={isMuted}
        toggleMute={handleToggleMute}
      />

      {/* Bottom Floating Glassmorphic Audio Player */}
      <AudioPlayer
        playlistId={playlistId}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
    </main>
  );
}
