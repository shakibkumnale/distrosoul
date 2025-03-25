import { connectToDatabase } from '@/lib/mongodb';
import ReleasesGrid from '@/components/releases/ReleasesGrid';
import { Music } from 'lucide-react';
import { ObjectId } from 'mongodb';

async function getAllReleases() {
  const { db } = await connectToDatabase();
  const releases = await db.collection('releases')
    .find({})
    .sort({ releaseDate: -1 })
    .toArray();
  
  // Populate artist information
  const releasesWithArtists = await Promise.all(releases.map(async (release) => {
    let artistName = 'Unknown Artist';
    
    // Make sure we have artists array and it's not empty
    if (release.artists && release.artists.length > 0) {
      try {
        // Get the first artist's information
        const artistId = release.artists[0].$oid || release.artists[0];
        const artist = await db.collection('artists').findOne({ 
          _id: typeof artistId === 'string' ? new ObjectId(artistId) : artistId 
        });
        
        if (artist && artist.name) {
          artistName = artist.name;
        }
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    }
    
    return {
      ...release,
      _id: release._id.toString(),
      artists: Array.isArray(release.artists) 
        ? release.artists.map(artist => {
            // Handle different ObjectId formats
            if (typeof artist === 'object' && artist.$oid) {
              return artist.$oid;
            } else if (typeof artist === 'object') {
              return artist.toString();
            }
            return artist;
          })
        : [],
      artistName,
      createdAt: release.createdAt ? new Date(release.createdAt).toISOString() : new Date().toISOString(),
      releaseDate: release.releaseDate ? new Date(release.releaseDate).toISOString() : new Date().toISOString(),
    };
  }));

  return releasesWithArtists;
}

export default async function ReleasesPage() {
  const releases = await getAllReleases();

  return (
    <main className="min-h-screen bg-gradient-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Music className="w-6 h-6 text-purple-primary" />
          <h1 className="text-3xl font-bold text-white">All Releases</h1>
        </div>
        <ReleasesGrid releases={releases} />
      </div>
    </main>
  );
} 