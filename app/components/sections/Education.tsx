'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useXPSystem } from '../../hooks/useXPSystem';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    id: 1,
    title: 'Matriculation',
    year: '2022-2023',
    status: 'COMPLETED',
    statusColor: '#10B981',
    icon: '🎓',
    description: 'Foundation of academic journey',
    isHero: false,
  },
  {
    id: 2,
    title: 'Intermediate',
    year: '2023 — Present',
    status: 'IN PROGRESS',
    statusColor: '#F59E0B',
    icon: '📚',
    description: 'Continuing academic excellence',
    isHero: false,
    pulsing: true,
  },
  {
    id: 3,
    title: 'GIAIC IT Course',
    year: '2024 — March 2026',
    status: 'COMPLETED',
    statusColor: '#10B981',
    icon: '💻',
    description:
      'The journey that changed everything. Mastered Python, TypeScript, Next.js, FastAPI, MCP & OpenAI Agents SDK. Went from zero to building world-class AI applications.',
    isHero: true,
    skills: ['Python', 'TypeScript', 'Next.js', 'FastAPI', 'MCP', 'OpenAI SDK', 'Gemini API'],
  },
];

function TimelineEntry({
  entry,
  index,
  isLeft,
}: {
  entry: typeof TIMELINE_DATA[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
        <div
          className={`p-6 bg-[#1A2333] border rounded-2xl transition-[border-color,box-shadow] duration-300 ${
            entry.isHero
              ? 'border-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.3)] lg:p-8'
              : 'border-[#1E3A5F] hover:border-[#3B82F6]'
          }`}
        >
          {/* Status Badge */}
          <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
            <motion.div
              animate={
                entry.pulsing
                  ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }
                  : {}
              }
              transition={entry.pulsing ? { duration: 2, repeat: Infinity } : {}}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.statusColor }}
            />
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${entry.statusColor}20`,
                color: entry.statusColor,
              }}
            >
              {entry.status}
            </span>
          </div>

          {/* Year */}
          <p className="text-sm text-[#3B82F6] font-semibold mb-2">{entry.year}</p>

          {/* Title */}
          <h3
            className={`font-bold text-[#F1F5F9] mb-3 ${
              entry.isHero ? 'text-3xl' : 'text-2xl'
            }`}
          >
            {entry.title}
          </h3>

          {/* Description */}
          <p className={`text-[#94A3B8] ${entry.isHero ? 'text-base' : 'text-sm'}`}>
            {entry.description}
          </p>

          {/* Skills Chips (Hero Entry Only) */}
          {entry.isHero && entry.skills && (
            <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
              {entry.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold bg-[#0B1120] text-[#3B82F6] border border-[#1E3A5F] rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timeline Node */}
      <div className="relative flex items-center justify-center">
        <div
          className={`w-16 h-16 rounded-full border-4 border-[#0B1120] flex items-center justify-center text-2xl z-10 ${
            entry.isHero ? 'bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-[#1A2333]'
          }`}
        >
          {entry.icon}
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { triggerXP } = useXPSystem();
  const hasTriggeredXP = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggeredXP.current) {
      hasTriggeredXP.current = true;
      triggerXP('education_viewed');
    }
  }, [isInView, triggerXP]);

  useEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-mono text-[#3B82F6] mb-4">{'< Education />'}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F1F5F9] mb-4">
            My Journey
          </h2>
          <p className="text-lg text-[#94A3B8]">From foundation to transformation</p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-[#1E3A5F] lg:-translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-[#1E3A5F] via-[#3B82F6] to-[#3B82F6]"
              style={{ height: '0%' }}
            />
          </div>

          {/* Timeline Entries */}
          <div className="space-y-16 lg:space-y-24">
            {TIMELINE_DATA.map((entry, index) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
