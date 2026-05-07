'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Project {
  id: number;
  title: string;
  status_color: string;
  icon: string;
}

interface ProjectCard {
  id: number;
  name: string;
  position: THREE.Vector3;
  color: string;
  icon: string;
}

export function ProjectsZone() {
  const cardsRef = useRef<Array<THREE.Mesh | null>>([]);
  const elapsedTime = useRef(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/admin/projects');
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Generate project cards dynamically from database
  const projectCards = useMemo<ProjectCard[]>(() => {
    if (projects.length === 0) return [];

    const baseX = 30; // Position in world space
    const totalProjects = projects.length;

    // Calculate spacing based on number of projects
    const spacing = totalProjects <= 3 ? 6 : 5;
    const startY = ((totalProjects - 1) * spacing) / 2;

    return projects.map((project, index) => ({
      id: project.id,
      name: project.title,
      position: new THREE.Vector3(
        baseX,
        startY - (index * spacing),
        0
      ),
      color: project.status_color || '#3B82F6',
      icon: project.icon || '🚀',
    }));
  }, [projects]);

  useFrame((state, delta) => {
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Animate each project card
    cardsRef.current.forEach((ref, index) => {
      if (ref && projectCards[index]) {
        // Floating animation
        ref.position.y = projectCards[index].position.y + Math.sin(time * 1.5 + index) * 0.3;

        // Gentle rotation
        ref.rotation.y += 0.005;

        // Pulse scale
        const scale = 1 + Math.sin(time * 2 + index * 0.5) * 0.05;
        ref.scale.setScalar(scale);
      }
    });
  });

  // Show loading state
  if (isLoading) {
    return (
      <group position={[30, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group position={[30, 0, 0]}>
      {/* Project Cards */}
      {projectCards.map((card, index) => (
        <group key={`project-${card.id}`}>
          {/* Card Base */}
          <mesh
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            position={card.position}
          >
            <boxGeometry args={[2, 2.5, 0.2]} />
            <meshStandardMaterial
              color={card.color}
              emissive={card.color}
              emissiveIntensity={0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* Glow Ring */}
          <mesh position={card.position}>
            <torusGeometry args={[1.5, 0.05, 16, 32]} />
            <meshBasicMaterial
              color={card.color}
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* Connection Line to Center */}
          <primitive
            object={
              new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(0, 0, 0),
                  card.position,
                ]),
                new THREE.LineBasicMaterial({
                  color: card.color,
                  transparent: true,
                  opacity: 0.3,
                })
              )
            }
          />
        </group>
      ))}

      {/* Central Hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Orbital Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6, 0.02, 16, 64]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}
