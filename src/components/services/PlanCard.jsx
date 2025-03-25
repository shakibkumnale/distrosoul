// src/components/services/PlanCard.jsx
'use client';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlanCard = ({ plan, onSelect }) => {
  const { 
    id, 
    name, 
    price, 
    period, 
    description,
    features = [], 
    popular = false,
    extraInfo
  } = plan;

  const getIcon = () => {
    if (id === "youtube-oac") return "🎬";
    if (id === "premium") return "🚀";
    if (id === "pro") return "⭐";
    return "🔥";
  };
  
  const handleSelectPlan = () => {
    // Open WhatsApp directly with the selected plan
    window.open(`https://wa.me/8291121080?text=I'm interested in the ${name}`, '_blank');
  };

  return (
    <Card className={`w-full h-full transition-transform hover:scale-105 overflow-hidden ${popular ? 'border-orange-500 border-2 shadow-xl' : ''} relative`}>
      <div className={`h-2 w-full ${id === 'basic' ? 'bg-gradient-to-r from-purple-700/70 to-blue-600' : id === 'pro' ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-gradient-to-r from-pink-700 to-purple-700'}`}></div>
      <CardHeader className="space-y-1 text-center bg-gradient-to-b from-gray-900 to-black pb-6">
        <div className="space-y-2">
          {popular && (
            <Badge variant="primary" className="absolute right-4 top-4">
              Most Popular
            </Badge>
          )}
          <span className="text-2xl block">{getIcon()}</span>
          <CardTitle className="text-xl text-white flex items-center justify-center">
            {name}
            {id === 'pro' && <span className="ml-2 text-blue-400">🚀</span>}
            {id === 'premium' && <span className="ml-2 text-sm">(Maximum Benefits!)</span>}
          </CardTitle>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-3xl font-bold text-white">₹{price}</span>
            {period && (
              <span className="text-sm text-gray-400">/{period}</span>
            )}
          </div>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-6 bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          
          {extraInfo && (
            <div className="mt-4 bg-black/10 dark:bg-black/30 p-3 rounded-lg">
              <p className="text-sm text-orange-500 dark:text-orange-400 flex items-center">
                <span className="mr-1">🔥</span> {extraInfo}
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <p className="text-sm flex items-center">
              <span className="mr-2">📊</span> Monthly Revenue Reports & Music Promotion
            </p>
            <p className="text-sm flex items-center mt-2">
              <span className="mr-2">📩</span> DM to Get Started! <span className="ml-1 text-blue-500">#SoulOnRepeat</span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pt-4 pb-6 bg-gray-50 dark:bg-gray-900">
        <Button 
          className={`w-full ${popular ? 'bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white border-0' : ''}`}
          onClick={handleSelectPlan}
          variant={popular ? "default" : "outline"}
        >
          Get Started
        </Button>
      </CardFooter>
      {id === 'pro' && (
        <div className="absolute top-2 right-2 bg-white text-black text-lg font-bold rounded-full p-2 w-16 h-16 flex items-center justify-center transform rotate-12 z-10 shadow-md">
          ₹{price}
        </div>
      )}
    </Card>
  );
};

export default PlanCard;