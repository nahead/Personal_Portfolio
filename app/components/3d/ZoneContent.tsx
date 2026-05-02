'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useWorldStore } from '@/app/hooks/useWorldStore';
import { useState } from 'react';

const aboutContent = {
  en: {
    title: "About Me",
    age: "Age:",
    ageValue: "18 years old",
    location: "Location:",
    locationValue: "M9 Motorway, Karachi",
    education: "Education:",
    educationValue: "GIAIC Graduate",
    journey: "Journey:",
    journeyValue: "2024 - 2026",
    description: "A self-taught developer from Karachi, proving that geography doesn't define capability. Passionate about AI and building intelligent systems."
  },
  ur: {
    title: "Mere Bare Mein",
    age: "Umar:",
    ageValue: "18 saal",
    location: "Jagah:",
    locationValue: "M9 Motorway, Karachi",
    education: "Taleem:",
    educationValue: "GIAIC Graduate",
    journey: "Safar:",
    journeyValue: "2024 - 2026",
    description: "Karachi se ek self-taught developer, jo sabit kar raha hai ke jagah capability ko define nahi karti. AI aur intelligent systems banane ka junoon."
  }
};

export function ZoneContent() {
  const { currentZone } = useWorldStore();
  const [aboutLanguage, setAboutLanguage] = useState<'en' | 'ur'>('en');

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence mode="wait">
        {currentZone === 1 && <AboutContent key="about" language={aboutLanguage} setLanguage={setAboutLanguage} />}
        {currentZone === 2 && <SkillsContent key="skills" />}
        {currentZone === 3 && <EducationContent key="education" />}
        {currentZone === 4 && <ContactContent key="contact" />}
      </AnimatePresence>
    </div>
  );
}

// About Zone Content - Fully Responsive with Language Toggle
function AboutContent({ language, setLanguage }: { language: 'en' | 'ur', setLanguage: (lang: 'en' | 'ur') => void }) {
  const content = aboutContent[language];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.6 }}
      className="absolute left-4 md:left-[3vw] top-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-[20vw] md:max-w-[400px]"
    >
      <div className="bg-[#1A2333]/90 backdrop-blur-md border border-[#3B82F6]/30 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#F1F5F9]">{content.title}</h2>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-[#0B1120] border border-[#3B82F6]/30 rounded-lg p-0.5 pointer-events-auto">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[9px] md:text-[10px] font-semibold transition-all ${
                language === 'en'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2 py-0.5 rounded text-[9px] md:text-[10px] font-semibold transition-all ${
                language === 'ur'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              UR
            </button>
          </div>
        </div>

        <div className="space-y-2 md:space-y-2.5 text-[#94A3B8] text-xs md:text-sm">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
            <p><span className="text-[#F1F5F9] font-semibold">{content.age}</span> {content.ageValue}</p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
            <p><span className="text-[#F1F5F9] font-semibold">{content.location}</span> {content.locationValue}</p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
            <p><span className="text-[#F1F5F9] font-semibold">{content.education}</span> {content.educationValue}</p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
            <p><span className="text-[#F1F5F9] font-semibold">{content.journey}</span> {content.journeyValue}</p>
          </div>
        </div>

        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#3B82F6]/20">
          <p className="text-[#F1F5F9] leading-relaxed text-xs md:text-sm">
            {content.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Skills Zone Content - Fully Responsive
function SkillsContent() {
  const skills = [
    { name: 'Python', level: 90, category: 'Backend' },
    { name: 'TypeScript', level: 85, category: 'Frontend' },
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'Next.js', level: 90, category: 'Framework' },
    { name: 'FastAPI', level: 85, category: 'Backend' },
    { name: 'MCP', level: 80, category: 'AI/ML' },
    { name: 'OpenAI SDK', level: 85, category: 'AI/ML' },
    { name: 'Gemini API', level: 80, category: 'AI/ML' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.6 }}
      className="absolute right-4 md:right-[3vw] top-[35%] -translate-y-1/2 w-[calc(100%-2rem)] md:w-[22vw] md:max-w-[420px]"
    >
      <div className="bg-[#1A2333]/90 backdrop-blur-md border border-[#3B82F6]/30 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl max-h-[70vh] overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold text-[#F1F5F9] mb-3 md:mb-4">Technical Skills</h2>

        <div className="space-y-2.5 md:space-y-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-1 md:mb-1.5">
                <span className="text-[#F1F5F9] font-medium text-xs md:text-sm">{skill.name}</span>
                <span className="text-[#3B82F6] text-[10px] md:text-xs">{skill.category}</span>
              </div>
              <div className="w-full bg-[#0B1120] rounded-full h-1 md:h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Education Zone Content - Fully Responsive
function EducationContent() {
  const education = [
    {
      title: 'Matriculation',
      year: '2022',
      status: 'Completed',
      color: '#10B981',
      description: 'Foundation in Science',
    },
    {
      title: 'Intermediate',
      year: 'Present',
      status: 'In Progress',
      color: '#F59E0B',
      description: 'Pre-Engineering',
    },
    {
      title: 'GIAIC IT Course',
      year: '2024 - 2026',
      status: 'Completed',
      color: '#3B82F6',
      description: 'AI, Web Dev, Cloud',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      <div style={{ width: 'min(900px, 90vw)' }}>
        <div className="bg-[#1A2333]/90 backdrop-blur-md border border-[#3B82F6]/30 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-[#F1F5F9] mb-4 md:mb-5 text-center">Education Journey</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {education.map((edu, index) => (
            <motion.div
              key={edu.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-[#0B1120]/50 rounded-lg md:rounded-xl p-4 md:p-5 border border-[#3B82F6]/20 hover:border-[#3B82F6]/50 transition-all">
                <div
                  className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full mb-2 md:mb-3"
                  style={{ backgroundColor: edu.color }}
                />
                <h3 className="text-base md:text-lg font-bold text-[#F1F5F9] mb-1">{edu.title}</h3>
                <p className="text-[#3B82F6] text-xs md:text-sm mb-1 md:mb-2">{edu.year}</p>
                <p className="text-[#94A3B8] text-xs md:text-sm mb-2 md:mb-3">{edu.description}</p>
                <span
                  className="inline-block px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold"
                  style={{
                    backgroundColor: `${edu.color}20`,
                    color: edu.color
                  }}
                >
                  {edu.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </motion.div>
  );
}

// Contact Zone Content - Fully Responsive
function ContactContent() {
  const contacts = [
    { name: 'Email', value: 'naheadj@gmail.com', icon: '📧', url: 'mailto:naheadj@gmail.com' },
    { name: 'GitHub', value: 'github.com/nahead', icon: '💻', url: 'https://github.com/nahead' },
    { name: 'LinkedIn', value: 'linkedin.com/in/nahead', icon: '💼', url: 'https://www.linkedin.com/in/nahead' },
    { name: 'Twitter', value: '@naheadj', icon: '🐦', url: 'https://twitter.com/naheadj' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      <div style={{ width: 'min(800px, 90vw)' }}>
        <div className="bg-[#1A2333]/90 backdrop-blur-md border border-[#3B82F6]/30 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-[#F1F5F9] mb-1 text-center">Let's Connect</h2>
        <p className="text-[#94A3B8] text-xs md:text-sm text-center mb-4 md:mb-6">
          Open for opportunities and collaborations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.url}
              target={contact.url.startsWith('http') ? '_blank' : undefined}
              rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0B1120]/50 rounded-lg md:rounded-xl p-4 md:p-5 border border-[#3B82F6]/20 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 transition-all cursor-pointer pointer-events-auto group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl">{contact.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[#F1F5F9] font-semibold text-sm md:text-base group-hover:text-[#3B82F6] transition-colors truncate">
                    {contact.name}
                  </h3>
                  <p className="text-[#94A3B8] text-xs md:text-sm truncate">{contact.value}</p>
                </div>
                <div className="text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-4 md:mt-6 pt-4 md:pt-5 border-t border-[#3B82F6]/20 text-center">
          <p className="text-[#94A3B8] text-xs md:text-sm">
            Karachi, Pakistan 🇵🇰 • Remote work worldwide 🌍
          </p>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
