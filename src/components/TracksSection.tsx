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

  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'TECH' | 'TRAIN'>('ALL');

  const filteredTracks = tracksData.filter(t => {
    if (categoryFilter === 'ALL') return true;
    return t.category === categoryFilter;
  });

  return (
    <section id="tracks" className="tracks-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="04 / TRACKS SHOWCASE" title="Explore The Upcoming Tracks" />
        
        {/* 21st.dev Filter Pills Bar */}
        <ScrollReveal>
          <div className="filter-pills-bar">
            <button
              className={`filter-pill ${categoryFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('ALL')}
            >
              ALL TRACKS ({tracksData.length})
            </button>
            <button
              className={`filter-pill ${categoryFilter === 'TECH' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('TECH')}
            >
              ⚡ TECH TRACKS ({tracksData.filter(t => t.category === 'TECH').length})
            </button>
            <button
              className={`filter-pill ${categoryFilter === 'TRAIN' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('TRAIN')}
            >
              🎯 TRAIN TRACKS ({tracksData.filter(t => t.category === 'TRAIN').length})
            </button>
          </div>
        </ScrollReveal>

        {/* Alternating Tracks Showcase List */}
        <div className="tracks-showcase-list">
          {filteredTracks.map((track, index) => {
            const isReversed = index % 2 === 1;
            const isComingSoon = track.status === 'COMING_SOON';

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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => openTrackModal(track)}
                      className="btn btn-secondary"
                      style={{ height: '42px', padding: '0 20px', fontSize: '0.85rem', fontWeight: 700 }}
                    >
                      Track Details <span className="arrow">→</span>
                    </button>
                    <a
                      href={`/register?track=${track.id}`}
                      className="btn btn-primary"
                      style={{ height: '42px', padding: '0 20px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}
                    >
                      Enroll in Track
                    </a>
                    <span className="blueprint-tag">STATUS: {track.status}</span>
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
