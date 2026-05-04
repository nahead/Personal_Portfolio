'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function KonamiAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let keys: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      keys = [...keys, e.key].slice(-10);

      if (konamiCode.every((key, index) => key === keys[index])) {
        setShow(true);
        keys = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="relative bg-gradient-to-br from-[#1A2333] to-[#0B1120] border-2 border-[#3B82F6] rounded-3xl p-12 max-w-2xl mx-4 shadow-[0_0_100px_rgba(59,130,246,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-8xl mb-6"
              >
                🎮
              </motion.div>

              <h2 className="text-4xl font-black text-[#F1F5F9] mb-4">
                Konami Code Activated!
              </h2>

              <p className="text-[#94A3B8] text-lg mb-6">
                You've unlocked the secret gamer achievement! 🏆
              </p>

              <div className="bg-[#0B1120] border border-[#1E3A5F] rounded-xl p-6 mb-6">
                <p className="text-[#3B82F6] font-bold mb-3">
                  🎁 Special Reward Unlocked:
                </p>
                <p className="text-[#F1F5F9] mb-2">
                  "The Konami Master" Badge
                </p>
                <p className="text-[#94A3B8] text-sm">
                  You're one of the few who discovered this Easter egg. Mention this in your message for a special surprise!
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShow(false)}
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow"
                >
                  Awesome!
                </motion.button>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShow(false)}
                  className="px-6 py-3 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#3B82F6]/10 transition-colors"
                >
                  Claim Reward
                </motion.a>
              </div>
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-50, -200],
                  x: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#3B82F6] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
