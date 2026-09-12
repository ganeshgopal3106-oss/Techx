import React from 'react';
import { partnersData } from '../data/partners';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const PartnerGrid: React.FC = () => {
  return (
    <section className="partners-section section-padding">
      <div className="container">
        <SectionHeader num="04 / PARTNERS" title="In Collaboration With" />
        
        <ScrollReveal className="partners-grid" variant="stagger" staggerDelay={50}>
          {partnersData.map((partner, idx) => {
            const hasLink = !!partner.websiteUrl;
            
            if (hasLink) {
              return (
                <a 
                  key={idx}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-logo-box" 
                  title={partner.name}
                  aria-label={`Visit official website of ${partner.name}`}
                >
                  {partner.logoUrl ? (
                    <img src={partner.logoUrl} alt={partner.name} className="partner-logo-img" />
                  ) : (
                    <span className="partner-logo-fallback">{partner.fallbackText}</span>
                  )}
                </a>
              );
            }
            
            return (
              <div 
                key={idx} 
                className="partner-logo-box" 
                title={partner.name}
              >
                {partner.logoUrl ? (
                  <img src={partner.logoUrl} alt={partner.name} className="partner-logo-img" />
                ) : (
                  <span className="partner-logo-fallback">{partner.fallbackText}</span>
                )}
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
};
