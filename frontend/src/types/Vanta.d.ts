declare module 'vanta/dist/vanta.*.min.js' {
  import * as THREE from 'three'; // Vanta.js often relies on Three.js

  interface VantaWavesOptions {
    el?: HTMLElement | string;
    Three?: any;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
    THREE?: typeof THREE; // Pass Three.js instance if needed
    // Add other Vanta Waves specific options here
  }

  interface VantaWavesEffect {
    destroy(): void;
    // Add other methods if available in the Vanta Waves API
  }

  function WAVES(options: VantaWavesOptions): VantaWavesEffect;
  export default WAVES;
}