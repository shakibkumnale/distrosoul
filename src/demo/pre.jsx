// src/app/page.jsx (Homepage)
import { Suspense } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedArtists from '@/components/home/FeaturedArtists';
import LatestReleases from '@/components/home/LatestReleases';
import SpotifyPlayer from '@/components/spotify/SpotifyPlayer';
import SpotifyPlaylistGrid from '@/components/spotify/SpotifyPlaylistGrid';
import YouTubeEmbed from '@/components/youtube/YouTubeEmbed';
import connectToDatabase from '@/lib/db';
import Artist from '@/models/Artist';
import Release from '@/models/Release';

// Sample featured playlists - this would come from the admin panel in production
const featuredPlaylists = [
  {
    id: '1',
    title: 'Hip Hop Hits',
    description: 'Top tracks from our hip hop artists',
    coverImage: '/images/placeholder-cover.jpg',
    spotifyUrl: 'https://open.spotify.com/playlist/5rJZkHvRvichAldYrNUVzi',
    trackCount: 50
  },
  {
    id: '2',
    title: 'Fresh Finds',
    description: 'Discover new talent from our roster',
    coverImage: '/images/placeholder-cover.jpg',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX2T5QBkHAjfY',
    trackCount: 30
  },
  {
    id: '3',
    title: 'Soul Vibes',
    description: 'Chill beats and smooth vocals',
    coverImage: '/images/placeholder-cover.jpg',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWTx0xog3gN3q',
    trackCount: 40
  }
];

// Sample featured YouTube videos - this would come from the admin panel in production
const featuredVideos = [
  {
    id: 'dQw4w9WgXcQ', // Replace with actual video ID
    title: 'Featured Artist - Music Video'
  },
  {
    id: 'uIRLnHHFgj4', // Replace with actual video ID
    title: 'Behind The Scenes'
  }
];

// This is a Server Component to fetch data
async function getData() {
  try {
    await connectToDatabase();
    
    // Get featured artists
    const featuredArtists = await Artist.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    
    // Get latest releases
    const latestReleases = await Release.find({})
      .sort({ releaseDate: -1 })
      .limit(8)
      .populate('artist', 'name')
      .lean();
    
    // Map the populated artist data to make it easier to work with
    const formattedReleases = latestReleases.map(release => ({
      ...release,
      _id: release._id.toString(),
      artist: release.artist._id.toString(),
      artistName: release.artist.name,
      createdAt: release.createdAt.toISOString(),
      releaseDate: release.releaseDate.toISOString(),
    }));
    
    return {
      featuredArtists: featuredArtists.map(artist => ({
        ...artist,
        _id: artist._id.toString(),
        createdAt: artist.createdAt.toISOString(),
      })),
      latestReleases: formattedReleases,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      featuredArtists: [],
      latestReleases: [],
    };
  }
}

export default async function HomePage() {
  const { featuredArtists, latestReleases } = await getData();
  
  return (
    <main className="min-h-screen bg-gradient-dark">
      <HeroBanner />
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gradient">Featured Artists</h2>
        <Suspense fallback={<div>Loading artists...</div>}>
          <FeaturedArtists artists={featuredArtists} />
        </Suspense>
      </section>
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-card flex flex-row gap-4 rounded-xl my-8">
        <h2 className="text-4xl font-bold mb-8">Latest Releases</h2>
        <Suspense fallback={<div>Loading releases...</div>}>
          {/* <LatestReleases releases={latestReleases} />
           */}
            <SpotifyPlayer 
          spotifyUri="5Hc3oGoeGpnB9ChgCg2E8Y" 
          type="track" 
          height={380} 
          theme="0"
        />
            <SpotifyPlayer 
          spotifyUri="5Hc3oGoeGpnB9ChgCg2E8Y" 
          type="track" 
          height={380} 
          theme="0"
        />
        
         
        
        </Suspense>
      </section>
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gradient">Featured Playlists</h2>
        <SpotifyPlaylistGrid playlists={featuredPlaylists} />
      </section>
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-card flex flex-row gap-4 rounded-xl my-8">
        <h2 className="text-4xl font-bold mb-8 text-gradient ">Trending Now</h2>
        
        <SpotifyPlayer 
          spotifyUri="5rJZkHvRvichAldYrNUVzi" 
          type="playlist" 
          height={380} 
          theme="0"
        />
        <SpotifyPlayer 
          spotifyUri="5rJZkHvRvichAldYrNUVzi" 
          type="playlist" 
          height={380} 
          theme="0"
        />
        <SpotifyPlayer 
          spotifyUri="5rJZkHvRvichAldYrNUVzi" 
          type="playlist" 
          height={380} 
          theme="0"
        />
      </section>
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gradient">Featured Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredVideos.map((video) => (
            <YouTubeEmbed 
              key={video.id}
              videoId={video.id}
              title={video.title}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
