'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { Play, Music, Download, TrendingUp, AlertCircle, Loader2, Filter, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Helper function to format large numbers
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [artistFilter, setArtistFilter] = useState('');
  const [artists, setArtists] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const fetchAnalytics = async (artistId = '') => {
    try {
      setIsFiltering(!!artistId);
      setLoading(true);
      setError('');
      
      // Build URL with potential artist filter
      const url = artistId 
        ? `/api/analytics?artist=${artistId}` 
        : '/api/analytics';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      
      const data = await response.json();
      setAnalyticsData(data.analytics || []);
      setRecentReports(data.recentReports || []);
      
      // Only set artists list if we're not filtering
      if (!artistId && data.artists) {
        setArtists(data.artists);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
      setIsFiltering(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Handle query string for artist filtering
  useEffect(() => {
    // Check if we have a query string with artist ID
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const artistId = params.get('artist');
      
      if (artistId && artistId !== artistFilter) {
        setArtistFilter(artistId);
        fetchAnalytics(artistId);
      }
    }
  }, []);

  const handleArtistChange = (value) => {
    setArtistFilter(value);
    fetchAnalytics(value);
    
    // Update URL with query parameter
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set('artist', value);
      } else {
        url.searchParams.delete('artist');
      }
      window.history.pushState({}, '', url);
    }
  };

  const clearFilter = () => {
    setArtistFilter('');
    fetchAnalytics();
    
    // Remove query parameter from URL
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('artist');
      window.history.pushState({}, '', url);
    }
  };

  // Calculate totals
  const totalStreams = analyticsData.reduce((total, item) => total + item.totalStreams, 0);
  const totalReleases = analyticsData.length;
  
  // Prepare chart data for top releases
  const topReleasesChartData = analyticsData
    .slice(0, 10)
    .map(item => ({
      name: item.title.length > 15 ? item.title.substring(0, 15) + '...' : item.title,
      streams: item.totalStreams
    }));

  // Generate a sample timeline data set from the most streamed release if available
  let timelineChartData = [];
  if (analyticsData.length > 0) {
    const topRelease = analyticsData[0];
    // This is a placeholder - we'd need real timeline data from the API
    timelineChartData = [
      { name: 'Jan', streams: Math.floor(topRelease.totalStreams * 0.1) },
      { name: 'Feb', streams: Math.floor(topRelease.totalStreams * 0.15) },
      { name: 'Mar', streams: Math.floor(topRelease.totalStreams * 0.18) },
      { name: 'Apr', streams: Math.floor(topRelease.totalStreams * 0.25) },
      { name: 'May', streams: Math.floor(topRelease.totalStreams * 0.32) }
    ];
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 bg-gray-950 text-gray-100 min-h-screen">
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-400">Streaming Analytics</h1>
            <p className="text-gray-400">Track your music's performance across streaming platforms</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-64">
              <Select value={artistFilter} onValueChange={handleArtistChange}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Filter by artist" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  {artists.map(artist => (
                    <SelectItem key={artist._id} value={artist._id}>
                      {artist.name}
                      {artist.releaseCount && (
                        <span className="ml-2 text-gray-400 text-xs">
                          ({artist.releaseCount} {artist.releaseCount === 1 ? 'release' : 'releases'})
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {artistFilter && (
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-gray-900 border-gray-700 hover:bg-gray-800"
                onClick={clearFilter}
                disabled={isFiltering}
              >
                {isFiltering ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
        
        {artistFilter && (
          <div className="bg-purple-900/30 border border-purple-800 rounded-md px-4 py-2 mb-4">
            <p className="text-purple-200 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Showing data for {artists.find(a => a._id === artistFilter)?.name || 'selected artist'}
              <Badge className="ml-3 bg-purple-800">{analyticsData.length} releases</Badge>
            </p>
          </div>
        )}
      </header>
      
      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-900 border-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          <span className="ml-2 text-lg">Loading analytics data...</span>
        </div>
      ) : (
        <>
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-300 text-lg">Total Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Play className="h-8 w-8 text-purple-400 mr-3" />
                  <div>
                    <div className="text-3xl font-bold text-white">{formatNumber(totalStreams)}</div>
                    <p className="text-gray-400 text-sm">Lifetime plays</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-300 text-lg">Top Release</CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData.length > 0 ? (
                  <div className="flex items-center">
                    <Music className="h-8 w-8 text-purple-400 mr-3" />
                    <div>
                      <div className="text-xl font-bold text-white truncate">
                        {analyticsData[0].title}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {formatNumber(analyticsData[0].totalStreams)} streams
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">No release data available</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-300 text-lg">Catalog Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-400 mr-3" />
                  <div>
                    <div className="text-3xl font-bold text-white">{totalReleases}</div>
                    <p className="text-gray-400 text-sm">Tracked releases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {analyticsData.length === 0 && artistFilter && (
            <Alert className="mb-6 bg-blue-900 border-blue-800">
              <AlertCircle className="h-4 w-4 text-blue-300" />
              <AlertDescription className="text-blue-200">
                No streaming data available for the selected artist. Try selecting a different artist or clear the filter.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-700">Overview</TabsTrigger>
              <TabsTrigger value="releases" className="data-[state=active]:bg-purple-700">Top Releases</TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-purple-700">Stream History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Top Releases</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your most streamed music
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topReleasesChartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis type="number" tick={{ fill: '#ccc' }} />
                          <YAxis dataKey="name" type="category" tick={{ fill: '#ccc' }} width={100} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#333', border: 'none' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Bar dataKey="streams" fill="#9333ea" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Trends</CardTitle>
                    <CardDescription className="text-gray-400">
                      Stream growth over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timelineChartData} margin={{ left: 20, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                          <YAxis tick={{ fill: '#ccc' }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#333', border: 'none' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="streams" 
                            stroke="#9333ea" 
                            strokeWidth={2} 
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="releases" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">All Releases</CardTitle>
                  <CardDescription className="text-gray-400">
                    Complete streaming data for your catalog
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.length > 0 ? (
                      analyticsData.map((release, index) => (
                        <div key={release.releaseId} className="bg-gray-800 p-4 rounded-lg flex items-center">
                          <div className="w-12 h-12 mr-4 flex-shrink-0">
                            {release.coverImage ? (
                              <img 
                                src={release.coverImage} 
                                alt={release.title} 
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                                <Music className="h-6 w-6 text-gray-500" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium truncate">
                              <Link href={`/analytics/release/${release.releaseId}`} className="hover:text-purple-400">
                                {release.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-400 truncate">
                              {release.artists.map((artist, index) => (
                                <span key={artist._id}>
                                  <button 
                                    onClick={() => handleArtistChange(artist._id)} 
                                    className="hover:text-purple-400 hover:underline underline-offset-2"
                                  >
                                    {artist.name}
                                  </button>
                                  {index < release.artists.length - 1 && ', '}
                                </span>
                              ))}
                            </p>
                          </div>
                          
                          <div className="ml-4 text-right">
                            <div className="flex items-center justify-end">
                              <Play className="h-4 w-4 text-purple-400 mr-1" />
                              <span className="text-white font-bold">{formatNumber(release.totalStreams)}</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              Last updated: {new Date(release.latestDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Music className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                        <p>No streaming data available yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Stream History</CardTitle>
                  <CardDescription className="text-gray-400">
                    Recent streaming reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentReports.length > 0 ? (
                    <div className="space-y-4">
                      {recentReports.map((date, index) => (
                        <div key={date} className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-medium">
                              Report: {date}
                            </h3>
                            <div className="flex space-x-2">
                              {artistFilter && (
                                <Badge variant="outline" className="bg-purple-900 text-purple-200 border-purple-700">
                                  <Filter className="h-3 w-3 mr-1" />
                                  Artist filtered
                                </Badge>
                              )}
                              <Badge variant="outline" className="bg-purple-900 text-purple-200 border-purple-700">
                                {index === 0 ? 'Latest' : `${index + 1} reports ago`}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Historical data snapshot from LANDR analytics
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Download className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                      <p>No report history available yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
} 