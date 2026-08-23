import React from 'react';
import { partnersData } from '../data/partners';
import { SectionHeader } from './SectionHeader';

export const PartnerGrid: React.FC = () => {
  return (
    <section className="partners-section section-padding">
      <div className="container">
        <SectionHeader num="04 / PARTNERS" title="In Collaboration With" />
        
        <div className="partners-grid">
          {partnersData.map((partner, idx) => (
            <div key={idx} className="partner-logo-box" title={partner.name}>
              {partner.logoUrl ? (
                <img src={partner.logoUrl} alt={partner.name} className="partner-logo-img" />
              ) : (
                <span className="partner-logo-fallback">{partner.fallbackText}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
