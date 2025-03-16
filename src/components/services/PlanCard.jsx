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
    popular = false 
  } = plan;

  const getIcon = () => {
    if (id === "youtube-oac") return "🎬";
    if (id === "premium") return "🚀";
    if (id === "pro") return "⭐";
    return "🎵";
  };

  return (
    <Card className={`w-full h-full transition-transform hover:scale-105 overflow-hidden ${popular ? 'border-orange-500 border-2' : ''}`}>
      <CardHeader className="space-y-1 text-center bg-black pb-6">
        <div className="space-y-2">
          {popular && (
            <Badge variant="primary" className="absolute right-4 top-4">
              Most Popular
            </Badge>
          )}
          <span className="text-2xl block">{getIcon()}</span>
          <CardTitle className="text-xl text-white">{name}</CardTitle>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-3xl font-bold text-white">₹{price}</span>
            {period && (
              <span className="text-sm text-gray-400">/{period}</span>
            )}
          </div>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 pt-4 pb-6">
        <Button 
          className="w-full" 
          onClick={() => onSelect?.(plan)}
          variant={popular ? "default" : "outline"}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;