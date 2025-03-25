'use client';

import React from 'react'
import { SpotifyPlayer } from 'react-spotify-embed';
const test = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradent-card  rounded-xl my-8">
    <h2 className="text-4xl font-bold mb-8 text-gradient ">Trending Now</h2>
    <div className="flex flex-row gap-4 w-full py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-card  rounded-xl my-8">
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
    <SpotifyPlayer 
      spotifyUri="56Lur6MQ15SF1t1neoyEiX" 
      type="artist" 
      height={380} 
      theme="0"
    />
    </div>
  </section>
  )
}

export default test