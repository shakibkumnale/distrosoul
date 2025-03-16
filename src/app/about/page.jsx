import { Metadata } from 'next';
import Image from 'next/image';
import { MusicIcon, Award, Users, Headphones, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'About Us | Soul Distribution',
  description: 'Learn about Soul Distribution, our mission, and how we help artists distribute their music globally.',
};

const AboutPage = () => {
  const stats = [
    { icon: <MusicIcon className="h-6 w-6 text-purple-500" />, label: 'Tracks Distributed', value: '10,000+' },
    { icon: <Users className="h-6 w-6 text-purple-500" />, label: 'Artists Served', value: '500+' },
    { icon: <Headphones className="h-6 w-6 text-purple-500" />, label: 'Total Streams', value: '50M+' },
    { icon: <TrendingUp className="h-6 w-6 text-purple-500" />, label: 'Platforms', value: '150+' },
  ];

  const team = [
    {
      name: 'Vishal Kumar',
      role: 'Founder & CEO',
      bio: 'Music producer and entrepreneur with over 10 years of experience in the Indian music industry.',
      image: '/images/placeholder-cover.jpg',
    },
    {
      name: 'Amit Shah',
      role: 'Head of Distribution',
      bio: 'Former label executive with expertise in digital music distribution and streaming optimization.',
      image: '/images/placeholder-cover.jpg',
    },
    {
      name: 'Priya Verma',
      role: 'Artist Relations',
      bio: 'Passionate about helping independent artists thrive in the digital music landscape.',
      image: '/images/placeholder-cover.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          About Soul Distribution
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Empowering independent artists to reach global audiences without compromising ownership or revenue.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Soul Distribution was founded in 2020 with a simple mission: to give independent artists complete control over their music distribution while providing the tools and support they need to succeed in the digital music landscape.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            As artists ourselves, we understood the challenges of getting music on streaming platforms and maintaining ownership. We saw a gap in the market for affordable, transparent distribution services tailored to Indian artists.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Today, we've helped hundreds of artists distribute thousands of tracks across all major platforms, while building a supportive community of independent musicians pushing the boundaries of Indian rap and urban music.
          </p>
        </div>
        <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
          <Image 
            src="/images/placeholder-cover.jpg" 
            alt="Soul Distribution Team" 
            fill 
            style={{objectFit: 'cover'}}
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Our Mission & Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <Award className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Artist-First Approach</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe artists should maintain ownership of their work and receive fair compensation. That's why we never take a cut of your royalties.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <Users className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Community Building</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We're more than a distribution service. We're building a community of like-minded artists who support and elevate each other.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <TrendingUp className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Transparency</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Clear pricing, straightforward terms, and detailed analytics. We believe in absolute transparency in all our dealings.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
              <div className="relative h-64 w-full">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  style={{objectFit: 'cover'}}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-purple-500 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to amplify your music?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Join the Soul Distribution family and take your music career to the next level.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/services" 
            className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View Services
          </a>
          <a 
            href="/contact" 
            className="bg-transparent hover:bg-purple-700 border-2 border-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;