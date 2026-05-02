'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'text' | 'view'>('default');
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePosition = useRef<CursorPosition>({ x: 0, y: 0 });
  const ringPosition = useRef<CursorPosition>({ x: 0, y: 0 });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse move handler
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
      }

      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Check hover state
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-cursor')) {
        const cursorValue = target.getAttribute('data-cursor') as 'default' | 'link' | 'text' | 'view' | null;
        if (cursorValue) {
          setCursorState(cursorValue);
        }
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorState('link');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, isVisible]);

  // Click handlers
  useEffect(() => {
    if (isMobile) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  // Smooth ring follow with lerp
  useEffect(() => {
    if (isMobile) return;

    let animationFrameId: number;

    const updateRingPosition = () => {
      const lerpFactor = 0.12;

      ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * lerpFactor;
      ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosition.current.x}px, ${ringPosition.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(updateRingPosition);
    };

    animationFrameId = requestAnimationFrame(updateRingPosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  // Cursor styles based on state
  const getDotScale = () => {
    if (isClicking) return 0.5;
    if (cursorState === 'link') return 0.5;
    if (cursorState === 'view') return 0;
    return 1;
  };

  const getRingScale = () => {
    if (isClicking) return 0.85;
    if (cursorState === 'link') return 1.5;
    if (cursorState === 'view') return 2.5;
    return 1;
  };

  const getRingStyle = () => {
    if (cursorState === 'text') {
      return {
        width: '48px',
        height: '2px',
        borderRadius: '1px',
      };
    }
    return {};
  };

  return (
    <>
      {/* Cursor Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#3B82F6] rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: getDotScale(),
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor Ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99998] mix-blend-difference flex items-center justify-center"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid rgba(59, 130, 246, 0.6)',
          opacity: isVisible ? 1 : 0,
          ...getRingStyle(),
        }}
        initial={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
        animate={{
          scale: getRingScale(),
          backgroundColor:
            cursorState === 'link' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      >
        {cursorState === 'view' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-[10px] font-mono"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

