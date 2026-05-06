import * as THREE from 'three';

export interface Zone {
  id: number;
  name: string;
  scrollStart: number;
  scrollEnd: number;
  cameraStart: THREE.Vector3;
  cameraEnd: THREE.Vector3;
  lookAtStart: THREE.Vector3;
  lookAtEnd: THREE.Vector3;
}

export const ZONES: Zone[] = [
  {
    id: 0,
    name: 'hero',
    scrollStart: 0.0,
    scrollEnd: 0.17,
    cameraStart: new THREE.Vector3(0, 0, 20),
    cameraEnd: new THREE.Vector3(0, 0, 8),
    lookAtStart: new THREE.Vector3(0, 0, 0),
    lookAtEnd: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 1,
    name: 'about',
    scrollStart: 0.17,
    scrollEnd: 0.34,
    cameraStart: new THREE.Vector3(0, 0, 8),
    cameraEnd: new THREE.Vector3(-15, 2, 5),
    lookAtStart: new THREE.Vector3(0, 0, 0),
    lookAtEnd: new THREE.Vector3(-15, 0, 0),
  },
  {
    id: 2,
    name: 'skills',
    scrollStart: 0.34,
    scrollEnd: 0.5,
    cameraStart: new THREE.Vector3(-15, 2, 5),
    cameraEnd: new THREE.Vector3(15, -2, 5),
    lookAtStart: new THREE.Vector3(-15, 0, 0),
    lookAtEnd: new THREE.Vector3(15, 0, 0),
  },
  {
    id: 3,
    name: 'projects',
    scrollStart: 0.5,
    scrollEnd: 0.66,
    cameraStart: new THREE.Vector3(15, -2, 5),
    cameraEnd: new THREE.Vector3(30, 0, 8),
    lookAtStart: new THREE.Vector3(15, 0, 0),
    lookAtEnd: new THREE.Vector3(30, 0, 0),
  },
  {
    id: 4,
    name: 'education',
    scrollStart: 0.66,
    scrollEnd: 0.8,
    cameraStart: new THREE.Vector3(30, 0, 8),
    cameraEnd: new THREE.Vector3(0, -15, 8),
    lookAtStart: new THREE.Vector3(30, 0, 0),
    lookAtEnd: new THREE.Vector3(0, -15, 0),
  },
  {
    id: 5,
    name: 'contact',
    scrollStart: 0.8,
    scrollEnd: 1.0,
    cameraStart: new THREE.Vector3(0, -15, 8),
    cameraEnd: new THREE.Vector3(0, -20, 3),
    lookAtStart: new THREE.Vector3(0, -15, 0),
    lookAtEnd: new THREE.Vector3(0, -20, 0),
  },
];

export function getZoneByProgress(progress: number): Zone {
  return (
    ZONES.find((z) => progress >= z.scrollStart && progress <= z.scrollEnd) ||
    ZONES[0]
  );
}

export function getZoneProgress(zone: Zone, scrollProgress: number): number {
  const zoneProgress =
    (scrollProgress - zone.scrollStart) / (zone.scrollEnd - zone.scrollStart);
  return Math.max(0, Math.min(1, zoneProgress));
}
