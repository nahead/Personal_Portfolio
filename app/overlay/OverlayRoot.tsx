'use client';

import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useWorldStore } from '../hooks/useWorldStore';
import { HeroOverlay } from './zones/HeroOverlay';
import { AboutOverlay } from './zones/AboutOverlay';
import { SkillsOverlay } from './zones/SkillsOverlay';
import { EducationOverlay } from './zones/EducationOverlay';
import { ContactOverlay } from './zones/ContactOverlay';

const NAIChat = dynamic(() => import('../components/sections/NAIChat'), { ssr: false });
const LanguageToggle = dynamic(() => import('../components/ui/LanguageToggle'), { ssr: false });
const XPWidget = dynamic(() => import('../components/ui/XPWidget'), { ssr: false });
const LiveStatus = dynamic(() => import('../components/ui/LiveStatus'), { ssr: false });

function ZoneIndicator() {
  const { currentZone } = useWorldStore();

  const zones = [
    { id: 0, name: 'Hero' },
    { id: 1, name: 'About' },
    { id: 2, name: 'Skills' },
    { id: 3, name: 'Education' },
    { id: 4, name: 'Contact' },
  ];

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto z-50">
      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => {
            const targetScroll = zone.id * 0.2;
            window.scrollTo({
              top: targetScroll * document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }}
          className="group relative"
          aria-label={`Go to ${zone.name}`}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentZone === zone.id
                ? 'bg-[#3B82F6] border-[#3B82F6] scale-125'
                : 'bg-transparent border-[#1E3A5F] hover:border-[#3B82F6]'
            }`}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {zone.name}
          </span>
        </button>
      ))}
    </div>
  );
}

function ScrollIndicator() {
  const { scrollProgress } = useWorldStore();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[#1E3A5F] pointer-events-none z-50">
      <div
        className="h-full bg-[#3B82F6] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}

export function OverlayRoot() {
  const { currentZone } = useWorldStore();

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      <AnimatePresence mode="wait">
        {currentZone === 0 && <HeroOverlay key="hero" />}
        {currentZone === 1 && <AboutOverlay key="about" />}
        {currentZone === 2 && <SkillsOverlay key="skills" />}
        {currentZone === 3 && <EducationOverlay key="education" />}
        {currentZone === 4 && <ContactOverlay key="contact" />}
      </AnimatePresence>

      {/* Always visible elements */}
      <ScrollIndicator />
      <ZoneIndicator />
      <LanguageToggle />
      <XPWidget />
      <LiveStatus />
      <NAIChat />
    </div>
  );
}
