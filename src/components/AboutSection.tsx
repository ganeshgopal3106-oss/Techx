import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const [showFullSbcText, setShowFullSbcText] = useState(false);

  return (
    <section id="about" className="about-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container about-container">
        {/* Left Column / Section Header */}
        <div className="about-left-col">
          <span className="blueprint-tag">[ SYS // VISION ]</span>
          <div className="about-section-number" style={{ marginTop: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
            02 / ABOUT TECHX
          </div>
        </div>

        {/* Right Column / Primary Product Story */}
        <ScrollReveal className="about-right-col">
          {/* Story Headline & Lead */}
          <div className="about-block" style={{ marginBottom: '48px' }}>
            <h2 className="about-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '20px' }}>
              Bridging Academic Learning & Industry Readiness
            </h2>
            <div className="about-content">
              <p className="about-lead" style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-primary)', fontWeight: 500 }}>
                TechX REIGNITE is a premier technical upskilling initiative hosted by IEEE CS SCT SBC, designed to transform theoretical engineering fundamentals into battle-tested industry readiness.
              </p>
              <p className="about-lead" style={{ marginTop: '20px', fontWeight: 'normal', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                The event combines intensive hands-on coding sprints with interdisciplinary keynotes, placement communication tracks, and personalized 1-on-1 nano-mentoring. Backed by an official IEEE grant, TechX REIGNITE serves as an equitable launchpad empowering students across all engineering branches.
              </p>
            </div>
          </div>

          {/* Chapter Narrative */}
          <div className="about-block">
            <span className="blueprint-tag">HOST CHAPTER // EXCELLENCE RECORD</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', margin: '8px 0 16px', color: 'var(--text-primary)' }}>
              IEEE CS SCT Student Branch Chapter
            </h3>
            <div className="about-content">
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                IEEE CS SCT SBC is a vibrant student-led technical chapter at Sree Chitra Thirunal College of Engineering. Committed to fostering innovation, the chapter regularly hosts high-impact workshops, hackathons, and symposiums.
              </p>
              
              <div className={`about-expandable-drawer ${showFullSbcText ? 'open' : ''}`}>
                <div className="about-expandable-drawer-inner">
                  <p style={{ marginTop: '16px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Recognized with the Outstanding Student Branch Chapter Award in 2022 and named Best Student Branch Chapter of IEEE SCT SB in 2024, our community has organized six major technical milestones in 2026 alone, driving rapid upskilling across Kerala and beyond.
                  </p>
                </div>
              </div>

              <div className="about-actions" style={{ marginTop: '20px' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowFullSbcText(!showFullSbcText)}
                  style={{ height: '38px', padding: '0 20px', fontSize: '0.75rem', fontWeight: 700 }}
                  aria-expanded={showFullSbcText}
                >
                  {showFullSbcText ? 'READ LESS −' : 'EXPLORE CHAPTER ACHIEVEMENTS +'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Supporting Visual / Architectural Block */}
        <ScrollReveal className="about-image-area" delayMs={200}>
          <div className="image-placeholder blueprint-grid-bg" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', padding: '32px' }}>
            <span className="blueprint-tag">[ ARCHITECTURE // SUMMIT ]</span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', marginTop: '12px', letterSpacing: '-0.02em' }}>
              TECHX
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              REIGNITE 2026
            </div>
            <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)', margin: '16px 0' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center', lineHeight: '1.4' }}>
              SCTCE CAMPUS • TRIVANDRUM<br />IEEE CS SCT SBC CHAPTER
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
