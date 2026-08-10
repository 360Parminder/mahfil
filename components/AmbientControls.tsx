'use client';

import { useState } from 'react';
import { SparklesIcon, Image01Icon } from 'hugeicons-react';
import clsx from 'clsx';

interface AmbientControlsProps {
  currentBg: string;
  onChangeBg: (bgUrl: string) => void;
}

export const BACKGROUND_PRESETS = [
  {
    id: 'deelux-saloon',
    name: 'Deelux Saloon (Ref)',
    url: '/images/mahil.png',
  },
  {
    id: 'nostalgic-street',
    name: 'Sunset Street',
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'retro-terrace',
    name: 'Evening Terrace',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&auto=format&fit=crop&q=80',
  },
];

export default function AmbientControls({ currentBg, onChangeBg }: AmbientControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx('fixed', 'bottom-6', 'right-6', 'z-30', 'pointer-events-auto', 'hidden', 'md:block')}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx('p-3', 'rounded-full', 'bg-black/40', 'backdrop-blur-md', 'border', 'border-white/15', 'text-white/90', 'hover:text-amber-300', 'hover:bg-black/60', 'shadow-xl', 'transition-all', 'flex', 'items-center', 'gap-2', 'group')}
        title="Ambient & Background Options"
      >
        <Image01Icon className={clsx('w-4', 'h-4', 'group-hover:rotate-12', 'transition-transform')} />
        <span className={clsx('text-xs', 'font-medium', 'text-white/90')}>Wallpapers</span>
      </button>

      {isOpen && (
        <div className={clsx('absolute', 'bottom-14', 'right-0', 'w-64', 'glass-modal', 'rounded-2xl', 'p-4', 'border', 'border-white/15', 'shadow-2xl', 'space-y-3', 'animate-in', 'fade-in', 'slide-in-from-bottom-3')}>
          <div className={clsx('flex', 'items-center', 'justify-between', 'border-b', 'border-white/10', 'pb-2')}>
            <span className={clsx('text-xs', 'font-bold', 'text-white', 'flex', 'items-center', 'gap-1.5')}>
              <SparklesIcon className={clsx('w-3.5', 'h-3.5', 'text-amber-400')} /> Scene Backdrop
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className={clsx('text-xs', 'text-white/50', 'hover:text-white')}
            >
              ✕
            </button>
          </div>

          <div className={clsx('grid', 'grid-cols-1', 'gap-2')}>
            {BACKGROUND_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onChangeBg(preset.url)}
                className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-medium text-left transition-all ${
                  currentBg === preset.url
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <div className={clsx('w-8', 'h-8', 'rounded-lg', 'overflow-hidden', 'shrink-0', 'border', 'border-white/20')}>
                  <img src={preset.url} alt={preset.name} className={clsx('w-full', 'h-full', 'object-cover')} />
                </div>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
