import React from 'react';
import { Globe } from 'lucide-react';
import { playSoftTap } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

// variant="full" shows the whole language name (used on the landing page so the choice is obvious)
export default function LanguageSwitch({ variant = 'default', showIcon = true }) {
  const { language, setLanguage, t } = useLanguage();

  const handleSelect = (lang) => {
    playSoftTap();
    setLanguage(lang);
  };

  const languages = [
    { code: 'de', label: 'DE', title: 'Deutsch' },
    { code: 'es', label: 'ES', title: 'Español' },
    { code: 'en', label: 'EN', title: 'English' }
  ];

  return (
    <div className={`lang-switch-group ${variant}`} role="group" aria-label={t('language.choose')}>
      {showIcon && <Globe size={13} className="lang-globe-icon" aria-hidden="true" />}
      <div className="lang-pills">
        {languages.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              className={`lang-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(item.code)}
              title={item.title}
              aria-label={item.title}
              aria-pressed={isActive}
              lang={item.code}
              type="button"
            >
              {variant === 'full' ? item.title : item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
