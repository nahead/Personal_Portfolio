'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useXPSystem } from '../../hooks/useXPSystem';

interface ToastNotification {
  id: string;
  points: number;
  label: string;
}

export default function XPWidget() {
  const { totalXP, percentage, events, mounted } = useXPSystem();
  const [isHovered, setIsHovered] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [previousXP, setPreviousXP] = useState(0);

  // Detect XP gain and show toast
  useEffect(() => {
    if (!mounted) return;

    if (totalXP > previousXP && previousXP > 0) {
      const gainedPoints = totalXP - previousXP;
      const lastDiscovered = events.find(e => e.discovered && e.points === gainedPoints);

      if (lastDiscovered) {
        const toastId = Date.now().toString();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setToast({
          id: toastId,
          points: gainedPoints,
          label: lastDiscovered.label,
        });

        setTimeout(() => {
          setToast(null);
        }, 2000);
      }
    }

    setPreviousXP(totalXP);
  }, [totalXP, mounted, events, previousXP]);

  // Check for 100% completion
  useEffect(() => {
    if (!mounted) return;

    if (percentage === 100) {
      const hasShownCompletion = localStorage.getItem('nai_xp_completion_shown');
      if (!hasShownCompletion) {
        setTimeout(() => {
          setShowCompletion(true);
        }, 500);
      }
    }
  }, [percentage, mounted]);

  const handleCloseCompletion = () => {
    setShowCompletion(false);
    localStorage.setItem('nai_xp_completion_shown', 'true');

    // Scroll to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getMilestoneMessage = () => {
    if (percentage >= 75 && percentage < 100) {
      return "Almost everything. Can you find the rest?";
    } else if (percentage >= 50) {
      return "Halfway through. Getting interesting.";
    } else if (percentage >= 25) {
      return "You're curious. Nahead likes that.";
    }
    return null;
  };

  if (!mounted) return null;

  return (
    <>
      {/* Main Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="fixed top-4 right-4 z-[999] max-md:hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            width: isHovered ? '200px' : 'auto',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="bg-[#1A2333] border border-[#1E3A5F] rounded-full overflow-hidden"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Collapsed State */}
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 py-2 flex items-center gap-2"
              >
                <motion.span
                  animate={{
                    scale: totalXP > previousXP ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-[#3B82F6]"
                  style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px' }}
                >
                  ⚡
                </motion.span>
                <motion.span
                  key={totalXP}
                  initial={{ scale: 1.2, color: '#10B981' }}
                  animate={{ scale: 1, color: '#3B82F6' }}
                  transition={{ duration: 0.3 }}
                  style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px' }}
                >
                  {totalXP} XP
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-3"
              >
                {/* Header */}
                <div
                  className="text-[#94A3B8] mb-2"
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.3em',
                  }}
                >
                  DISCOVERY PROGRESS
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="h-1 bg-[#0B1120] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full bg-[#3B82F6] rounded-full"
                    />
                  </div>
                </div>

                {/* Percentage */}
                <div
                  className="text-[#94A3B8] text-right"
                  style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}
                >
                  {Math.floor(percentage)}% explored
                </div>

                {/* Milestone Message */}
                {getMilestoneMessage() && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-[#3B82F6] text-center"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px' }}
                  >
                    {getMilestoneMessage()}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full right-0 mt-2 px-3 py-2 bg-[#0B1120] border border-[#10B981] rounded-lg whitespace-nowrap"
              style={{
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
              }}
            >
              <div
                className="text-[#10B981]"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}
              >
                +{toast.points} — {toast.label}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 100% Completion Overlay */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#0B1120] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="max-w-md text-center"
            >
              {/* Small Label */}
              <div
                className="text-[#3B82F6] mb-6"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '12px',
                  letterSpacing: '0.3em',
                }}
              >
                DISCOVERY COMPLETE
              </div>

              {/* Headline */}
              <h2
                className="text-[#F1F5F9] mb-6"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '48px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                You found everything.
              </h2>

              {/* Body Text */}
              <p
                className="text-[#94A3B8] mb-8"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '16px',
                  lineHeight: 1.6,
                }}
              >
                Not many people explore this far.
                <br />
                Nahead would genuinely like to meet you.
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={handleCloseCompletion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#3B82F6] text-white rounded-xl font-semibold transition-all duration-300"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '16px',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                }}
              >
                Send Nahead a message →
              </motion.button>

              {/* Small Note */}
              <div
                className="text-[#1E3A5F] mt-6"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                }}
              >
                (This message is only shown once)
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
