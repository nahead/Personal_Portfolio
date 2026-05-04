'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function LogoClickCounter() {
  const [clicks, setClicks] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const handleLogoClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks === 10) {
      setShowReward(true);
      // Reset after showing
      setTimeout(() => {
        setClicks(0);
      }, 5000);
    } else if (newClicks > 10) {
      setClicks(0);
    }
  };

  return (
    <>
      {/* Invisible click detector on logo area */}
      <div
        onClick={handleLogoClick}
        className="fixed top-4 left-4 w-12 h-12 z-[9998] cursor-pointer"
        title={clicks > 0 ? `${clicks}/10 clicks` : 'Click me!'}
      />

      {/* Click counter indicator */}
      <AnimatePresence>
        {clicks > 0 && clicks < 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-16 left-4 z-[9998] bg-[#3B82F6] text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            {clicks}/10
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setShowReward(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="relative bg-gradient-to-br from-[#1A2333] to-[#0B1120] border-2 border-[#10B981] rounded-3xl p-12 max-w-2xl mx-4 shadow-[0_0_100px_rgba(16,185,129,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sparkles animation */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-8 -right-8 text-6xl"
              >
                ✨
              </motion.div>

              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="text-8xl mb-6"
                >
                  🎯
                </motion.div>

                <h2 className="text-4xl font-black text-[#F1F5F9] mb-4">
                  Persistence Pays Off!
                </h2>

                <p className="text-[#94A3B8] text-lg mb-6">
                  You clicked the logo 10 times! That's dedication! 🏆
                </p>

                <div className="bg-[#0B1120] border border-[#1E3A5F] rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#10B981]" />
                    <p className="text-[#10B981] font-bold">
                      Achievement Unlocked: "The Persistent One"
                    </p>
                  </div>
                  <p className="text-[#F1F5F9] mb-2">
                    Fun Fact: Only 2% of visitors find this Easter egg!
                  </p>
                  <p className="text-[#94A3B8] text-sm">
                    Your curiosity and persistence are exactly the qualities I value in collaborators. Let's work together!
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReward(false)}
                  className="px-8 py-3 bg-[#10B981] text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow"
                >
                  Awesome! 🎉
                </motion.button>
              </div>

              {/* Confetti effect */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, y: 0, x: 0 }}
                  animate={{
                    opacity: [1, 0],
                    y: [0, Math.random() * 300 - 150],
                    x: [0, Math.random() * 300 - 150],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][
                      Math.floor(Math.random() * 4)
                    ],
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
