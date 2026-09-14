import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export interface GalleryMoment {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  alt: string;
  tag: string;
}

const galleryMoments: GalleryMoment[] = [
  {
    id: "moment-1",
    num: "01 / TECHX REIGNITE",
    title: "Flagship Technical Upskilling Summit",
    subtitle: "Two weeks of immersive engineering, expert masterclasses, and hands-on system building across domains.",
    imageSrc: "",
    alt: "TechX Reignite flagship technical summit sessions",
    tag: "FLAGSHIP SUMMIT"
  },
  {
    id: "moment-2",
    num: "02 / WORKSHOP SESSION",
    title: "Hands-on Technical Workshops",
    subtitle: "Deep-dive practical implementation sessions led by seasoned industry practitioners in SCTCE laboratories.",
    imageSrc: "",
    alt: "Workshop sessions and microservices builds",
    tag: "TECHNICAL LABS"
  },
  {
    id: "moment-3",
    num: "03 / COMMUNITY",
    title: "Peer Collaboration & Mentorship",
    subtitle: "Cross-disciplinary student teams ideating, solving architecture bottlenecks, and networking with alumni mentors.",
    imageSrc: "",
    alt: "Community mentoring and team collaboration",
    tag: "MENTORSHIP PODS"
  },
  {
    id: "moment-4",
    num: "04 / MAIN EVENT",
    title: "Capstone Hackathon & Project Expo",
    subtitle: "Teams pitching functional prototypes and sprint code before distinguished faculty and industry jury panels.",
    imageSrc: "",
    alt: "Main event hackathon and project expo",
    tag: "PROJECT EXPO"
  }
];

const MomentPlaceholder: React.FC<{ num: string; tag: string; isLarge?: boolean }> = ({ num, isLarge }) => (
  <div className="gallery-placeholder">
    <div className="gallery-placeholder-inner">
      <svg
        className="gallery-placeholder-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      <span className="gallery-placeholder-tag">{num}</span>
      <span className="gallery-placeholder-hint">
        {isLarge ? '[ REAL EVENT PHOTO FRAME // CLICK TO EXPAND ]' : '[ PHOTO FRAME // CLICK ]'}
      </span>
    </div>
  </div>
);

export const GallerySection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIdx(index);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setActiveIdx(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const nextItem = useCallback(() => {
    setActiveIdx((prev) => (prev !== null ? (prev === galleryMoments.length - 1 ? 0 : prev + 1) : null));
  }, []);

  const prevItem = useCallback(() => {
    setActiveIdx((prev) => (prev !== null ? (prev === 0 ? galleryMoments.length - 1 : prev - 1) : null));
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextItem();
      } else if (e.key === 'ArrowLeft') {
        prevItem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, nextItem, prevItem]);

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (deltaX < -50) {
      nextItem();
    } else if (deltaX > 50) {
      prevItem();
    }
    touchStartX.current = null;
  };

  return (
    <section id="gallery" className="gallery-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="05 / GALLERY" title="Moments from TECHX" />

        <div className="gallery-meta-bar">
          <span>CURATED ARCHIVE // 4 HIGHLIGHT FRAMES</span>
          <span>SELECT ANY FRAME TO EXPAND LIGHTBOX</span>
        </div>

        <ScrollReveal variant="fade-up">
          <div className="gallery-editorial-layout">
            {/* Featured Left Column (Moment 1) */}
            <div className="gallery-featured-col">
              <div 
                className="gallery-card gallery-card-featured" 
                onClick={() => openLightbox(0)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(0);
                  }
                }}
                aria-label={`Expand moment 1: ${galleryMoments[0].title}`}
              >
                <div className="gallery-media-wrap">
                  {galleryMoments[0].imageSrc ? (
                    <img src={galleryMoments[0].imageSrc} alt={galleryMoments[0].alt} className="gallery-media-img" loading="lazy" />
                  ) : (
                    <MomentPlaceholder num={galleryMoments[0].num} tag={galleryMoments[0].tag} isLarge />
                  )}
                </div>
                <div className="gallery-card-info">
                  <div className="gallery-card-meta">
                    <span>{galleryMoments[0].num}</span>
                    <span>{galleryMoments[0].tag}</span>
                  </div>
                  <h3 className="gallery-card-title">{galleryMoments[0].title}</h3>
                  <p className="gallery-card-desc">{galleryMoments[0].subtitle}</p>
                </div>
              </div>
            </div>

            {/* Supporting Right Column (Moments 2, 3, 4) */}
            <div className="gallery-supporting-col">
              {/* Moment 2 (Wide Top) */}
              <div 
                className="gallery-card gallery-card-supporting-wide"
                onClick={() => openLightbox(1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(1);
                  }
                }}
                aria-label={`Expand moment 2: ${galleryMoments[1].title}`}
              >
                <div className="gallery-media-wrap">
                  {galleryMoments[1].imageSrc ? (
                    <img src={galleryMoments[1].imageSrc} alt={galleryMoments[1].alt} className="gallery-media-img" loading="lazy" />
                  ) : (
                    <MomentPlaceholder num={galleryMoments[1].num} tag={galleryMoments[1].tag} />
                  )}
                </div>
                <div className="gallery-card-info">
                  <div className="gallery-card-meta">
                    <span>{galleryMoments[1].num}</span>
                    <span>{galleryMoments[1].tag}</span>
                  </div>
                  <h3 className="gallery-card-title">{galleryMoments[1].title}</h3>
                  <p className="gallery-card-desc">{galleryMoments[1].subtitle}</p>
                </div>
              </div>

              {/* Subgrid: Moments 3 & 4 */}
              <div className="gallery-supporting-subgrid">
                {[2, 3].map((idx) => {
                  const item = galleryMoments[idx];
                  return (
                    <div 
                      key={item.id}
                      className="gallery-card gallery-card-supporting-square"
                      onClick={() => openLightbox(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox(idx);
                        }
                      }}
                      aria-label={`Expand moment ${idx + 1}: ${item.title}`}
                    >
                      <div className="gallery-media-wrap">
                        {item.imageSrc ? (
                          <img src={item.imageSrc} alt={item.alt} className="gallery-media-img" loading="lazy" />
                        ) : (
                          <MomentPlaceholder num={item.num} tag={item.tag} />
                        )}
                      </div>
                      <div className="gallery-card-info">
                        <div className="gallery-card-meta">
                          <span>{item.num}</span>
                        </div>
                        <h3 className="gallery-card-title" style={{ fontSize: '1rem' }}>{item.title}</h3>
                        <p className="gallery-card-desc">{item.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div 
          className="gallery-lightbox-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Event Moments Lightbox"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="gallery-lightbox-container">
            {/* Lightbox Header */}
            <div className="gallery-lightbox-header">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="gallery-lightbox-tag">{galleryMoments[activeIdx].num}</span>
                <span className="gallery-lightbox-counter">
                  [{activeIdx + 1} of {galleryMoments.length}]
                </span>
              </div>
              <button 
                type="button" 
                className="gallery-lightbox-close" 
                onClick={closeLightbox}
                aria-label="Close Lightbox (Escape)"
              >
                ✕ <span>ESC</span>
              </button>
            </div>

            {/* Lightbox Media Body */}
            <div className="gallery-lightbox-body">
              {galleryMoments[activeIdx].imageSrc ? (
                <img 
                  src={galleryMoments[activeIdx].imageSrc} 
                  alt={galleryMoments[activeIdx].alt} 
                  className="gallery-lightbox-img" 
                />
              ) : (
                <MomentPlaceholder num={galleryMoments[activeIdx].num} tag={galleryMoments[activeIdx].tag} isLarge />
              )}

              {/* Navigation Buttons */}
              <button 
                type="button" 
                className="gallery-lightbox-nav-btn gallery-lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevItem();
                }}
                aria-label="Previous Moment"
              >
                ‹
              </button>
              <button 
                type="button" 
                className="gallery-lightbox-nav-btn gallery-lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextItem();
                }}
                aria-label="Next Moment"
              >
                ›
              </button>
            </div>

            {/* Lightbox Footer */}
            <div className="gallery-lightbox-footer">
              <div className="gallery-lightbox-info">
                <h3>{galleryMoments[activeIdx].title}</h3>
                <p>{galleryMoments[activeIdx].subtitle}</p>
              </div>
              <div className="gallery-lightbox-footer-nav">
                <button 
                  type="button" 
                  className="gallery-lightbox-btn"
                  onClick={prevItem}
                  aria-label="Previous image"
                >
                  ← Prev
                </button>
                <button 
                  type="button" 
                  className="gallery-lightbox-btn"
                  onClick={nextItem}
                  aria-label="Next image"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
