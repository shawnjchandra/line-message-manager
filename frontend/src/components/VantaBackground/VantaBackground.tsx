import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min.js';

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      (window as any).THREE = THREE;

      vantaEffect.current = WAVES({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x23a455,        // Brighter green
        backgroundColor: 0x0a2f0a, // Darker background
        shininess: 60.0,         // More shine
        waveHeight: 25.0,        // Much taller waves
        waveSpeed: 1.5,          // Faster animation
        zoom: 0.75,              // More zoomed out
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  useEffect(() => {
  console.log('Testing WebGL...');
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  console.log('WebGL supported:', !!gl);
  console.log('vantaRef.current:', vantaRef.current);
  console.log('THREE loaded:', !!THREE);
  console.log('WAVES loaded:', !!WAVES);
  
  // ... rest of your useEffect code
}, []);

  return (
    <div
      ref={vantaRef}
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