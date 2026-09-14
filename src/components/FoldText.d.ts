import React from 'react';

export interface FoldTextProps {
  text?: string;
  splitBy?: 'line' | 'word' | 'char';
  hinge?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  stagger?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  trigger?: 'mount' | 'hover' | 'scroll' | 'loop';
  delay?: number;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare const FoldText: React.FC<FoldTextProps>;
export default FoldText;
