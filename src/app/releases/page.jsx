// src/app/releases/page.jsx
import { Suspense } from 'react';
import ReleasesGrid from '@/components/releases/ReleasesGrid';
import connectToDatabase from '@/lib/db';
import Release from '@/models/Release';
import Artist from '@/models/Artist';

async function getReleases() {
  try {
    await connectToDatabase();
    
    const releases = await Release.find({})
      .sort({ releaseDate: -1 })
      .populate('artist', 'name')
      .lean();
    
    return releases.map(release => ({
      ...release,
      _id: release._id.toString(),
      artist: release.artist._id.toString(),
      artistName: release.artist.name,
      createdAt: release.createdAt.toISOString(),
      releaseDate: release.releaseDate.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching releases:', error);
    return [];
  }
}

export default async function ReleasesPage() {
  const releases = await getReleases();
  
  return (
    <main className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Our Releases</h1>
      
      <Suspense fallback={<div>Loading releases...</div>}>
        <ReleasesGrid releases={releases} columns={5} />
      </Suspense>
    </main>
  );
}

