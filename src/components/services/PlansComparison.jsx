
// src/components/services/PlansComparison.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';

const PlansComparison = ({ plans }) => {
  // Define all possible features across all plans
  const allFeatures = [
    'Unlimited Releases',
    'Distribution to 150+ DSPs',
    'Custom Release Date',
    'Spotify Verification',
    'Content ID',
    'Playlist Pitching',
    'Instagram Audio Linking',
    '24/7 Support',
    '50% Royalties',
    '100% Royalties',
    'Priority Support',
    'YouTube Verification Badge',
    'YouTube Analytics',
    'Custom YouTube Profile',
  ];

  // Helper function to determine if a plan has a feature
  const hasPlanFeature = (plan, feature) => {
    return plan.features.some(f => f.toLowerCase().includes(feature.toLowerCase())) ||
           (feature === '100% Royalties' && plan.id !== 'basic');
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Feature</TableHead>
            {plans.map(plan => (
              <TableHead key={plan.id} className="text-center">
                {plan.name} <br />
                <span className="text-sm">₹{plan.price}/{plan.period}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFeatures.map((feature, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{feature}</TableCell>
              {plans.map(plan => (
                <TableCell key={`${plan.id}-${index}`} className="text-center">
                  {hasPlanFeature(plan, feature) ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlansComparison;

