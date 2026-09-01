import React, { useState } from 'react';
import { tracksData } from '../data/tracks';
import type { TrackCategory } from '../data/tracks';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const TracksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TrackCategory>('TECH');

  const filteredTracks = tracksData.filter(track => track.category === activeTab);

  return (
    <section id="tracks" className="tracks-section section-padding">
      <div className="container">
        <SectionHeader num="02 / TRACKS" title="Explore The Tracks" />
        
        {/* TECH / TRAIN Switcher */}
        <ScrollReveal>
          <div className="tracks-toggle-bar" role="tablist" aria-label="Track Categories">
            <button 
              role="tab"
              aria-selected={activeTab === 'TECH'}
              className={`toggle-btn ${activeTab === 'TECH' ? 'active' : ''}`}
              onClick={() => setActiveTab('TECH')}
            >
              TECH
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'TRAIN'}
              className={`toggle-btn ${activeTab === 'TRAIN' ? 'active' : ''}`}
              onClick={() => setActiveTab('TRAIN')}
            >
              TRAIN
            </button>
          </div>
        </ScrollReveal>

        {/* Tracks Card Grid */}
        <ScrollReveal className="tracks-card-grid">
          {filteredTracks.map((track) => (
            <div key={track.id} className="track-card">
              {/* Blurred Image Visual with Centered Coming Soon Badge */}
              <div className="track-image-container">
                <img 
                  src={track.image} 
                  alt={track.name} 
                  className="track-image-blurred"
                  loading="lazy"
                />
                {track.status === 'coming-soon' && (
                  <div className="track-coming-soon-badge">
                    COMING SOON
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="track-card-body">
                <div className="track-card-meta">
                  <span className="track-card-num">TRACK {track.num}</span>
                  <span className="track-card-badge">{track.badge}</span>
                </div>

                <h3 className="track-card-title">{track.name}</h3>
                <p className="track-card-desc">{track.description}</p>

                {/* Track-Specific CTA */}
                <div className="track-card-actions">
                  <a 
                    href={track.registrationLink} 
                    className="track-register-btn"
                    aria-label={`Register for ${track.name}`}
                  >
                    REGISTER FOR THIS TRACK <span className="arrow">→</span>
                  </a>
                  <span className="track-notice-text">
                    The details for this track will be revealed soon.
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};
