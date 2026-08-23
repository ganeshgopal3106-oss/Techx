import React, { useState } from 'react';
import { faqData } from '../data/faq';
import { SectionHeader } from './SectionHeader';

interface FAQAccordionProps {
  allowMultipleOpen?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ allowMultipleOpen = false }) => {
  // If multiple open is allowed, store open item IDs in an array. Otherwise store a single string/null.
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [singleOpenId, setSingleOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    if (allowMultipleOpen) {
      if (openIds.includes(id)) {
        setOpenIds(openIds.filter(item => item !== id));
      } else {
        setOpenIds([...openIds, id]);
      }
    } else {
      setSingleOpenId(singleOpenId === id ? null : id);
    }
  };

  const isItemOpen = (id: string) => {
    return allowMultipleOpen ? openIds.includes(id) : singleOpenId === id;
  };

  return (
    <section id="faq" className="faq-section section-padding">
      <div className="container faq-container">
        <div className="faq-sidebar">
          <SectionHeader num="05 / FAQ" title="Frequently Asked Questions" />
          <p className="faq-intro">
            Find answers to common questions about schedules, team configurations, venues, and registration criteria.
          </p>
          <div className="faq-support-box">
            <span className="support-label">Need direct support?</span>
            <a href="mailto:mailtoieeesctsb@gmail.com" className="support-email">mailtoieeesctsb@gmail.com</a>
          </div>
        </div>

        <div className="faq-list">
          {faqData.map((item) => {
            const isOpen = isItemOpen(item.id);
            return (
              <div 
                key={item.id} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button 
                  className="faq-trigger" 
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-icon-wrapper">
                    <span className="faq-icon-line horizontal"></span>
                    <span className="faq-icon-line vertical"></span>
                  </span>
                </button>
                <div className="faq-content">
                  <div className="faq-content-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
