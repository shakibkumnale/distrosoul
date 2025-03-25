// src/app/admin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import DashboardStats from '@/components/admin/DashboardStats';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArtists: 0,
    totalReleases: 0,
    totalStreams: 0,
    growthRate: 0,
    popularArtists: [],
    planCounts: {
      basic: 0,
      pro: 0,
      premium: 0,
      aoc: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
        Error loading dashboard: {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">Dashboard</h1>
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Popular Artists</h2>
          
          <div className="space-y-4">
            {stats.popularArtists && stats.popularArtists.length > 0 ? (
              stats.popularArtists.map((artist, index) => (
                <div key={artist._id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-xl text-blue-600 dark:text-blue-300 w-8 text-center">
                    {index + 1}
                  </div>
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <img 
                      src={artist.image || '/images/placeholder-avatar.jpg'} 
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{artist.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{artist.followers?.toLocaleString() || 0} followers</p>
                  </div>
                  <a
                    href={`/admin/artists/${artist.slug}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No popular artists found
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Plans Distribution</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Basic</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{stats.planCounts?.basic || 0}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Pro</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{stats.planCounts?.pro || 0}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Premium</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{stats.planCounts?.premium || 0}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Aoc</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{stats.planCounts?.aoc || 0}</span>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-200">Total Active Plans:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {(stats.planCounts?.basic || 0) + 
                   (stats.planCounts?.pro || 0) + 
                   (stats.planCounts?.premium || 0) + 
                   (stats.planCounts?.aoc || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}