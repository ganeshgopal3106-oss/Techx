import React from 'react';
import type { Person } from '../data/people';

interface PersonCardProps {
  person: Person;
  onClick: () => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onClick }) => {
  return (
    <button 
      className="card person-card" 
      onClick={onClick}
      aria-haspopup="dialog"
      style={{ width: '100%', textAlign: 'left', font: 'inherit', display: 'flex', flexDirection: 'column', padding: 'var(--space-md)' }}
    >
      <div className="person-photo-area">
        {person.image ? (
          <img src={person.image} alt={person.name} className="person-img" />
        ) : (
          <div className="image-placeholder person-placeholder">
            <span>[ Photo ]</span>
          </div>
        )}
      </div>
      <div className="person-info" style={{ marginTop: 'var(--space-sm)', flexGrow: 1, width: '100%' }}>
        <h3 className="person-name">{person.name}</h3>
        <p className="person-role">{person.role}</p>
        <p className="person-org">{person.organization}</p>
        <span className="person-card-arrow" aria-hidden="true">→</span>
      </div>
    </button>
  );
};
