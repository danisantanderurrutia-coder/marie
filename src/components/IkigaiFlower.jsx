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

  // 5 Botanical Rose Petals: voluptuous, overlapping lobes that seamlessly touch like real plants and the heraldic logo
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
      // Top Petal (12 o'clock) — Broad overlapping rose petal
      path: "M 238.9 215.8 C 199.7 169.4, 152.6 135.9, 152.5 81.1 C 152.5 81.1, 197.3 38.5, 250 44 C 250 44, 302.7 38.5, 347.5 81.1 C 347.4 135.9, 300.3 169.4, 261.1 215.8 L 238.9 215.8 Z",
      innerPath: "M 250 200 C 195.1 126.7, 195.1 126.7, 250 68 C 304.9 126.7, 304.9 126.7, 250 200 Z",
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
      // Upper Right Petal (~2 o'clock) — Broad overlapping petal
      path: "M 279.1 228.8 C 311.1 177.2, 328.4 122.1, 380.5 105.1 C 380.5 105.1, 434.9 134.5, 445.9 186.3 C 445.9 186.3, 467.5 234.8, 440.7 290.5 C 388.6 307.4, 342.2 273, 286 250 L 279.1 228.8 Z",
      innerPath: "M 297.6 234.5 C 350.3 159.7, 350.3 159.7, 423.1 193.8 C 384.3 264.1, 384.3 264.1, 297.6 234.5 Z",
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
      // Lower Right Petal (~5 o'clock) — Broad overlapping petal
      path: "M 279.1 271.2 C 338.1 285.6, 395.9 285, 428.1 329.3 C 428.1 329.3, 417 390.1, 371.1 416.7 C 371.1 416.7, 331.7 452.1, 270.4 443.9 C 238.2 399.5, 256.6 344.8, 261.1 284.2 L 279.1 271.2 Z",
      innerPath: "M 279.4 290.5 C 366.9 317.5, 366.9 317.5, 357 397.2 C 278.1 382, 278.1 382, 279.4 290.5 Z",
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
      // Lower Left Petal (~7 o'clock) — Broad overlapping petal
      path: "M 238.9 284.2 C 243.4 344.8, 261.8 399.5, 229.6 443.9 C 229.6 443.9, 168.3 452.1, 128.9 416.7 C 128.9 416.7, 83 390.1, 71.9 329.3 C 104.1 285, 161.9 285.6, 220.9 271.2 L 238.9 284.2 Z",
      innerPath: "M 220.6 290.5 C 221.9 382, 221.9 382, 143 397.2 C 133.1 317.5, 133.1 317.5, 220.6 290.5 Z",
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
      // Upper Left Petal (~10 o'clock) — Broad overlapping petal
      path: "M 214 250 C 157.8 273, 111.4 307.4, 59.3 290.5 C 59.3 290.5, 32.5 234.8, 54.1 186.3 C 54.1 186.3, 65.1 134.5, 119.5 105.1 C 171.6 122.1, 188.9 177.2, 220.9 228.8 L 214 250 Z",
      innerPath: "M 202.4 234.5 C 115.7 264.1, 115.7 264.1, 76.9 193.8 C 149.7 159.7, 149.7 159.7, 202.4 234.5 Z",
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
          maxWidth: '265px',
          aspectRatio: '1 / 1',
          margin: '4px auto 6px'
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
            {/* Soft Ambient Shadow Filter for Overlapping Depth */}
            <filter id="petalShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#180C0B" floodOpacity="0.32" />
            </filter>
            <filter id="petalGleam" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#D84A58" floodOpacity="0.45" />
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
              <stop offset="0%" stopColor="#5A7559" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#223321" stopOpacity="0.95" />
            </radialGradient>
          </defs>

          {/* 5 Botanical Sepal Calyx Leaves (peeking between overlapping petals like in the logo) */}
          <g opacity="0.65" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))">
            <path d="M 334 85.2 Q 344 120.6 389.9 57.5 Q 344 120.6 380.8 119.2 Z" fill="url(#gradSepal)" />
            <path d="M 432.7 278.9 Q 402.2 299.4 476.4 323.5 Q 402.2 299.4 414.8 334 Z" fill="url(#gradSepal)" />
            <path d="M 278.9 432.7 Q 250 410 250 488 Q 250 410 221.1 432.7 Z" fill="url(#gradSepal)" />
            <path d="M 85.2 334 Q 97.8 299.4 23.6 323.5 Q 97.8 299.4 67.3 278.9 Z" fill="url(#gradSepal)" />
            <path d="M 119.2 119.2 Q 156 120.6 110.1 57.5 Q 156 120.6 166 85.2 Z" fill="url(#gradSepal)" />
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
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1E1617 0%, #100C0D 100%)',
            border: '2px solid #D4AF37',
            boxShadow: '0 0 24px rgba(216, 74, 88, 0.45), 0 4px 14px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 0 32px rgba(216, 74, 88, 0.7), 0 6px 18px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(216, 74, 88, 0.45), 0 4px 14px rgba(0,0,0,0.3)';
          }}
        >
          <img 
            src={LOGO_04} 
            alt="Marie Emblem" 
            style={{ width: '38px', height: '38px', objectFit: 'contain', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }}
          />
          <span 
            className="font-serif" 
            style={{ 
              fontSize: '9px', 
              letterSpacing: '0.12em', 
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
          gap: '5px', 
          margin: '2px 0 10px', 
          padding: '3px 10px',
          borderRadius: '12px',
          background: 'rgba(216, 74, 88, 0.05)',
          border: '1px solid rgba(216, 74, 88, 0.15)'
        }}
      >
        <Sparkles size={11} style={{ color: '#D84A58' }} />
        <span 
          style={{ 
            fontStyle: 'italic', 
            fontSize: '11.5px', 
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
          gap: '6px', 
          width: '100%', 
          marginBottom: 12 
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
                gap: '5px',
                padding: '5px 10px',
                borderRadius: '14px',
                background: isHovered ? petal.color : petal.bgLight,
                border: `1.2px solid ${petal.color}`,
                color: isHovered ? '#FFFFFF' : petal.darkText,
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: isHovered ? `0 3px 10px ${petal.color}45` : '0 1px 4px rgba(0,0,0,0.03)',
                transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isHovered ? 'scale(1.04)' : 'scale(1)'
              }}
            >
              <Icon size={12} style={{ color: isHovered ? '#FFFFFF' : petal.color }} />
              <span>{petal.badge} {petal.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
