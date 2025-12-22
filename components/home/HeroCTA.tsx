"use client";

import React from "react";
import Link from "next/link";

export function HeroCTA() {
  const handleSubscribe = () => {
    window.dispatchEvent(new CustomEvent("openSubscribeModal"));
  };

  return (
    <div className="relative w-full">
      <div className="border border-black/10 bg-white p-6 sm:p-8 md:p-12">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
          <div className="font-mono text-xs uppercase text-neutral-500 tracking-wider mb-2">
            READ THE BLOG
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black leading-tight break-words px-2 sm:px-0">
            Welcome to my Digital Notepad
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-xl leading-relaxed break-words px-2 sm:px-0">
            I write about building software, my observations in life and fun topics that cross my mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
            <Link
              href="/work"
              className="group relative border-2 border-black/20 bg-white hover:border-black px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-tight text-black transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg min-h-[44px]"
            >
              <span className="relative z-10">WORK</span>
            </Link>
            <Link
              href="/life"
              className="group relative border-2 border-black/20 bg-white hover:border-black px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-tight text-black transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg min-h-[44px]"
            >
              <span className="relative z-10">LIFE</span>
            </Link>
            <Link
              href="/fun"
              className="group relative border-2 border-black/20 bg-white hover:border-black px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-tight text-black transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg min-h-[44px]"
            >
              <span className="relative z-10">FUN</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

