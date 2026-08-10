'use client';

import { Cancel01Icon, UserGroupIcon, HeadphonesIcon, Location01Icon } from 'hugeicons-react';

interface ListenersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onlineCount: number;
}

const MOCK_LISTENERS = [
  { id: 1, name: 'Aarav Sharma', location: 'Mumbai', status: 'Listening to Woh Meri Neend...', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Priya Verma', location: 'Delhi', status: 'In Deelux Saloon Lounge', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Rohan Patel', location: 'Ahmedabad', status: 'Enjoing 90s Melodies', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Neha Gupta', location: 'Bengaluru', status: 'Listening to Pehla Nasha', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Kabir Mehta', location: 'Chandigarh', status: 'In Barber Shop Vibe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
];

export default function ListenersModal({ isOpen, onClose, onlineCount }: ListenersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl glass-modal overflow-hidden border border-white/15 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <UserGroupIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-wide text-white">Mahfil Room Listeners</h2>
              <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {onlineCount} people currently tuned in
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Cancel01Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Listeners list */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {MOCK_LISTENERS.map((listener) => (
            <div
              key={listener.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={listener.avatar}
                  alt={listener.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{listener.name}</h4>
                  <p className="text-xs text-white/60 flex items-center gap-1">
                    <Location01Icon className="w-3 h-3 text-amber-300" /> {listener.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                  <HeadphonesIcon className="w-3 h-3" /> Live
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5 text-center text-xs text-white/50">
          Share room link to invite friends to this Mahfil session!
        </div>
      </div>
    </div>
  );
}
