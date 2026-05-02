'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useXPSystem } from '../../hooks/useXPSystem';

const SKILLS = [
  {
    name: 'Python',
    description: 'Core language for AI & backend',
    proficiency: 5,
    category: 'Language',
    icon: '🐍',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript at scale',
    proficiency: 4,
    category: 'Language',
    icon: '📘',
  },
  {
    name: 'JavaScript',
    description: "The web's foundation",
    proficiency: 4,
    category: 'Language',
    icon: '⚡',
  },
  {
    name: 'Next.js',
    description: 'Full-stack React framework',
    proficiency: 4,
    category: 'Frontend',
    icon: '▲',
  },
  {
    name: 'FastAPI',
    description: 'Lightning-fast Python APIs',
    proficiency: 4,
    category: 'Backend',
    icon: '⚙️',
  },
  {
    name: 'MCP',
    description: 'Model Context Protocol',
    proficiency: 4,
    category: 'AI',
    icon: '🔌',
  },
  {
    name: 'OpenAI Agents SDK',
    description: 'Building autonomous AI agents',
    proficiency: 4,
    category: 'AI',
    icon: '🤖',
  },
];

const CATEGORY_COLORS = {
  Language: '#3B82F6',
  Frontend: '#10B981',
  Backend: '#F59E0B',
  AI: '#8B5CF6',
};

function SkillCard({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { triggerXP } = useXPSystem();
  const hasTriggeredXP = useRef(false);

  const handleHover = () => {
    if (!hasTriggeredXP.current) {
      hasTriggeredXP.current = true;
      triggerXP('skills_interacted');
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseEnter={handleHover}
      className="group relative p-6 bg-[#1A2333] border border-[#1E3A5F] rounded-2xl transition-[border-color,box-shadow] duration-300 hover:border-[#3B82F6] hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)]"
    >
      {/* Icon */}
      <motion.div
        className="text-5xl mb-4"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {skill.icon}
      </motion.div>

      {/* Skill Name */}
      <h3 className="text-xl font-bold text-[#F1F5F9] mb-2">{skill.name}</h3>

      {/* Description */}
      <p className="text-sm text-[#94A3B8] mb-4">{skill.description}</p>

      {/* Proficiency Dots */}
      <div className="flex gap-1.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < skill.proficiency ? 'bg-[#3B82F6]' : 'bg-[#1E3A5F]'
            }`}
          />
        ))}
      </div>

      {/* Category Badge */}
      <div
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: `${CATEGORY_COLORS[skill.category as keyof typeof CATEGORY_COLORS]}20`,
          color: CATEGORY_COLORS[skill.category as keyof typeof CATEGORY_COLORS],
        }}
      >
        {skill.category}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#0A0F1A]">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[#3B82F6] mb-4">{'< Skills />'}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F1F5F9] mb-4">
            Technologies I Master
          </h2>
          <p className="text-lg text-[#94A3B8]">Every tool chosen with purpose</p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.slice(0, 4).map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:max-w-5xl lg:mx-auto">
          {SKILLS.slice(4).map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
