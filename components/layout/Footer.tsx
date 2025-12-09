import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 px-6 md:px-20 overflow-hidden border-t border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-sm text-neutral-400" style={{ color: '#a3a3a3' }}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            SYSTEM_NORMAL
          </div>
          <p className="text-xl font-medium tracking-tight mt-4" style={{ color: '#ffffff' }}>
            Based in Chicago<br />
            building stuff
          </p>
        </div>

        <div className="font-mono text-sm" style={{ color: '#737373' }}>
          © {new Date().getFullYear()} RUSHI PATEL. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* Big text marquee */}
      <div className="mt-20 -mb-6 opacity-20 whitespace-nowrap overflow-hidden flex select-none pointer-events-none">
        <div className="text-[6rem] md:text-[14rem] font-bold leading-none tracking-tighter animate-scroll" style={{ color: '#ffffff' }}>
          Build. Write. Improve. Repeat.
        </div>
        {/* Duplicate for seamless loop */}
        <div className="text-[6rem] md:text-[14rem] font-bold leading-none tracking-tighter animate-scroll" aria-hidden="true" style={{ color: '#ffffff' }}>
          Build. Write. Improve. Repeat.
        </div>
      </div>
    </footer>
  );
}