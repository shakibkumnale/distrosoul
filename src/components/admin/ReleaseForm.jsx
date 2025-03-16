// src/components/admin/ReleaseForm.jsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateSlug } from '@/lib/api';

export default function ReleaseForm({ initialData, artists, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    slug: '',
    artist: '',
    coverImage: '',
    releaseDate: new Date().toISOString().split('T')[0],
    spotifyUrl: '',
    appleMusicUrl: '',
    youtubeUrl: '',
    featured: false,
    type: 'Single',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Auto-generate slug from title
    if (name === 'title' && (!initialData || !initialData.slug)) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Add error handling here
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Release Title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="release-title"
            required
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="artist">Artist</Label>
          <Select 
            value={formData.artist} 
            onValueChange={(value) => handleSelectChange('artist', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an artist" />
            </SelectTrigger>
            <SelectContent>
              {artists.map((artist) => (
                <SelectItem key={artist.id || artist._id} value={artist.id || artist._id}>
                  {artist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Release Type</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="EP">EP</SelectItem>
              <SelectItem value="Album">Album</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="spotifyUrl">Spotify URL</Label>
          <Input
            id="spotifyUrl"
            name="spotifyUrl"
            value={formData.spotifyUrl}
            onChange={handleChange}
            placeholder="https://open.spotify.com/track/..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="appleMusicUrl">Apple Music URL</Label>
          <Input
            id="appleMusicUrl"
            name="appleMusicUrl"
            value={formData.appleMusicUrl}
            onChange={handleChange}
            placeholder="https://music.apple.com/..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          name="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
        />
        <Label htmlFor="featured">Featured on Homepage</Label>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Release' : 'Create Release'}
        </Button>
      </div>
    </form>
  );
}
// function ReleaseForm() {
//     return (
//       <div className="space-y-4">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//               Release Title
//             </label>
//             <Input id="title" placeholder="Release Title" className="mt-1" />
//           </div>
//           <div>
//             <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
//               Artist
//             </label>
//             <Select>
//               <SelectTrigger className="mt-1">
//                 <SelectValue placeholder="Select Artist" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="new">Add New Artist</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">
//               Release Date
//             </label>
//             <Input id="releaseDate" type="date" className="mt-1" />
//           </div>
//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-gray-700">
//               Release Type
//             </label>
//             <Select>
//               <SelectTrigger className="mt-1">
//                 <SelectValue placeholder="Select Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="single">Single</SelectItem>
//                 <SelectItem value="ep">EP</SelectItem>
//                 <SelectItem value="album">Album</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
        
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             id="description"
//             rows={4}
//             placeholder="Release description"
//             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>
        
//         <div>
//           <label htmlFor="coverArt" className="block text-sm font-medium text-gray-700">
//             Cover Art
//           </label>
//           <Input id="coverArt" type="file" accept="image/*" className="mt-1" />
//         </div>
        
//         <div>
//           <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700">
//             Audio File
//           </label>
//           <Input id="audioFile" type="file" accept="audio/*" className="mt-1" />
//         </div>
        
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <label htmlFor="spotifyUrl" className="block text-sm font-medium text-gray-700">
//               Spotify URL
//             </label>
//             <Input id="spotifyUrl" placeholder="https://open.spotify.com/track/..." className="mt-1" />
//           </div>
//           <div>
//             <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
//               YouTube URL
//             </label>
//             <Input id="youtubeUrl" placeholder="https://youtube.com/watch?v=..." className="mt-1" />
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Distribution Platforms
//           </label>
//           <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//             {['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Instagram', 'TikTok', 'Resso', 'JioSaavn'].map((platform) => (
//               <div key={platform} className="flex items-center">
//                 <input type="checkbox" id={platform} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
//                 <label htmlFor={platform} className="ml-2 text-sm text-gray-700">
//                   {platform}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="flex justify-end gap-4">
//           <Button variant="outline">Cancel</Button>
//           <Button className="bg-purple-600 hover:bg-purple-700">Save Release</Button>
//         </div>
//       </div>
//     );
//   }