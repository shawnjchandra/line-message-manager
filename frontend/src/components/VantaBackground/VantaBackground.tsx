import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min.js';
import BIRDS from 'vanta/dist/vanta.birds.min.js';
import TOPOLOGY from 'vanta/dist/vanta.topology.min.js';

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      (window as any).THREE = THREE;

      vantaEffect.current = BIRDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x2c8e18,
        backgroundColor: 0xffffff
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