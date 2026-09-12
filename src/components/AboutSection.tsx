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
          <div className="about-block" style={{ marginBottom: '44px' }}>
            <h2 className="about-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '18px' }}>
              What Is TechX REIGNITE?
            </h2>
            <div className="about-content">
              <p className="about-lead" style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-primary)', fontWeight: 500 }}>
                TechX REIGNITE is the premier technical upskilling initiative hosted by IEEE CS SCT SBC at Sree Chitra Thirunal College of Engineering, designed to bridge the gap between academic theory and real-world industry engineering.
              </p>
              
              <div style={{ margin: '20px 0', padding: '16px 20px', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  The Core Philosophy: TECH + TRAIN
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  We unite hands-on technical sprints (Full-stack, ADAS, AI in Healthcare, IoT) with direct career empowerment (Soft Skills communication, resume curation, and 1-on-1 personalized Nano-Mentoring).
                </p>
              </div>

              <p style={{ fontWeight: 'normal', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Supported by an official IEEE grant, TechX REIGNITE provides a high-energy platform for students across all engineering branches to build production systems, compete in capstone challenges, and gain actionable placement confidence.
              </p>
            </div>
          </div>

          {/* Chapter Narrative */}
          <div className="about-block">
            <span className="blueprint-tag">ORGANIZED BY // STUDENT EXCELLENCE</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', margin: '8px 0 14px', color: 'var(--text-primary)' }}>
              IEEE CS SCT Student Branch Chapter
            </h3>
            <div className="about-content">
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                IEEE CS SCT SBC is a vibrant student-led technical chapter at SCTCE Pappanamcode. Recognized with the Outstanding Student Branch Chapter Award in 2022 and named Best Student Branch Chapter of IEEE SCT SB in 2024, our team has organized six major technical milestones in 2026 alone.
              </p>
              
              <div className={`about-expandable-drawer ${showFullSbcText ? 'open' : ''}`}>
                <div className="about-expandable-drawer-inner">
                  <p style={{ marginTop: '16px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Having secured over 180 registrations in less than 24 hours for technical tracks during Dhyuthi 6.0, our chapter brings proven logistical excellence, distinguished industry alumni networks, and deep student mentorship to every event we create.
                  </p>
                </div>
              </div>

              <div className="about-actions" style={{ marginTop: '18px' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowFullSbcText(!showFullSbcText)}
                  style={{ height: '38px', padding: '0 20px', fontSize: '0.75rem', fontWeight: 700 }}
                  aria-expanded={showFullSbcText}
                >
                  {showFullSbcText ? 'READ LESS −' : 'CHAPTER RECORD & IMPACT +'}
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
