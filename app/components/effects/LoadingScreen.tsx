'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TERMINAL_LINES = [
  { text: '> Initializing Nahead.exe...', delay: 0, color: '#94A3B8' },
  { text: '> Loading AI modules...', delay: 600, color: '#94A3B8' },
  { text: '> Connecting NAI agent...', delay: 1200, color: '#94A3B8' },
  { text: '> Skills loaded: Python, TS, Next.js', delay: 1800, color: '#94A3B8' },
  { text: '> Location: Karachi, Pakistan', delay: 2400, color: '#94A3B8' },
  { text: '> Status: READY', delay: 3000, color: '#10B981' },
  { text: '> Welcome.', delay: 3300, color: '#10B981' },
];

export default function LoadingScreen() {
  // Always start with true on both server and client to avoid hydration mismatch
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [mounted, setMounted] = useState(false);

  const completeLoading = useCallback(() => {
    localStorage.setItem('nai_visited', 'true');
    setIsLoading(false);
  }, []);

  // Check localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const hasVisited = localStorage.getItem('nai_visited');
    if (hasVisited) {
      setIsFirstVisit(false);
      setIsLoading(false);
    }
  }, []);

  // Terminal line animation
  useEffect(() => {
    if (!isFirstVisit || !isLoading) return;

    const lineTimers = TERMINAL_LINES.map((line, index) => {
      return setTimeout(() => {
        setCurrentLine(index + 1);
      }, line.delay);
    });

    return () => lineTimers.forEach(clearTimeout);
  }, [isFirstVisit, isLoading]);

  // Progress bar animation
  useEffect(() => {
    if (!isFirstVisit || !isLoading) return;

    const duration = 3500;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          completeLoading();
        }, 500);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [isFirstVisit, isLoading, completeLoading]);

  // Show skip message
  useEffect(() => {
    if (!isFirstVisit || !isLoading) return;

    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isFirstVisit, isLoading]);

  // Skip on any key press
  useEffect(() => {
    if (!isFirstVisit || !isLoading) return;

    const handleKeyPress = () => {
      completeLoading();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFirstVisit, isLoading, completeLoading]);

  // Don't render anything until mounted (avoid SSR hydration mismatch)
  if (!mounted) return null;

  // Don't render if not first visit
  if (!isFirstVisit) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] bg-[#0B1120] flex flex-col items-center justify-center"
        >
          {/* Version Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-12 text-[#3B82F6] text-xs font-mono tracking-[0.3em]"
          >
            NAHEAD.EXE — v1.0.0
          </motion.div>

          {/* Terminal Lines */}
          <div className="w-full max-w-2xl px-8 mb-12">
            <div className="space-y-3 font-mono text-sm">
              {TERMINAL_LINES.slice(0, currentLine).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                  style={{ color: line.color }}
                >
                  <span>{line.text}</span>
                  {index === currentLine - 1 && currentLine < TERMINAL_LINES.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-current"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-2xl px-8">
            <div className="relative">
              {/* Percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 right-0 text-xs font-mono text-[#3B82F6]"
              >
                {Math.floor(progress)}%
              </motion.div>

              {/* Bar Background */}
              <div className="h-1 bg-[#1A2333] rounded-full overflow-hidden">
                {/* Bar Fill */}
                <motion.div
                  className="h-full bg-[#3B82F6] rounded-full relative"
                  style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                  }}
                  transition={{
                    duration: 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </div>
            </div>
          </div>

          {/* Skip Message */}
          <AnimatePresence>
            {showSkip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-12 text-[#94A3B8] text-xs font-mono"
              >
                Press any key to skip
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

