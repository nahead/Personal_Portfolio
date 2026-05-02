'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '../hooks/useWorldStore';
import { ZONES, getZoneByProgress, getZoneProgress } from '../lib/zoneConfig';

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function CameraRig() {
  const { camera, invalidate } = useThree();
  const { scrollProgress } = useWorldStore();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const lastScrollProgress = useRef(0);

  // Mouse parallax
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  // Camera shake
  const shakeOffset = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Smooth mouse parallax
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;

    // Subtle camera shake for life
    const time = state.clock.getElapsedTime();
    shakeOffset.current.x = Math.sin(time * 0.5) * 0.05;
    shakeOffset.current.y = Math.cos(time * 0.3) * 0.05;
    shakeOffset.current.z = Math.sin(time * 0.7) * 0.03;

    // Only update if scroll changed significantly
    if (Math.abs(scrollProgress - lastScrollProgress.current) > 0.001) {
      lastScrollProgress.current = scrollProgress;

      const zone = getZoneByProgress(scrollProgress);
      const zoneProgress = getZoneProgress(zone, scrollProgress);
      const easedProgress = easeInOutCubic(zoneProgress);

      targetPos.current.lerpVectors(
        zone.cameraStart,
        zone.cameraEnd,
        easedProgress
      );

      targetLook.current.lerpVectors(
        zone.lookAtStart,
        zone.lookAtEnd,
        easedProgress
      );
    }

    // Apply parallax offset (mouse movement affects camera)
    const parallaxStrength = 2;
    camera.position.lerp(
      new THREE.Vector3(
        targetPos.current.x + smoothMouse.current.x * parallaxStrength + shakeOffset.current.x,
        targetPos.current.y + smoothMouse.current.y * parallaxStrength + shakeOffset.current.y,
        targetPos.current.z + shakeOffset.current.z
      ),
      delta * 3
    );

    currentLook.current.lerp(targetLook.current, delta * 3);
    camera.lookAt(currentLook.current);

    invalidate();
  });

  return null;
}
