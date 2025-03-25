'use client';

import { useState, useEffect } from 'react';
import { Music, Disc, ExternalLink } from 'lucide-react';

export default function SpotifyPlayer({ 
  spotifyUri, 
  type = 'track', 
  height = 380, 
  theme = 'dark', 
  className = '' 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Process the Spotify URI to extract the ID
  const getEmbedUrl = () => {
    try {
      let embedId;
      
      // Handle different URI formats (URI, URL, or just ID)
      if (spotifyUri.includes('spotify:')) {
        // Format: spotify:type:id
        const parts = spotifyUri.split(':');
        embedId = parts[parts.length - 1];
      } else if (spotifyUri.includes('spotify.com')) {
        // Format: https://open.spotify.com/type/id
        const path = new URL(spotifyUri).pathname;
        embedId = path.split('/').pop().split('?')[0];
      } else {
        // Assuming it's just the ID
        embedId = spotifyUri;
      }
      
      return `https://open.spotify.com/embed/${type}/${embedId}?utm_source=generator&theme=${theme}`;
    } catch (err) {
      setError('Invalid Spotify URI format');
      return null;
    }
  };
  
  const embedUrl = getEmbedUrl();
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div className={`relative rounded-xl overflow-hidden bg-gradient-card ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card z-10 gap-2">
          <Disc className="w-8 h-8 text-pink-primary animate-spin" />
          <p className="text-sm text-gray-400">Loading Spotify content...</p>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="flex flex-col items-center justify-center p-8 gap-3">
          <Music className="w-10 h-10 text-purple-primary" />
          <p className="text-gray-300">Failed to load Spotify content</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      )}
      
      {/* Actual iframe */}
      {embedUrl && (
        <iframe
          src={embedUrl}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={handleIframeLoad}
          className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
        ></iframe>
      )}
      
      {/* Spotify branding */}
      <div className="absolute bottom-2 right-2">
        <a 
          href={spotifyUri.includes('spotify.com') ? spotifyUri : `https://open.spotify.com/${type}/${spotifyUri.split(':').pop()}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-400 transition-colors"
        >
          <span>Open in Spotify</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
} 