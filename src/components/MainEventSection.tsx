import React, { useState } from 'react';
import { daysScheduleData } from '../data/schedule';
import type { ScheduleDay, ScheduleItem, ScheduleSession } from '../data/schedule';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const MainEventSection: React.FC = () => {
  const [activeDayId, setActiveDayId] = useState<'day-1' | 'day-2'>('day-1');

  const currentDay: ScheduleDay = daysScheduleData.find(d => d.id === activeDayId) || daysScheduleData[0];

  const isParallelGroup = (item: ScheduleItem): item is { id: string; time: string; isParallel: true; category?: string; sessions: ScheduleSession[] } => {
    return 'isParallel' in item && item.isParallel === true;
  };

  return (
    <section id="schedule" className="main-event-section section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="05 / SCHEDULE" title="Summit Schedule" />

        {/* Day Selector Tabs (DAY 1, DAY 2) */}
        <ScrollReveal>
          <div className="schedule-day-selector" role="tablist" aria-label="Event Days">
            {daysScheduleData.map((day) => {
              const isActive = activeDayId === day.id;
              return (
                <button
                  key={day.id}
                  className={`schedule-day-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveDayId(day.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`schedule-pane-${day.id}`}
                >
                  <div className="schedule-tab-top">
                    <span className="schedule-day-badge">{day.dayNumber}</span>
                    <span className="schedule-tab-date">{day.date}</span>
                  </div>
                  <div className="schedule-tab-sub">{day.subtitle}</div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Day Header Meta Banner */}
        <ScrollReveal className="schedule-day-header-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span className="blueprint-tag">{currentDay.dayNumber}</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '4px' }}>
                {currentDay.date}
              </h3>
            </div>
          </div>
        </ScrollReveal>

        {/* Day Itinerary Table with Ultra-Scannable Rows */}
        <div id={`schedule-pane-${currentDay.id}`} role="tabpanel" className="schedule-itinerary-container">
          <div key={currentDay.id} className="schedule-rows-stack tab-animated-item">
            {currentDay.items.map((item) => {
              if (isParallelGroup(item)) {
                return (
                  /* Parallel Tracks Row */
                  <div key={item.id} className="schedule-parallel-group">
                    <div className="schedule-parallel-header">
                      <div className="schedule-row-time" style={{ color: 'var(--accent)' }}>{item.time}</div>
                      <span className="badge">PARALLEL SESSIONS</span>
                    </div>

                    <div className="schedule-parallel-grid">
                      {item.sessions.map((sess, idx) => (
                        <div key={sess.id} className="schedule-parallel-card" style={{ padding: '16px 20px' }}>
                          <span className="blueprint-tag">TRACK 0{idx + 1}</span>
                          <h4 className="schedule-session-title" style={{ fontSize: '1.05rem', margin: '4px 0 0' }}>{sess.title}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              const isBreak = item.isBreak;

              return (
                /* Ultra-scannable TIME — EVENT Row */
                <div 
                  key={item.id} 
                  className={`schedule-row-item ${isBreak ? 'is-break-row' : ''}`}
                  style={{ padding: '16px 20px', alignItems: 'center' }}
                >
                  <div className="schedule-row-time" style={{ minWidth: '180px' }}>
                    {item.time}
                  </div>

                  <div className="schedule-row-content" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <h4 className="schedule-session-title" style={{ margin: 0, fontSize: '1.05rem' }}>{item.title}</h4>
                    {isBreak && <span className="badge">BREAK</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

