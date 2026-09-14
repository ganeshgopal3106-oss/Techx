import React, { useState, useEffect, useCallback } from 'react';
import { tracksData } from '../data/tracks';
import type { Track } from '../data/tracks';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const TracksSection: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalMounted, setIsModalMounted] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalMounted(false);
    setTimeout(() => {
      setSelectedTrack(null);
    }, 200);
  }, []);

  const openTrackModal = (track: Track) => {
    setSelectedTrack(track);
    setIsModalMounted(true);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
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
  }, [selectedTrack, closeModal]);

  return (
    <section id="tracks" className="tracks-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="04 / TRACKS & COMPETITIONS" title="Workshop Tracks & Associated Competitions" />
        
        {/* Alternating Tracks Showcase List */}
        <div className="tracks-showcase-list">
          {tracksData.map((track, index) => {
            const isReversed = index % 2 === 1;
            const isComingSoon = track.status === 'COMING_SOON';
            const isOpen = track.status === 'OPEN';

            return (
              <ScrollReveal key={track.id} variant="fade-up" className={`track-showcase-row ${isReversed ? 'reversed' : ''}`}>
                {/* Large Visual Block (Blurred with Centered Coming Soon Overlay) */}
                <div 
                  className="track-showcase-image-wrap"
                  onClick={() => openTrackModal(track)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTrackModal(track); } }}
                  aria-label={`View track details for ${track.title}`}
                >
                  <img 
                    src={track.image} 
                    alt={track.title} 
                    className="track-image-blurred"
                    loading="lazy"
                  />
                  {isComingSoon && (
                    <div className="track-coming-soon-badge">
                      COMING SOON
                    </div>
                  )}
                  {isOpen && (
                    <div className="track-open-badge">
                      REGISTRATIONS OPEN
                    </div>
                  )}
                </div>

                {/* Information Column */}
                <div className="track-showcase-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span className="blueprint-tag">TRACK {track.num} // {track.category}</span>
                    <span className="badge">{track.badge}</span>
                  </div>

                  <h3 className="track-showcase-title">
                    {track.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', margin: '4px 0 12px' }}>
                    {track.description}
                  </p>

                  {/* Associated Competition Highlight */}
                  {track.competition && (
                    <div className="track-competition-box">
                      <div className="track-competition-header">
                        <span className="blueprint-tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                          DAY 2 // COMPETITION
                        </span>
                        <strong className="track-competition-title">{track.competition}</strong>
                      </div>
                      {track.competitionDescription && (
                        <p className="track-competition-desc">{track.competitionDescription}</p>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {isOpen ? (
                      <a 
                        href={track.registrationLink} 
                        className="btn btn-primary"
                        style={{ height: '42px', padding: '0 24px', fontSize: '0.85rem', fontWeight: 700 }}
                      >
                        REGISTER FOR THIS TRACK →
                      </a>
                    ) : (
                      <button
                        onClick={() => openTrackModal(track)}
                        className="btn btn-secondary"
                        style={{ height: '40px', padding: '0 20px', fontSize: '0.85rem', fontWeight: 700 }}
                      >
                        Explore Track Details <span className="arrow">→</span>
                      </button>
                    )}
                    <span className="blueprint-tag">STATUS: {track.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Expanded Track Detail Modal with Smooth Morph Transition */}
      {selectedTrack && (
        <div 
          className={`track-modal-overlay ${isModalMounted ? 'active' : ''}`} 
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="track-modal-title"
        >
          <div className="track-modal-card">
            <div className="track-modal-header">
              <div>
                <span className="blueprint-tag">TRACK {selectedTrack.num} // {selectedTrack.category}</span>
                <h3 id="track-modal-title" style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px' }}>
                  {selectedTrack.title}
                </h3>
              </div>
              <button 
                className="track-modal-close" 
                onClick={closeModal}
                aria-label="Close track details"
              >
                ✕
              </button>
            </div>

            <div style={{ margin: 'var(--space-md) 0' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-md)' }}>
                {selectedTrack.description}
              </p>

              {selectedTrack.competition && (
                <div className="track-competition-box" style={{ marginBottom: 'var(--space-md)' }}>
                  <div className="track-competition-header">
                    <span className="blueprint-tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                      DAY 2 // COMPETITION
                    </span>
                    <strong className="track-competition-title">{selectedTrack.competition}</strong>
                  </div>
                  {selectedTrack.competitionDescription && (
                    <p className="track-competition-desc">{selectedTrack.competitionDescription}</p>
                  )}
                </div>
              )}

              {selectedTrack.status === 'COMING_SOON' ? (
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-lg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    COMING SOON
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    The complete curriculum, workshop modules, and mentor lineups for this track will be revealed soon.
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                    Stay tuned for syllabus updates and track registration announcements.
                  </p>
                </div>
              ) : selectedTrack.status === 'OPEN' || selectedTrack.registrationEnabled ? (
                <div>
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
                onClick={closeModal}
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
