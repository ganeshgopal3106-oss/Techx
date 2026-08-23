import React from 'react';
import { eventData } from '../data/event';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container about-container">
        {/* Left Column / Mobile Header */}
        <div className="about-left-col">
          <div className="about-section-number">01 / THE VISION</div>
        </div>

        {/* Right Column / Primary Info */}
        <div className="about-right-col">
          <h2 className="about-heading">About Reignite</h2>
          
          <div className="about-content">
            <p className="about-lead">
              A flagship initiative by {eventData.organizedBy} designed to spark collaboration, build technical culture, and nurture industry-ready talent through an immersive multi-day sprint.
            </p>
            
            <div className="about-details-grid">
              <div className="about-detail-item">
                <span className="about-detail-title">Legacy</span>
                <p>Darrel Chong Gold (2024), Best SBC (2024), and Outstanding SBC Award (2022).</p>
              </div>
              <div className="about-detail-item">
                <span className="about-detail-title">Collaborations</span>
                <p>IEEE CS SYP, Kerala Chapter, ComSoc, GECBH, CEA, IAS, & EMBS.</p>
              </div>
            </div>

            <div className="about-pillars">
              <span className="about-detail-title">Pillars</span>
              <div className="about-pillar-badges">
                <span className="badge">Technology</span>
                <span className="badge">Training</span>
                <span className="badge">Engagement</span>
                <span className="badge">Leadership</span>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="about-actions">
              <a href="#tracks" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
        </div>

        {/* Placeholder image area requested in PRD (allow an image to be added later) */}
        <div className="about-image-area">
          <div className="image-placeholder">
            <span>[ Event Context Artwork / Image Placeholder ]</span>
          </div>
        </div>
      </div>
    </section>
  );
};
