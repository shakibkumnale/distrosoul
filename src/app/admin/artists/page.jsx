// src/app/admin/artists/page.jsx
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Manage Artists | Soul Distribution',
  description: 'Add and manage artists on your distribution platform',
};

export default function AdminArtists() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Artists</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search artists..."
              className="pr-8 w-64"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </span>
          </div>
          <Button className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" />
            Add Artist
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Artists</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading artists...</div>}>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-sm text-muted-foreground">
                No artists found. Add your first artist to get started.
              </p>
            </div>
          </Suspense>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Add New Artist</h2>
        <Card>
          <CardContent className="pt-6">
            <Suspense fallback={<div>Loading form...</div>}>
              <div className="space-y-4">
                <ArtistForm />
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ArtistForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Artist Name
          </label>
          <Input id="name" placeholder="Artist Name" className="mt-1" />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            URL Slug
          </label>
          <Input id="slug" placeholder="artist-name" className="mt-1" />
        </div>
      </div>
      
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Biography
        </label>
        <textarea
          id="bio"
          rows={4}
          placeholder="Artist biography"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <Input id="image" type="file" accept="image/*" className="mt-1" />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="spotify" className="block text-sm font-medium text-gray-700">
            Spotify URL
          </label>
          <Input id="spotify" placeholder="https://open.spotify.com/artist/..." className="mt-1" />
        </div>
        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
            Instagram Username
          </label>
          <Input id="instagram" placeholder="@username" className="mt-1" />
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Save Artist</Button>
      </div>
    </div>
  );
}