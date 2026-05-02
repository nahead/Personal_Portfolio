'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '../../hooks/useWorldStore';

interface ContactOrb {
  name: string;
  color: string;
  offset: number;
  speed: number;
}

export function ContactZone() {
  const leftPillarRef = useRef<THREE.Mesh>(null);
  const rightPillarRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const { currentZone } = useWorldStore();
  const elapsedTime = useRef(0);

  useFrame((state, delta) => {
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Animate portal rotation
    if (portalRef.current) {
      portalRef.current.rotation.z = time * 0.1;
    }

    // Gateway animation when entering zone
    if (currentZone === 4) {
      if (leftPillarRef.current && rightPillarRef.current) {
        const targetY = -22;
        leftPillarRef.current.position.y = THREE.MathUtils.lerp(
          leftPillarRef.current.position.y,
          targetY,
          0.05
        );
        rightPillarRef.current.position.y = THREE.MathUtils.lerp(
          rightPillarRef.current.position.y,
          targetY,
          0.05
        );
      }
    }
  });

  return (
    <group position={[0, -22, 0]}>
      {/* Gateway Arch - visible */}
      {/* Left Pillar */}
      <mesh ref={leftPillarRef} position={[-3, -30, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 10, 8]} />
        <meshStandardMaterial
          color="#1A2333"
          emissive="#3B82F6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Right Pillar */}
      <mesh ref={rightPillarRef} position={[3, -30, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 10, 8]} />
        <meshStandardMaterial
          color="#1A2333"
          emissive="#3B82F6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Top Beam */}
      <mesh position={[0, -17, 0]}>
        <boxGeometry args={[6.6, 0.4, 0.4]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Portal Effect - visible plane */}
      <mesh ref={portalRef} position={[0, -22, -0.5]}>
        <planeGeometry args={[5.5, 9]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Visible star burst - 20 stars */}
      {Array.from({ length: 20 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 5 + Math.random() * 5;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = -22 + radius * Math.sin(phi) * Math.sin(theta) * 0.5;
        const z = -10 + radius * Math.cos(phi);

        return (
          <mesh key={`star-${i}`} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial
              color="#3B82F6"
              emissive="#3B82F6"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}
