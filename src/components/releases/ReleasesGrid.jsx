
// src/components/releases/ReleasesGrid.jsx
import ReleaseCard from './ReleaseCard';

export default function ReleasesGrid({ releases, columns = 4 }) {
  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  };

  return (
    <div className={`grid gap-4 ${gridClasses[columns] || gridClasses[4]}`}>
      {releases.map((release) => (
        <ReleaseCard key={release.id || release._id} release={release} />
      ))}
    </div>
  );
}
