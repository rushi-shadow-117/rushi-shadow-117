/**
 * Analytics utilities for Google Analytics 4
 * Only loads if NEXT_PUBLIC_GA4_MEASUREMENT_ID is set
 */

const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Check if analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  return !!GA4_ID;
}

/**
 * Get the GA4 measurement ID
 */
export function getGaMeasurementId(): string | undefined {
  return GA4_ID;
}

/**
 * Global gtag function type
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a custom event
 * No-ops if GA4 is not enabled or gtag is not available
 */
export function trackEvent(name: string, params?: Record<string, any>): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, params ?? {});
}

