'use client';

import { useState } from 'react';

interface HeroTitleProps {
  title?: string;
  subtitle?: string;
}

export default function HeroTitle({
  title = "डीलक्स सैलून",
  subtitle = "महफ़िल Lounge",
}: HeroTitleProps) {
  const [displayText, setDisplayText] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="absolute top-[20%] sm:top-[22%] md:top-[24%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto text-center px-4 w-full max-w-4xl">
      {isEditing ? (
        <input
          type="text"
          value={displayText}
          onChange={(e) => setDisplayText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          autoFocus
          className="bg-black/60 backdrop-blur-md border border-amber-500/50 rounded-xl px-6 py-2 text-4xl sm:text-6xl font-devanagari text-white text-center shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className="group relative cursor-pointer font-devanagari text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-wider leading-none select-none transition-all transform hover:scale-[1.02] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          style={{
            textShadow: '0 4px 12px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.9), 0 0 30px rgba(255, 230, 200, 0.2)',
          }}
          title="Click to edit title text"
        >
          {displayText}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 -right-6 text-xs font-sans bg-black/60 border border-white/20 px-2 py-0.5 rounded-full text-amber-200 font-normal">
            Edit
          </span>
        </h1>
      )}

      {/* Decorative Accent under title */}
      <div className="mt-2 flex items-center justify-center gap-3 opacity-90">
        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
        <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-amber-100/80 uppercase text-shadow">
          {subtitle}
        </span>
        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
      </div>
    </div>
  );
}
