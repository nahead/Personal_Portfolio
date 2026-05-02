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
    scrollEnd: 0.2,
    cameraStart: new THREE.Vector3(0, 0, 20),
    cameraEnd: new THREE.Vector3(0, 0, 8),
    lookAtStart: new THREE.Vector3(0, 0, 0),
    lookAtEnd: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 1,
    name: 'about',
    scrollStart: 0.2,
    scrollEnd: 0.4,
    cameraStart: new THREE.Vector3(0, 0, 8),
    cameraEnd: new THREE.Vector3(-15, 2, 5),
    lookAtStart: new THREE.Vector3(0, 0, 0),
    lookAtEnd: new THREE.Vector3(-15, 0, 0),
  },
  {
    id: 2,
    name: 'skills',
    scrollStart: 0.4,
    scrollEnd: 0.58,
    cameraStart: new THREE.Vector3(-15, 2, 5),
    cameraEnd: new THREE.Vector3(15, -2, 5),
    lookAtStart: new THREE.Vector3(-15, 0, 0),
    lookAtEnd: new THREE.Vector3(15, 0, 0),
  },
  {
    id: 3,
    name: 'education',
    scrollStart: 0.58,
    scrollEnd: 0.76,
    cameraStart: new THREE.Vector3(15, -2, 5),
    cameraEnd: new THREE.Vector3(0, -15, 8),
    lookAtStart: new THREE.Vector3(15, 0, 0),
    lookAtEnd: new THREE.Vector3(0, -15, 0),
  },
  {
    id: 4,
    name: 'contact',
    scrollStart: 0.76,
    scrollEnd: 0.9,
    cameraStart: new THREE.Vector3(0, -15, 8),
    cameraEnd: new THREE.Vector3(0, -20, 3),
    lookAtStart: new THREE.Vector3(0, -15, 0),
    lookAtEnd: new THREE.Vector3(0, -20, 0),
  },
  {
    id: 5,
    name: 'outro',
    scrollStart: 0.9,
    scrollEnd: 1.0,
    cameraStart: new THREE.Vector3(0, -20, 3),
    cameraEnd: new THREE.Vector3(0, -20, 1),
    lookAtStart: new THREE.Vector3(0, -20, 0),
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
