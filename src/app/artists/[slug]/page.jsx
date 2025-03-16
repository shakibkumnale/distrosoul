// src/app/artists/[slug]/page.jsx
import { notFound } from 'next/navigation';
import ArtistProfile from '@/components/artists/ArtistProfile';
import connectToDatabase from '@/lib/db';
import Artist from '@/models/Artist';
import Release from '@/models/Release';

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const artists = await Artist.find({}).select('slug').lean();
    
    return artists.map(artist => ({
      slug: artist.slug,
    }));
  } catch (error) {
    console.error('Error generating paths:', error);
    return [];
  }
}

async function getArtistData(slug) {
  try {
    await connectToDatabase();
    
    const artist = await Artist.findOne({ slug }).lean();
    
    if (!artist) {
      return null;
    }
    
    const releases = await Release.find({ artist: artist._id })
      .sort({ releaseDate: -1 })
      .lean();
    
    return {
      artist: {
        ...artist,
        _id: artist._id.toString(),
        createdAt: artist.createdAt.toISOString(),
      },
      releases: releases.map(release => ({
        ...release,
        _id: release._id.toString(),
        artist: release.artist.toString(),
        artistName: artist.name,
        createdAt: release.createdAt.toISOString(),
        releaseDate: release.releaseDate.toISOString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching artist data:', error);
    return null;
  }
}

export default async function ArtistPage({ params }) {
  const { slug } = params;
  const data = await getArtistData(slug);
  
  if (!data) {
    notFound();
  }
  
  const { artist, releases } = data;
  
  return (
    <main className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <ArtistProfile artist={artist} releases={releases} />
    </main>
  );
}