// src/components/services/FeatureList.jsx
import React from 'react';
import { Check } from 'lucide-react';

const FeatureList = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
            <Check className="h-5 w-5 text-purple-600" />
          </div>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;