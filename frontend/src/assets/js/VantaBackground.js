import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.destroy();
    }

    if (myRef.current) {
      const effect = WAVES({
        el: myRef.current, 
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x2d6626,
        shininess: 38.0,
        waveHeight: 12.5,
        waveSpeed: 0.9,
        zoom: 0.93,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []); 

  return (
    <div
      ref={myRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, 
      }}
    />
  );
};

export default VantaBackground;