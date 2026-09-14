import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className="contact-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="10 / CONTACT & VENUE" title="Get In Touch & Visit SCTCE" />

        <ScrollReveal>
          <div className="contact-section-grid">
            {/* Left Column: Campus Venue & Organizer Coordinates */}
            <div className="venue-card">
              <div>
                <span className="blueprint-tag">[ LOCATION // CAMPUS ]</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', margin: '4px 0 12px', color: 'var(--text-primary)' }}>
                  SCT College of Engineering
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  NH 66, CTO Colony, Pappanamcode, Thiruvananthapuram, Kerala 695018
                </p>
              </div>

              {/* Google Map Embed of SCTCE */}
              <iframe
                title="SCTCE Campus Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.1118851564481!2d76.97857658187175!3d8.470231553187036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05baee56e6b99b%3A0x4ce024c88eb0ddcb!2sSree%20Chitra%20Thirunal%20College%20of%20Engineering%2C%20Thiruvananthapuram!5e0!3m2!1sen!2sin!4v1711636446051!5m2!1sen!2sin"
                className="venue-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Official Branch Contact Info */}
              <div className="contact-info-block">
                <div className="contact-info-row">
                  <span className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>OFFICIAL EMAIL</div>
                    <a href="mailto:mailtoieeesctsb@gmail.com" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem' }}>
                      mailtoieeesctsb@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-row">
                  <span className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>STUDENT BRANCH CHAPTER</div>
                    <a href="https://ieeesctsb.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem' }}>
                      ieeesctsb.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Query Form */}
            <div className="card" style={{ padding: 'var(--space-xl)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <span className="blueprint-tag">[ TRANSMISSION // INQUIRY ]</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', margin: '4px 0 16px', color: 'var(--text-primary)' }}>
                Send A Message
              </h3>

              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase' }}>Message Received</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
                    Thank you, <strong>{formData.name}</strong>. Our organizing team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ marginTop: '16px', height: '36px', padding: '0 16px', fontSize: '0.8rem' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactName">Your Name *</label>
                    <input
                      id="contactName"
                      type="text"
                      className="form-input"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactEmail">Email Address *</label>
                    <input
                      id="contactEmail"
                      type="email"
                      className="form-input"
                      placeholder="jane.doe@university.edu"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactSubject">Subject</label>
                    <input
                      id="contactSubject"
                      type="text"
                      className="form-input"
                      placeholder="Track inquiry / Workshop details"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactMessage">Message *</label>
                    <textarea
                      id="contactMessage"
                      className="form-input"
                      rows={4}
                      placeholder="How can our organizing team assist you?"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ height: '44px', fontWeight: 700 }}>
                    Transmit Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
