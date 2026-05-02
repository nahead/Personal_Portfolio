import { useEffect } from 'react';
import Lenis from 'lenis';
import { useWorldStore } from './useWorldStore';
import { ZONES } from '../lib/zoneConfig';

export function useScrollProgress() {
  const setScrollProgress = useWorldStore((s) => s.setScrollProgress);
  const setCurrentZone = useWorldStore((s) => s.setCurrentZone);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ({ progress }: { progress: number }) => {
      setScrollProgress(progress);

      const zoneIndex = ZONES.findIndex(
        (z) => progress >= z.scrollStart && progress <= z.scrollEnd
      );
      if (zoneIndex !== -1) {
        setCurrentZone(zoneIndex);
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [setScrollProgress, setCurrentZone]);
}
