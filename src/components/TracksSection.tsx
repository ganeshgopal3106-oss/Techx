import React, { useState, useEffect } from 'react';
import { tracksData } from '../data/tracks';
import type { Track, TrackCategory } from '../data/tracks';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const TracksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TrackCategory>('TECH');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const filteredTracks = tracksData.filter(track => track.category === activeTab);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTrack(null);
      }
    };
    if (selectedTrack) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedTrack]);

  return (
    <section id="tracks" className="tracks-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
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
              <div 
                key={track.id} 
                className="track-card" 
                onClick={() => setSelectedTrack(track)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTrack(track); } }}
                aria-label={`View details for ${track.title}`}
              >
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

                  {/* Exploration Action */}
                  <div className="track-card-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="blueprint-tag">STATUS: {track.status}</span>
                    <span className="track-link" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      EXPLORE <span className="arrow">→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>

      {/* Expanded Track Detail Modal */}
      {selectedTrack && (
        <div 
          className="track-modal-overlay" 
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedTrack(null); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="track-modal-title"
        >
          <div className="track-modal-card">
            <div className="track-modal-header">
              <div>
                <span className="blueprint-tag">TRACK {selectedTrack.num} // {selectedTrack.badge}</span>
                <h3 id="track-modal-title" style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px' }}>
                  {selectedTrack.title}
                </h3>
              </div>
              <button 
                className="track-modal-close" 
                onClick={() => setSelectedTrack(null)}
                aria-label="Close track details"
              >
                ✕
              </button>
            </div>

            <div style={{ margin: 'var(--space-md) 0' }}>
              {selectedTrack.status === 'COMING_SOON' ? (
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-lg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    COMING SOON
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    The complete curriculum, workshop modules, and mentor lineups for this track will be revealed soon.
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                    Stay tuned for syllabus updates and registration opening.
                  </p>
                </div>
              ) : selectedTrack.registrationEnabled ? (
                <div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-md)' }}>
                    {selectedTrack.description}
                  </p>
                  <a 
                    href={selectedTrack.registrationLink} 
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                  >
                    REGISTER FOR THIS TRACK →
                  </a>
                </div>
              ) : (
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-md)', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Registration for this track is currently closed.</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-md)' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedTrack(null)}
                style={{ height: '36px', padding: '0 20px', fontSize: '0.8rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
