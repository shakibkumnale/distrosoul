// src/components/services/PlansComparison.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';

const PlansComparison = ({ plans }) => {
  // Define all possible features across all plans
  const allFeatures = [
    'Unlimited Releases (1 Year)',
    'Distribution to 150+ Stores',
    'Custom Release Date',
    'Spotify Verification',
    'Content ID',
    'Playlist Pitching',
    'Instagram Audio Linking',
    '24/7 Support',
    'No Hidden Fees',
    'Lifetime Availability',
    '50% Royalties',
    '100% Royalties',
    'YouTube Verification Badge',
    'YouTube Analytics',
    'Custom YouTube Profile',
  ];

  // Helper function to determine if a plan has a feature
  const hasPlanFeature = (plan, feature) => {
    // For specific checks based on plan
    if (feature === '50% Royalties' && plan.id === 'pro') return true;
    if (feature === '100% Royalties' && plan.id === 'premium') return true;
    if (feature.includes('YouTube') && plan.id === 'youtube-oac') return true;
    
    // General check against the features list
    return plan.features.some(f => f.toLowerCase().includes(feature.toLowerCase()));
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Feature</TableHead>
            {plans.map(plan => (
              <TableHead key={plan.id} className="text-center">
                {plan.name} {plan.popular && <span className="text-orange-500 ml-1">★</span>}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFeatures.map(feature => (
            <TableRow key={feature}>
              <TableCell className="font-medium">{feature}</TableCell>
              {plans.map(plan => (
                <TableCell key={`${plan.id}-${feature}`} className="text-center">
                  {hasPlanFeature(plan, feature) ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">Price</TableCell>
            {plans.map(plan => (
              <TableCell key={`${plan.id}-price`} className="text-center font-bold">
                ₹{plan.price}/{plan.period === 'One-time' ? 'once' : 'year'}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PlansComparison;

