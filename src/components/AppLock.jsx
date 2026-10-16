import React, { useState, useEffect } from 'react';
import { Lock, Unlock, KeyRound, Sparkles, Check, Delete } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftTap, playUnlockChime } from '../utils/audio';
import { LOGO_04 } from '../utils/assets';

export default function AppLock({ soundEnabled, onUnlock }) {
  const { language } = useLanguage();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const APP_PIN = '2211';

  const strings = {
    de: {
      kicker: 'Privater Schutzraum',
      title: 'Willkommen zu Hause, Marie',
      subtitle: 'Ein vertrauter, intimer und warmer Raum nur für dich.',
      userLabel: 'Benutzerin:',
      userName: 'Marie (Souverän & Frei)',
      pinLabel: 'Gib deine 4-stellige PIN ein:',
      hint: 'Hinweis: 2211',
      wrongPin: 'Falsche PIN. Bitte versuche es erneut (Hinweis: 2211)',
      unlockBtn: 'Santuario betreten'
    },
    es: {
      kicker: 'Refugio Privado',
      title: 'Bienvenida a casa, Marie',
      subtitle: 'Un espacio íntimo, cálido y honesto solo para ti.',
      userLabel: 'Usuario:',
      userName: 'Marie (Soberana & Libre)',
      pinLabel: 'Ingresa tu PIN de 4 dígitos:',
      hint: 'Pista: 2211',
      wrongPin: 'PIN incorrecto. Inténtalo de nuevo (Pista: 2211)',
      unlockBtn: 'Entrar al Santuario'
    },
    en: {
      kicker: 'Private Sanctuary',
      title: 'Welcome home, Marie',
      subtitle: 'An intimate, warm, and honest space made just for you.',
      userLabel: 'User:',
      userName: 'Marie (Sovereign & Free)',
      pinLabel: 'Enter your 4-digit PIN:',
      hint: 'Hint: 2211',
      wrongPin: 'Incorrect PIN. Please try again (Hint: 2211)',
      unlockBtn: 'Enter Sanctuary'
    }
  };

  const str = strings[language] || strings.de;

  const handleDigit = (digit) => {
    if (pin.length >= 4) return;
    playSoftTap();
    setError(false);
    const next = pin + digit;
    setPin(next);
    if (next.length === 4) {
      verifyPin(next);
    }
  };

  const handleBackspace = () => {
    playSoftTap();
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    playSoftTap();
    setError(false);
    setPin('');
  };

  const verifyPin = (candidate) => {
    if (candidate === APP_PIN) {
      if (soundEnabled) playUnlockChime();
      setTimeout(() => {
        onUnlock();
      }, 250);
    } else {
      setError(true);
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 850);
    }
  };

  // Allow physical keyboard typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div 
      className="app-lock-overlay animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(145deg, #120E15 0%, #1A131C 50%, #0D0910 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="app-lock-card glass-panel"
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'rgba(28, 20, 32, 0.85)',
          border: '1px solid rgba(216, 74, 88, 0.3)',
          borderRadius: '24px',
          padding: '28px 22px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(216, 74, 88, 0.15)'
        }}
      >
        {/* Radiant Logo with Aura */}
        <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 16px' }}>
          <div 
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(216, 74, 88, 0.4) 0%, rgba(197, 160, 129, 0.2) 60%, transparent 80%)',
              filter: 'blur(12px)',
              animation: 'pulse 3s infinite ease-in-out'
            }} 
          />
          <img 
            src={LOGO_04} 
            alt="Marie Logo" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              position: 'relative', 
              zIndex: 1,
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' 
            }} 
          />
        </div>

        <span 
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#D84A58',
            fontWeight: 700,
            display: 'block',
            marginBottom: '4px'
          }}
        >
          🌹 {str.kicker}
        </span>
        <h2 className="font-serif" style={{ fontSize: '1.6rem', color: '#FAF7F2', margin: '0 0 6px' }}>
          {str.title}
        </h2>
        <p style={{ fontSize: '12.5px', color: '#B8AFA6', margin: '0 0 18px', lineHeight: 1.45 }}>
          {str.subtitle}
        </p>

        {/* User Pill */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '20px'
          }}
        >
          <span style={{ fontSize: '14px' }}>👸</span>
          <span style={{ fontSize: '12.5px', color: '#FAF7F2', fontWeight: 600 }}>{str.userName}</span>
        </div>

        {/* PIN Indicators */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '11.5px', color: '#A0968E', marginBottom: '8px' }}>
            {str.pinLabel}
          </label>
          <div 
            className={error ? 'pin-error-shake' : ''} 
            style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}
          >
            {[0, 1, 2, 3].map((i) => {
              const isFilled = pin.length > i;
              return (
                <span
                  key={i}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: isFilled 
                      ? '#D84A58' 
                      : 'rgba(255, 255, 255, 0.15)',
                    border: isFilled 
                      ? '1px solid #D84A58' 
                      : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: isFilled ? '0 0 10px rgba(216, 74, 88, 0.6)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              );
            })}
          </div>
          {error && (
            <span style={{ fontSize: '11px', color: '#E05D44', display: 'block', marginTop: '8px' }}>
              {str.wrongPin}
            </span>
          )}
          {!error && (
            <span style={{ fontSize: '11px', color: '#7DA3BE', display: 'block', marginTop: '8px', opacity: 0.8 }}>
              {str.hint}
            </span>
          )}
        </div>

        {/* Numeric Keypad */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            maxWidth: '240px',
            margin: '0 auto 12px'
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                if (val === 'C') handleClear();
                else if (val === '⌫') handleBackspace();
                else handleDigit(val.toString());
              }}
              style={{
                height: '46px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: val === 'C' || val === '⌫' ? '#B8AFA6' : '#FAF7F2',
                fontSize: typeof val === 'number' ? '18px' : '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.94)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
