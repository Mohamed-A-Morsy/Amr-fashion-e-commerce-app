'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types';
import en from '@/lib/i18n/en.json';
import ar from '@/lib/i18n/ar.json';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const translations = {
    en,
    ar,
  };

  const t = (key: string, replacements?: Record<string, string | number>) => {
    const currentTranslations = translations[language] as Record<string, string>;
    let value = currentTranslations[key] || key;

    if (replacements) {
      Object.entries(replacements).forEach(([key, val]) => {
        value = value.replace(`{${key}}`, String(val));
      });
    }

    return value;
  };

  const isRTL = language === 'ar';

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
