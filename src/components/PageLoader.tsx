import React, { useEffect, useState } from 'react';

interface PageLoaderProps {
  isLoading: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`page-loader-overlay ${!isLoading ? 'fade-out' : ''}`}
      aria-hidden={!isLoading}
    >
      <div className="page-loader-content">
        <div className="page-loader-logo-wrap">
          <img 
            src="/logo.png" 
            alt="TechX Reignite" 
            className="page-loader-logo-img"
          />
        </div>

        <div className="page-loader-progress-track">
          <div className="page-loader-progress-bar" />
        </div>

        <div className="page-loader-meta">
          <span className="blueprint-tag">[ SYS // INITIALIZING ]</span>
          <span className="page-loader-brand">IEEE CS SCT SBC • TECHX 2026</span>
        </div>
      </div>
    </div>
  );
};
