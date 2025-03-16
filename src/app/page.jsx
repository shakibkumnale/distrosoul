// src/app/page.jsx (Homepage)
import { Suspense } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedArtists from '@/components/home/FeaturedArtists';
import LatestReleases from '@/components/home/LatestReleases';
import InstagramFeed from '@/components/home/InstagramFeed';
import connectToDatabase from '@/lib/db';
import Artist from '@/models/Artist';
import Release from '@/models/Release';
import { fetchInstagramFeed } from '@/lib/api';

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
    
    // Get Instagram feed data
    const instagramFeed = await fetchInstagramFeed(process.env.INSTAGRAM_TOKEN, 6);
    
    return {
      featuredArtists: featuredArtists.map(artist => ({
        ...artist,
        _id: artist._id.toString(),
        createdAt: artist.createdAt.toISOString(),
      })),
      latestReleases: formattedReleases,
      instagramFeed,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      featuredArtists: [],
      latestReleases: [],
      instagramFeed: [],
    };
  }
}

export default async function HomePage() {
  const { featuredArtists, latestReleases, instagramFeed } = await getData();
  
  return (
    <main>
      <HeroBanner />
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Artists</h2>
        <Suspense fallback={<div>Loading artists...</div>}>
          <FeaturedArtists artists={featuredArtists} />
        </Suspense>
      </section>
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-zinc-900/50">
        <h2 className="text-3xl font-bold mb-8">Latest Releases</h2>
        <Suspense fallback={<div>Loading releases...</div>}>
          <LatestReleases releases={latestReleases} />
        </Suspense>
      </section>
      
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Instagram</h2>
        <Suspense fallback={<div>Loading Instagram feed...</div>}>
          <InstagramFeed posts={instagramFeed} />
        </Suspense>
      </section>
    </main>
  );
}
