import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  staggerDelay?: number;
  style?: React.CSSProperties;
  variant?: 'fade-up' | 'clip-reveal' | 'scale-subtle' | 'stagger';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  delayMs = 0,
  staggerDelay,
  style,
  variant = 'fade-up'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Respect user's system preferences for reduced motion
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setIsVisible(true), delayMs);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delayMs, isVisible]);

  const variantClass = 
    variant === 'clip-reveal' ? 'clip-reveal' :
    variant === 'scale-subtle' ? 'scale-subtle' :
    variant === 'stagger' ? 'stagger-items' : 'fade-up';

  const mergedStyle: React.CSSProperties = {
    ...(staggerDelay ? ({ '--stagger-delay': `${staggerDelay}ms` } as React.CSSProperties) : {}),
    ...style
  };

  return (
    <div
      ref={ref}
      style={mergedStyle}
      className={`scroll-reveal ${variantClass} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
