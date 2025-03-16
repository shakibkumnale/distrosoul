// src/components/admin/ArtistForm.jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { generateSlug } from '@/lib/api';

export default function ArtistForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    slug: '',
    bio: '',
    image: '',
    spotifyUrl: '',
    youtubeUrl: '',
    instagramUrl: '',
    isVerified: false,
    featured: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Auto-generate slug from name
    if (name === 'name' && (!initialData || !initialData.slug)) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
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
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Artist Name"
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
            placeholder="artist-name"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about the artist..."
          required
          rows={5}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="spotifyUrl">Spotify URL</Label>
          <Input
            id="spotifyUrl"
            name="spotifyUrl"
            value={formData.spotifyUrl}
            onChange={handleChange}
            placeholder="https://open.spotify.com/artist/..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/c/..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instagramUrl">Instagram URL</Label>
          <Input
            id="instagramUrl"
            name="instagramUrl"
            value={formData.instagramUrl}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
          />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="isVerified"
            name="isVerified"
            checked={formData.isVerified}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVerified: checked }))}
          />
          <Label htmlFor="isVerified">Verified Artist</Label>
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
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Artist' : 'Create Artist'}
        </Button>
      </div>
    </form>
  );
}