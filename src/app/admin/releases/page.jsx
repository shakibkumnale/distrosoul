// src/app/admin/releases/page.jsx
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export const metadata = {
  title: 'Manage Releases | Soul Distribution',
  description: 'Add and manage music releases on your distribution platform',
};
export default function AdminReleases() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Releases</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search releases..."
              className="pr-8 w-64"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </span>
          </div>
          <Button className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" />
            Add Release
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Releases</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading releases...</div>}>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-sm text-muted-foreground">
                No releases found. Add your first release to get started.
              </p>
            </div>
          </Suspense>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Add New Release</h2>
        <Card>
          <CardContent className="pt-6">
            <Suspense fallback={<div>Loading form...</div>}>
              <div className="space-y-4">
                <ReleaseForm />
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
function ReleaseForm() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Release Title
            </label>
            <Input id="title" placeholder="Release Title" className="mt-1" />
          </div>
          <div>
            <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
              Artist
            </label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Artist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Add New Artist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">
              Release Date
            </label>
            <Input id="releaseDate" type="date" className="mt-1" />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Release Type
            </label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="ep">EP</SelectItem>
                <SelectItem value="album">Album</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Release description"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="coverArt" className="block text-sm font-medium text-gray-700">
            Cover Art
          </label>
          <Input id="coverArt" type="file" accept="image/*" className="mt-1" />
        </div>
        
        <div>
          <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700">
            Audio File
          </label>
          <Input id="audioFile" type="file" accept="audio/*" className="mt-1" />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="spotifyUrl" className="block text-sm font-medium text-gray-700">
              Spotify URL
            </label>
            <Input id="spotifyUrl" placeholder="https://open.spotify.com/track/..." className="mt-1" />
          </div>
          <div>
            <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
              YouTube URL
            </label>
            <Input id="youtubeUrl" placeholder="https://youtube.com/watch?v=..." className="mt-1" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distribution Platforms
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Instagram', 'TikTok', 'Resso', 'JioSaavn'].map((platform) => (
              <div key={platform} className="flex items-center">
                <input type="checkbox" id={platform} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor={platform} className="ml-2 text-sm text-gray-700">
                  {platform}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Save Release</Button>
        </div>
      </div>
    );
  }