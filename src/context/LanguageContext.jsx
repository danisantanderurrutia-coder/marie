import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TRANSLATIONS, LANGS } from '../i18n';

const LanguageContext = createContext();

// First visit: follow the browser language if we support it, otherwise German
// (Marie's language). After that her explicit choice always wins.
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem('marie_language');
    if (saved && LANGS.includes(saved)) return saved;
  } catch (e) {}
  try {
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const p of prefs) {
      const code = String(p || '').slice(0, 2).toLowerCase();
      if (LANGS.includes(code)) return code;
    }
  } catch (e) {}
  return 'de';
}

function lookup(obj, keys) {
  let cur = obj;
  for (const key of keys) {
    if (cur === undefined || cur === null || cur[key] === undefined) return undefined;
    cur = cur[key];
  }
  return cur;
}

function interpolate(value, vars) {
  if (typeof value !== 'string' || !vars) return value;
  return value.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectInitialLanguage);

  // Keep <html lang> and the tab title in sync (screen readers, hyphenation, spellcheck)
  useEffect(() => {
    document.documentElement.lang = language;
    const title = lookup(TRANSLATIONS[language], ['meta', 'title']);
    if (title) document.title = title;
  }, [language]);

  const setLanguage = (lang) => {
    if (!LANGS.includes(lang)) return;
    setLanguageState(lang);
    try {
      localStorage.setItem('marie_language', lang);
    } catch (e) {}
  };

  const value = useMemo(() => {
    // Fallback chain: current language -> English -> provided fallback
    const t = (path, fallbackOrVars = '') => {
      const vars = fallbackOrVars && typeof fallbackOrVars === 'object' ? fallbackOrVars : null;
      const fallback = vars ? '' : fallbackOrVars;
      const keys = path.split('.');
      let found = lookup(TRANSLATIONS[language], keys);
      if (found === undefined) found = lookup(TRANSLATIONS.en, keys);
      if (found === undefined) return fallback;
      return interpolate(found, vars);
    };
    const currentStrings = TRANSLATIONS[language] || TRANSLATIONS.en;
    return { language, setLanguage, t, currentStrings };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
