
// src/components/artists/ArtistsGrid.jsx
import ArtistCard from './ArtistCard';

export default function ArtistsGrid({ artists }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {artists.map((artist) => (
        <ArtistCard key={artist.id || artist._id} artist={artist} />
      ))}
    </div>
  );
}