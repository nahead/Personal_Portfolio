'use client';

import { motion } from 'framer-motion';

export function EducationOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.6 }}
      className="fixed right-12 top-1/2 -translate-y-1/2 max-w-xl pointer-events-none"
    >
      <div className="space-y-6">
        {/* Label */}
        <p className="text-sm font-mono text-[#3B82F6]">{'< Education />'}</p>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-[#F1F5F9]">The Journey</h2>

        {/* Timeline entries */}
        <div className="space-y-8 mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-[#F1F5F9] font-semibold">Matriculation</span>
            </div>
            <p className="text-[#94A3B8] ml-6">2022 — Foundation complete</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-[#F1F5F9] font-semibold">Intermediate</span>
            </div>
            <p className="text-[#94A3B8] ml-6">Present — In progress</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
              <span className="text-[#F1F5F9] font-bold text-xl">GIAIC</span>
            </div>
            <p className="text-[#3B82F6] ml-7 font-semibold">2024 → March 2026</p>
            <p className="text-[#94A3B8] ml-7">
              The game changer. From zero to world-class AI developer.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
