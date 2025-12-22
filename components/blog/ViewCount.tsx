"use client";

import React, { useEffect, useState } from "react";

interface ViewCountProps {
  slug: string;
  className?: string;
  trackView?: boolean; // Whether to increment view count on mount
}

/**
 * Format number for display (e.g., 1234 -> "1.2k", 1234567 -> "1.2M")
 */
function formatViewCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    const thousands = count / 1000;
    return thousands % 1 === 0
      ? `${thousands}k`
      : `${thousands.toFixed(1)}k`;
  } else {
    const millions = count / 1000000;
    return millions % 1 === 0
      ? `${millions}M`
      : `${millions.toFixed(1)}M`;
  }
}

export function ViewCount({ slug, className = "", trackView = false }: ViewCountProps) {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTracked, setHasTracked] = useState(false);

  // Fetch view count
  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setViewCount(data.count || 0);
        }
      } catch (error) {
        console.error("Error fetching view count:", error);
        setViewCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchViewCount();
  }, [slug]);

  // Track view (increment count) if trackView is true
  useEffect(() => {
    if (trackView && !hasTracked && !isLoading) {
      const trackViewCount = async () => {
        try {
          await fetch(`/api/views/${slug}`, {
            method: "POST",
          });
          setHasTracked(true);
          // Increment local count optimistically
          setViewCount((prev) => (prev !== null ? prev + 1 : 1));
        } catch (error) {
          console.error("Error tracking view:", error);
        }
      };

      // Small delay to avoid counting bot/crawler visits
      const timer = setTimeout(trackViewCount, 1000);
      return () => clearTimeout(timer);
    }
  }, [slug, trackView, hasTracked, isLoading]);

  if (isLoading) {
    return (
      <span className={`font-mono text-xs text-neutral-400 ${className}`}>
        ...
      </span>
    );
  }

  const displayCount = viewCount !== null ? formatViewCount(viewCount) : "0";
  const label = viewCount === 1 ? "view" : "views";

  return (
    <span className={`font-mono text-xs text-neutral-500 ${className}`}>
      {displayCount} {label}
    </span>
  );
}

