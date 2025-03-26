// src/components/services/PlansComparison.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, Info } from 'lucide-react';

const PlansComparison = ({ plans }) => {
  // Define all possible features across all plans
  const allFeatures = [
    'Releases',
    'Distribution to 150+ Stores',
    'Custom Release Date',
    'Spotify Verification',
    'Content ID',
    'Playlist Pitching',
    'Instagram Audio Linking',
    '24/7 Support',
    'Lifetime Availability',
    'YouTube Verification Badge',
    'YouTube Analytics',
    'Custom YouTube Profile',
  ];

  // Helper function to determine if a plan has a feature
  const hasPlanFeature = (plan, feature) => {
    // Special cases for YouTube features
    if (
      (feature === 'YouTube Verification Badge' ||
       feature === 'YouTube Analytics' ||
       feature === 'Custom YouTube Profile') && 
      plan.id === 'youtube-oac'
    ) {
      return true;
    }
    
    // General check against the features list
    return plan.features.some(f => f.toLowerCase().includes(feature.toLowerCase()));
  };

  // Get royalty percentage for a plan
  const getRoyaltyPercentage = (plan) => {
    if (plan.id === 'basic') return '0%';
    if (plan.id === 'pro') return '50%';
    if (plan.id === 'premium') return '100%';
    if (plan.id === 'youtube-oac') return '100% (Limited Time)';
    return 'N/A';
  };
  
  // Get number of releases for each plan
  const getReleasesInfo = (plan) => {
    if (plan.id === 'youtube-oac') return '1 Release';
    return 'Unlimited (1 Year)';
  };
  
  // Get color for plan header
  const getPlanHeaderClass = (plan) => {
    if (plan.id === 'basic') return 'bg-gradient-to-r from-purple-900 to-blue-900';
    if (plan.id === 'pro') return 'bg-gradient-to-r from-blue-900 to-indigo-900';
    if (plan.id === 'premium') return 'bg-gradient-to-r from-pink-900 to-purple-900';
    return 'bg-gradient-to-r from-purple-900 to-indigo-900';
  };
  
  // Get accent color for plan
  const getPlanAccentColor = (plan) => {
    if (plan.id === 'basic') return 'text-blue-400';
    if (plan.id === 'pro') return 'text-indigo-400';
    if (plan.id === 'premium') return 'text-purple-400';
    return 'text-purple-400';
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg shadow-purple-900/20 border border-gray-800">
      <Table className="bg-gray-900">
        <TableHeader>
          <TableRow className="border-b border-gray-800">
            <TableHead className="w-[220px] bg-gray-950 sticky left-0 z-10">
              <div className="font-bold text-gray-300">Features</div>
            </TableHead>
            {plans.map(plan => (
              <TableHead 
                key={plan.id} 
                className={`text-center ${getPlanHeaderClass(plan)} text-white min-w-[180px] p-4`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg">{plan.name}</span>
                  {plan.popular && <span className="text-orange-400 text-sm">★ Most Popular</span>}
                  <span className="mt-2 font-bold text-xl">₹{plan.price}</span>
                  <span className="text-sm text-gray-300">per {plan.period === 'One-time' ? 'purchase' : 'year'}</span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        
        <TableBody>
          <TableRow className="bg-gray-900/60">
            <TableCell className="font-medium sticky left-0 z-10 bg-gray-900/60 border-t border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-white">Royalties</span>
                <div className="relative group">
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48">
                    Percentage of streaming revenue you keep after distribution fees
                  </div>
                </div>
              </div>
            </TableCell>
            {plans.map(plan => (
              <TableCell 
                key={`${plan.id}-royalties`} 
                className={`text-center font-bold ${getPlanAccentColor(plan)} border-t border-b border-gray-800`}
              >
                {getRoyaltyPercentage(plan)}
              </TableCell>
            ))}
          </TableRow>
          
          {allFeatures.map((feature, index) => {
            if (feature === 'Releases') {
              return (
                <TableRow key={feature} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/60'}>
                  <TableCell className={`font-medium sticky left-0 z-10 text-gray-300 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/60'} border-b border-gray-800`}>
                    {feature}
                  </TableCell>
                  {plans.map(plan => (
                    <TableCell key={`${plan.id}-${feature}`} className="text-center border-b border-gray-800">
                      <span className={getPlanAccentColor(plan)}>
                        {getReleasesInfo(plan)}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              );
            }
            
            return (
              <TableRow key={feature} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/60'}>
                <TableCell className={`font-medium sticky left-0 z-10 text-gray-300 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/60'} border-b border-gray-800`}>
                  {feature}
                </TableCell>
                {plans.map(plan => (
                  <TableCell key={`${plan.id}-${feature}`} className="text-center border-b border-gray-800">
                    {hasPlanFeature(plan, feature) ? (
                      <div className="flex justify-center">
                        <Check className={`h-5 w-5 ${getPlanAccentColor(plan)}`} />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-gray-700" />
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          
          <TableRow className="bg-gray-900/60 border-t border-gray-800">
            <TableCell className="font-medium sticky left-0 z-10 bg-gray-900/60">
              <span className="font-bold text-white">Price</span>
            </TableCell>
            {plans.map(plan => (
              <TableCell key={`${plan.id}-price`} className="text-center">
                <a 
                  href="#plans" 
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                    plan.id === 'premium' 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : plan.id === 'pro'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : plan.popular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  } transition-colors`}
                >
                  Get Started
                </a>
              </TableCell>
            ))}
          </TableRow>
          
        </TableBody>
      </Table>
    </div>
  );
};

export default PlansComparison;

