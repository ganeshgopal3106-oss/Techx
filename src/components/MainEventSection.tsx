import React, { useState } from 'react';
import { daysScheduleData } from '../data/schedule';
import type { ScheduleDay, ScheduleItem, ScheduleSession } from '../data/schedule';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const MainEventSection: React.FC = () => {
  const [activeDayId, setActiveDayId] = useState<'day-1' | 'day-2' | 'day-3'>('day-1');
  const [sessionFilter, setSessionFilter] = useState<'ALL' | 'WORKSHOP' | 'KEYNOTE' | 'OTHER'>('ALL');

  const currentDay: ScheduleDay = daysScheduleData.find(d => d.id === activeDayId) || daysScheduleData[0];

  const isParallelGroup = (item: ScheduleItem): item is { id: string; time: string; isParallel: true; category?: string; sessions: ScheduleSession[] } => {
    return 'isParallel' in item && item.isParallel === true;
  };

  const filteredItems = currentDay.items.filter(item => {
    if (sessionFilter === 'ALL') return true;
    if (sessionFilter === 'WORKSHOP') {
      if (isParallelGroup(item)) {
        return item.sessions.some(s => s.category?.toLowerCase().includes('workshop') || s.title.toLowerCase().includes('workshop'));
      }
      return item.category?.toLowerCase().includes('workshop') || item.title.toLowerCase().includes('workshop');
    }
    if (sessionFilter === 'KEYNOTE') {
      if (isParallelGroup(item)) {
        return item.sessions.some(s => s.category?.toLowerCase().includes('talk') || s.title.toLowerCase().includes('keynote') || s.title.toLowerCase().includes('talk'));
      }
      return item.category?.toLowerCase().includes('talk') || item.title.toLowerCase().includes('keynote') || item.title.toLowerCase().includes('talk') || item.title.toLowerCase().includes('panel');
    }
    return true;
  });

  return (
    <section id="schedule" className="main-event-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="06 / EVENT ITINERARY" title="Summit & Pre-Event Schedule" />

        {/* Day Selector Tabs (DAY 1, DAY 2, DAY 3) */}
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

        {/* 21st.dev Session Filter Chips */}
        <ScrollReveal>
          <div className="filter-pills-bar" style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <button
              className={`filter-pill ${sessionFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setSessionFilter('ALL')}
            >
              ALL SESSIONS
            </button>
            <button
              className={`filter-pill ${sessionFilter === 'WORKSHOP' ? 'active' : ''}`}
              onClick={() => setSessionFilter('WORKSHOP')}
            >
              🛠 WORKSHOPS & LABS
            </button>
            <button
              className={`filter-pill ${sessionFilter === 'KEYNOTE' ? 'active' : ''}`}
              onClick={() => setSessionFilter('KEYNOTE')}
            >
              🎤 KEYNOTES & TALKS
            </button>
          </div>
        </ScrollReveal>

        {/* Active Day Header Meta Banner */}
        <ScrollReveal className="schedule-day-header-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span className="blueprint-tag">[ TIMELINE // {currentDay.dayNumber} ]</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '4px' }}>
                {currentDay.date} — {currentDay.subtitle}
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>
              SCTCE CAMPUS & VIRTUAL
            </span>
          </div>
        </ScrollReveal>

        {/* Day Itinerary Table with Staggered Cascading Items and Aligned Venue Column */}
        <div id={`schedule-pane-${currentDay.id}`} role="tabpanel" className="schedule-itinerary-container">
          <div key={currentDay.id} className="schedule-rows-stack tab-animated-item">
            {filteredItems.map((item) => {
              if (isParallelGroup(item)) {
                return (
                  /* Parallel Circuit Branch with Aligned Parallel Cards */
                  <div key={item.id} className="schedule-parallel-group">
                    <div className="schedule-parallel-header">
                      <div className="schedule-row-time" style={{ color: 'var(--accent)' }}>{item.time}</div>
                      <span className="blueprint-tag">[ SCHEMATIC // PARALLEL TRACKS ]</span>
                    </div>

                    <div className="schedule-parallel-grid">
                      {item.sessions.map((sess, idx) => (
                        <div key={sess.id} className="schedule-parallel-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                            <span className="blueprint-tag">BRANCH 0{idx + 1} // {sess.category || 'TRACK'}</span>
                            {sess.venue && (
                              <div className="schedule-location-aligned">
                                <span className="schedule-location-label">VENUE:</span>
                                <span className="schedule-location-value">{sess.venue}</span>
                              </div>
                            )}
                          </div>
                          <h4 className="schedule-session-title" style={{ fontSize: '1.15rem' }}>{sess.title}</h4>
                          <p className="schedule-session-desc">{sess.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              const isBreak = item.isBreak;

              return (
                /* Standard Aligned Schedule Row (Desktop: Time | Session Details | Location Column) */
                <div 
                  key={item.id} 
                  className={`schedule-row-item ${isBreak ? 'is-break-row' : ''}`}
                >
                  {/* Column 1: Monospace Aligned Time */}
                  <div className="schedule-row-time">
                    {item.time}
                  </div>

                  {/* Column 2: Session Content & Description */}
                  <div className="schedule-row-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      {item.category && <span className="blueprint-tag">{item.category}</span>}
                      {item.organizer && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>
                          {item.organizer}
                        </span>
                      )}
                    </div>
                    <h4 className="schedule-session-title">{item.title}</h4>
                    {item.description && <p className="schedule-session-desc">{item.description}</p>}
                    
                    {/* Mobile Only Location Meta */}
                    {item.venue && (
                      <div className="schedule-location-mobile">
                        <span className="schedule-location-label">VENUE:</span>
                        <span className="schedule-location-value">{item.venue}</span>
                      </div>
                    )}
                  </div>

                  {/* Column 3: Desktop Aligned Location Column (No AI pill badge look!) */}
                  <div className="schedule-row-location-col">
                    {item.venue ? (
                      <div className="schedule-location-aligned">
                        <span className="schedule-location-label">LOCATION // VENUE</span>
                        <span className="schedule-location-value">{item.venue}</span>
                      </div>
                    ) : (
                      <span className="schedule-location-empty">—</span>
                    )}
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

