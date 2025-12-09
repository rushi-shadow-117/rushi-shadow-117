"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface PostSubscribeCTAProps {
  onSubscribeClick?: () => void;
}

export function PostSubscribeCTA({ onSubscribeClick }: PostSubscribeCTAProps) {
  const [viewTracked, setViewTracked] = useState(false);

  React.useEffect(() => {
    // Track view once when component mounts
    if (!viewTracked) {
      trackEvent("subscribe_cta_view", { location: "post_bottom" });
      setViewTracked(true);
    }
  }, [viewTracked]);

  const handleClick = () => {
    trackEvent("subscribe_cta_click", { location: "post_bottom" });
    if (onSubscribeClick) {
      onSubscribeClick();
    } else {
      // Dispatch custom event to trigger subscribe modal
      // The Navbar component will listen for this event
      window.dispatchEvent(new CustomEvent("openSubscribeModal"));
      
      // Fallback: try to find and trigger the subscribe button in the navbar
      const subscribeButton = document.querySelector('[data-subscribe-trigger]') as HTMLElement;
      if (subscribeButton) {
        subscribeButton.click();
      }
    }
  };

  return (
    <div className="mt-20 pt-12 border-t border-black/10">
      <div className="bg-neutral-50 border border-black/10 p-8 md:p-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black mb-4">
            Join the signal
          </h2>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            Subscribe to <strong>brain dump</strong>. Occasional long-form essays on engineering, design, and entropy. No spam, ever.
          </p>
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
          >
            <span>SUBSCRIBE</span>
          </button>
        </div>
      </div>
    </div>
  );
}

