import React from 'react';
import { tracksData } from '../data/tracks';
import { SectionHeader } from './SectionHeader';

export const TracksSection: React.FC = () => {
  return (
    <section id="tracks" className="tracks-section section-padding">
      <div className="container">
        <SectionHeader num="02 / TRACKS" title="Explore The Tracks" />
        
        <div className="tracks-grid">
          {tracksData.map((track) => (
            <div key={track.id} className="track-row-item">
              <div className="track-number">{track.num}</div>
              <h3 className="track-name">{track.name}</h3>
              <div className="track-badge-container">
                <span className="badge track-badge">{track.badge}</span>
              </div>
              <p className="track-description">{track.description}</p>
              <div className="track-footer">
                <a href={track.actionLink} className="track-link">
                  View Details <span className="arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
