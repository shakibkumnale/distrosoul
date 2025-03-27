'use client';

import { useState } from 'react';
import { Music, ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReleasesGrid({ releases = [], className = '' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // If no releases provided, show placeholder
  if (!releases || releases.length === 0) {
    return (
      <div className={`rounded-xl bg-gradient-card p-6 text-center ${className}`}>
        <div className="flex flex-col items-center justify-center gap-3">
          <Music className="w-10 h-10 text-purple-primary opacity-70" />
          <h3 className="text-lg font-medium">No releases available</h3>
          <p className="text-sm text-gray-400">Releases will appear here once added</p>
        </div>
      </div>
    );
  }

  // Generate a unique key for each release
  const getReleaseKey = (release, index) => {
    // Use a combination of properties to ensure uniqueness
    if (typeof release._id === 'string' && release._id.length > 0) {
      return release._id;
    }
    if (release.slug) {
      return `slug-${release.slug}`;
    }
    if (release.title) {
      return `title-${release.title}-${index}`;
    }
    return `release-index-${index}`;
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {releases.map((release, index) => (
        <div 
          key={getReleaseKey(release, index)}
          className="group relative rounded-xl overflow-hidden bg-gradient-card transition-all duration-300 shadow-md hover:shadow-glow-accent"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Release Cover */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={release.coverImage || '/images/placeholder-cover.jpg'}
              alt={release.title || 'Release Cover'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Hover overlay with play button */}
            <div 
              className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex gap-2">
                {release.spotifyUrl && (
                  <Link 
                  href={`https://open.spotify.com/track/${release.spotifyUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
                <Link 
                  href={`/releases/${release.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors"
                >
                  <span>Details</span>
                  <Play className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Release info */}
          <div className="p-4">
            <h3 className="font-semibold text-white text-lg truncate group-hover:text-pink-primary transition-colors">
              {release.title || 'Untitled Release'}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {release.artistName || 'Unknown Artist'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-purple-900/50 text-purple-300">
                {release.type || 'Single'}
              </span>
              {release.featured && (
                <span className="text-xs px-2 py-1 rounded-full bg-pink-900/50 text-pink-300">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
