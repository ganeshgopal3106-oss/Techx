import React, { useState, useEffect } from 'react';
import { tracksData } from '../data/tracks';
import type { Track } from '../data/tracks';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const TracksSection: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

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
        <SectionHeader num="04 / TRACKS SHOWCASE" title="Explore The Upcoming Tracks" />
        
        {/* Alternating Tracks Showcase List */}
        <div className="tracks-showcase-list">
          {tracksData.map((track, index) => {
            const isReversed = index % 2 === 1;
            const isComingSoon = track.status === 'COMING_SOON';

            return (
              <ScrollReveal key={track.id} className={`track-showcase-row ${isReversed ? 'reversed' : ''}`}>
                {/* Large Visual Block (Blurred with Centered Coming Soon Overlay) */}
                <div 
                  className="track-showcase-image-wrap"
                  onClick={() => setSelectedTrack(track)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTrack(track); } }}
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
                </div>

                {/* Information Column */}
                <div className="track-showcase-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="blueprint-tag">TRACK {track.num} // {track.category}</span>
                    <span className="badge">{track.badge}</span>
                  </div>

                  <h3 className="track-showcase-title">
                    {track.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', margin: '8px 0 16px' }}>
                    {track.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                      onClick={() => setSelectedTrack(track)}
                      className="btn btn-secondary"
                      style={{ height: '40px', padding: '0 20px', fontSize: '0.85rem', fontWeight: 700 }}
                    >
                      Explore Track Details <span className="arrow">→</span>
                    </button>
                    <span className="blueprint-tag">STATUS: {track.status}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
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
                <span className="blueprint-tag">TRACK {selectedTrack.num} // {selectedTrack.category}</span>
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
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    The complete curriculum, workshop modules, and mentor lineups for this track will be revealed soon.
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                    Stay tuned for syllabus updates and track registration announcements.
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
