'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkillIcon {
  name: string;
  geometry: THREE.BufferGeometry;
  color: string;
  offset: number;
  speed: number;
  baseY: number;
}

export function HeroZone() {
  const groupRef = useRef<THREE.Group>(null);
  const neuralSphereRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const elapsedTime = useRef(0);

  // Ultra-minimal neural sphere - only 12 nodes for 120 FPS
  const neuralData = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(4, 0); // subdivision 0 = 12 vertices only
    const positions = geometry.attributes.position;
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < positions.count; i++) {
      nodes.push(
        new THREE.Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i)
        )
      );
    }

    const connections: [number, number][] = [];
    const threshold = 3.5; // Higher threshold = fewer connections

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < threshold) {
          connections.push([i, j]);
        }
      }
    }

    return { nodes, connections };
  }, []);

  // Minimal skill icons - only 2 for performance
  const skillIcons = useMemo<SkillIcon[]>(() => {
    return [
      {
        name: 'Python',
        geometry: new THREE.BoxGeometry(0.3, 0.3, 0.3),
        color: '#3B82F6',
        offset: 0,
        speed: 0.3,
        baseY: 0,
      },
      {
        name: 'AI',
        geometry: new THREE.BoxGeometry(0.3, 0.3, 0.3),
        color: '#10B981',
        offset: Math.PI,
        speed: 0.27,
        baseY: -0.6,
      },
    ];
  }, []);

  useFrame((state, delta) => {
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Rotate neural sphere
    if (neuralSphereRef.current) {
      neuralSphereRef.current.rotation.y += 0.001;
      neuralSphereRef.current.rotation.x += 0.0005;
    }

    // Rotate energy ring
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += 0.002;
    }

    // Animate skill icons
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child.userData.isSkillIcon) {
          const icon = skillIcons[child.userData.iconIndex];
          const radius = 6;

          child.position.x = Math.cos(time * icon.speed + icon.offset) * radius;
          child.position.y =
            icon.baseY + Math.sin(time * 0.5 + icon.offset) * 0.5;
          child.position.z = Math.sin(time * icon.speed + icon.offset) * radius;

          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Neural Sphere */}
      <group ref={neuralSphereRef}>
        {/* Nodes - visible with proper material */}
        {neuralData.nodes.map((node, i) => (
          <mesh key={`node-${i}`} position={node}>
            <sphereGeometry args={[0.15, 6, 6]} />
            <meshStandardMaterial
              color="#3B82F6"
              emissive="#3B82F6"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}

        {/* Connections */}
        {neuralData.connections.map(([start, end], i) => {
          const points = [neuralData.nodes[start], neuralData.nodes[end]];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: '#3B82F6',
            transparent: true,
            opacity: 0.6,
          });

          return (
            <primitive
              key={`connection-${i}`}
              object={new THREE.Line(geometry, material)}
            />
          );
        })}
      </group>

      {/* Skill Icons - visible */}
      {skillIcons.map((icon, index) => (
        <mesh
          key={`skill-${index}`}
          geometry={icon.geometry}
          userData={{ isSkillIcon: true, iconIndex: index }}
        >
          <meshStandardMaterial
            color={icon.color}
            emissive={icon.color}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* Simplified Energy Ring - visible */}
      <mesh
        ref={ring1Ref}
        rotation={[Math.PI / 4, 0, 0]}
        position={[0, 0, 0]}
      >
        <torusGeometry args={[8, 0.05, 6, 32]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
