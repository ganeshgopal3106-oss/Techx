import React from 'react';
import { eventData } from '../data/event';

export const RegistrationCTA: React.FC = () => {
  return (
    <section id="join" className="registration-section section-padding">
      <div className="container registration-container">
        <div className="registration-header">
          <p className="registration-num">06 / REGISTRATION</p>
          <h2 className="registration-title">Ready to Join?</h2>
          <p className="registration-subtitle">Register for {eventData.title} and secure your ticket today.</p>
        </div>

        {/* Ticket Tiers Grid */}
        <div className="ticket-grid">
          {/* Card 1 */}
          <div className="card ticket-card">
            <div className="ticket-badge">IEEE CS Member</div>
            <div className="ticket-price">₹200</div>
            <p className="ticket-description">For registered members of the IEEE Computer Society SCT Student Branch Chapter.</p>
            <div className="ticket-id">#CS-2026-001</div>
          </div>
          
          {/* Card 2 */}
          <div className="card ticket-card">
            <div className="ticket-badge">IEEE Member (Non-CS)</div>
            <div className="ticket-price">₹300</div>
            <p className="ticket-description">For registered members of other societies under the IEEE SCT Student Branch Chapter.</p>
            <div className="ticket-id">#IEEE-2026-002</div>
          </div>

          {/* Card 3 */}
          <div className="card ticket-card">
            <div className="ticket-badge">Non-IEEE Member</div>
            <div className="ticket-price">₹400</div>
            <p className="ticket-description">General admission open for all external engineering students, developers, and designers.</p>
            <div className="ticket-id">#GEN-2026-003</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="registration-action-area">
          <a href="/register" className="btn btn-primary btn-large">
            Claim Your Spot
          </a>
        </div>
      </div>
    </section>
  );
};
