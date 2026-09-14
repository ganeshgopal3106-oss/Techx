import React from 'react';
import GradientWaves from './GradientWaves';

export const GlobalBackground = () => {
  return (
    <div
      className="global-background-layer"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#FFFCF1',
      }}
      aria-hidden="true"
    >
      <GradientWaves
        horizonColor="#FFFCF1"
        waveColor="#CF8326"
        crestColor="#CF8326"
        speed={0.28}
        amplitude={2}
        waveScale={0.6}
        waveRatio={0.9}
        swell={28}
        turbulence={14}
        tilt={1.11}
        zoom={1}
        height={5.5}
        fogDepth={18}
        detail="medium"
        brightness={0.85}
        opacity={0.30}
        mouseInteraction={true}
        parallaxStrength={0.25}
        grain={false}
      />
    </div>
  );
};

export default GlobalBackground;
