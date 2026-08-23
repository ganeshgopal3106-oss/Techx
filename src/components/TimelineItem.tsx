import React from 'react';
import type { SubEvent } from '../data/schedule';

interface TimelineSubItemProps {
  subEvent: SubEvent;
}

export const TimelineSubItem: React.FC<TimelineSubItemProps> = ({ subEvent }) => {
  return (
    <div className="timeline-sub-event">
      <div className="timeline-sub-time">{subEvent.time}</div>
      <div className="timeline-sub-content">
        <h4 className="timeline-sub-title">{subEvent.title}</h4>
        {subEvent.description && <p className="timeline-sub-description">{subEvent.description}</p>}
      </div>
    </div>
  );
};
