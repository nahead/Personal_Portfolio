'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useWorldStore } from '@/app/hooks/useWorldStore';

const zoneData = [
  {
    id: 0,
    title: 'NAHEAD JOKHIO',
    subtitle: 'AI Developer & Full-Stack Engineer',
    description: 'Building intelligent systems with Python, TypeScript & Next.js',
  },
  {
    id: 1,
    title: 'ABOUT',
    subtitle: 'From Karachi, Pakistan',
    description: '18 years old • GIAIC Graduate • Self-taught Developer',
  },
  {
    id: 2,
    title: 'SKILLS',
    subtitle: 'Technical Expertise',
    description: 'Python • TypeScript • Next.js • FastAPI • AI/ML',
  },
  {
    id: 3,
    title: 'PROJECTS',
    subtitle: 'Featured Work',
    description: 'NAI Chatbot • 3D Portfolio • AI Applications',
  },
  {
    id: 4,
    title: 'EDUCATION',
    subtitle: 'Learning Journey',
    description: 'Matriculation → Intermediate → GIAIC IT Course',
  },
  {
    id: 5,
    title: 'CONTACT',
    subtitle: 'Get In Touch',
    description: 'Open for opportunities and collaborations',
  },
];

export function ZoneOverlay() {
  const { currentZone } = useWorldStore();
  const zone = zoneData[Math.min(currentZone, zoneData.length - 1)];

  if (!zone) return null;

  // Hide large title for zones with content panels (1-4)
  const showLargeTitle = currentZone === 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {showLargeTitle && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentZone}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '25%',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 2rem'
            }}
          >
            {/* Zone Title - Fully Responsive */}
            <h1
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F1F5F9] mb-3 md:mb-4 lg:mb-6"
              style={{
                letterSpacing: '0.01em',
                lineHeight: '1.2',
                maxWidth: '90vw'
              }}
            >
              {zone.title}
            </h1>

            {/* Zone Subtitle - Fully Responsive */}
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#3B82F6] mb-4 md:mb-6 font-light"
              style={{
                maxWidth: '85vw'
              }}
            >
              {zone.subtitle}
            </p>

            {/* Zone Description - Fully Responsive */}
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg text-[#94A3B8]"
              style={{
                maxWidth: 'min(80vw, 700px)'
              }}
            >
              {zone.description}
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Small zone indicator for content zones - Fully Responsive */}
      {!showLargeTitle && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 md:top-6 lg:top-8 left-1/2 -translate-x-1/2 text-center"
        >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#3B82F6]">{zone.title}</h2>
        </motion.div>
      )}

      {/* Scroll Indicator - only on Hero zone, Fully Responsive */}
      {currentZone === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2"
        >
          <p className="text-[#94A3B8] text-xs sm:text-sm">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-4 h-7 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-[#3B82F6] rounded-full flex items-start justify-center p-1 sm:p-1.5 md:p-2"
          >
            <div className="w-0.5 h-1.5 sm:w-0.5 sm:h-2 md:w-1 md:h-3 bg-[#3B82F6] rounded-full" />
          </motion.div>
        </motion.div>
      )}

      {/* Zone Progress Indicator - Fully Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-3 sm:right-4 md:right-6 lg:right-10 flex flex-col gap-1 sm:gap-1.5 md:gap-2">
        {zoneData.map((z, i) => (
          <div
            key={z.id}
            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
              i === currentZone
                ? 'bg-[#3B82F6] scale-150'
                : i < currentZone
                ? 'bg-[#3B82F6] opacity-50'
                : 'bg-[#94A3B8] opacity-30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
