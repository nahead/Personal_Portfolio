'use client';

import { motion } from 'framer-motion';
import { useWorldStore } from '../../hooks/useWorldStore';

export function ContactOverlay() {
  const { toggleNAI } = useWorldStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="text-center space-y-8 max-w-2xl px-6">
        {/* Label */}
        <p className="text-sm font-mono text-[#3B82F6]">CONTACT</p>

        {/* Heading */}
        <h2 className="text-6xl font-bold text-[#F1F5F9]">
          Have a project?<br />Let&apos;s talk.
        </h2>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
          <motion.a
            href="mailto:nahead@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#3B82F6] text-white rounded-lg font-semibold transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            Send Email →
          </motion.a>

          <motion.a
            href="https://github.com/nahead"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold transition-colors duration-200 hover:bg-[#3B82F6]/10"
          >
            Open GitHub →
          </motion.a>

          <motion.button
            onClick={toggleNAI}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-[#10B981] text-[#10B981] rounded-lg font-semibold transition-colors duration-200 hover:bg-[#10B981]/10"
          >
            Chat with NAI →
          </motion.button>
        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-md mx-auto pointer-events-auto"
        >
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-[#1A2333] border border-[#1E3A5F] rounded-lg text-[#F1F5F9] placeholder-[#94A3B8] focus:border-[#3B82F6] focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-[#1A2333] border border-[#1E3A5F] rounded-lg text-[#F1F5F9] placeholder-[#94A3B8] focus:border-[#3B82F6] focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 bg-[#1A2333] border border-[#1E3A5F] rounded-lg text-[#F1F5F9] placeholder-[#94A3B8] focus:border-[#3B82F6] focus:outline-none transition-colors resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
