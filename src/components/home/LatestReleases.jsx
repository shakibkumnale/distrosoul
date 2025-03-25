// src/components/home/LatestReleases.jsx
import Link from 'next/link';
import { ChevronRight, Music } from 'lucide-react';
import ReleasesGrid from '@/components/releases/ReleasesGrid';

export default function LatestReleases({ releases = [] }) {
  // Filter to only show featured releases if on homepage
  const releasesToShow = releases.filter(release => release.featured);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center">
          <div className="h-8 w-1 bg-purple-600 rounded-full mr-3"></div>
          <h2 className="text-3xl font-bold text-white">Latest Releases</h2>
        </div>
      </div>
      
      {releasesToShow.length > 0 ? (
        <ReleasesGrid releases={releasesToShow} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[320px] bg-gradient-to-b from-gray-900/80 to-black/40 rounded-xl border border-gray-800/30">
          <Music className="h-12 w-12 text-purple-600/40 mb-4" />
          <p className="text-gray-400">No featured releases yet</p>
        </div>
      )}
      
      <div className="text-center mt-10">
        <Link 
          href="/releases" 
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-900/30"
        >
          View All Releases
          <ChevronRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}