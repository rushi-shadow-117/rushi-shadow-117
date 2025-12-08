"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  className?: string;
  slotId?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdSlot({ className, slotId }: AdSlotProps) {
  const adInitialized = useRef(false);
  const adElementRef = useRef<HTMLDivElement>(null);
  const retryCount = useRef(0);
  const maxRetries = 20; // Max 2 seconds of retries

  useEffect(() => {
    // Prevent double initialization
    if (adInitialized.current) {
      return;
    }

    // Only initialize on production domain (not localhost)
    const isProduction = typeof window !== "undefined" && 
      !window.location.hostname.includes("localhost") && 
      !window.location.hostname.includes("127.0.0.1");

    // Wait for the script to load and DOM to be ready
    const initializeAd = () => {
      try {
        if (typeof window === "undefined" || !window.adsbygoogle) {
          return;
        }

        // Check if the ad element exists and has dimensions
        if (adElementRef.current) {
          const rect = adElementRef.current.getBoundingClientRect();
          const hasWidth = rect.width > 0;
          const isVisible = rect.width > 0 && rect.height > 0;

          if (!hasWidth || !isVisible) {
            // Retry if width is 0 or element is not visible
            retryCount.current++;
            if (retryCount.current < maxRetries) {
              setTimeout(initializeAd, 100);
              return;
            } else {
              // Max retries reached, don't initialize
              console.warn("AdSense: Container not ready after max retries");
              return;
            }
          }
        }

        // Check if this specific ad slot has already been initialized
        const adElement = adElementRef.current?.querySelector('.adsbygoogle') as HTMLElement;
        if (adElement) {
          // Check if already initialized by AdSense
          const status = adElement.getAttribute('data-adsbygoogle-status');
          if (status === 'done' || status === 'filled') {
            adInitialized.current = true;
            return;
          }

          // Only initialize on production or if explicitly allowed
          if (isProduction) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adInitialized.current = true;
          }
        }
      } catch (error) {
        // Silently handle errors in development
        if (isProduction) {
          console.error("AdSense error:", error);
        }
      }
    };

    // Wait for AdSense script to load and DOM to be ready
    const startInitialization = () => {
      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        setTimeout(initializeAd, 200); // Additional delay for layout
      });
    };

    if (window.adsbygoogle) {
      // Script already loaded
      startInitialization();
    } else {
      // Wait for script to load
      const checkScript = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkScript);
          startInitialization();
        }
      }, 100);

      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(checkScript), 10000);
    }
  }, []);

  return (
    <div 
      ref={adElementRef}
      className={cn("w-full bg-neutral-100/50 border border-neutral-200 border-dashed p-4 flex items-center justify-center min-h-[100px]", className)}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100px", width: "100%" }}
        data-ad-client="ca-pub-6544859635600254"
        data-ad-slot={slotId || ""}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}