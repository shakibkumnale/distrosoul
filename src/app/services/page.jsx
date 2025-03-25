// src/app/services/page.jsx
import PlansSection from '@/components/services/PlansSection';
import PlansComparison from '@/components/services/PlansComparison';
import FeatureList from '@/components/services/FeatureList';

export const metadata = {
  title: 'Distribution Services | SoulDistribution',
  description: 'Music distribution services for indie artists - get your music on Spotify, Apple Music, YouTube Music and more.',
};

const plans = [
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '599',
    period: 'Year',
    description: 'For serious artists ready to grow their career',
    features: [
      'Unlimited Releases (1 Year)',
      '50% Royalties',
      '150+ Indian & International Stores',
      'Custom Release Date & Spotify Verification',
      'Content ID & Playlist Pitching',
      'Instagram Audio Page Linking',
      '24/7 Support | Approval in 24H | Live in 2 Days',
      'Lifetime Availability – No Hidden Fees!'
    ],
    popular: false,
    extraInfo: 'All this for just ₹599/year (Less than ₹50/month!)'
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '99',
    period: 'Year',
    description: 'Perfect for new artists beginning their journey',
    features: [
      'Unlimited Releases (1 Year)',
      '150+ Indian & International Stores',
      'Custom Release Date & Spotify Verification',
      'Content ID & Playlist Pitching',
      'Instagram Audio Page Linking',
      '24/7 Support | Approval in 24H | Live in 2 Days',
      'Lifetime Availability – No Hidden Fees!'
    ],
    popular: true,
    extraInfo: 'All this for just ₹99/year (Less than ₹10/month!)'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '1199',
    period: 'Year',
    description: 'Complete solution for professional artists',
    features: [
      'Unlimited Releases (1 Year)',
      '100% Royalties',
      '150+ Indian & International Stores',
      'Custom Release Date & Spotify Verification',
      'Content ID & Playlist Pitching',
      'Instagram Audio Page Linking',
      '24/7 Support | Approval in 24H | Live in 2 Days',
      'Lifetime Availability – No Hidden Fees!'
    ],
    popular: false,
    extraInfo: 'All this for just ₹1199/year (Less than ₹100/month!)'
  },
];

const youtubeOAC = {
  id: 'youtube-oac',
  name: 'YouTube OAC Plan',
  price: '499',
  period: 'One-time',
  description: 'Get Verified on YouTube',
  features: [
    'Verified Badge on YouTube',
    'Merge All Your Music Content (Albums, Singles & Music Videos)',
    'Access to YouTube Analytics & Fan Insights',
    'Official "Music" Tag on Videos',
    'Custom Artist Profile & Banner on YouTube',
  ],
  popular: false,
};

const additionalFeatures = [
  'Original content requirements - ensure your music is 100% original',
  'No copyright strikes - we help you avoid potential issues',
  'Easy renewal process - keep your music live without interruption',
  'Simple payouts system with multiple withdrawal options',
  'Full transparency with detailed analytics and reports',
  'Easy migration if you decide to switch distributors',
];

const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Distribution Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Distribute your music worldwide with SoulDistribution! We provide affordable and transparent music distribution 
          with full support, helping independent artists reach global platforms effortlessly.
        </p>
      </div>

      <PlansSection plans={plans} youtubeOAC={youtubeOAC} />

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
        <PlansComparison plans={[...plans, youtubeOAC]} />
      </div>

      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Additional Features</h2>
        <FeatureList features={additionalFeatures} />
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready To Distribute Your Music?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of independent artists who trust SoulDistribution with their music career.
        </p>
        <a 
          href="https://wa.me/8291121080" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Get Started Now
        </a>
      </div>
    </div>
  );
};

export default ServicesPage;