import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftTap } from '../utils/audio';

export default function LanguageSwitch({ variant = 'default', showIcon = true }) {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang) => {
    playSoftTap();
    setLanguage(lang);
  };

  const languages = [
    { code: 'en', label: 'EN', title: 'English' },
    { code: 'de', label: 'DE', title: 'Deutsch' },
    { code: 'es', label: 'ES', title: 'Español' }
  ];

  return (
    <div className={`lang-switch-group ${variant}`}>
      {showIcon && <Globe size={13} className="lang-globe-icon" />}
      <div className="lang-pills">
        {languages.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              className={`lang-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(item.code)}
              title={item.title}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
