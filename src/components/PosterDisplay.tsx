import React, { useState } from 'react';
import type { Poster } from '../data/posters';
import { getPosterBySlug } from '../data/posters';

export interface PosterDisplayProps {
  poster?: Poster;
  slug?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  alt?: string;
}

export const PosterDisplay: React.FC<PosterDisplayProps> = ({
  poster: propPoster,
  slug,
  className = '',
  loading = 'lazy',
  alt,
}) => {
  const poster = propPoster || (slug ? getPosterBySlug(slug) : undefined);
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);

  const src = poster?.imageUrl || poster?.image;
  const hasError = Boolean(src && erroredSrc === src);

  if (poster && poster.enabled === false) {
    return null;
  }

  // Graceful Fallback: If image fails to load or no source available, render clean theme-matched placeholder
  if (!src || hasError) {
    return (
      <div className={`poster-display-wrap poster-display-placeholder ${className}`.trim()}>
        <div className="poster-placeholder-content">
          <span className="poster-placeholder-tag">[ TECHX REIGNITE ]</span>
          <h4 className="poster-placeholder-title">{poster?.title || 'SESSION POSTER'}</h4>
          <span className="poster-placeholder-status">POSTER AVAILABLE SOON</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`poster-display-wrap ${className}`.trim()}>
      <img
        src={src}
        alt={alt || poster?.alt || poster?.title || 'Event poster'}
        title={poster?.title}
        className="poster-display-img"
        loading={loading}
        onError={() => {
          if (src) setErroredSrc(src);
        }}
      />
    </div>
  );
};
