// src/components/admin/DashboardStats.jsx
import { Users, Music2, PlayCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';

export default function DashboardStats({ stats = {} }) {
  // Destructure with default values
  const { 
    totalArtists = 0, 
    totalReleases = 0, 
    totalStreams = 0, 
    growthRate = 0 
  } = stats;

  const statCards = [
    {
      title: 'Total Artists',
      value: totalArtists,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Releases',
      value: totalReleases,
      icon: Music2,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Total Streams',
      value: totalStreams.toLocaleString(),
      icon: PlayCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Monthly Growth',
      value: `${growthRate}%`,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
        >
          <div className={`${stat.bgColor} p-3 rounded-full`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}