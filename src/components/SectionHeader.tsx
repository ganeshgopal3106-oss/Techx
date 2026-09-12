import React from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderProps {
  num: string;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ num, title }) => {
  return (
    <ScrollReveal>
      <div className="section-header">
        <div className="section-header-num">{num}</div>
        <div className="masked-text-wrapper">
          <h2 className="section-header-title masked-text-inner">{title}</h2>
        </div>
      </div>
    </ScrollReveal>
  );
};
