'use client';

import PlanCard from './PlanCard';

export default function PlansSection({ plans, youtubeOAC }) {
  const handlePlanSelect = (selectedPlan) => {
    console.log('Selected plan:', selectedPlan);
    // Add your plan selection logic here
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id} 
            plan={plan}
            onSelect={handlePlanSelect}
          />
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">YouTube Official Artist Channel</h2>
        <div className="max-w-2xl mx-auto">
          <PlanCard 
            plan={youtubeOAC}
            onSelect={handlePlanSelect}
          />
        </div>
      </div>
    </>
  );
}