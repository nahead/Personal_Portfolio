'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useWorldStore } from '../hooks/useWorldStore';
import { AmbientLighting } from './shared/AmbientLighting';
import { ParticleField } from './shared/ParticleField';
import { CameraRig } from './CameraRig';
import { HeroZone } from './zones/HeroZone';
import { AboutZone } from './zones/AboutZone';
import { SkillsZone } from './zones/SkillsZone';
import { EducationZone } from './zones/EducationZone';
import { ContactZone } from './zones/ContactZone';

function ConditionalZones() {
  const { currentZone } = useWorldStore();

  return (
    <>
      {/* Only render current zone and adjacent zones for smooth transitions */}
      {(currentZone === 0 || currentZone === 1) && <HeroZone />}
      {(currentZone === 1 || currentZone === 2) && <AboutZone />}
      {(currentZone === 2 || currentZone === 3) && <SkillsZone />}
      {(currentZone === 3 || currentZone === 4) && <EducationZone />}
      {currentZone === 4 && <ContactZone />}
    </>
  );
}

export function WorldCanvas() {
  const { deviceTier } = useWorldStore();

  return (
    <Canvas
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      camera={{ position: [0, 0, 20], fov: 75, near: 0.1, far: 200 }}
      dpr={[0.5, 1]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        failIfMajorPerformanceCaveat: false,
      }}
      shadows={false}
      frameloop="always"
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={['#0B1120']} />

      {/* Reduced fog - was making scene too dark */}
      <fog attach="fog" args={['#0B1120', 30, 150]} />

      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Global elements */}
        <AmbientLighting />

        {/* Single particle layer - removed extra layers causing GPU crash */}
        <ParticleField />

        {/* Camera with parallax and shake */}
        <CameraRig />

        {/* Render ALL zones - no conditional logic */}
        <HeroZone />
        <AboutZone />
        <SkillsZone />
        <EducationZone />
        <ContactZone />

        {/* REMOVED: Bloom effect - was causing WebGL Context Lost */}

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
