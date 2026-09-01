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
          {filteredTracks.map((track) => {
            const isComingSoon = track.status === 'COMING_SOON';
            const isClosed = track.status === 'CLOSED';

            return (
              <div key={track.id} className="track-card">
                {/* Image Visual (Blurred if COMING_SOON, Crisp if OPEN) */}
                <div className="track-image-container">
                  <img 
                    src={track.image} 
                    alt={track.title} 
                    className={isComingSoon ? "track-image-blurred" : "track-image-crisp"}
                    loading="lazy"
                  />
                  {isComingSoon && (
                    <div className="track-coming-soon-badge">
                      COMING SOON
                    </div>
                  )}
                  {isClosed && (
                    <div className="track-coming-soon-badge" style={{ backgroundColor: 'var(--text-muted)' }}>
                      REGISTRATION CLOSED
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="track-card-body">
                  <div className="track-card-meta">
                    <span className="track-card-num">TRACK {track.num}</span>
                    <span className="track-card-badge">{track.badge}</span>
                  </div>

                  <h3 className="track-card-title">{track.title}</h3>
                  <p className="track-card-desc">{track.description}</p>

                  {/* Track-Specific CTA */}
                  <div className="track-card-actions">
                    {track.registrationEnabled && !isClosed ? (
                      <a 
                        href={track.registrationLink} 
                        className="track-register-btn"
                        aria-label={`Register for ${track.title}`}
                      >
                        REGISTER FOR THIS TRACK <span className="arrow">→</span>
                      </a>
                    ) : (
                      <button 
                        disabled 
                        className="track-register-btn" 
                        style={{ opacity: 0.6, cursor: 'not-allowed' }}
                      >
                        {isClosed ? 'REGISTRATION CLOSED' : 'REGISTRATION OPENS SOON'}
                      </button>
                    )}
                    
                    <span className="track-notice-text">
                      {isComingSoon 
                        ? 'The details for this track will be revealed soon.' 
                        : 'Limited seats per cohort. Secure your place now.'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
};
