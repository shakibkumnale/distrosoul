'use client';

// src/components/home/LatestReleases.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Play ,ChevronRight } from 'lucide-react';


const sampleReleases = [
  {
    id: 1,
    title: 'Urban Dreams',
    slug: 'urban-dreams',
    artist: 'Beat Connect',
    artistSlug: 'beat-connect',
    coverArt: '/images/placeholder-cover.jpg',
    releaseDate: '2025-02-15',
    type: 'Album'
  },
  {
    id: 2,
    title: 'City Lights',
    slug: 'city-lights',
    artist: 'Lyrical Flow',
    artistSlug: 'lyrical-flow',
    coverArt: '/images/placeholder-cover.jpg',
    releaseDate: '2025-02-10',
    type: 'Single'
  },
  {
    id: 3,
    title: 'Street Chronicles',
    slug: 'street-chronicles',
    artist: 'Urban Poets',
    artistSlug: 'urban-poets',
    coverArt: '/images/placeholder-cover.jpg',
    releaseDate: '2025-02-05',
    type: 'EP'
  },
  {
    id: 4,
    title: 'Midnight Flow',
    slug: 'midnight-flow',
    artist: 'Rhythm Kings',
    artistSlug: 'rhythm-kings',
    coverArt: '/images/placeholder-cover.jpg',
    releaseDate: '2025-01-28',
    type: 'Single'
  }
];

export default function LatestReleases() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Latest Releases</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleReleases.map((release) => (
            <div key={release.id} className="group">
              <div className="bg-gray-900 rounded-lg overflow-hidden transition transform group-hover:scale-105">
                <div className="relative aspect-square">
                  <Link href={`/releases/${release.slug}`}>
                    <Image 
                      src={release.coverArt} 
                      alt={release.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-orange-600 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  </Link>
                  <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {release.type}
                  </div>
                </div>
                <div className="p-4">
                  <Link href={`/releases/${release.slug}`}>
                    <h3 className="text-white font-medium truncate">{release.title}</h3>
                  </Link>
                  <Link href={`/artists/${release.artistSlug}`}>
                    <span className="text-gray-400 hover:text-orange-500 text-sm">
                      {release.artist}
                    </span>
                  </Link>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(release.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/releases" 
            className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium"
          >
            View All Releases
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}