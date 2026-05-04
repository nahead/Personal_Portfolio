'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useWorldStore } from './hooks/useWorldStore';
import { detectDeviceTier } from './lib/performanceDetect';
import { useFPSDetector } from './hooks/useFPSDetector';
import { ZoneOverlay } from './components/3d/ZoneOverlay';
import { ZoneContent } from './components/3d/ZoneContent';

// Original 2D components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import GitHubStats from './components/sections/GitHubStats';
import MetricsDashboard from './components/sections/MetricsDashboard';
import Testimonials from './components/sections/Testimonials';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';

const WorldCanvas = dynamic(
  () => import('./world/WorldCanvas').then((m) => ({ default: m.WorldCanvas })),
  { ssr: false }
);

const OverlayRoot = dynamic(
  () => import('./overlay/OverlayRoot').then((m) => ({ default: m.OverlayRoot })),
  { ssr: false }
);

const NAIChat = dynamic(
  () => import('./components/sections/NAIChat').then((m) => ({ default: m.default })),
  { ssr: false }
);

export default function Home() {
  const setDeviceTier = useWorldStore((s) => s.setDeviceTier);
  const setLoading = useWorldStore((s) => s.setLoading);
  const [use3D, setUse3D] = useState(false);
  const [showPerformanceWarning, setShowPerformanceWarning] = useState(false);
  // DISABLED: FPS detector causing auto-switch to 2D
  // const { isLowPerformance } = useFPSDetector();

  useScrollProgress();

  useEffect(() => {
    const tier = detectDeviceTier();
    setDeviceTier(tier);
    setLoading(false);

    // Check user preference for 3D mode
    const saved3DPreference = localStorage.getItem('prefer3D');
    if (saved3DPreference === 'true') {
      setUse3D(true);
    } else {
      setUse3D(false); // Default to 2D
    }

    console.log('3D Mode:', saved3DPreference === 'true' ? 'TRUE' : 'FALSE');
  }, [setDeviceTier, setLoading]);

  // DISABLED: Automatic performance fallback
  // Detect low performance and switch to 2D
  // useEffect(() => {
  //   if (isLowPerformance && use3D) {
  //     setUse3D(false);
  //     setShowPerformanceWarning(true);
  //     localStorage.setItem('prefer3D', 'false');
  //     setTimeout(() => {
  //       setShowPerformanceWarning(false);
  //     }, 5000);
  //   }
  // }, [isLowPerformance, use3D]);

  const enable3D = () => {
    setUse3D(true);
    localStorage.setItem('prefer3D', 'true');
    setShowPerformanceWarning(false);
    window.scrollTo(0, 0); // Scroll to top when switching to 3D
  };

  const disable3D = () => {
    setUse3D(false);
    localStorage.setItem('prefer3D', 'false');
    window.scrollTo(0, 0); // Scroll to top when switching to 2D
  };

  if (use3D) {
    return (
      <>
        {/* Performance warning */}
        {showPerformanceWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-[10001] bg-[#1A2333] border border-[#3B82F6] rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg max-w-[90vw]"
          >
            <p className="text-[#F1F5F9] text-xs sm:text-sm">
              Low performance detected. Switched to 2D mode for better experience.
            </p>
          </motion.div>
        )}

        {/* 3D/2D Toggle - Fully Responsive */}
        <motion.button
          onClick={disable3D}
          className="fixed top-3 sm:top-4 right-3 sm:right-4 z-[10001] px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1A2333] border border-[#3B82F6] text-[#3B82F6] rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#3B82F6]/10 transition-colors pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Switch to 2D
        </motion.button>

        {/* Zone Information Overlay */}
        <ZoneOverlay />

        {/* Zone Detailed Content */}
        <ZoneContent />

        {/* NAI Chatbot Assistant */}
        <NAIChat />

        {/* 3D World - Full viewport */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}>
          <WorldCanvas />
        </div>

        {/* Fake scrollable height for scroll detection */}
        <div style={{ height: '600vh', width: '1px' }} />
      </>
    );
  }

  // 2D Portfolio (Original)
  return (
    <main className="min-h-screen bg-[#0B1120]">
      {/* 3D/2D Toggle - Fully Responsive */}
      <motion.button
        onClick={enable3D}
        className="fixed top-3 sm:top-4 right-3 sm:right-4 z-[10001] px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1A2333] border border-[#3B82F6] text-[#3B82F6] rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#3B82F6]/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try 3D Mode
      </motion.button>

      {/* NAI Chatbot Assistant */}
      <NAIChat />

      {/* Original 2D Content */}
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="github">
        <GitHubStats />
      </div>
      <div id="metrics">
        <MetricsDashboard />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="resume">
        <Resume />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
