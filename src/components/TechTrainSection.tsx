import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';

export const TechTrainSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'TECH' | 'TRAIN'>('TECH');

  return (
    <section id="pillars" className="tech-train-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="03 / METHODOLOGY" title="The Dual Pillars: Tech & Train" />
        
        {/* 21st.dev Interactive Physical-Switch Capsule */}
        <ScrollReveal>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-xl)' }}>
            <div 
              style={{ 
                display: 'inline-flex', 
                padding: '4px', 
                background: 'var(--bg-secondary)', 
                borderRadius: '30px', 
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
              role="tablist" 
              aria-label="Methodology Pillars"
            >
              <button
                style={{
                  padding: '10px 32px',
                  borderRadius: '24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  transition: 'all var(--duration-fast) var(--ease-out-expo)',
                  background: activeCategory === 'TECH' ? 'var(--accent)' : 'transparent',
                  color: activeCategory === 'TECH' ? 'var(--accent-text)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: activeCategory === 'TECH' ? '0 2px 10px var(--glow-color)' : 'none'
                }}
                onClick={() => setActiveCategory('TECH')}
                role="tab"
                aria-selected={activeCategory === 'TECH'}
              >
                ⚡ TECH PILLAR
              </button>
              <button
                style={{
                  padding: '10px 32px',
                  borderRadius: '24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  transition: 'all var(--duration-fast) var(--ease-out-expo)',
                  background: activeCategory === 'TRAIN' ? 'var(--accent)' : 'transparent',
                  color: activeCategory === 'TRAIN' ? 'var(--accent-text)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: activeCategory === 'TRAIN' ? '0 2px 10px var(--glow-color)' : 'none'
                }}
                onClick={() => setActiveCategory('TRAIN')}
                role="tab"
                aria-selected={activeCategory === 'TRAIN'}
              >
                🎯 TRAIN PILLAR
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic 21st.dev Bento Grid Content Panel */}
        <ScrollReveal>
          {activeCategory === 'TECH' ? (
            <div key="tech-panel" className="tech-train-grid">
              {/* Tech Pillar 1: Hands-on Workshops */}
              <div className="tech-train-block tab-animated-item" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </div>
                    <span className="blueprint-tag">PILLAR 01 // LAB SPRINTS</span>
                  </div>
                  <span className="badge">OFFLINE WORKSHOPS</span>
                </div>
                
                <h3 style={{ fontSize: '1.65rem', fontWeight: 850, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '16px' }}>
                  Hands-on Workshops
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.95rem', marginTop: '8px' }}>
                  Intensive technical sprints organized across two offline tracks. Participants build end-to-end architectures, test microservices, and deploy production-ready systems under mentorship.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">SYSTEM ARCHITECTURE</span>
                  <span className="badge">OFFLINE SPRINT</span>
                  <span className="badge">PRODUCTION READY</span>
                </div>
              </div>

              {/* Tech Pillar 2: Talk Sessions */}
              <div className="tech-train-block tab-animated-item" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                      </svg>
                    </div>
                    <span className="blueprint-tag">PILLAR 02 // KEYNOTES</span>
                  </div>
                  <span className="badge">INTERDISCIPLINARY</span>
                </div>
                
                <h3 style={{ fontSize: '1.65rem', fontWeight: 850, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '16px' }}>
                  Talk Sessions
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.95rem', marginTop: '8px' }}>
                  Forward-looking keynotes and discussions exploring interdisciplinary technological convergence, including Advanced Driver Assistance Systems (ADAS) sensor fusion and AI breakthroughs in Healthcare.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">ADAS SENSOR FUSION</span>
                  <span className="badge">HEALTHCARE AI</span>
                  <span className="badge">INDUSTRY HORIZONS</span>
                </div>
              </div>
            </div>
          ) : (
            <div key="train-panel" className="tech-train-grid">
              {/* Train Pillar 1: Soft Skills */}
              <div className="tech-train-block tab-animated-item" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <span className="blueprint-tag">PILLAR 03 // CAREER READINESS</span>
                  </div>
                  <span className="badge">PLACEMENT SKILLS</span>
                </div>
                
                <h3 style={{ fontSize: '1.65rem', fontWeight: 850, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '16px' }}>
                  Soft Skills & Placement
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.95rem', marginTop: '8px' }}>
                  Actionable sessions focusing on campus-to-corporate transitions, resume curation, mock interview etiquette, and strategic tech communication to excel in high-stakes technical hiring rounds.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">INTERVIEW DRILLS</span>
                  <span className="badge">RESUME WORKSHOP</span>
                  <span className="badge">COMMUNICATION</span>
                </div>
              </div>

              {/* Train Pillar 2: Nano-Mentoring */}
              <div className="tech-train-block tab-animated-item" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 14 14"></polyline>
                      </svg>
                    </div>
                    <span className="blueprint-tag">PILLAR 04 // DIRECT GUIDANCE</span>
                  </div>
                  <span className="badge">1-ON-1 SESSIONS</span>
                </div>
                
                <h3 style={{ fontSize: '1.65rem', fontWeight: 850, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '16px' }}>
                  Nano-Mentoring
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.95rem', marginTop: '8px' }}>
                  Curated 1-on-1 mentorship pods matching delegates directly with distinguished young professionals from top technology firms for portfolio roadmapping and individualized career counsel.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">1-ON-1 PODS</span>
                  <span className="badge">PORTFOLIO REVIEW</span>
                  <span className="badge">INDUSTRY ALUMNI</span>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
