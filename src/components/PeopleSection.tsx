import React, { useState, useEffect } from 'react';
import { peopleConfig } from '../data/people';
import type { Person } from '../data/people';
import { PersonCard } from './PersonCard';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const PeopleSection: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPerson(null);
      }
    };

    if (selectedPerson) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPerson]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedPerson(null);
    }
  };

  if (!peopleConfig.isEnabled) {
    return null;
  }

  return (
    <section id="people" className="people-section section-padding">
      <div className="container">
        <SectionHeader num={`${peopleConfig.sectionNum} / PEOPLE`} title={peopleConfig.title} />
        
        <ScrollReveal className="people-grid">
          {peopleConfig.people.map((person, idx) => (
            <PersonCard 
              key={idx} 
              person={person} 
              onClick={() => setSelectedPerson(person)}
            />
          ))}
        </ScrollReveal>
      </div>

      {/* Speaker Details Modal */}
      {selectedPerson && (
        <div 
          className="speaker-modal-overlay" 
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="speaker-modal-card">
            <div className="speaker-modal-header">
              <span className="speaker-modal-role">{selectedPerson.role}</span>
              <button 
                className="speaker-modal-close-btn" 
                onClick={() => setSelectedPerson(null)}
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="speaker-modal-body">
              <h3 id="modal-title" className="speaker-modal-name">{selectedPerson.name}</h3>
              <p className="speaker-modal-org">{selectedPerson.organization}</p>
              
              <div className="speaker-modal-divider" />
              
              <p className="speaker-modal-about-title">BIOGRAPHY</p>
              <p className="speaker-modal-about">{selectedPerson.about}</p>
              
              <div style={{ marginTop: 'var(--space-md)', display: 'flex', justifyContent: 'flex-end' }}>
                <a 
                  href="/register" 
                  className="btn btn-primary" 
                  style={{ height: '36px', padding: '0 16px', fontSize: '0.75rem' }}
                >
                  Register Pass
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
