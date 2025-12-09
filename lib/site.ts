/**
 * Site configuration constants and helpers
 */

export const SITE_NAME = "RP Blog";
export const SITE_AUTHOR = "Rushi Patel";

/**
 * Get the base URL for the site
 * Falls back to localhost in development
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

