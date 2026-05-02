'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simplified Pakistan outline SVG path (approximate)
const PAKISTAN_PATH = "M 140 20 L 160 25 L 175 35 L 185 50 L 190 70 L 185 90 L 175 110 L 160 130 L 140 145 L 120 155 L 100 160 L 80 155 L 60 145 L 45 130 L 35 110 L 30 90 L 25 70 L 30 50 L 45 35 L 65 25 L 90 20 L 115 18 Z";

export default function OriginMap() {
  const [animationStep, setAnimationStep] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const runAnimation = useCallback(() => {
    // Step 1: Village dot appears (0-1s)
    setTimeout(() => setAnimationStep(1), 0);

    // Step 2: Line draws to Karachi (1-2s)
    setTimeout(() => setAnimationStep(2), 1000);

    // Step 3: Karachi dot appears (2-2.5s)
    setTimeout(() => setAnimationStep(3), 2000);

    // Step 4: Lines extend to world (2.5-3.5s)
    setTimeout(() => setAnimationStep(4), 2500);

    // Step 5: World dots appear (3.5-4s)
    setTimeout(() => setAnimationStep(5), 3500);

    // Step 6: Final state (4s+)
    setTimeout(() => setAnimationStep(6), 4000);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            runAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, runAnimation]);

  return (
    <div ref={containerRef} className="w-full max-w-[280px] mx-auto">
      <svg
        viewBox="0 0 220 200"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))' }}
      >
        {/* Pakistan Outline */}
        <motion.path
          d={PAKISTAN_PATH}
          fill="#1A2333"
          stroke="#1E3A5F"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep >= 6 ? [0.85, 1, 0.85] : 1,
          }}
          transition={{
            duration: 4,
            repeat: animationStep >= 6 ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Village Dot (M9 Motorway) - Position: Karachi region */}
        <AnimatePresence>
          {animationStep >= 1 && (
            <>
              {/* Ripple Effect */}
              <motion.circle
                cx="85"
                cy="140"
                r="6"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1"
                initial={{ r: 6, opacity: 0.8 }}
                animate={{ r: 15, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />

              {/* Village Dot */}
              <motion.circle
                cx="85"
                cy="140"
                r="3"
                fill="#94A3B8"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
              />

              {/* Village Label */}
              <motion.text
                x="85"
                y="155"
                textAnchor="middle"
                fill="#94A3B8"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                M9 Motorway
              </motion.text>
            </>
          )}
        </AnimatePresence>

        {/* Connection Line from Village to Karachi */}
        <AnimatePresence>
          {animationStep >= 2 && (
            <motion.line
              x1="85"
              y1="140"
              x2="110"
              y2="120"
              stroke="#3B82F6"
              strokeWidth="1"
              strokeDasharray="4 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Karachi Dot */}
        <AnimatePresence>
          {animationStep >= 3 && (
            <>
              {/* Ripple Effect */}
              <motion.circle
                cx="110"
                cy="120"
                r="10"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1"
                initial={{ r: 10, opacity: 0.8 }}
                animate={{ r: 20, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />

              {/* Karachi Dot */}
              <motion.circle
                cx="110"
                cy="120"
                r="5"
                fill="#3B82F6"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))',
                }}
              />

              {/* Karachi Label */}
              <motion.text
                x="110"
                y="110"
                textAnchor="middle"
                fill="#F1F5F9"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Karachi
              </motion.text>
            </>
          )}
        </AnimatePresence>

        {/* Lines to World */}
        <AnimatePresence>
          {animationStep >= 4 && (
            <>
              {/* Line to USA (up-right) */}
              <motion.line
                x1="110"
                y1="120"
                x2="200"
                y2="30"
                stroke="#3B82F6"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
              />
              <motion.polygon
                points="200,30 195,32 197,35"
                fill="#3B82F6"
                opacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5 }}
              />

              {/* Line to UK (right) */}
              <motion.line
                x1="110"
                y1="120"
                x2="210"
                y2="80"
                stroke="#3B82F6"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
              />
              <motion.polygon
                points="210,80 205,79 207,83"
                fill="#3B82F6"
                opacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.65 }}
              />

              {/* Line to UAE (down-right) */}
              <motion.line
                x1="110"
                y1="120"
                x2="200"
                y2="150"
                stroke="#3B82F6"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              />
              <motion.polygon
                points="200,150 195,149 197,153"
                fill="#3B82F6"
                opacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.8 }}
              />

              {/* Line to EU (up) */}
              <motion.line
                x1="110"
                y1="120"
                x2="140"
                y2="10"
                stroke="#3B82F6"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.45 }}
              />
              <motion.polygon
                points="140,10 138,15 142,15"
                fill="#3B82F6"
                opacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.95 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* World Dots */}
        <AnimatePresence>
          {animationStep >= 5 && (
            <>
              {/* USA */}
              <motion.circle
                cx="200"
                cy="30"
                r="2"
                fill="#3B82F6"
                opacity="0.4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0 }}
              />
              <motion.text
                x="200"
                y="25"
                textAnchor="middle"
                fill="#3B82F6"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                USA
              </motion.text>

              {/* UK */}
              <motion.circle
                cx="210"
                cy="80"
                r="2"
                fill="#3B82F6"
                opacity="0.4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
              <motion.text
                x="210"
                y="75"
                textAnchor="middle"
                fill="#3B82F6"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                UK
              </motion.text>

              {/* UAE */}
              <motion.circle
                cx="200"
                cy="150"
                r="2"
                fill="#3B82F6"
                opacity="0.4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.text
                x="200"
                y="165"
                textAnchor="middle"
                fill="#3B82F6"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                UAE
              </motion.text>

              {/* EU */}
              <motion.circle
                cx="140"
                cy="10"
                r="2"
                fill="#3B82F6"
                opacity="0.4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
              <motion.text
                x="140"
                y="5"
                textAnchor="middle"
                fill="#3B82F6"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                EU
              </motion.text>
            </>
          )}
        </AnimatePresence>
      </svg>

      {/* Bottom Text */}
      <AnimatePresence>
        {animationStep >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-6"
          >
            <p
              className="text-[#94A3B8]"
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                letterSpacing: '0.3em',
              }}
            >
              From here — to everywhere.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
