import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: keyof typeof translations['hi']) => string;
  getLocalizedTitle: (jsonStr: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('rr_language') as Language) || 'hi';
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('rr_language', l);
  };

  const t = (key: keyof typeof translations['hi']): string => {
    return translations[lang][key] || translations['en'][key] || String(key);
  };

  const getLocalizedTitle = (jsonStr: string): string => {
    try {
      const parsed = JSON.parse(jsonStr);
      return parsed[lang] || parsed['hi'] || parsed['en'] || Object.values(parsed)[0] || '';
    } catch {
      return jsonStr;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getLocalizedTitle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
