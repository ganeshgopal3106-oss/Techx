import React from 'react';
import { eventData } from '../data/event';

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="event-info-item">
      <div className="event-info-label">{label}</div>
      <div className="event-info-value">{value}</div>
    </div>
  );
};

export const EventInfo: React.FC = () => {
  return (
    <section className="event-info-section">
      <div className="container event-info-grid">
        <InfoItem label="DATE" value={eventData.dateRange} />
        <InfoItem label="LOCATION" value={eventData.locationShort} />
        <InfoItem label="FORMAT" value={eventData.format} />
        <InfoItem label="ORGANIZED BY" value={eventData.organizedBy} />
      </div>
    </section>
  );
};
