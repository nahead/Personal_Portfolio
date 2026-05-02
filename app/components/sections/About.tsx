'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useXPSystem } from '../../hooks/useXPSystem';

gsap.registerPlugin(ScrollTrigger);

const CODE = `class NaheadJokhio:
    def __init__(self):
        self.name = "Nahead Jokhio"
        self.age = 18
        self.location = "Karachi, Pakistan"
        self.origin = "Village, M9 Motorway"

    @property
    def skills(self) -> list:
        return [
            "Python", "TypeScript",
            "Next.js", "FastAPI",
            "MCP", "OpenAI Agents SDK"
        ]

    def mission(self) -> str:
        return """
        Proving that world-class developers
        can come from anywhere in Pakistan.
        """

me = NaheadJokhio()
print(me.mission())
# Output: Proving that world-class
# developers can come from anywhere.`;

function TypingCode() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const codeRef = useRef(null);
  const isInView = useInView(codeRef, { once: true, margin: '-100px' });
  const hasTyped = useRef(false);

  useEffect(() => {
    if (isInView && !hasTyped.current) {
      hasTyped.current = true;
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index < CODE.length) {
          setDisplayedCode(CODE.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }
  }, [isInView]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const highlightCode = (code: string) => {
    let highlighted = code
      .replace(/(class|def|return|import|from|@property)/g, '<span class="text-[#C678DD]">$1</span>')
      .replace(/(self|me)/g, '<span class="text-[#E06C75]">$1</span>')
      .replace(/(".*?")/g, '<span class="text-[#98C379]">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-[#5C6370]">$1</span>')
      .replace(/(\d+)/g, '<span class="text-[#D19A66]">$1</span>');

    if (showCursor) {
      highlighted += '<span class="inline-block w-2 h-4 bg-[#3B82F6] ml-1 animate-pulse align-middle"></span>';
    }

    return highlighted;
  };

  return (
    <div ref={codeRef} className="bg-[#0B1120] border border-[#1E3A5F] rounded-lg sm:rounded-xl overflow-hidden w-full h-[550px] sm:h-[580px] md:h-[620px] lg:h-[660px] xl:h-[700px] flex flex-col">
      {/* Terminal Header */}
      <div className="bg-[#1A2333] px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 flex items-center gap-1.5 sm:gap-2 border-b border-[#1E3A5F] flex-shrink-0">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#EF4444]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#10B981]" />
        </div>
        <span className="text-xs sm:text-sm text-[#94A3B8] ml-1.5 sm:ml-2 font-mono">nahead.py</span>
      </div>

      {/* Code Content - Fixed height with internal scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-4 md:p-5 lg:p-6 font-mono text-xs sm:text-sm md:text-sm leading-relaxed will-change-scroll">
        <pre
          className="text-[#ABB2BF] whitespace-pre inline"
          dangerouslySetInnerHTML={{ __html: highlightCode(displayedCode) }}
        />
      </div>
    </div>
  );
}

const content = {
  en: {
    heading: "From a village in Karachi to building AI",
    paragraphs: [
      "Growing up near the M9 Motorway in a village outside Karachi, becoming a developer wasn't the obvious path. But curiosity led me to code, and code led me to a world I never knew existed.",
      "In 2024, I joined the GIAIC IT Course and discovered Python, AI, and the power of building systems that think. What started as learning syntax became building intelligent agents, FastAPI backends, and Next.js applications.",
      "Now at 18, I'm building what most developers only dream about — AI-powered systems that solve real problems. My mission is simple: prove that world-class developers can come from anywhere in Pakistan."
    ],
    currentlyBuilding: "Currently: Building the future",
    stats: {
      location: { label: "Location", value: "Karachi, Pakistan" },
      course: { label: "Course", value: "GIAIC 2024-2026" },
      status: { label: "Status", value: "Available" },
      availableFor: { label: "Available For", value: "Projects & Collab" }
    }
  },
  ur: {
    heading: "Karachi ke gaon se AI developer tak ka safar",
    paragraphs: [
      "M9 Motorway ke qareeb ek gaon mein pala bara hona aur developer banna — ye rasta itna asan nahi tha. Lekin talaash ne mujhe code tak pohanchaya, aur code ne mujhe ek aisi duniya dikhaayi jo main kabhi jaanta nahi tha.",
      "2024 mein maine GIAIC IT Course join kiya aur Python, AI, aur sochne wale systems banane ki taqat ko samjha. Jo syntax seekhne se shuru hua, wo intelligent agents, FastAPI backends, aur Next.js applications banane tak pohonch gaya.",
      "Ab 18 saal ki umar mein, main wo bana raha hoon jo zyada tar developers sirf sapne mein dekhte hain — AI-powered systems jo asli masle hal karein. Mera mission saaf hai: sabit karna ke world-class developers Pakistan ke kisi bhi kone se aa sakte hain."
    ],
    currentlyBuilding: "Abhi: Mustaqbil bana raha hoon",
    stats: {
      location: { label: "Jagah", value: "Karachi, Pakistan" },
      course: { label: "Course", value: "GIAIC 2024-2026" },
      status: { label: "Status", value: "Available" },
      availableFor: { label: "Available For", value: "Projects & Collab" }
    }
  }
};

export default function About() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const { triggerXP } = useXPSystem();
  const hasTriggeredXP = useRef(false);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  const currentContent = content[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            if (!hasTriggeredXP.current) {
              hasTriggeredXP.current = true;
              triggerXP('about_viewed');
            }
          },
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerXP]);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 px-3 sm:px-4 md:px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full items-start">
          {/* Left Column - Code Block */}
          <div ref={leftRef} className="w-full min-w-0">
            <TypingCode />
          </div>

          {/* Right Column - Story Card */}
          <div ref={rightRef} className="w-full min-w-0">
            <div
              className="p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-[#1E3A5F] w-full"
              style={{
                background: 'rgba(26, 35, 51, 0.8)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-mono text-[#3B82F6]">{'< About Me />'}</p>

                {/* Language Toggle */}
                <div className="flex items-center gap-1 sm:gap-2 bg-[#0B1120] border border-[#1E3A5F] rounded-lg p-1">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold transition-all ${
                      language === 'en'
                        ? 'bg-[#3B82F6] text-white'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                    }`}
                  >
                    ENG
                  </button>
                  <button
                    onClick={() => setLanguage('ur')}
                    className={`px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold transition-all ${
                      language === 'ur'
                        ? 'bg-[#3B82F6] text-white'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                    }`}
                  >
                    اردو
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F1F5F9] mb-4 sm:mb-5 md:mb-6 leading-tight">
                {currentContent.heading}
              </h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {currentContent.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Currently Badge */}
              <div className="mt-5 sm:mt-6 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0B1120] border border-[#1E3A5F] rounded-lg w-fit max-w-full">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-[#10B981] rounded-full flex-shrink-0"
                />
                <span className="text-xs sm:text-sm text-[#F1F5F9]">{currentContent.currentlyBuilding}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 w-full">
                <div className="p-3 sm:p-4 bg-[#0B1120] border border-[#1E3A5F] rounded-lg min-w-0">
                  <div className="text-xs text-[#94A3B8] mb-1">{currentContent.stats.location.label}</div>
                  <div className="text-sm font-semibold text-[#F1F5F9] leading-tight">{currentContent.stats.location.value}</div>
                </div>

                <div className="p-3 sm:p-4 bg-[#0B1120] border border-[#1E3A5F] rounded-lg min-w-0">
                  <div className="text-xs text-[#94A3B8] mb-1">{currentContent.stats.course.label}</div>
                  <div className="text-sm font-semibold text-[#F1F5F9] leading-tight">{currentContent.stats.course.value}</div>
                </div>

                <div className="p-3 sm:p-4 bg-[#0B1120] border border-[#1E3A5F] rounded-lg min-w-0">
                  <div className="text-xs text-[#94A3B8] mb-1">{currentContent.stats.status.label}</div>
                  <div className="text-sm font-semibold text-[#10B981] leading-tight">{currentContent.stats.status.value}</div>
                </div>

                <div className="p-3 sm:p-4 bg-[#0B1120] border border-[#1E3A5F] rounded-lg min-w-0">
                  <div className="text-xs text-[#94A3B8] mb-1">{currentContent.stats.availableFor.label}</div>
                  <div className="text-sm font-semibold text-[#F1F5F9] leading-tight">{currentContent.stats.availableFor.value}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
