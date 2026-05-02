'use client';

import { motion } from 'framer-motion';

export function AboutOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
      className="fixed left-12 top-1/2 -translate-y-1/2 max-w-xl pointer-events-none"
    >
      <div className="space-y-6">
        {/* Label */}
        <p className="text-sm font-mono text-[#3B82F6]">{'< Chapter 01 />'}</p>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-[#F1F5F9]">The Beginning</h2>

        {/* Story */}
        <div className="space-y-4 text-[#94A3B8] text-lg leading-relaxed">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            From a village near M9 Motorway, Karachi.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            An 18-year-old who discovered code and never looked back.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            GIAIC changed everything. From zero to building AI systems.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
