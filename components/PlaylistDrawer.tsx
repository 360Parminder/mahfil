'use client';

import { useState } from 'react';
import {
  Cancel01Icon,
  YoutubeIcon,
  Link01Icon,
  CheckmarkCircle01Icon,
  SparklesIcon,
  Playlist01Icon,
} from 'hugeicons-react';

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlaylistId: string;
  onSetPlaylistId: (playlistId: string) => void;
}

const PRESET_PLAYLISTS = [
  {
    id: 'PL9bw4S5ePsEGg7Fv80vD21XJ8fJj4D-5b',
    title: '90s Hindi Evergreen Melodies',
    description: 'Iconic retro romantic Hindi classics playlist',
  },
  {
    id: 'RDCLAK5uy_kQy583a456184132470716',
    title: 'Retro Bollywood Chill Lofi',
    description: 'Relaxing lo-fi Hindi music streams',
  },
  {
    id: 'PL_zRplw7NyrJ4N5uXn0Q33N9yB121R0Q',
    title: '90s Unforgettable Classics',
    description: 'Kishore Kumar, Udit Narayan, Alka Yagnik & Sadhana Sargam',
  },
];

export default function PlaylistDrawer({
  isOpen,
  onClose,
  currentPlaylistId,
  onSetPlaylistId,
}: PlaylistDrawerProps) {
  const [inputUrl, setInputUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const extractPlaylistId = (urlOrId: string) => {
    const trimmed = urlOrId.trim();
    if (trimmed.includes('list=')) {
      const match = trimmed.match(/list=([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    }
    if (trimmed.length > 5 && !trimmed.includes('/')) {
      return trimmed;
    }
    return null;
  };

  const handleLoadPlaylist = () => {
    setErrorMsg('');
    const extracted = extractPlaylistId(inputUrl);
    if (extracted) {
      onSetPlaylistId(extracted);
      setInputUrl('');
      onClose();
    } else {
      setErrorMsg('Invalid YouTube Playlist URL or ID. Please check and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl glass-modal overflow-hidden border border-white/15 text-white shadow-2xl space-y-0">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30">
              <YoutubeIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-wide text-white">YouTube Playlist Player</h2>
              <p className="text-xs text-white/60">Provide any YouTube Playlist Link to stream</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Cancel01Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar Section */}
        <div className="p-6 space-y-4 bg-black/20">
          <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider">
            Provide your YouTube Playlist URL or ID
          </label>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Link01Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="https://www.youtube.com/playlist?list=PL..."
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleLoadPlaylist()}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
            <button
              onClick={handleLoadPlaylist}
              className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg active:scale-95 shrink-0 flex items-center gap-1.5"
            >
              Load
            </button>
          </div>

          {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}

          {/* Current Playlist Badge */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-white/60">Active Playlist ID:</span>
            <span className="font-mono text-amber-300 truncate max-w-[220px]">
              {currentPlaylistId}
            </span>
          </div>
        </div>

        {/* Preset Playlists */}
        <div className="p-6 space-y-3 border-t border-white/10 bg-white/5">
          <h3 className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" /> Featured YouTube Playlists
          </h3>
          <div className="space-y-2">
            {PRESET_PLAYLISTS.map((preset) => {
              const isActive = preset.id === currentPlaylistId;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSetPlaylistId(preset.id);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Playlist01Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-white/50'}`} />
                    <div>
                      <h4 className="text-xs font-bold">{preset.title}</h4>
                      <p className="text-[11px] text-white/50">{preset.description}</p>
                    </div>
                  </div>
                  {isActive && <CheckmarkCircle01Icon className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/40 text-center text-xs text-white/40">
          YouTube Music playlist streams natively with auto-next track progression.
        </div>
      </div>
    </div>
  );
}
