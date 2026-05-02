'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isUrdu: boolean;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isUrdu: false,
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Check localStorage first
    const saved = localStorage.getItem('nai_language') as Language | null;
    if (saved && (saved === 'en' || saved === 'ur')) {
      setLanguageState(saved);
      return;
    }

    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ur')) {
      setLanguageState('ur');
    } else {
      setLanguageState('en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nai_language', lang);

    // Update document attributes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    }
  };

  // Update document attributes when language changes
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    }
  }, [language, mounted]);

  const isUrdu = language === 'ur';
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isUrdu, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}
