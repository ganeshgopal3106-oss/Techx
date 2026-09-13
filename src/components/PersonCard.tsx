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
      style={{ 
        width: '100%', 
        textAlign: 'left', 
        font: 'inherit', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 'var(--space-md)',
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        transition: 'all var(--duration-fast) var(--ease-out-expo)',
        cursor: 'pointer'
      }}
    >
      <div className="person-photo-area" style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        {person.image ? (
          <img src={person.image} alt={person.name} className="person-img" style={{ transition: 'transform 0.4s var(--ease-out-expo)' }} />
        ) : (
          <div className="image-placeholder person-placeholder" style={{ borderRadius: 'var(--radius-sm)' }}>
            <span>[ Guest / Mentor ]</span>
          </div>
        )}
      </div>
      <div className="person-info" style={{ marginTop: 'var(--space-sm)', flexGrow: 1, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="badge" style={{ fontSize: '0.65rem' }}>{person.role}</span>
          <span className="person-card-arrow" aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 800 }}>→</span>
        </div>
        <h3 className="person-name" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
          {person.name}
        </h3>
        <p className="person-org" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          {person.organization}
        </p>
      </div>
    </button>
  );
};
