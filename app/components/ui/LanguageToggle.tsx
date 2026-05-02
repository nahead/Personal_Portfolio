'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (newLang: 'en' | 'ur') => {
    if (newLang === language) return;

    // Brief flash effect
    document.body.style.opacity = '0';
    setTimeout(() => {
      setLanguage(newLang);
      document.body.style.opacity = '1';
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed top-4 left-4 z-[998] max-md:top-3 max-md:left-3"
    >
      <div
        className="flex items-center bg-[#1A2333] border border-[#1E3A5F] rounded-full p-1"
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* English Button */}
        <button
          onClick={() => handleToggle('en')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            language === 'en'
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          EN
        </button>

        {/* Urdu Button */}
        <button
          onClick={() => handleToggle('ur')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            language === 'ur'
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
          style={{
            fontFamily: language === 'ur' ? 'system-ui, sans-serif' : 'Space Grotesk, sans-serif',
          }}
        >
          اردو
        </button>
      </div>
    </motion.div>
  );
}
