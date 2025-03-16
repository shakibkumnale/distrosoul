// src/app/releases/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Music, Play, Disc3 } from 'lucide-react';
import MediaPlayer from '@/components/releases/MediaPlayer';
import connectToDatabase from '@/lib/db';
import Release from '@/models/Release';
import Artist from '@/models/Artist';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const releases = await Release.find({}).select('slug').lean();
    
    return releases.map(release => ({
      slug: release.slug,
    }));
  } catch (error) {
    console.error('Error generating paths:', error);
    return [];
  }
}

async function getReleaseData(slug) {
  try {
    await connectToDatabase();
    
    const release = await Release.findOne({ slug }).lean();
    
    if (!release) {
      return null;
    }
    
    const artist = await Artist.findById(release.artist).lean();
    
    // Get more releases by the same artist
    const moreReleases = await Release.find({ 
      artist: release.artist, 
      _id: { $ne: release._id } 
    })
      .sort({ releaseDate: -1 })
      .limit(4)
      .lean();
    
    return {
      release: {
        ...release,
        _id: release._id.toString(),
        artist: release.artist.toString(),
        artistName: artist.name,
        createdAt: release.createdAt.toISOString(),
        releaseDate: release.releaseDate.toISOString(),
      },
      artist: {
        ...artist,
        _id: artist._id.toString(),
        createdAt: artist.createdAt.toISOString(),
      },
      moreReleases: moreReleases.map(rel => ({
        ...rel,
        _id: rel._id.toString(),
        artist: rel.artist.toString(),
        artistName: artist.name,
        createdAt: rel.createdAt.toISOString(),
        releaseDate: rel.releaseDate.toISOString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching release data:', error);
    return null;
  }
}

export default async function ReleasePage({ params }) {
  const { slug } = params;
  const data = await getReleaseData(slug);
  
  if (!data) {
    notFound();
  }
  
  const { release, artist, moreReleases } = data;
  
  // Extract Spotify URI from URL if available
  let spotifyUri = '';
  if (release.spotifyUrl && release.spotifyUrl.includes('track')) {
    const trackId = release.spotifyUrl.split('track/')[1]?.split('?')[0];
    if (trackId) {
      spotifyUri = `spotify:track:${trackId}`;
    }
  }
  
  return (
    <main className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/3">
          <div className="sticky top-24">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={release.coverImage || '/images/placeholder-cover.jpg'}
                alt={release.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="mt-4 space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{release.title}</h1>
                <Link href={`/artists/${artist.slug}`} className="text-gray-400 hover:text-green-400">
                  {artist.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{formatDate(release.releaseDate)}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {release.type && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-zinc-800 rounded-full">
                    <Disc3 className="w-3 h-3" />
                    {release.type}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {release.spotifyUrl && (
                  <Link 
                    href={release.spotifyUrl} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-400 bg-green-950 rounded-full hover:bg-green-900 transition-colors"
                  >
                    <Music className="w-4 h-4" />
                    Spotify
                  </Link>
                )}
                
                {release.appleMusicUrl && (
                  <Link 
                    href={release.appleMusicUrl} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                  >
                    <Music className="w-4 h-4" />
                    Apple Music
                  </Link>
                )}
                
                {release.youtubeUrl && (
                  <Link 
                    href={release.youtubeUrl} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-950 rounded-full hover:bg-red-900 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    YouTube Music
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 space-y-8">
          <MediaPlayer 
            spotifyUri={spotifyUri} 
            youtubeUrl={release.youtubeUrl} 
          />
          
          {moreReleases.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">More from {artist.name}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {moreReleases.map(rel => (
                  <Link 
                    key={rel._id}
                    href={`/releases/${rel.slug}`} 
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-black aspect-square">
                      <Image
                        src={rel.coverImage || '/images/placeholder-cover.jpg'}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-2 font-medium text-white group-hover:text-green-400 truncate">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}