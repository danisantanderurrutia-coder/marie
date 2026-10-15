import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Lightbulb, 
  Heart, 
  User, 
  ChevronRight, 
  PersonStanding,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftTap } from '../utils/audio';

export default function IkigaiFlower({ onSelectPetal, soundEnabled }) {
  const { language, t } = useLanguage();
  const [hoveredPetal, setHoveredPetal] = useState(null);

  const petalsConfig = [
    {
      id: 'fire',
      name: t('ikigai.petals.fire.name'),
      subtitle: t('ikigai.petals.fire.subtitle'),
      tag: t('ikigai.petals.fire.tag'),
      color: '#D84A58',
      softBg: 'rgba(216, 74, 88, 0.15)',
      icon: Flame,
      cx: 250,
      cy: 110,
      path: "M 250 250 C 215 165, 175 90, 215 80 C 255 70, 325 140, 250 250 Z"
    },
    {
      id: 'body',
      name: t('ikigai.petals.body.name'),
      subtitle: t('ikigai.petals.body.subtitle'),
      tag: t('ikigai.petals.body.tag'),
      color: '#7DA3BE',
      softBg: 'rgba(125, 163, 190, 0.15)',
      icon: PersonStanding,
      cx: 395,
      cy: 180,
      path: "M 250 250 C 335 185, 410 145, 420 185 C 430 225, 360 295, 250 250 Z"
    },
    {
      id: 'create',
      name: t('ikigai.petals.create.name'),
      subtitle: t('ikigai.petals.create.subtitle'),
      tag: t('ikigai.petals.create.tag'),
      color: '#6E8C6E',
      softBg: 'rgba(110, 140, 110, 0.15)',
      icon: Lightbulb,
      cx: 345,
      cy: 385,
      path: "M 250 250 C 340 280, 395 385, 360 415 C 325 435, 255 355, 250 250 Z"
    },
    {
      id: 'me',
      name: t('ikigai.petals.me.name'),
      subtitle: t('ikigai.petals.me.subtitle'),
      tag: t('ikigai.petals.me.tag'),
      color: '#C5A081',
      softBg: 'rgba(197, 160, 129, 0.15)',
      icon: Heart,
      cx: 155,
      cy: 385,
      path: "M 250 250 C 245 355, 175 435, 140 415 C 105 385, 160 280, 250 250 Z"
    },
    {
      id: 'dreams',
      name: t('ikigai.petals.dreams.name'),
      subtitle: t('ikigai.petals.dreams.subtitle'),
      tag: t('ikigai.petals.dreams.tag'),
      color: '#9B59B6',
      softBg: 'rgba(155, 89, 182, 0.15)',
      icon: Compass,
      cx: 105,
      cy: 180,
      path: "M 250 250 C 140 295, 70 225, 80 185 C 90 145, 165 185, 250 250 Z"
    }
  ];

  const handlePetalClick = (id) => {
    if (soundEnabled) playSoftTap();
    onSelectPetal(id);
  };

  return (
    <div className="ikigai-flower-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Visual SVG Flower */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '360px',
          aspectRatio: '1 / 1',
          margin: '10px auto'
        }}
      >
        {/* Soft Radial Ambient Glow */}
        <div 
          style={{
            position: 'absolute',
            inset: '12%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216, 74, 88, 0.14) 0%, rgba(197, 160, 129, 0.08) 50%, transparent 70%)',
            filter: 'blur(28px)',
            pointerEvents: 'none'
          }} 
        />

        <svg 
          viewBox="0 0 500 500" 
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          aria-label="Marie Ikigai Rose"
        >
          <defs>
            <filter id="petalSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="petalActiveGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 5 Petal Slices */}
          {petalsConfig.map((petal) => {
            const isHovered = hoveredPetal === petal.id;
            return (
              <g
                key={petal.id}
                onClick={() => handlePetalClick(petal.id)}
                onMouseEnter={() => setHoveredPetal(petal.id)}
                onMouseLeave={() => setHoveredPetal(null)}
                style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
              >
                <path
                  d={petal.path}
                  fill={isHovered ? petal.color : petal.softBg}
                  stroke={petal.color}
                  strokeWidth={isHovered ? '2.8' : '1.8'}
                  filter={isHovered ? 'url(#petalActiveGlow)' : 'url(#petalSoftGlow)'}
                  style={{
                    transition: 'fill 0.25s ease, stroke-width 0.25s ease, transform 0.25s ease',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    transformOrigin: '250px 250px'
                  }}
                />
                <circle 
                  cx={petal.cx} 
                  cy={petal.cy} 
                  r={isHovered ? '8' : '6'} 
                  fill={petal.color} 
                  style={{ transition: 'r 0.2s ease' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Star with Logo 4 */}
        <div
          onClick={() => handlePetalClick('me')}
          title="Marie · Zentrum der Harmonie"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(28, 20, 28, 0.95) 0%, rgba(14, 10, 16, 0.98) 100%)',
            border: '2px solid rgba(197, 160, 129, 0.5)',
            boxShadow: '0 0 24px rgba(216, 74, 88, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.06)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(216, 74, 88, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(216, 74, 88, 0.3)';
          }}
        >
          <img 
            src="/logo_04.png" 
            alt="Marie Logo 04" 
            style={{ width: '42px', height: '42px', objectFit: 'contain' }}
          />
          <span 
            className="font-serif" 
            style={{ 
              fontSize: '10px', 
              letterSpacing: '0.12em', 
              color: '#FADBD8', 
              fontWeight: 700, 
              marginTop: '2px' 
            }}
          >
            MARIE
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0 16px', opacity: 0.85 }}>
        <Sparkles size={13} style={{ color: '#D84A58' }} />
        <span className="mx-small" style={{ fontStyle: 'italic', fontSize: '12px' }}>
          {t('ikigai.centerCore.prompt')}
        </span>
      </div>

      {/* 5 Dimension Cards Stack */}
      <div className="mx-stack" style={{ width: '100%', gap: '10px' }}>
        {petalsConfig.map((petal) => {
          const Icon = petal.icon;
          const isHovered = hoveredPetal === petal.id;
          return (
            <button
              key={petal.id}
              className="mx-card"
              onClick={() => handlePetalClick(petal.id)}
              onMouseEnter={() => setHoveredPetal(petal.id)}
              onMouseLeave={() => setHoveredPetal(null)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: `4px solid ${petal.color}`,
                background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span 
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: petal.softBg,
                    color: petal.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#FFF', display: 'block' }}>
                    {petal.name}
                  </strong>
                  <span className="mx-small" style={{ color: '#D0C8B8', fontSize: '12px' }}>
                    {petal.subtitle}
                  </span>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: petal.color, opacity: 0.8 }} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
