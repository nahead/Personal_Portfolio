'use client';

import { useEffect, useState, useRef } from 'react';

export function useFPSDetector() {
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsHistory = useRef<number[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let checkCount = 0;
    const maxChecks = 120; // Check for 2 seconds (120 frames at 60fps)

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime >= 1000) {
        const currentFPS = Math.round((frameCount.current * 1000) / deltaTime);
        fpsHistory.current.push(currentFPS);
        setFps(currentFPS);

        frameCount.current = 0;
        lastTime.current = currentTime;
        checkCount++;

        // After 2 seconds of measurement, determine if performance is low
        if (checkCount >= 2) {
          const avgFPS =
            fpsHistory.current.reduce((a, b) => a + b, 0) /
            fpsHistory.current.length;

          // For 120 FPS target, switch to 2D if average drops below 45 FPS
          if (avgFPS < 45) {
            setIsLowPerformance(true);
            cancelAnimationFrame(animationFrameId);
            return;
          }
        }

        // Stop checking after maxChecks
        if (checkCount >= maxChecks / 60) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return { fps, isLowPerformance };
}
