import { connectToDatabase } from '@/lib/mongodb';
import FeaturedArtists from '@/components/home/FeaturedArtists';
import ReleasesGrid from '@/components/releases/ReleasesGrid';
import { Music } from 'lucide-react';
import { ObjectId } from 'mongodb';

async function getFeaturedReleases() {
  const { db } = await connectToDatabase();
  const releases = await db.collection('releases')
    .find({ featured: true })
    .sort({ releaseDate: -1 })
    .limit(8)
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

export default async function Home() {
  const featuredReleases = await getFeaturedReleases();

  return (
    <main className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover New Music
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with talented artists and explore their latest releases
          </p>
        </div>
      </section>

      {/* Featured Releases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Music className="w-6 h-6 text-purple-primary" />
            <h2 className="text-3xl font-bold text-white">Featured Releases</h2>
          </div>
          <ReleasesGrid releases={featuredReleases} />
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container mx-auto px-4">
          <FeaturedArtists />
        </div>
      </section>
    </main>
  );
} 