/**
 * Calculate word count from HTML content
 * Strips HTML tags and counts words
 */
export function getWordCount(content: string): number {
  if (!content) return 0;

  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, " ");
  
  // Remove extra whitespace and split into words
  const words = textContent
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);

  return words.length;
}

/**
 * Calculate reading time in minutes
 * Assumes average reading speed of 225 words per minute
 */
export function getReadingTimeMinutes(wordCount: number): number {
  const wordsPerMinute = 225;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes); // At least 1 minute
}

/**
 * Format word count with commas
 */
export function formatWordCount(count: number): string {
  return count.toLocaleString();
}


