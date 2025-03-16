/**
 * API Helper functions for making requests to external services
 */

// Fetch data from Spotify API
export async function fetchFromSpotify(endpoint, token) {
    try {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Spotify API error:', error);
      throw error;
    }
  }
  
  // Fetch Instagram feed
  export async function fetchInstagramFeed(token, count = 6) {
    try {
      // This would use the Instagram Graph API in production
      // For now, we'll return placeholder data
      return Array(count).fill(null).map((_, i) => ({
        id: `post-${i}`,
        image: `/images/placeholder-cover.jpg`,
        url: 'https://instagram.com/',
        caption: 'Check out our latest release!',
      }));
    } catch (error) {
      console.error('Instagram API error:', error);
      return [];
    }
  }
  
  // Fetch YouTube videos
  export async function fetchYoutubeVideos(channelId, count = 4) {
    try {
      // This would use the YouTube API in production
      // For now, we'll return placeholder data
      return Array(count).fill(null).map((_, i) => ({
        id: `video-${i}`,
        title: `Music Video ${i + 1}`,
        thumbnail: `/images/placeholder-cover.jpg`,
        embedUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
      }));
    } catch (error) {
      console.error('YouTube API error:', error);
      return [];
    }
  }
  
  // Generate unique slug
  export function generateSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .substring(0, 100);
  }