"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate scrollable distance
      const scrollableHeight = documentHeight - windowHeight;
      
      if (scrollableHeight > 0) {
        const scrollProgress = (scrollTop / scrollableHeight) * 100;
        setProgress(Math.min(100, Math.max(0, scrollProgress)));
      } else {
        setProgress(0);
      }
    };

    // Initial calculation
    updateProgress();

    // Update on scroll
    window.addEventListener("scroll", updateProgress, { passive: true });
    
    // Update on resize (content might change)
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 bg-black z-50 origin-left transition-transform duration-150 ease-out"
      style={{
        transform: `scaleX(${progress / 100})`,
      }}
      aria-hidden="true"
    />
  );
}

