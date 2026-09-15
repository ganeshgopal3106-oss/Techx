import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';
import { SpecularButton } from './SpecularButton';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="venue-section section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="06 / VENUE" title="SCTCE CAMPUS" />

        <ScrollReveal>
          <div className="venue-grid">
            {/* Campus Details */}
            <div className="venue-details-card">
              <div>
                <h3 className="venue-institution-name">
                  Sree Chitra Thirunal College of Engineering
                </h3>
                <p className="venue-city-state">
                  Thiruvananthapuram, Kerala
                </p>
                <p className="venue-address">
                  NH 66, CTO Colony, Pappanamcode, Thiruvananthapuram, Kerala 695018
                </p>
              </div>

              {/* External Maps Action Button */}
              <div style={{ marginTop: 'var(--space-md)' }}>
                <SpecularButton 
                  href="https://maps.google.com/?q=Sree+Chitra+Thirunal+College+of+Engineering+Thiruvananthapuram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                >
                  <span>Open In Google Maps</span>
                  <span aria-hidden="true">↗</span>
                </SpecularButton>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="venue-map-wrap">
              <iframe
                title="SCTCE Campus Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.1118851564481!2d76.97857658187175!3d8.470231553187036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05baee56e6b99b%3A0x4ce024c88eb0ddcb!2sSree%20Chitra%20Thirunal%20College%20of%20Engineering%2C%20Thiruvananthapuram!5e0!3m2!1sen!2sin!4v1711636446051!5m2!1sen!2sin"
                className="venue-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
