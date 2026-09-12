import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "moment-1",
    title: "Hands-on Technical Workshops",
    subtitle: "Students collaborating on system builds and microservices inside SCTCE labs",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "moment-2",
    title: "1-on-1 Nano Mentoring Pods",
    subtitle: "Direct career counsel and resume feedback with distinguished industry alumni",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "moment-3",
    title: "Interdisciplinary Keynotes",
    subtitle: "Expert sessions on ADAS sensor fusion and Healthcare AI diagnostics",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "moment-4",
    title: "Capstone Hackathon Evaluations",
    subtitle: "Teams pitching prototypes and sprint code in front of the jury panel",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "moment-5",
    title: "IEEE CS SCT SBC Community",
    subtitle: "Closing celebrations, cultural showcases, and certificate award ceremonies",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80"
  }
];

export const GallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <section id="gallery" className="gallery-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="08 / EVENT MOMENTS" title="Chapter Life & Experience Gallery" />

        <ScrollReveal>
          {/* Main Carousel Wrapper */}
          <div className="gallery-carousel-wrapper">
            <div className="gallery-slide">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="gallery-slide-img"
                loading="lazy"
              />
              
              {/* Overlay Caption Bar */}
              <div className="gallery-caption-bar">
                <div>
                  <span className="blueprint-tag">[ MOMENT {currentIndex + 1} // {galleryItems.length} ]</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px', color: '#FFFCF1' }}>
                    {currentItem.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#E8DFD0', marginTop: '4px' }}>
                    {currentItem.subtitle}
                  </p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                  IEEE CS SCT SBC
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="gallery-btn-prev"
              onClick={prevSlide}
              aria-label="Previous event moment"
            >
              ❮
            </button>
            <button
              className="gallery-btn-next"
              onClick={nextSlide}
              aria-label="Next event moment"
            >
              ❯
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="gallery-dots">
            {galleryItems.map((item, idx) => (
              <button
                key={item.id}
                className={`gallery-dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
