'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Zap } from 'lucide-react';

const GITHUB_USERNAME = 'nahead';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;
const CACHE_KEY = 'nai_github_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface GitHubCache {
  data: string;
  timestamp: number;
}

interface GitHubEvent {
  type: string;
  created_at: string;
}

export default function LiveStatus() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<'active' | 'away' | 'sleeping'>('active');
  const [lastCommit, setLastCommit] = useState<string>('Recently active');
  const [mounted, setMounted] = useState(false);

  // Determine status based on Pakistan time (UTC+5)
  const getPakistanStatus = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const pakistanTime = new Date(utc + 5 * 3600000);
    const hour = pakistanTime.getHours();

    if (hour >= 6 && hour < 23) {
      return 'active';
    } else {
      return 'sleeping';
    }
  };

  // Fetch GitHub activity
  const fetchGitHubActivity = async () => {
    try {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cacheData: GitHubCache = JSON.parse(cached);
        const now = Date.now();

        if (now - cacheData.timestamp < CACHE_DURATION) {
          setLastCommit(cacheData.data);
          return;
        }
      }

      // Fetch fresh data
      const response = await fetch(GITHUB_API_URL);
      if (!response.ok) throw new Error('GitHub API failed');

      const events = await response.json();

      if (events && events.length > 0) {
        // Find most recent push event
        const pushEvent = events.find((e: GitHubEvent) => e.type === 'PushEvent');

        if (pushEvent) {
          const eventDate = new Date(pushEvent.created_at);
          const now = new Date();
          const hoursDiff = Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 60 * 60));

          let commitMessage = '';
          if (hoursDiff < 24) {
            commitMessage = 'Recently committed';
          } else if (hoursDiff < 48) {
            commitMessage = 'Committed yesterday';
          } else {
            commitMessage = 'Working on something new...';
          }

          setLastCommit(commitMessage);

          // Cache the result
          const cacheData: GitHubCache = {
            data: commitMessage,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } else {
          setLastCommit('Recently active');
        }
      } else {
        setLastCommit('Recently active');
      }
    } catch (error) {
      console.error('Failed to fetch GitHub activity:', error);
      setLastCommit('Recently active');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setStatus(getPakistanStatus());
    fetchGitHubActivity();

    // Update status every minute
    const statusInterval = setInterval(() => {
      setStatus(getPakistanStatus());
    }, 60000);

    return () => clearInterval(statusInterval);
  }, []);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          dot: '🟢',
          text: 'Currently active',
          color: '#10B981',
        };
      case 'away':
        return {
          dot: '🟡',
          text: 'Away',
          color: '#F59E0B',
        };
      case 'sleeping':
        return {
          dot: '⚫',
          text: 'Offline (probably sleeping)',
          color: '#94A3B8',
        };
    }
  };

  if (!mounted) return null;

  const statusConfig = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed bottom-6 left-6 z-[100] max-md:hidden"
    >
      <motion.div
        animate={{
          height: isExpanded ? 'auto' : '40px',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="bg-[#1A2333] border border-[#1E3A5F] rounded-xl overflow-hidden cursor-pointer"
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          width: isExpanded ? '200px' : 'auto',
        }}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Collapsed State */}
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-3.5 py-2 flex items-center gap-2"
            >
              <motion.span
                animate={{
                  scale: status === 'active' ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {statusConfig.dot}
              </motion.span>
              <span
                className="text-[#94A3B8]"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}
              >
                Nahead is {status}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-3.5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="text-[#3B82F6]"
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                  }}
                >
                  LIVE STATUS
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                  style={{ fontSize: '16px', lineHeight: 1 }}
                >
                  ×
                </button>
              </div>

              {/* Status Row */}
              <div className="flex items-center gap-2 mb-2.5">
                <motion.span
                  animate={{
                    scale: status === 'active' ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {statusConfig.dot}
                </motion.span>
                <span
                  className="text-[#F1F5F9]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px' }}
                >
                  {statusConfig.text}
                </span>
              </div>

              {/* GitHub Activity Row */}
              <div className="flex items-center gap-2 mb-2.5">
                <Code2 size={12} className="text-[#94A3B8]" />
                <span
                  className="text-[#94A3B8]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px' }}
                >
                  {lastCommit}
                </span>
              </div>

              {/* Current Focus Row */}
              <div className="flex items-center gap-2 mb-2.5">
                <Zap size={12} className="text-[#3B82F6]" />
                <span
                  className="text-[#F1F5F9]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px' }}
                >
                  Building: AI-powered apps
                </span>
              </div>

              {/* Availability Row */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#10B981]" style={{ fontSize: '8px' }}>
                  ●
                </span>
                <span
                  className="text-[#94A3B8]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px' }}
                >
                  Status: Open to work
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={handleCTAClick}
                className="text-[#3B82F6] hover:underline transition-all w-full text-left"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px' }}
              >
                → Let&apos;s work together
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
