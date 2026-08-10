'use client';

import { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { YoutubeMusicLogo } from './icons/CustomLogos';
import {
  PlayIcon,
  PauseIcon,
  PreviousIcon,
  NextIcon,
  VolumeHighIcon,
  VolumeOffIcon,
} from 'hugeicons-react';

interface AudioPlayerProps {
  playlistId: string;
  videoId?: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function AudioPlayer({
  playlistId,
  videoId,
  isPlaying,
  onPlayPause,
  isMuted,
  onToggleMute,
}: AudioPlayerProps) {
  const playerRef = useRef<any>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Dynamic Metadata fetched live from YouTube IFrame
  const [songTitle, setSongTitle] = useState('Mahfil YouTube Playlist');
  const [artistName, setArtistName] = useState('YouTube Stream');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80');

  // Poll time and active video info
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && playerRef.current && isPlayerReady) {
      interval = setInterval(() => {
        try {
          const curr = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration();
          const videoData = playerRef.current.getVideoData();

          if (typeof curr === 'number') setCurrentTime(curr);
          if (typeof dur === 'number' && dur > 0) setDuration(dur);

          if (videoData) {
            if (videoData.title && videoData.title !== songTitle) {
              setSongTitle(videoData.title);
            }
            if (videoData.author && videoData.author !== artistName) {
              setArtistName(videoData.author);
            }
            if (videoData.video_id) {
              setCoverUrl(`https://i.ytimg.com/vi/${videoData.video_id}/hqdefault.jpg`);
            }
          }
        } catch (err) {}
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isPlayerReady, songTitle, artistName]);

  // Sync Play/Pause
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (err) {}
    }
  }, [isPlaying, isPlayerReady]);

  // Sync Mute
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (isMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
        }
      } catch (err) {}
    }
  }, [isMuted, isPlayerReady]);

  // Sync Volume
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.setVolume(volume * 100);
      } catch (err) {}
    }
  }, [volume, isPlayerReady]);

  // Global fallback trigger for browser autoplay policies
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (playerRef.current && isPlayerReady) {
        try {
          if (!isMuted) {
            playerRef.current.unMute();
          }
          playerRef.current.playVideo();
        } catch (e) {}
      }
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlayerReady, isMuted]);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    setIsPlayerReady(true);
    event.target.setVolume(volume * 100);
    if (isMuted) event.target.mute();

    if (isPlaying) {
      try {
        const playResult = event.target.playVideo();
        if (playResult && typeof playResult.catch === 'function') {
          playResult.catch(() => {
            event.target.mute();
            event.target.playVideo();
          });
        }
      } catch (e) {
        try {
          event.target.mute();
          event.target.playVideo();
        } catch (err) {}
      }
    }
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    // Update metadata on state change
    try {
      const videoData = event.target.getVideoData();
      if (videoData) {
        if (videoData.title) setSongTitle(videoData.title);
        if (videoData.author) setArtistName(videoData.author);
        if (videoData.video_id) {
          setCoverUrl(`https://i.ytimg.com/vi/${videoData.video_id}/hqdefault.jpg`);
        }
      }
    } catch (e) {}

    // 0 = Ended -> Auto play next song sequentially
    if (event.data === 0) {
      try {
        event.target.nextVideo();
        event.target.playVideo();
      } catch (e) {}
    } else if (event.data === 1) {
      if (!isPlaying) onPlayPause();
    } else if (event.data === 2) {
      if (isPlaying) onPlayPause();
    }
  };

  const handlePrev = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.previousVideo();
      } catch (err) {}
    }
  };

  const handleNext = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.nextVideo();
      } catch (err) {}
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.seekTo(newTime, true);
      } catch (err) {}
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const parsePlaylistId = (input: string): string => {
    if (!input) return '';
    const trimmed = input.trim();
    const listMatch = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (listMatch) {
      return listMatch[1];
    }
    return trimmed;
  };

  const cleanId = parsePlaylistId(playlistId);

  // Options for YouTube Playlist mode vs Video mode
  const playerVarsObj: any = {
    autoplay: isPlaying ? 1 : 0,
    controls: 0,
    modestbranding: 1,
    rel: 0,
    origin: typeof window !== 'undefined' ? window.location.origin : '',
  };

  if (cleanId) {
    playerVarsObj.listType = 'playlist';
    playerVarsObj.list = cleanId;
  }

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: playerVarsObj,
  };

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-auto max-w-2xl pointer-events-auto">
      {/* Hidden YouTube IFrame Engine */}
      <div className="hidden pointer-events-none opacity-0">
        {cleanId ? (
          <YouTube
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        ) : (
          <YouTube
            videoId={videoId || '55d3-8YwHq8'}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        )}
      </div>

      {/* Floating Glassmorphism Player Container */}
      <div className="relative glass-pill rounded-3xl sm:rounded-full px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 shadow-2xl transition-all duration-300 hover:border-white/20">
        
        {/* Left: Album Cover Thumbnail / Vinyl */}
        <div className="relative shrink-0 flex items-center gap-3">
          <div
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-xl shrink-0"
          >
            {/* Spinning Album Image */}
            <img
              src={coverUrl}
              alt={songTitle}
              className={`w-full h-full object-cover scale-[1.38] transition-transform ${
                isPlaying ? 'animate-spin-slow' : 'animate-spin-slow animate-spin-paused'
              }`}
            />
            {/* Vinyl Center Hole Overlay */}
            <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-black/80 border border-white/30 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
            </div>
          </div>
        </div>

        {/* Center: Track Details & Seekbar */}
        <div className="flex-1 w-full min-w-[200px] sm:min-w-[260px] flex flex-col justify-center gap-1">
          {/* Song Title & Artist */}
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-1.5">
              <YoutubeMusicLogo className="w-4 h-4 text-white shrink-0" />
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate max-w-[170px] sm:max-w-[210px]">
                  {songTitle}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/60 truncate max-w-[170px] sm:max-w-[210px]">
                  {artistName}
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-white/50 shrink-0">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Interactive Scrub Bar */}
          <div className="relative flex items-center w-full group">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer focus:outline-none"
              style={{
                background: `linear-gradient(to right, #f59e0b ${progressPercent}%, rgba(255, 255, 255, 0.2) ${progressPercent}%)`,
              }}
            />
          </div>
        </div>

        {/* Right: Controls (Prev, Play/Pause, Next, Volume, Playlist) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Previous Track */}
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            title="Previous Track in Playlist"
          >
            <PreviousIcon className="w-4 h-4 fill-current" />
          </button>

          {/* Play / Pause Circular Main Button */}
          <button
            onClick={onPlayPause}
            className="relative p-3 rounded-full bg-white text-black hover:bg-amber-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-90 hover:scale-105 transition-all flex items-center justify-center"
            title={isPlaying ? 'Pause YouTube Playlist' : 'Play YouTube Playlist'}
          >
            {isPlaying ? (
              <PauseIcon className="w-4 h-4 fill-current text-black" />
            ) : (
              <PlayIcon className="w-4 h-4 fill-current text-black ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            title="Next Track in Playlist"
          >
            <NextIcon className="w-4 h-4 fill-current" />
          </button>

          {/* Volume Control Popover Button */}
          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
              title="Volume"
            >
              {isMuted || volume === 0 ? (
                <VolumeOffIcon className="w-4 h-4 text-rose-400" />
              ) : (
                <VolumeHighIcon className="w-4 h-4" />
              )}
            </button>

            {/* Volume Popover */}
            {showVolumeSlider && (
              <div className="absolute bottom-12 right-0 bg-black/80 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                <button onClick={onToggleMute}>
                  {isMuted ? (
                    <VolumeOffIcon className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <VolumeHighIcon className="w-3.5 h-3.5 text-white/80" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) onToggleMute();
                  }}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
