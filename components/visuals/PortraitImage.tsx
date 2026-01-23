"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PortraitImage() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/images/IMG_0346.JPG",
    "/images/IMG_0226.JPG",
    "/images/IMG_4351.jpeg",
    "/images/pic2.JPG"
  ];

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handleClick = () => {
    goToNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      tabIndex={0}
      role="region"
      aria-label="Portrait image carousel"
    >
      {/* Images */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Portrait ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
            index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ))}

      {/* Left Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        aria-label="Previous image"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white border border-black/10 flex items-center justify-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        aria-label="Next image"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white border border-black/10 flex items-center justify-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 border border-black/10 px-3 py-1">
        <span className="font-mono text-xs text-black">
          {currentImage + 1} / {images.length}
        </span>
      </div>

      {/* Click to advance fallback (optional, less prominent) */}
      <div 
        className="absolute inset-0 cursor-pointer z-10"
        onClick={handleClick}
        title={`Click to switch image (${currentImage + 1}/${images.length})`}
        aria-hidden="true"
      />
    </div>
  );
}


