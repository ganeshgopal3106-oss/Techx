import React from 'react';
import type { Track } from '../data/tracks';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <div className="card track-card">
      <div className="track-number">{track.num}</div>
      <h3 className="track-name">{track.name}</h3>
      <div className="track-badge-container">
        <span className="badge track-badge">{track.badge}</span>
      </div>
      <p className="track-description">{track.description}</p>
      <div className="track-footer">
        <a href={track.actionLink} className="track-link">
          View Track <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
};
