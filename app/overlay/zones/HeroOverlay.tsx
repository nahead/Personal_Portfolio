'use client';

import { motion } from 'framer-motion';
import { useWorldStore } from '../../hooks/useWorldStore';

export function HeroOverlay() {
  const { scrollProgress } = useWorldStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="text-center">
        {/* Meta info */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-mono text-[#94A3B8] tracking-[0.3em] mb-8"
        >
          PKS / KHI / 18Y
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.p
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-[#3B82F6] font-mono"
          >
            SCROLL TO BEGIN →
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-[#1E3A5F] pointer-events-none">
          <motion.div
            className="h-full bg-[#3B82F6]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
