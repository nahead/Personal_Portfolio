'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkillMonument {
  name: string;
  position: THREE.Vector3;
  geometry: THREE.BufferGeometry;
  color: string;
  metalness: number;
  roughness: number;
}

export function SkillsZone() {
  const energyFieldRef = useRef<THREE.Mesh>(null);
  const monumentRefs = useRef<Array<THREE.Mesh | null>>([]);
  const elapsedTime = useRef(0);

  // Ultra-minimal skill monuments - only 2 for 120 FPS
  const monuments = useMemo<SkillMonument[]>(() => {
    const radius = 5;

    return [
      {
        name: 'Python',
        position: new THREE.Vector3(15 + radius, 0, 0),
        geometry: new THREE.BoxGeometry(1, 1, 1),
        color: '#3B82F6',
        metalness: 0.8,
        roughness: 0.2,
      },
      {
        name: 'AI',
        position: new THREE.Vector3(15 - radius, 0, 0),
        geometry: new THREE.BoxGeometry(1, 1, 1),
        color: '#10B981',
        metalness: 0.7,
        roughness: 0.3,
      },
    ];
  }, []);

  // Connection lines from center to each monument
  const connectionLines = useMemo(() => {
    const center = new THREE.Vector3(15, 0, 0);
    return monuments.map((monument) => {
      const points = [center, monument.position];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [monuments]);

  useFrame((state, delta) => {
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Rotate energy field
    if (energyFieldRef.current) {
      energyFieldRef.current.rotation.y += 0.002;
      energyFieldRef.current.rotation.x += 0.001;
    }

    // Rotate each monument
    monumentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.rotation.x += 0.01;
        ref.rotation.y += 0.01;

        // Pulse scale
        const scale = 1 + Math.sin(time * 2 + index) * 0.1;
        ref.scale.setScalar(scale);
      }
    });
  });

  return (
    <group position={[15, 0, 0]}>
      {/* Skill Monuments - visible with glow */}
      {monuments.map((monument, index) => (
        <mesh
          key={`monument-${index}`}
          ref={(el) => {
            monumentRefs.current[index] = el;
          }}
          position={monument.position}
          geometry={monument.geometry}
        >
          <meshStandardMaterial
            color={monument.color}
            emissive={monument.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Connection Lines */}
      {connectionLines.map((geometry, index) => {
        const material = new THREE.LineBasicMaterial({
          color: '#3B82F6',
          transparent: true,
          opacity: 0.5,
        });

        return (
          <primitive
            key={`connection-${index}`}
            object={new THREE.Line(geometry, material)}
          />
        );
      })}
    </group>
  );
}
