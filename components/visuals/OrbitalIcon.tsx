import React from "react";

export function OrbitalIcon() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
      {/* Outer Ring */}
      <div className="absolute inset-0 border border-black/20 rounded-full animate-rotate-orbit"></div>
      {/* Inner Dashed Ring */}
      <div className="absolute inset-4 border border-dashed border-black/40 rounded-full animate-rotate-orbit-reverse"></div>

      {/* Rotating Initials Container */}
      <div className="absolute inset-0 animate-rotate-orbit">
        {/* R */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-mono font-bold animate-rotate-orbit-reverse shadow-lg">
          R
        </div>
        {/* P */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-white border border-black text-black flex items-center justify-center text-xs font-mono font-bold animate-rotate-orbit-reverse shadow-lg">
          P
        </div>
      </div>

      {/* Center Point */}
      <div className="absolute inset-0 m-auto w-2 h-2 bg-black rounded-full"></div>
    </div>
  );
}