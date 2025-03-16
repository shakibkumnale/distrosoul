// src/components/artists/ArtistProfile.jsx
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Music, Youtube, Instagram } from 'lucide-react';
import ReleasesGrid from '../releases/ReleasesGrid';

export default function ArtistProfile({ artist, releases = [] }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative flex-shrink-0 overflow-hidden rounded-xl aspect-square w-full max-w-xs mx-auto md:mx-0">
          <Image
            src={artist.image || '/images/placeholder-cover.jpg'}
            alt={artist.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="flex-grow space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold md:text-4xl">{artist.name}</h1>
            {artist.isVerified && (
              <CheckCircle className="w-6 h-6 text-blue-400" />
            )}
          </div>
          
          <p className="text-gray-200 whitespace-pre-line">{artist.bio}</p>
          
          <div className="flex flex-wrap gap-3">
            {artist.spotifyUrl && (
              <Link 
                href={artist.spotifyUrl} 
                target="_blank" 
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-400 bg-green-950 rounded-full hover:bg-green-900 transition-colors"
              >
                <Music className="w-4 h-4" />
                Spotify
              </Link>
            )}
            
            {artist.youtubeUrl && (
              <Link 
                href={artist.youtubeUrl} 
                target="_blank" 
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-950 rounded-full hover:bg-red-900 transition-colors"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </Link>
            )}
            
            {artist.instagramUrl && (
              <Link 
                href={artist.instagramUrl} 
                target="_blank" 
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-400 bg-purple-950 rounded-full hover:bg-purple-900 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Releases</h2>
        {releases.length > 0 ? (
          <ReleasesGrid releases={releases} />
        ) : (
          <p className="py-8 text-center text-gray-400">No releases yet.</p>
        )}
      </div>
    </div>
  );
}