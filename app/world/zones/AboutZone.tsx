'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MemoryCard {
  text: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  floatSpeed: number;
  floatIntensity: number;
}

export function AboutZone() {
  const mapRef = useRef<THREE.Mesh>(null);
  const timelineRef = useRef<THREE.Mesh>(null);
  const karachiDotRef = useRef<THREE.Mesh>(null);
  const elapsedTime = useRef(0);

  // Pakistan map outline (simplified coordinates)
  const pakistanShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1, 0.5);
    shape.lineTo(1.5, 1.5);
    shape.lineTo(2, 2.5);
    shape.lineTo(1.8, 3.5);
    shape.lineTo(1.2, 4);
    shape.lineTo(0.5, 4.2);
    shape.lineTo(-0.3, 4);
    shape.lineTo(-0.8, 3.2);
    shape.lineTo(-0.5, 2);
    shape.lineTo(-0.2, 1);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Memory cards data
  const memoryCards = useMemo<MemoryCard[]>(() => {
    return [
      {
        text: 'Age: 18',
        position: new THREE.Vector3(-12, 2, 2),
        rotation: new THREE.Euler(0, Math.PI / 6, 0),
        floatSpeed: 1.2,
        floatIntensity: 0.3,
      },
      {
        text: 'From: M9 Motorway, Karachi',
        position: new THREE.Vector3(-18, 1, -1),
        rotation: new THREE.Euler(0, -Math.PI / 8, 0),
        floatSpeed: 1.5,
        floatIntensity: 0.4,
      },
      {
        text: 'Joined GIAIC: 2024',
        position: new THREE.Vector3(-13, -1, 3),
        rotation: new THREE.Euler(0, Math.PI / 4, 0),
        floatSpeed: 1.1,
        floatIntensity: 0.35,
      },
      {
        text: 'Completed: March 2026',
        position: new THREE.Vector3(-17, -2, 0),
        rotation: new THREE.Euler(0, -Math.PI / 5, 0),
        floatSpeed: 1.3,
        floatIntensity: 0.38,
      },
      {
        text: 'Status: Building',
        position: new THREE.Vector3(-14, 3, -2),
        rotation: new THREE.Euler(0, Math.PI / 7, 0),
        floatSpeed: 1.4,
        floatIntensity: 0.32,
      },
    ];
  }, []);

  // Minimal code particles - only 5 for performance
  const codeSnippets = useMemo(() => {
    const snippets = ['Python', 'AI', 'Next.js'];
    const particles: Array<{ text: string; position: THREE.Vector3; speed: number }> = [];

    for (let i = 0; i < 5; i++) {
      particles.push({
        text: snippets[Math.floor(Math.random() * snippets.length)],
        position: new THREE.Vector3(
          -15 + (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        speed: 0.1 + Math.random() * 0.2,
      });
    }

    return particles;
  }, []);

  useFrame((state, delta) => {
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Pulse Karachi dot
    if (karachiDotRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.2;
      karachiDotRef.current.scale.setScalar(scale);
    }

    // Rotate map slowly
    if (mapRef.current) {
      mapRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <group position={[-15, 0, 0]}>
      {/* Pakistan Map - more visible */}
      <mesh ref={mapRef} geometry={pakistanShape} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1A2333"
          emissive="#3B82F6"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Map border wireframe */}
      <mesh geometry={pakistanShape} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#3B82F6" wireframe />
      </mesh>

      {/* Karachi dot - visible */}
      <mesh ref={karachiDotRef} position={[-0.3, 0.8, 0.4]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Memory Cards - visible */}
      {memoryCards.slice(0, 3).map((card, index) => (
        <group key={`card-${index}`} position={card.position} rotation={card.rotation}>
          {/* Card background */}
          <mesh>
            <planeGeometry args={[2.5, 1.5]} />
            <meshStandardMaterial
              color="#1A2333"
              emissive="#3B82F6"
              emissiveIntensity={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Card border */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.6, 1.6]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Timeline Beam - visible */}
      <group position={[3, 0, 0]}>
        <mesh ref={timelineRef}>
          <cylinderGeometry args={[0.03, 0.03, 12, 8]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Milestone dots - visible */}
        <mesh position={[0, -4, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.5}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={0.5}
          />
        </mesh>

        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}
