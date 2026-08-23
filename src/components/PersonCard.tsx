import React from 'react';
import type { Person } from '../data/people';

interface PersonCardProps {
  person: Person;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="card person-card">
      <div className="person-photo-area">
        {person.image ? (
          <img src={person.image} alt={person.name} className="person-img" />
        ) : (
          <div className="image-placeholder person-placeholder">
            <span>[ Photo ]</span>
          </div>
        )}
      </div>
      <div className="person-info">
        <h3 className="person-name">{person.name}</h3>
        <p className="person-role">{person.role}</p>
        <p className="person-org">{person.organization}</p>
      </div>
    </div>
  );
};
