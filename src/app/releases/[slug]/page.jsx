// src/app/releases/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Music, Play, Disc3, Calendar, ExternalLink } from 'lucide-react';
import MediaPlayer from '@/components/releases/MediaPlayer';
import { connectToDatabase } from '@/lib/mongodb';
import Release from '@/models/Release';
import Artist from '@/models/Artist';
import { formatDate } from '@/lib/utils';
import ReleaseDetails from '@/components/releases/ReleaseDetails';
import { serializeMongoDB } from '@/lib/utils';

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

export async function generateMetadata({ params }) {
  await connectToDatabase();
  const release = await Release.findOne({ slug: params.slug })
    .populate('artists');

  if (!release) {
    return {
      title: 'Release Not Found',
    };
  }

  const artistName = release.artists && release.artists.length > 0 
    ? release.artists[0].name 
    : 'Unknown Artist';

  return {
    title: `${release.title} by ${artistName} | Soul Distribution`,
    description: release.description || `Listen to ${release.title} by ${artistName}`,
  };
}

async function getReleaseData(slug) {
    await connectToDatabase();
  const release = await Release.findOne({ slug })
    .populate('artists')
    .lean();
    
    if (!release) {
      return null;
    }
    
  // Get artist from the populated artists array
  const artist = release.artists && release.artists.length > 0 ? release.artists[0] : null;

  // Get more releases from the same artist if we have an artist
  let moreReleases = [];
  if (artist) {
    moreReleases = await Release.find({
      artists: artist._id,
      _id: { $ne: release._id } 
    })
      .sort({ releaseDate: -1 })
      .limit(4)
      .populate('artists')
      .lean();
  }
    
    return {
    release: serializeMongoDB(release),
    moreReleases: serializeMongoDB(moreReleases)
  };
}

export default async function ReleasePage({ params }) {
  const data = await getReleaseData(params.slug);
  
  if (!data) {
    notFound();
  }
  
  return <ReleaseDetails release={data.release} moreReleases={data.moreReleases} />;
}