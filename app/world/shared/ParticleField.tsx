'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '../../hooks/useWorldStore';

interface ParticleData {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  offset: number;
}

export function ParticleField() {
  const { deviceTier } = useWorldStore();
  const count = deviceTier.maxParticles;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo<ParticleData[]>(() => {
    const pos: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 50,
        scale: Math.random() * 0.08 + 0.02,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return pos;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;

    // Set static positions once - no animation for 120 FPS
    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  // No useFrame animation - static particles for maximum performance

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 3, 3]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
    </instancedMesh>
  );
}
