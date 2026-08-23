import React from 'react';
import { scheduleData } from '../data/schedule';
import { TimelineSubItem } from './TimelineItem';
import { SectionHeader } from './SectionHeader';

export const Timeline: React.FC = () => {
  return (
    <section id="schedule" className="schedule-section section-padding">
      <div className="container schedule-container">
        <div className="schedule-sidebar">
          <SectionHeader num="02 / SCHEDULE" title="Event Timeline" />
          <p className="schedule-intro">
            An intensive 7-day hybrid sprint featuring online webinars, hands-on building, competitive speed trials, and career acceleration.
          </p>
          <div className="schedule-legend">
            <span className="legend-item"><span className="indicator online"></span>Online Days 1-4</span>
            <span className="legend-item"><span className="indicator offline"></span>Offline Days 5-7</span>
          </div>
        </div>

        <div className="timeline-flow">
          {scheduleData.map((day, idx) => (
            <div key={idx} className="timeline-day-block">
              <div className="timeline-day-header">
                <div className="timeline-day-number">{day.day}</div>
                <div className="timeline-day-date">{day.date}</div>
                <span className={`timeline-day-badge ${day.isOffline ? 'badge-offline' : 'badge-online'}`}>
                  {day.isOffline ? 'OFFLINE' : 'ONLINE'}
                </span>
              </div>
              
              <div className="timeline-day-body">
                <div className="timeline-day-time">{day.timeRange}</div>
                <h3 className="timeline-day-title">{day.title}</h3>
                {day.description && <p className="timeline-day-desc">{day.description}</p>}
                
                {day.subEvents && day.subEvents.length > 0 && (
                  <div className="timeline-sub-events-list">
                    {day.subEvents.map((sub, sIdx) => (
                      <TimelineSubItem key={sIdx} subEvent={sub} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
