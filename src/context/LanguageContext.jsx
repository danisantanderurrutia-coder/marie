import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('marie_language') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('marie_language', lang);
    } catch (e) {}
  };

  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = TRANSLATIONS[language] || TRANSLATIONS.en;
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to English if missing in German
        let enCurrent = TRANSLATIONS.en;
        for (const enKey of keys) {
          if (!enCurrent || enCurrent[enKey] === undefined) return fallback;
          enCurrent = enCurrent[enKey];
        }
        return enCurrent;
      }
      current = current[key];
    }
    return current;
  };

  const currentStrings = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentStrings }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
