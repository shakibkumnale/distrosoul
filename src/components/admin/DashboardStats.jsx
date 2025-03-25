// src/components/admin/DashboardStats.jsx
import { Users, Music2, PlayCircle, TrendingUp, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';

export default function DashboardStats({ stats }) {
  // Destructure with default values
  const { 
    totalArtists = 0, 
    totalReleases = 0, 
    totalStreams = 0, 
    growthRate = 0,
    planCounts = { basic: 0, pro: 0, premium: 0, aoc: 0 }
  } = stats;

  // Calculate total revenue (mock calculation based on plan counts)
  const totalRevenue = (
    planCounts.basic * 9.99 + 
    planCounts.pro * 19.99 + 
    planCounts.premium * 29.99 + 
    planCounts.aoc * 39.99
  ).toFixed(2);

  const statCards = [
    {
      title: 'Total Artists',
      value: totalArtists,
      icon: Users,
      color: 'text-white',
      bgColor: 'bg-blue-600'
    },
    {
      title: 'Total Releases',
      value: totalReleases,
      icon: Music2,
      color: 'text-white',
      bgColor: 'bg-orange-600'
    },
    {
      title: 'Total Streams',
      value: formatNumber(totalStreams),
      icon: PlayCircle,
      color: 'text-white',
      bgColor: 'bg-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: `$${totalRevenue}`,
      icon: CreditCard,
      color: 'text-white',
      bgColor: 'bg-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className={`${stat.bgColor} p-4`}>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-white/90">{stat.title}</p>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <h3 className="text-3xl font-bold text-white mt-2">{stat.value}</h3>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className={`h-1 ${stat.bgColor.replace('bg-', 'bg-')} rounded-full`} style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}