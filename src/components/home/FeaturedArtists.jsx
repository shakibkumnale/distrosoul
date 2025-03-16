// src/components/home/FeaturedArtists.jsx
'use client'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sampleArtists = [
  {
    id: 1,
    name: 'The Groove Masters',
    slug: 'groove-masters',
    image: '/images/placeholder-cover.jpg',
    genre: 'Hip Hop',
    totalStreams: '1.2M',
  },
  {
    id: 2,
    name: 'Lyrical Flow',
    slug: 'lyrical-flow',
    image: '/images/placeholder-cover.jpg',
    genre: 'Rap',
    totalStreams: '950K',
  },
  {
    id: 3,
    name: 'Beat Connect',
    slug: 'beat-connect',
    image: '/images/placeholder-cover.jpg',
    genre: 'Hip Hop',
    totalStreams: '2.4M',
  },
  {
    id: 4,
    name: 'Rhythm Kings',
    slug: 'rhythm-kings',
    image: '/images/placeholder-cover.jpg',
    genre: 'Rap',
    totalStreams: '780K',
  },
  {
    id: 5,
    name: 'Urban Poets',
    slug: 'urban-poets',
    image: '/images/placeholder-cover.jpg',
    genre: 'Alternative',
    totalStreams: '1.5M',
  }
];

export default function FeaturedArtists() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => scrollEl.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Featured Artists</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full ${
                canScrollLeft ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-full ${
                canScrollRight ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div 
          className="overflow-x-auto hide-scrollbar" 
          ref={scrollRef}
        >
          <div className="flex space-x-6 pb-4 min-w-max">
            {sampleArtists.map((artist) => (
              <Link 
                key={artist.id} 
                href={`/artists/${artist.slug}`}
                className="block group"
              >
                <div className="w-64 bg-black rounded-lg overflow-hidden transition transform group-hover:scale-105">
                  <div className="relative h-64 w-full">
                    <Image 
                      src={artist.image} 
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-300">{artist.genre}</span>
                        <span className="text-sm text-orange-500">{artist.totalStreams} streams</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/artists" 
            className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium"
          >
            View All Artists
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}