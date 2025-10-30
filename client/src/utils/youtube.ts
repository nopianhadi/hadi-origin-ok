/**
 * YouTube URL utilities for converting regular YouTube URLs to embed format
 */

/**
 * Converts a regular YouTube URL to embed format
 * @param url - YouTube URL (watch, share, or embed format)
 * @returns Embed URL or original URL if not a YouTube URL
 */
export function convertToYouTubeEmbed(url: string): string {
  if (!url) return '';
  
  // If already an embed URL, return as is
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  // Extract video ID from various YouTube URL formats
  const videoId = extractYouTubeVideoId(url);
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // If not a YouTube URL, return original URL (could be Vimeo, etc.)
  return url;
}

/**
 * Extracts video ID from various YouTube URL formats
 * @param url - YouTube URL
 * @returns Video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Regular YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (watchMatch) {
    return watchMatch[1];
  }
  
  // YouTube share URL: https://youtu.be/VIDEO_ID
  const shareMatch = url.match(/youtu\.be\/([^&\n?#]+)/);
  if (shareMatch) {
    return shareMatch[1];
  }
  
  // YouTube embed URL: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
  if (embedMatch) {
    return embedMatch[1];
  }
  
  // YouTube mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
  const mobileMatch = url.match(/m\.youtube\.com\/watch\?v=([^&\n?#]+)/);
  if (mobileMatch) {
    return mobileMatch[1];
  }
  
  return null;
}

/**
 * Validates if a URL is a valid YouTube URL
 * @param url - URL to validate
 * @returns True if valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url) return false;
  
  const videoId = extractYouTubeVideoId(url);
  return videoId !== null && videoId.length >= 10; // YouTube video IDs are typically 11 characters
}

/**
 * Gets YouTube video thumbnail URL
 * @param url - YouTube URL
 * @param quality - Thumbnail quality (default, medium, high, standard, maxres)
 * @returns Thumbnail URL or null if not a YouTube URL
 */
export function getYouTubeThumbnail(url: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string | null {
  const videoId = extractYouTubeVideoId(url);
  
  if (!videoId) return null;
  
  const qualityMap = {
    default: 'default.jpg',
    medium: 'mqdefault.jpg',
    high: 'hqdefault.jpg',
    standard: 'sddefault.jpg',
    maxres: 'maxresdefault.jpg'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

/**
 * Example usage:
 * 
 * const regularUrl = "https://www.youtube.com/watch?v=j8XdRefF7M8";
 * const embedUrl = convertToYouTubeEmbed(regularUrl);
 * // Result: "https://www.youtube.com/embed/j8XdRefF7M8"
 * 
 * const shareUrl = "https://youtu.be/j8XdRefF7M8";
 * const embedUrl2 = convertToYouTubeEmbed(shareUrl);
 * // Result: "https://www.youtube.com/embed/j8XdRefF7M8"
 */