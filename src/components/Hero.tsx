import React from 'react';
import { eventData } from '../data/event';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section section-padding">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-logo-wrapper">
            {/* Simple TechX Logo representation */}
            <span className="hero-logo-text">TECHX</span>
          </div>

          <h1 className="hero-headline">{eventData.title}</h1>
          <p className="hero-description">{eventData.tagline}</p>
          
          <div className="hero-meta">
            <span className="hero-meta-date">{eventData.dateRange}</span>
            <span className="hero-meta-divider">|</span>
            <span className="hero-meta-location">{eventData.locationShort}</span>
          </div>

          <div className="hero-actions">
            <a href="/register" className="btn btn-primary">Register Pass</a>
            <a href="#about" className="btn btn-secondary">Explore Vision</a>
          </div>
        </div>

        {/* Dedicated empty area for future visual treatments (3D graphic, animation, etc.) */}
        <div className="hero-visual-area">
          <div className="image-placeholder">
            <span>[ Future Hero Art / 3D / Video Placement Area ]</span>
          </div>
        </div>
      </div>
    </section>
  );
};
