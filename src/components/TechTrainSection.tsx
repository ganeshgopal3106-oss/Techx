import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';

export const TechTrainSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'TECH' | 'TRAIN'>('TECH');

  return (
    <section id="pillars" className="tech-train-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="03 / METHODOLOGY" title="The Dual Pillars: Tech & Train" />
        
        {/* Interactive Physical-Switch Bar */}
        <ScrollReveal>
          <div className="tech-train-switch-bar" role="tablist" aria-label="Methodology Pillars">
            <button
              className={`tech-train-pill ${activeCategory === 'TECH' ? 'active' : ''}`}
              onClick={() => setActiveCategory('TECH')}
              role="tab"
              aria-selected={activeCategory === 'TECH'}
            >
              TECH
            </button>
            <button
              className={`tech-train-pill ${activeCategory === 'TRAIN' ? 'active' : ''}`}
              onClick={() => setActiveCategory('TRAIN')}
              role="tab"
              aria-selected={activeCategory === 'TRAIN'}
            >
              TRAIN
            </button>
          </div>
        </ScrollReveal>

        {/* Dynamic Editorial Content Panel with Staggered Motion */}
        <ScrollReveal>
          {activeCategory === 'TECH' ? (
            <div key="tech-panel" className="tech-train-grid">
              {/* Tech Pillar 1: Hands-on Workshops */}
              <div className="tech-train-block tab-animated-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="blueprint-tag">PILLAR 01 // LAB SPRINTS</span>
                  <span className="badge">OFFLINE WORKSHOPS</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '8px' }}>
                  Hands-on Workshops
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Intensive technical sprints organized across two offline tracks. Participants build end-to-end architectures, test microservices, and deploy production-ready systems under mentorship.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">SYSTEM BUILDING</span>
                  <span className="badge">CODE SPARK</span>
                </div>
              </div>

              {/* Tech Pillar 2: Talk Sessions */}
              <div className="tech-train-block tab-animated-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="blueprint-tag">PILLAR 02 // KEYNOTES</span>
                  <span className="badge">INTERDISCIPLINARY</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '8px' }}>
                  Talk Sessions
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Forward-looking keynotes and discussions exploring interdisciplinary technological convergence, including Advanced Driver Assistance Systems (ADAS) and AI breakthroughs in Healthcare.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">EMERGING TECH</span>
                  <span className="badge">INDUSTRY TRENDS</span>
                </div>
              </div>
            </div>
          ) : (
            <div key="train-panel" className="tech-train-grid">
              {/* Train Pillar 1: Soft Skills */}
              <div className="tech-train-block tab-animated-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="blueprint-tag">PILLAR 03 // CAREER READINESS</span>
                  <span className="badge">PLACEMENT SKILLS</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '8px' }}>
                  Soft Skills & Communication
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Actionable sessions focusing on campus-to-corporate transitions, resume curation, mock interview etiquette, and strategic tech communication to excel in technical hiring rounds.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">INTERVIEW DRILLS</span>
                  <span className="badge">RESUME CURATION</span>
                </div>
              </div>

              {/* Train Pillar 2: Nano-Mentoring */}
              <div className="tech-train-block tab-animated-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="blueprint-tag">PILLAR 04 // DIRECT GUIDANCE</span>
                  <span className="badge">1-ON-1 SESSIONS</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '8px' }}>
                  Nano-Mentoring
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Curated 1-on-1 mentorship pods matching delegates with distinguished young professionals from top technology firms for portfolio roadmapping and personalized career counsel.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">1-ON-1 GUIDANCE</span>
                  <span className="badge">CAREER ROADMAP</span>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
