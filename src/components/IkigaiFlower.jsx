// src/components/IkigaiFlower.jsx
// Living Ikigai Rose — Realistic botanical petals with organic contours, velvety gradients,
// 3D wind breeze flutter animations, and centered Marie medallion (Logo 04).
// High contrast, mobile-first, and responsive.

import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Lightbulb, 
  Heart, 
  ChevronRight, 
  PersonStanding,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftTap } from '../utils/audio';
import { LOGO_04 } from '../utils/assets';

export default function IkigaiFlower({ onSelectPetal, soundEnabled }) {
  const { language, t } = useLanguage();
  const [hoveredPetal, setHoveredPetal] = useState(null);

  // 5 Botanical Rose Petals: each with rich realistic gradients, wind animations, and distinct geometries
  const petalsConfig = [
    {
      id: 'fire',
      name: t('ikigai.petals.fire.name'),
      subtitle: t('ikigai.petals.fire.subtitle'),
      tag: t('ikigai.petals.fire.tag'),
      color: '#D84A58',
      darkText: '#871D27',
      bgLight: '#FFF2F3',
      gradId: 'gradRoseFire',
      angle: 0,
      icon: Flame,
      // Top Petal (12 o'clock) — Elegant curved rose crown petal
      path: "M 250 240 C 215 150, 160 85, 210 50 C 245 25, 255 25, 290 50 C 340 85, 285 150, 250 240 Z",
      innerPath: "M 250 230 C 225 160, 190 100, 225 75 C 242 62, 258 62, 275 75 C 310 100, 275 160, 250 230 Z",
      animClass: 'petal-flutter-1',
      badge: '🔥'
    },
    {
      id: 'body',
      name: t('ikigai.petals.body.name'),
      subtitle: t('ikigai.petals.body.subtitle'),
      tag: t('ikigai.petals.body.tag'),
      color: '#4A7C9D',
      darkText: '#184764',
      bgLight: '#EDF5FA',
      gradId: 'gradRoseBody',
      angle: 72,
      icon: PersonStanding,
      // Upper Right Petal (~2 o'clock) — Outward unfolding petal
      path: "M 255 245 C 320 180, 395 125, 430 160 C 455 190, 445 210, 420 240 C 375 285, 305 265, 255 245 Z",
      innerPath: "M 260 242 C 315 190, 375 145, 400 170 C 420 190, 415 205, 395 225 C 360 260, 305 250, 260 242 Z",
      animClass: 'petal-flutter-2',
      badge: '🌿'
    },
    {
      id: 'create',
      name: t('ikigai.petals.create.name'),
      subtitle: t('ikigai.petals.create.subtitle'),
      tag: t('ikigai.petals.create.tag'),
      color: '#4F7C4F',
      darkText: '#204A20',
      bgLight: '#EEF6EE',
      gradId: 'gradRoseCreate',
      angle: 144,
      icon: Lightbulb,
      // Lower Right Petal (~5 o'clock) — Grounding blooming petal
      path: "M 252 255 C 325 285, 385 375, 355 415 C 330 445, 305 440, 265 415 C 215 375, 230 300, 252 255 Z",
      innerPath: "M 252 255 C 305 285, 350 355, 330 385 C 312 408, 295 405, 265 385 C 230 355, 238 295, 252 255 Z",
      animClass: 'petal-flutter-3',
      badge: '💡'
    },
    {
      id: 'me',
      name: t('ikigai.petals.me.name'),
      subtitle: t('ikigai.petals.me.subtitle'),
      tag: t('ikigai.petals.me.tag'),
      color: '#A5714A',
      darkText: '#633B18',
      bgLight: '#F8F1EA',
      gradId: 'gradRoseMe',
      angle: 216,
      icon: Heart,
      // Lower Left Petal (~7 o'clock) — Tender heart-root petal
      path: "M 248 255 C 226 300, 185 375, 135 415 C 95 440, 70 445, 45 415 C 15 375, 75 285, 248 255 Z",
      innerPath: "M 248 255 C 222 295, 170 355, 135 385 C 105 405, 88 408, 70 385 C 50 355, 95 285, 248 255 Z",
      animClass: 'petal-flutter-4',
      badge: '🤍'
    },
    {
      id: 'dreams',
      name: t('ikigai.petals.dreams.name'),
      subtitle: t('ikigai.petals.dreams.subtitle'),
      tag: t('ikigai.petals.dreams.tag'),
      color: '#8E44AD',
      darkText: '#521D6B',
      bgLight: '#F5ECF8',
      gradId: 'gradRoseDreams',
      angle: 288,
      icon: Compass,
      // Upper Left Petal (~10 o'clock) — Soaring starlight petal
      path: "M 245 245 C 195 265, 125 285, 80 240 C 55 210, 45 190, 70 160 C 105 125, 180 180, 245 245 Z",
      innerPath: "M 240 242 C 195 250, 140 260, 105 225 C 85 205, 80 190, 100 170 C 125 145, 185 190, 240 242 Z",
      animClass: 'petal-flutter-5',
      badge: '🌌'
    }
  ];

  const handlePetalClick = (id) => {
    if (soundEnabled) playSoftTap();
    onSelectPetal(id);
  };

  return (
    <div className="ikigai-flower-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Dynamic Keyframes for Natural 3D Breeze Flutter */}
      <style>{`
        @keyframes roseBreeze1 {
          0%, 100% { transform: perspective(700px) rotateX(0deg) rotateY(0deg) scale(1); }
          50% { transform: perspective(700px) rotateX(7deg) rotateY(-3deg) scale(1.025); }
        }
        @keyframes roseBreeze2 {
          0%, 100% { transform: perspective(700px) rotateX(0deg) rotateY(0deg) scale(1); }
          50% { transform: perspective(700px) rotateX(-5deg) rotateY(6deg) scale(1.022); }
        }
        @keyframes roseBreeze3 {
          0%, 100% { transform: perspective(700px) rotateX(0deg) rotateY(0deg) scale(1); }
          50% { transform: perspective(700px) rotateX(6deg) rotateY(4deg) scale(1.02); }
        }
        @keyframes roseBreeze4 {
          0%, 100% { transform: perspective(700px) rotateX(0deg) rotateY(0deg) scale(1); }
          50% { transform: perspective(700px) rotateX(-6deg) rotateY(-5deg) scale(1.023); }
        }
        @keyframes roseBreeze5 {
          0%, 100% { transform: perspective(700px) rotateX(0deg) rotateY(0deg) scale(1); }
          50% { transform: perspective(700px) rotateX(5deg) rotateY(-6deg) scale(1.024); }
        }
        @keyframes haloPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
        @keyframes floatPollen {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-7px) scale(1.2); opacity: 0.85; }
        }
        .petal-flutter-1 { animation: roseBreeze1 4.8s ease-in-out infinite; transform-origin: 250px 240px; }
        .petal-flutter-2 { animation: roseBreeze2 5.2s ease-in-out infinite 0.9s; transform-origin: 255px 245px; }
        .petal-flutter-3 { animation: roseBreeze3 4.6s ease-in-out infinite 1.8s; transform-origin: 252px 255px; }
        .petal-flutter-4 { animation: roseBreeze4 5.4s ease-in-out infinite 2.7s; transform-origin: 248px 255px; }
        .petal-flutter-5 { animation: roseBreeze5 5.0s ease-in-out infinite 3.6s; transform-origin: 245px 245px; }
      `}</style>

      {/* Visual Realistic Living Rose */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          aspectRatio: '1 / 1',
          margin: '6px auto 8px'
        }}
      >
        {/* Soft Radial Ambient Rose Aura */}
        <div 
          style={{
            position: 'absolute',
            inset: '8%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216, 74, 88, 0.18) 0%, rgba(197, 160, 129, 0.12) 45%, rgba(142, 68, 173, 0.05) 70%, transparent 80%)',
            filter: 'blur(32px)',
            pointerEvents: 'none',
            animation: 'haloPulse 6s ease-in-out infinite'
          }} 
        />

        <svg 
          viewBox="0 0 500 500" 
          style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0 10px 25px rgba(44, 30, 25, 0.08))' }}
          aria-label="Marie Living Ikigai Rose"
        >
          <defs>
            {/* Soft Ambient Shadow Filter */}
            <filter id="petalShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#2A1B18" floodOpacity="0.14" />
            </filter>
            <filter id="petalGleam" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#D84A58" floodOpacity="0.35" />
            </filter>

            {/* Rich Velvety Petal Radial Gradients */}
            {/* 1. Fire Petal: Crimson velvet to luminous warm vermilion */}
            <radialGradient id="gradRoseFire" cx="45%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF7A88" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#D84A58" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8A202D" stopOpacity="0.98" />
            </radialGradient>
            
            {/* 2. Body Petal: Serene ocean sapphire to deep botanical teal */}
            <radialGradient id="gradRoseBody" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#9BC2DC" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#4A7C9D" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#20455E" stopOpacity="0.98" />
            </radialGradient>

            {/* 3. Create Petal: Sage emerald to lush forest velvet */}
            <radialGradient id="gradRoseCreate" cx="65%" cy="75%" r="70%">
              <stop offset="0%" stopColor="#8DC28D" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#4F7C4F" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1E441E" stopOpacity="0.98" />
            </radialGradient>

            {/* 4. Me Petal: Warm golden terracotta to deep intimate bronze */}
            <radialGradient id="gradRoseMe" cx="30%" cy="75%" r="70%">
              <stop offset="0%" stopColor="#DFC3A8" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#A5714A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#5E381A" stopOpacity="0.98" />
            </radialGradient>

            {/* 5. Dreams Petal: Royal amethyst to mystic cosmic plum */}
            <radialGradient id="gradRoseDreams" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#C38CE0" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#8E44AD" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4A1961" stopOpacity="0.98" />
            </radialGradient>

            {/* Delicate Sepal Background Foliage */}
            <radialGradient id="gradSepal" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#50664F" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2A3B29" stopOpacity="0.85" />
            </radialGradient>
          </defs>

          {/* Background Decorative Organic Sepals (Leaves behind the petals) */}
          <g opacity="0.45">
            <path d="M 250 250 L 320 80 Q 300 60 280 90 Z" fill="url(#gradSepal)" />
            <path d="M 250 250 L 440 220 Q 430 190 400 210 Z" fill="url(#gradSepal)" />
            <path d="M 250 250 L 330 430 Q 300 440 310 400 Z" fill="url(#gradSepal)" />
            <path d="M 250 250 L 90 390 Q 70 370 100 350 Z" fill="url(#gradSepal)" />
            <path d="M 250 250 L 70 140 Q 80 120 110 150 Z" fill="url(#gradSepal)" />
          </g>

          {/* 5 Realistic Overlapping Petals */}
          {petalsConfig.map((petal) => {
            const isHovered = hoveredPetal === petal.id;
            return (
              <g
                key={petal.id}
                className={isHovered ? '' : petal.animClass}
                onClick={() => handlePetalClick(petal.id)}
                onMouseEnter={() => setHoveredPetal(petal.id)}
                onMouseLeave={() => setHoveredPetal(null)}
                style={{ 
                  cursor: 'pointer', 
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isHovered ? 'scale(1.07)' : 'scale(1)'
                }}
              >
                {/* Outer Petal Silhouette with Velvety Fill */}
                <path
                  d={petal.path}
                  fill={`url(#${petal.gradId})`}
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth={isHovered ? '2.5' : '1.2'}
                  filter={isHovered ? 'url(#petalGleam)' : 'url(#petalShadow)'}
                  style={{
                    transition: 'filter 0.3s ease, stroke 0.3s ease'
                  }}
                />

                {/* Inner Velvet Shading (Contour Depth) */}
                <path
                  d={petal.innerPath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.32)"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                  opacity={isHovered ? 0.9 : 0.6}
                />
              </g>
            );
          })}

          {/* Center Pulsing Pollen Core */}
          <circle 
            cx="250" 
            cy="250" 
            r="48" 
            fill="radial-gradient(circle, rgba(255, 223, 140, 0.3) 0%, transparent 80%)" 
            opacity="0.6" 
          />
        </svg>

        {/* Center Star with High-Res Logo 04 & Golden Bezel */}
        <div
          onClick={() => handlePetalClick('me')}
          title="Marie · Zentrum der Harmonie"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '86px',
            height: '86px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1E1617 0%, #100C0D 100%)',
            border: '2.5px solid #D4AF37',
            boxShadow: '0 0 28px rgba(216, 74, 88, 0.45), 0 4px 16px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.09)';
            e.currentTarget.style.boxShadow = '0 0 36px rgba(216, 74, 88, 0.7), 0 6px 22px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(216, 74, 88, 0.45), 0 4px 16px rgba(0,0,0,0.3)';
          }}
        >
          <img 
            src={LOGO_04} 
            alt="Marie Emblem" 
            style={{ width: '44px', height: '44px', objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
          />
          <span 
            className="font-serif" 
            style={{ 
              fontSize: '10px', 
              letterSpacing: '0.14em', 
              color: '#FCE7D0', 
              fontWeight: 700, 
              marginTop: '1px' 
            }}
          >
            MARIE
          </span>
        </div>
      </div>

      {/* Subtle Warm Prompt with High Contrast */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          margin: '2px 0 14px', 
          padding: '4px 12px',
          borderRadius: '14px',
          background: 'rgba(216, 74, 88, 0.05)',
          border: '1px solid rgba(216, 74, 88, 0.15)'
        }}
      >
        <Sparkles size={13} style={{ color: '#D84A58' }} />
        <span 
          style={{ 
            fontStyle: 'italic', 
            fontSize: '12.5px', 
            color: '#4A3D38', 
            fontWeight: 500 
          }}
        >
          {t('ikigai.centerCore.prompt')}
        </span>
      </div>

      {/* 5 High-Contrast, Jewel-Toned Interactive Petal Badges */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '8px', 
          width: '100%', 
          marginBottom: 16 
        }}
      >
        {petalsConfig.map((petal) => {
          const Icon = petal.icon;
          const isHovered = hoveredPetal === petal.id;
          return (
            <button
              key={petal.id}
              onClick={() => handlePetalClick(petal.id)}
              onMouseEnter={() => setHoveredPetal(petal.id)}
              onMouseLeave={() => setHoveredPetal(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 13px',
                borderRadius: '16px',
                background: isHovered ? petal.color : petal.bgLight,
                border: `1.5px solid ${petal.color}`,
                color: isHovered ? '#FFFFFF' : petal.darkText,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: isHovered ? `0 4px 14px ${petal.color}45` : '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <Icon size={14} style={{ color: isHovered ? '#FFFFFF' : petal.color }} />
              <span>{petal.badge} {petal.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
