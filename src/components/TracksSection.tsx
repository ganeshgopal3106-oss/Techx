import React from 'react';
import { tracksData } from '../data/tracks';
import { TrackCard } from './TrackCard';
import { SectionHeader } from './SectionHeader';

export const TracksSection: React.FC = () => {
  return (
    <section id="tracks" className="tracks-section section-padding">
      <div className="container">
        <SectionHeader num="01 / TRACKS" title="Explore The Tracks" />
        
        <div className="tracks-grid">
          {tracksData.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
};
