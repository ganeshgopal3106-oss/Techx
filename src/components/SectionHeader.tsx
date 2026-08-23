import React from 'react';

interface SectionHeaderProps {
  num: string;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ num, title }) => {
  return (
    <div className="section-header">
      <div className="section-header-num">{num}</div>
      <h2 className="section-header-title">{title}</h2>
    </div>
  );
};
