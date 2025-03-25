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
import { serializeMongoDB } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Music, Globe, ArrowRight, PlayCircle, ShoppingCart, PieChart, TrendingUp, Headphones, BarChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Sample featured playlists - this would come from the admin panel in production
// const featuredPlaylists = [
//   {
//     id: '1',
//     title: 'Hip Hop Hits',
//     description: 'Top tracks from our hip hop artists',
//     coverImage: '/images/placeholder-cover.jpg',
//     spotifyUrl: 'https://open.spotify.com/playlist/5rJZkHvRvichAldYrNUVzi',
//     trackCount: 50
//   },
//   {
//     id: '2',
//     title: 'Fresh Finds',
//     description: 'Discover new talent from our roster',
//     coverImage: '/images/placeholder-cover.jpg',
//     spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX2T5QBkHAjfY',
//     trackCount: 30
//   },
//   {
//     id: '3',
//     title: 'Soul Vibes',
//     description: 'Chill beats and smooth vocals',
//     coverImage: '/images/placeholder-cover.jpg',
//     spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWTx0xog3gN3q',
//     trackCount: 40
//   }
// ];

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

// Major DSP platforms we distribute to
const majorDSPs = [
  { name: 'Spotify', logo: '/images/dsp-logos/spotify.png', highlight: true },
  { name: 'Apple Music', logo: '/images/dsp-logos/apple-music.png', highlight: true },
  { name: 'Amazon Music', logo: '/images/dsp-logos/amazon-music.png', highlight: true },
  { name: 'YouTube Music', logo: '/images/dsp-logos/youtube-music.png', highlight: true },
  { name: 'Tidal', logo: '/images/dsp-logos/tidal.png', highlight: true },
  { name: 'Deezer', logo: '/images/dsp-logos/deezer.png', highlight: true },
  { name: 'TikTok', logo: '/images/dsp-logos/tiktok.png', highlight: true },
  { name: 'Instagram/Facebook', logo: '/images/dsp-logos/meta.png', highlight: true },
  { name: 'Pandora', logo: '/images/dsp-logos/pandora.png' },
  { name: 'iHeartRadio', logo: '/images/dsp-logos/iheartradio.png' },
  { name: 'Snapchat', logo: '/images/dsp-logos/snapchat.png' },
  { name: 'Beatport', logo: '/images/dsp-logos/beatport.png' },
  { name: 'Audiomack', logo: '/images/dsp-logos/audiomack.png' },
  { name: 'Boomplay', logo: '/images/dsp-logos/boomplay.png' },
  { name: '140+ More', logo: '/images/dsp-logos/more.png' },
];

// Distribution service plans
const servicePlans = [
  {
    name: 'BASIC',
    description: 'Perfect for new artists',
    price: '$9.99',
    term: 'per release',
    features: [
      'Distribution to 150+ Platforms',
      'Keep 100% of Your Royalties',
      'Unlimited Releases',
      'Free ISRC & UPC Codes',
      'Basic Analytics Dashboard'
    ],
    highlight: false,
    color: 'bg-blue-600'
  },
  {
    name: 'PRO',
    description: 'For serious artists',
    price: '$19.99',
    term: 'per release',
    features: [
      'All Basic Features',
      'Priority Distribution',
      'Advanced Analytics',
      'Playlist Submission Tool',
      'Cover Art Creator',
      'Pre-Release Support'
    ],
    highlight: true,
    color: 'bg-purple-600'
  },
  {
    name: 'PREMIUM',
    description: 'For professional artists',
    price: '$29.99',
    term: 'per release',
    features: [
      'All Pro Features',
      'Marketing Support',
      'Editorial Playlist Pitching',
      'Social Media Promotion',
      'Personalized Release Strategy',
      'Priority Customer Support'
    ],
    highlight: false,
    color: 'bg-pink-600'
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
    
    // Get latest releases with featured flag set to true
    const latestReleases = await Release.find({ featured: true })
      .sort({ releaseDate: -1 })
      .limit(8)
      .populate('artists', 'name')
      .lean();
    
    return {
      featuredArtists: serializeMongoDB(featuredArtists),
      latestReleases: serializeMongoDB(latestReleases),
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
      
      {/* Distribution Services Section */}
      <section className="py-28 px-4 md:px-14  w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent opacity-50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gradient">Global Music Distribution</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Distribute your music to over 150+ digital streaming platforms worldwide with just a few clicks.
              Reach millions of listeners and keep 100% of your royalties.
            </p>
          </div>
          
          <div className="mt-12">
            <Tabs defaultValue="platforms" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800/60">
                <TabsTrigger value="platforms" className="text-lg py-3 data-[state=active]:bg-purple-900/70 data-[state=active]:text-white">Distribution Platforms</TabsTrigger>
                <TabsTrigger value="features" className="text-lg py-3 data-[state=active]:bg-purple-900/70 data-[state=active]:text-white">Why Choose Us</TabsTrigger>
              </TabsList>
              
              <TabsContent value="platforms" className="mt-8">
                <div className="text-center mb-8">
                  <Badge variant="outline" className="px-4 py-1 text-lg mb-4 border-purple-500 text-purple-300">
                    150+ Global Platforms
                  </Badge>
                  <h3 className="text-2xl font-medium mb-4">Get your music on all major streaming platforms</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center mb-12">
                  {majorDSPs.map((dsp, index) => (
                    <div key={index} className={`flex flex-col items-center justify-center p-4 rounded-lg ${dsp.highlight ? 'bg-gradient-to-b from-purple-900/30 to-gray-900 shadow-lg' : 'bg-black/20'}`}>
                      <div className="relative w-16 h-16 mb-2">
                        {/* In a real app, you would have these logo images */}
                        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                          <Music className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <span className="text-sm font-medium mt-2">{dsp.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 border-0">
                    <Link href="/services">
                      View All Distribution Platforms
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-gradient-to-b from-purple-900/20 to-gray-900/80 border-gray-800">
                    <CardHeader>
                      <Globe className="h-12 w-12 text-blue-400 mb-4" />
                      <CardTitle>Worldwide Reach</CardTitle>
                      <CardDescription className="text-gray-300">Get your music heard across the globe</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Distribute your music to over 150 streaming platforms and digital stores worldwide. Reach fans in every corner of the world.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-b from-purple-900/20 to-gray-900/80 border-gray-800">
                    <CardHeader>
                      <PieChart className="h-12 w-12 text-green-400 mb-4" />
                      <CardTitle>Keep 100% Royalties</CardTitle>
                      <CardDescription className="text-gray-300">No commission, all earnings are yours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Unlike other distributors, we let you keep 100% of your streaming and download royalties. Your music, your money.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-b from-purple-900/20 to-gray-900/80 border-gray-800">
                    <CardHeader>
                      <BarChart className="h-12 w-12 text-purple-400 mb-4" />
                      <CardTitle>Advanced Analytics</CardTitle>
                      <CardDescription className="text-gray-300">Track your performance in real-time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Access detailed reports on streams, revenue, listener demographics, and more to help you grow your audience effectively.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center mt-12">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 border-0">
                    <Link href="/services">
                      Learn More About Our Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Distribution Pricing Plans */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-b from-gray-900 via-purple-950/10 to-gray-900 rounded-3xl my-12 shadow-glow-primary">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Distribution Plans</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your music career, from new artists to established professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicePlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`${plan.highlight ? 'bg-gradient-to-b from-purple-900/40 to-purple-950/60 border-purple-500/50 transform scale-105 shadow-xl' : 'bg-gradient-to-b from-gray-800/40 to-gray-900/60 border-gray-700/50'} overflow-hidden transition-all duration-300 hover:shadow-purple-900/20`}
            >
              <div className={`${plan.name === 'BASIC' ? 'bg-gradient-to-r from-purple-700/70 to-blue-600' : plan.name === 'PRO' ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-gradient-to-r from-pink-700 to-purple-700'} h-2 w-full`}></div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.term}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500' : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500'} border-0`}
                  size="lg"
                  asChild
                >
                  <Link href="/services">
                    Choose Plan
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Featured Artists Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-gray-900/80 via-purple-950/5 to-black/60 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-gray-800/50">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          }>
          <FeaturedArtists artists={featuredArtists} />
        </Suspense>
        </div>
      </section>
      
      {/* Featured Releases Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-gray-900/80 via-purple-950/5 to-black/60 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-gray-800/50">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          }>
            <LatestReleases releases={latestReleases} />
          </Suspense>
        </div>
      </section>
      
      {/* Distribution Metrics Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900 via-purple-950/10 to-gray-900 rounded-3xl p-12 shadow-glow-primary border border-gray-800/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Soul Distribution By The Numbers</h2>
            <p className="text-xl text-gray-300">Helping independent artists succeed around the world</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-black/30 p-6 rounded-xl">
              <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <span className="block text-4xl font-bold mb-2">10M+</span>
              <span className="text-gray-400">Monthly Streams</span>
            </div>
            <div className="text-center bg-black/30 p-6 rounded-xl">
              <Headphones className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <span className="block text-4xl font-bold mb-2">150+</span>
              <span className="text-gray-400">DSP Platforms</span>
            </div>
            <div className="text-center bg-black/30 p-6 rounded-xl">
              <Music className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <span className="block text-4xl font-bold mb-2">5,000+</span>
              <span className="text-gray-400">Artists</span>
            </div>
            <div className="text-center bg-black/30 p-6 rounded-xl">
              <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <span className="block text-4xl font-bold mb-2">195</span>
              <span className="text-gray-400">Countries Reached</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Playlists Section */}
      {/* <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-gray-900/80 via-purple-950/5 to-black/60 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-gray-800/50">
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-purple-600 rounded-full mr-3"></div>
            <h2 className="text-3xl font-bold text-white">Featured Playlists</h2>
          </div>
        <SpotifyPlaylistGrid playlists={featuredPlaylists} />
        </div>
      </section> */}
      
      {/* Trending Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-gray-900/80 via-purple-950/5 to-black/60 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-gray-800/50">
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-purple-600 rounded-full mr-3"></div>
            <h2 className="text-3xl font-bold text-white">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>
      
      {/* Videos Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-gray-900/80 via-purple-950/5 to-black/60 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-gray-800/50">
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-purple-600 rounded-full mr-3"></div>
            <h2 className="text-3xl font-bold text-white">Featured Videos</h2>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredVideos.map((video) => (
            <YouTubeEmbed 
              key={video.id}
              videoId={video.id}
              title={video.title}
            />
          ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40 rounded-3xl p-12 text-center shadow-glow-primary border border-purple-800/20">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Ready to Share Your Music with the World?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of independent artists who trust Soul Distribution to get their music heard globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 border-0" asChild>
              <Link href="/services">
                <PlayCircle className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-900/30" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
