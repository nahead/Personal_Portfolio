'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import * as THREE from 'three';

interface Node {
  position: Vector3;
  velocity: Vector3;
}

function NeuralNetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const elapsedTime = useRef(0);

  // Reduced nodes from 150 to 80 for better performance
  const nodes = useMemo<Node[]>(() => {
    // Math.random is intentionally used once during initialization - safe in useMemo
    /* eslint-disable react-hooks/purity */
    const nodeArray: Node[] = [];
    for (let i = 0; i < 80; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 4 + Math.random() * 3;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      nodeArray.push({
        position: new Vector3(x, y, z),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        ),
      });
    }
    /* eslint-enable react-hooks/purity */
    return nodeArray;
  }, []);

  // Calculate connections with reduced threshold
  const connections = useMemo(() => {
    const connectionArray: { start: number; end: number; geometry: THREE.BufferGeometry }[] = [];
    const threshold = 2.2;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < threshold) {
          const start = nodes[i].position;
          const end = nodes[j].position;
          const points = [start, end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          connectionArray.push({ start: i, end: j, geometry });
        }
      }
    }
    return connectionArray;
  }, [nodes]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Manual time tracking (replaces deprecated THREE.Clock)
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Smooth mouse rotation
    targetRotation.current.x = mouseRef.current.y * 0.3;
    targetRotation.current.y = mouseRef.current.x * 0.3;

    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;

    // Gentle floating animation
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#3B82F6" />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map((conn, i) => (
        <primitive
          key={`line-${i}`}
          object={new THREE.Line(
            conn.geometry,
            new THREE.LineBasicMaterial({
              color: '#3B82F6',
              opacity: 0.15,
              transparent: true
            })
          )}
        />
      ))}
    </group>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <color attach="background" args={['#0B1120']} />
        <ambientLight intensity={0.5} />
        <NeuralNetworkScene />
      </Canvas>
    </div>
  );
}
