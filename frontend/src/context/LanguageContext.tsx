import React, { createContext, useContext, useState } from 'react';
import { Language, translations } from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  getLocalizedTitle: (jsonStr: string) => string;
  getLocalizedDesc: (jsonStr: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('rr_language') as Language) || 'en';
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('rr_language', l);
  };

  const t = (key: keyof typeof translations['en']): string => {
    const currentDict = translations[lang] || translations['en'];
    const fallbackDict = translations['en'];
    return (currentDict as any)[key] || (fallbackDict as any)[key] || String(key);
  };

  const getLocalizedTitle = (jsonStr: string): string => {
    if (!jsonStr) return '';
    try {
      const parsed = JSON.parse(jsonStr);
      const val = parsed[lang] || parsed['en'] || parsed['hi'] || parsed['kn'] || parsed['mr'] || parsed['gu'] || Object.values(parsed)[0] || '';
      return String(val).replace(/^\d+[\.\s\-]+\s*/, '').trim();
    } catch {
      return String(jsonStr).replace(/^\d+[\.\s\-]+\s*/, '').trim();
    }
  };

  const getLocalizedDesc = (jsonStr: string): string => {
    if (!jsonStr) return '';
    try {
      const parsed = JSON.parse(jsonStr);
      const val = parsed[lang] || parsed['en'] || parsed['hi'] || parsed['kn'] || parsed['mr'] || parsed['gu'] || Object.values(parsed)[0] || '';
      return String(val).trim();
    } catch {
      return String(jsonStr).trim();
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getLocalizedTitle, getLocalizedDesc }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
