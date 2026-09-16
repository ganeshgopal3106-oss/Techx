import React, { useState, useEffect, useCallback } from 'react';
import { tracksData } from '../data/tracks';
import type { Track } from '../data/tracks';
import { getPosterBySlug } from '../data/posters';
import { PosterDisplay } from './PosterDisplay';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';
import { SpecularButton } from './SpecularButton';

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
    <section id="tracks" className="tracks-section section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="04 / TRACKS & COMPETITIONS" title="Tracks & Competitions" />
        
        {/* Alternating Tracks Showcase List */}
        <div className="tracks-showcase-list">
          {tracksData.map((track, index) => {
            const isReversed = index % 2 === 1;
            const poster = getPosterBySlug(track.posterSlug);

            return (
              <ScrollReveal key={track.id} variant="fade-up" className={`track-showcase-row ${isReversed ? 'reversed' : ''}`}>
                {/* Large Visual Block */}
                <div 
                  className="track-showcase-image-wrap"
                  onClick={() => openTrackModal(track)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTrackModal(track); } }}
                  aria-label={`View details for ${track.title}`}
                >
                  <PosterDisplay 
                    poster={poster} 
                    className="track-card-poster"
                    loading="lazy" 
                  />
                </div>

                {/* Information Column */}
                <div className="track-showcase-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="blueprint-tag">{track.badge}</span>
                  </div>

                  <h3 className="track-showcase-title">
                    {track.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.5', margin: '4px 0 10px' }}>
                    {track.description}
                  </p>

                  {track.competition && (
                    <div style={{ marginBottom: '12px' }}>
                      <span className="badge" style={{ color: 'var(--accent)', borderColor: 'rgba(207, 131, 38, 0.4)', backgroundColor: 'rgba(207, 131, 38, 0.05)' }}>
                        {track.competition}
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {track.registrationEnabled ? (
                      <SpecularButton 
                        href={track.registrationLink} 
                        size="md"
                      >
                        <span>REGISTER</span>
                        <span aria-hidden="true">→</span>
                      </SpecularButton>
                    ) : (
                      <span className="badge" style={{ color: '#CF8326', borderColor: 'rgba(207, 131, 38, 0.35)', backgroundColor: 'rgba(207, 131, 38, 0.05)', fontWeight: 700, padding: '8px 14px' }}>
                        COMMON SESSION (TRACK 1 &amp; 2)
                      </span>
                    )}

                    <SpecularButton
                      variant="secondary"
                      size="sm"
                      onClick={() => openTrackModal(track)}
                    >
                      Details →
                    </SpecularButton>
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
          className={`track-modal-overlay ${isModalMounted ? 'active' : ''}`} 
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="track-modal-title"
        >
          <div className="track-modal-card">
            <div className="track-modal-header">
              <div>
                <h3 id="track-modal-title" style={{ fontSize: '1.3rem', fontWeight: 800, textTransform: 'uppercase' }}>
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
              <div className="track-modal-poster-wrap">
                <PosterDisplay 
                  poster={getPosterBySlug(selectedTrack.posterSlug)} 
                  loading="eager" 
                />
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-md)' }}>
                {selectedTrack.description}
              </p>

              {selectedTrack.competition && (
                <div style={{ padding: '12px 16px', backgroundColor: 'rgba(207, 131, 38, 0.06)', borderLeft: '3px solid var(--accent)', borderRadius: 'var(--radius-xs)', marginBottom: 'var(--space-md)' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                    {selectedTrack.competition}
                  </strong>
                  {selectedTrack.competitionDescription && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {selectedTrack.competitionDescription}
                    </p>
                  )}
                </div>
              )}

              {selectedTrack.registrationEnabled ? (
                <div>
                  <SpecularButton 
                    href={selectedTrack.registrationLink} 
                    size="lg"
                    style={{ width: '100%' }}
                  >
                    <span>REGISTER FOR {selectedTrack.title}</span>
                    <span aria-hidden="true">→</span>
                  </SpecularButton>
                </div>
              ) : (
                <div style={{ backgroundColor: 'rgba(207, 131, 38, 0.06)', border: '1px solid rgba(207, 131, 38, 0.25)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                    Common session for all participants of both <strong>Track 1</strong> and <strong>Track 2</strong>. No separate registration required.
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-sm)' }}>
              <SpecularButton 
                variant="secondary" 
                size="sm" 
                onClick={closeModal}
              >
                Close
              </SpecularButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
