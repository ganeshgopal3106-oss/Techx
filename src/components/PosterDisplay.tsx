import React from 'react';
import type { Poster } from '../data/posters';

export interface PosterDisplayProps {
  poster?: Poster;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const PosterDisplay: React.FC<PosterDisplayProps> = ({
  poster,
  className = '',
  loading = 'eager',
}) => {
  if (!poster || poster.enabled === false) {
    return null;
  }

  const src = poster.imageUrl || poster.image;

  return (
    <div className={`poster-display-wrap ${className}`.trim()}>
      <img
        src={src}
        alt={poster.alt || poster.title || 'Event poster'}
        title={poster.title}
        className="poster-display-img"
        loading={loading}
      />
    </div>
  );
};
