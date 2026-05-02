'use client';

import { motion } from 'framer-motion';

export function SkillsOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-12 left-12 max-w-md pointer-events-none"
    >
      <div className="space-y-4">
        {/* Label */}
        <p className="text-sm font-mono text-[#3B82F6]">{'< 07 SKILLS />'}</p>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#F1F5F9]">The Arsenal</h2>

        {/* Description */}
        <p className="text-[#94A3B8] text-lg">
          Every tool mastered. Every framework conquered. From Python to AI agents.
        </p>

        {/* Skill categories */}
        <div className="space-y-2 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-[#F1F5F9] font-semibold">Backend</span>
            <span className="text-[#94A3B8]">Python, FastAPI</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-[#F1F5F9] font-semibold">Frontend</span>
            <span className="text-[#94A3B8]">Next.js, TypeScript</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-[#F1F5F9] font-semibold">AI</span>
            <span className="text-[#94A3B8]">Agents SDK, MCP, Gemini</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
