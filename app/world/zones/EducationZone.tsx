'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Platform {
  name: string;
  position: THREE.Vector3;
  size: [number, number, number];
  statusColor: string;
  statusSize: number;
  isPulsing: boolean;
  year: string;
}

export function EducationZone() {
  const spineRef = useRef<THREE.Mesh>(null);
  const travelingLightRef = useRef<THREE.Mesh>(null);
  const giaicCrystalRef = useRef<THREE.Mesh>(null);
  const elapsedTime = useRef(0);

  const platforms = useMemo<Platform[]>(() => {
    return [
      {
        name: 'MATRIC',
        position: new THREE.Vector3(0, -8, 0),
        size: [4, 0.1, 4],
        statusColor: '#10B981',
        statusSize: 0.15,
        isPulsing: false,
        year: '2022',
      },
      {
        name: 'INTERMEDIATE',
        position: new THREE.Vector3(0, -13, 0),
        size: [4.5, 0.1, 4.5],
        statusColor: '#F59E0B',
        statusSize: 0.15,
        isPulsing: true,
        year: 'Present',
      },
      {
        name: 'GIAIC',
        position: new THREE.Vector3(0, -18, 0),
        size: [7, 0.15, 7],
        statusColor: '#3B82F6',
        statusSize: 0.25,
        isPulsing: true,
        year: '2024 → 2026',
      },
    ];
  }, []);

  // Minimal falling particles - only 3 for performance
  const fallingParticles = useMemo(() => {
    const snippets = ['Python', 'AI'];
    const particles: Array<{
      text: string;
      initialY: number;
      x: number;
      z: number;
      speed: number;
    }> = [];

    for (let i = 0; i < 3; i++) {
      particles.push({
        text: snippets[Math.floor(Math.random() * snippets.length)],
        initialY: -8 + Math.random() * 10,
        x: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 8,
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    return particles;
  }, []);

  useFrame((state, delta) => {
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Pulse GIAIC crystal
    if (giaicCrystalRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.3;
      giaicCrystalRef.current.scale.setScalar(scale);
    }

    // Animate traveling light on beam
    if (travelingLightRef.current) {
      travelingLightRef.current.position.y = -8 + ((time * 2) % 10) - 10;
    }
  });

  return (
    <group position={[0, -15, 0]}>
      {/* Timeline Spine - visible */}
      <mesh ref={spineRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 20, 8]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Traveling light on spine - visible */}
      <mesh ref={travelingLightRef} position={[0, -8, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Platforms - visible */}
      {platforms.map((platform, index) => (
        <group key={`platform-${index}`} position={platform.position}>
          {/* Platform base */}
          <mesh>
            <boxGeometry args={platform.size} />
            <meshStandardMaterial
              color="#1A2333"
              emissive="#3B82F6"
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Platform border glow */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry
              args={[
                platform.size[0] + 0.1,
                platform.size[1],
                platform.size[2] + 0.1,
              ]}
            />
            <meshBasicMaterial
              color="#3B82F6"
              wireframe
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Status crystal - visible */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[platform.statusSize, 12, 12]} />
            <meshStandardMaterial
              color={platform.statusColor}
              emissive={platform.statusColor}
              emissiveIntensity={platform.isPulsing ? 1 : 0.5}
            />
          </mesh>

          {/* GIAIC special: 2 corner pillars */}
          {index === 2 && (
            <>
              {[
                [-3, 1.5, -3],
                [3, 1.5, 3],
              ].map((pos, i) => (
                <mesh key={`pillar-${i}`} position={pos as [number, number, number]}>
                  <cylinderGeometry args={[0.15, 0.15, 3, 8]} />
                  <meshStandardMaterial
                    color="#3B82F6"
                    emissive="#3B82F6"
                    emissiveIntensity={0.5}
                  />
                </mesh>
              ))}

              {/* GIAIC crystal reference */}
              <mesh ref={giaicCrystalRef} position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.3, 12, 12]} />
                <meshStandardMaterial
                  color="#3B82F6"
                  emissive="#3B82F6"
                  emissiveIntensity={1.2}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Connecting beams between platforms */}
      {platforms.slice(0, -1).map((platform, index) => {
        const nextPlatform = platforms[index + 1];
        const points = [
          new THREE.Vector3(0, platform.position.y, 0),
          new THREE.Vector3(0, nextPlatform.position.y, 0),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: '#3B82F6',
          transparent: true,
          opacity: 0.5,
        });

        return (
          <primitive
            key={`beam-${index}`}
            object={new THREE.Line(geometry, material)}
          />
        );
      })}
    </group>
  );
}
