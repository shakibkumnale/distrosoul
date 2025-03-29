// src/app/artists/[slug]/page.jsx
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import Artist from '@/models/Artist';
import Release from '@/models/Release';
import ArtistProfile from '@/components/artists/ArtistProfile';
import { serializeMongoDB } from '@/lib/utils';

export async function generateMetadata({ params }) {
  await connectToDatabase();
  const artist = await Artist.findOne({ slug: params.slug });
  
  if (!artist) {
    return {
      title: 'Artist Not Found',
    };
  }
  
  return {
    title: `${artist.name} | Soul Distribution`,
    description: artist.bio || `Official page for ${artist.name}`,
  };
}

async function getArtistData(slug) {
  await connectToDatabase();
  const artist = await Artist.findOne({ slug }).lean();
  
  if (!artist) {
    return null;
  }
  
  const releases = await Release.find({ artists: artist._id })
    .populate('artists')
    .sort({ releaseDate: -1 })
    .lean();
  
  console.log(`Found ${releases.length} releases for artist ${artist.name} (ID: ${artist._id})`);
  
  const releasesWithArtistInfo = releases.map(release => {
    return {
      ...release,
      artistName: artist.name
    };
  });
  
  return {
    artist: serializeMongoDB(artist),
    releases: serializeMongoDB(releasesWithArtistInfo)
  };
}

export default async function ArtistPage({ params }) {
  const data = await getArtistData(params.slug);
  
  if (!data) {
    notFound();
  }
  
  return <ArtistProfile artist={data.artist} releases={data.releases} />;
}