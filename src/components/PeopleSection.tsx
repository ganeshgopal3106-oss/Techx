import React from 'react';
import { peopleConfig } from '../data/people';
import { PersonCard } from './PersonCard';
import { SectionHeader } from './SectionHeader';

export const PeopleSection: React.FC = () => {
  // Gracefully hide the entire section if disabled in config
  if (!peopleConfig.isEnabled) {
    return null;
  }

  return (
    <section id="people" className="people-section section-padding">
      <div className="container">
        <SectionHeader num={`${peopleConfig.sectionNum} / PEOPLE`} title={peopleConfig.title} />
        
        <div className="people-grid">
          {peopleConfig.people.map((person, idx) => (
            <PersonCard key={idx} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
};
