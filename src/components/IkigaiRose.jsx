import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Sparkle, 
  Compass, 
  Heart, 
  User, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { playSoftChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export default function IkigaiRose({ activeTab, onSelectPetal, soundEnabled }) {
  const { currentStrings } = useLanguage();
  const [hoveredPetal, setHoveredPetal] = useState(null);

  const handlePetalClick = (petalId) => {
    if (soundEnabled) playSoftChime();
    onSelectPetal(petalId);
  };

  const petalsData = [
    {
      id: 'aura',
      name: currentStrings.petals.aura.name,
      subtitle: currentStrings.petals.aura.subtitle,
      color: '#D84A58', // Wild Rose Crimson
      softBg: 'rgba(216, 74, 88, 0.14)',
      accent: '#9E2A38',
      icon: '⚡',
      lucideIcon: Flame,
      desc: currentStrings.petals.aura.desc,
      position: 'top',
      tag: currentStrings.tabs.aura.tag
    },
    {
      id: 'skin',
      name: currentStrings.petals.skin.name,
      subtitle: currentStrings.petals.skin.subtitle,
      color: '#7DA3BE', // Pastel Blue
      softBg: 'rgba(125, 163, 190, 0.18)',
      accent: '#4B779A',
      icon: '🌸',
      lucideIcon: Sparkle,
      desc: currentStrings.petals.skin.desc,
      position: 'top-right',
      tag: currentStrings.tabs.skin.tag
    },
    {
      id: 'hobbies',
      name: currentStrings.petals.hobbies.name,
      subtitle: currentStrings.petals.hobbies.subtitle,
      color: '#6E8C6E', // Pastel Sage Green
      softBg: 'rgba(110, 140, 110, 0.16)',
      accent: '#476347',
      icon: '🎨',
      lucideIcon: Compass,
      desc: currentStrings.petals.hobbies.desc,
      position: 'bottom-right',
      tag: currentStrings.tabs.hobbies.tag
    },
    {
      id: 'profile',
      name: currentStrings.petals.profile.name,
      subtitle: currentStrings.petals.profile.subtitle,
      color: '#C5A081', // Soft Champagne Rose Gold
      softBg: 'rgba(197, 160, 129, 0.18)',
      accent: '#8E6847',
      icon: '👤',
      lucideIcon: User,
      desc: currentStrings.petals.profile.desc,
      position: 'bottom-left',
      tag: currentStrings.tabs.profile.tag
    },
    {
      id: 'dreams',
      name: currentStrings.petals.dreams.name,
      subtitle: currentStrings.petals.dreams.subtitle,
      color: '#8B8F94', // Greyish Pearl
      softBg: 'rgba(139, 143, 148, 0.15)',
      accent: '#52565B',
      icon: '✨',
      lucideIcon: Heart,
      desc: currentStrings.petals.dreams.desc,
      position: 'top-left',
      tag: currentStrings.tabs.dreams.tag
    }
  ];

  const activeOrHovered = hoveredPetal || (activeTab !== 'rose' ? activeTab : null);

  return (
    <div className="ikigai-rose-landing animate-fade-in">
      {/* Editorial Hero Header con tipografía refinada "Welcome Marie" */}
      <header className="rose-editorial-hero">
        <div className="rose-kicker-pill">
          <span className="rose-kicker-dot"></span>
          <span>{currentStrings.landing.kicker}</span>
        </div>
        
        <h1 className="rose-welcome-title font-serif">
          Welcome Marie
        </h1>
        
        <p className="rose-welcome-lead">
          {currentStrings.landing.welcomeLead}
        </p>
      </header>

      {/* Main Interactive Stage: Logo 4 Protagonista con 5 Textos Alrededor de los Pétalos */}
      <div className="rose-stage-wrapper">
        <div className="rose-interactive-stage">
          {/* Decorative glowing backdrops */}
          <div className="rose-aura-halo" />

          {/* SVG Rose Geometry */}
          <svg viewBox="0 0 500 500" className="rose-main-svg" aria-label="Rosa Ikigai de Marie">
            <defs>
              <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#FAF4EF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#EAD8CA" stopOpacity="0.7" />
              </radialGradient>

              <filter id="petalGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.16" />
              </filter>
              <filter id="activePetalGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.32" />
              </filter>
            </defs>

            {/* Guiding concentric rings */}
            <circle cx="250" cy="250" r="210" fill="none" stroke="rgba(197, 160, 129, 0.15)" strokeWidth="1.2" strokeDasharray="5 5" />
            <circle cx="250" cy="250" r="155" fill="none" stroke="rgba(216, 74, 88, 0.12)" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="105" fill="none" stroke="rgba(125, 163, 190, 0.15)" strokeWidth="1" />

            {/* Ray lines to petal labels */}
            <line x1="250" y1="165" x2="250" y2="70" stroke="#D84A58" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
            <line x1="320" y1="195" x2="415" y2="125" stroke="#7DA3BE" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
            <line x1="300" y1="310" x2="385" y2="395" stroke="#6E8C6E" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
            <line x1="200" y1="310" x2="115" y2="395" stroke="#C5A081" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
            <line x1="180" y1="195" x2="85" y2="125" stroke="#8B8F94" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />

            {/* Petal 1: Top (Aura & Radiance - Crimson) */}
            <g 
              className={`svg-petal-node ${activeOrHovered === 'aura' ? 'is-highlighted' : ''}`}
              onClick={() => handlePetalClick('aura')}
              onMouseEnter={() => setHoveredPetal('aura')}
              onMouseLeave={() => setHoveredPetal(null)}
            >
              <path 
                d="M 250 250 C 200 160, 210 70, 250 55 C 290 70, 300 160, 250 250 Z" 
                fill={activeOrHovered === 'aura' ? '#D84A58' : 'rgba(216, 74, 88, 0.32)'}
                stroke="#D84A58"
                strokeWidth={activeOrHovered === 'aura' ? '2.5' : '1.8'}
                filter={activeOrHovered === 'aura' ? 'url(#activePetalGlow)' : 'url(#petalGlow)'}
                className="petal-slice"
              />
              <circle cx="250" cy="85" r="7" fill="#D84A58" />
            </g>

            {/* Petal 2: Top-Right (Body Sanctuary - Pastel Blue) */}
            <g 
              className={`svg-petal-node ${activeOrHovered === 'skin' ? 'is-highlighted' : ''}`}
              onClick={() => handlePetalClick('skin')}
              onMouseEnter={() => setHoveredPetal('skin')}
              onMouseLeave={() => setHoveredPetal(null)}
            >
              <path 
                d="M 250 250 C 335 185, 410 145, 420 185 C 430 225, 360 295, 250 250 Z" 
                fill={activeOrHovered === 'skin' ? '#7DA3BE' : 'rgba(125, 163, 190, 0.34)'}
                stroke="#7DA3BE"
                strokeWidth={activeOrHovered === 'skin' ? '2.5' : '1.8'}
                filter={activeOrHovered === 'skin' ? 'url(#activePetalGlow)' : 'url(#petalGlow)'}
                className="petal-slice"
              />
              <circle cx="395" cy="180" r="7" fill="#7DA3BE" />
            </g>

            {/* Petal 3: Bottom-Right (Creative Spark - Pastel Sage Green) */}
            <g 
              className={`svg-petal-node ${activeOrHovered === 'hobbies' ? 'is-highlighted' : ''}`}
              onClick={() => handlePetalClick('hobbies')}
              onMouseEnter={() => setHoveredPetal('hobbies')}
              onMouseLeave={() => setHoveredPetal(null)}
            >
              <path 
                d="M 250 250 C 340 280, 395 385, 360 415 C 325 435, 255 355, 250 250 Z" 
                fill={activeOrHovered === 'hobbies' ? '#6E8C6E' : 'rgba(110, 140, 110, 0.32)'}
                stroke="#6E8C6E"
                strokeWidth={activeOrHovered === 'hobbies' ? '2.5' : '1.8'}
                filter={activeOrHovered === 'hobbies' ? 'url(#activePetalGlow)' : 'url(#petalGlow)'}
                className="petal-slice"
              />
              <circle cx="345" cy="385" r="7" fill="#6E8C6E" />
            </g>

            {/* Petal 4: Bottom-Left (Living Essence - Champagne Rose Gold) */}
            <g 
              className={`svg-petal-node ${activeOrHovered === 'profile' ? 'is-highlighted' : ''}`}
              onClick={() => handlePetalClick('profile')}
              onMouseEnter={() => setHoveredPetal('profile')}
              onMouseLeave={() => setHoveredPetal(null)}
            >
              <path 
                d="M 250 250 C 245 355, 175 435, 140 415 C 105 385, 160 280, 250 250 Z" 
                fill={activeOrHovered === 'profile' ? '#C5A081' : 'rgba(197, 160, 129, 0.32)'}
                stroke="#C5A081"
                strokeWidth={activeOrHovered === 'profile' ? '2.5' : '1.8'}
                filter={activeOrHovered === 'profile' ? 'url(#activePetalGlow)' : 'url(#petalGlow)'}
                className="petal-slice"
              />
              <circle cx="155" cy="385" r="7" fill="#C5A081" />
            </g>

            {/* Petal 5: Top-Left (Soul Horizon - Greyish Pearl) */}
            <g 
              className={`svg-petal-node ${activeOrHovered === 'dreams' ? 'is-highlighted' : ''}`}
              onClick={() => handlePetalClick('dreams')}
              onMouseEnter={() => setHoveredPetal('dreams')}
              onMouseLeave={() => setHoveredPetal(null)}
            >
              <path 
                d="M 250 250 C 140 295, 70 225, 80 185 C 90 145, 165 185, 250 250 Z" 
                fill={activeOrHovered === 'dreams' ? '#8B8F94' : 'rgba(139, 143, 148, 0.32)'}
                stroke="#8B8F94"
                strokeWidth={activeOrHovered === 'dreams' ? '2.5' : '1.8'}
                filter={activeOrHovered === 'dreams' ? 'url(#activePetalGlow)' : 'url(#petalGlow)'}
                className="petal-slice"
              />
              <circle cx="105" cy="180" r="7" fill="#8B8F94" />
            </g>
          </svg>

          {/* Central Star: Logo 4 Grande & Radiante */}
          <div 
            className="rose-center-star" 
            onClick={() => handlePetalClick('profile')}
            title="Marie · Center of Harmony"
          >
            <div className="rose-star-glow" />
            <img 
              src="/logo_04.png" 
              alt="Marie Logo 04 - Ikigai Rose" 
              className="rose-star-logo-img"
            />
            <div className="rose-star-badge">
              <span className="font-serif">MARIE</span>
            </div>
          </div>

          {/* 5 Textos Interactivos Alrededor de Cada Pétalo */}
          <div className="orbital-petal-tags">
            {petalsData.map((petal) => {
              const isHovered = activeOrHovered === petal.id;
              return (
                <button
                  key={petal.id}
                  className={`orbital-tag-card pos-${petal.position} ${isHovered ? 'active' : ''}`}
                  style={{ '--petal-color': petal.color, '--petal-bg': petal.softBg }}
                  onClick={() => handlePetalClick(petal.id)}
                  onMouseEnter={() => setHoveredPetal(petal.id)}
                  onMouseLeave={() => setHoveredPetal(null)}
                >
                  <div className="orbital-tag-header">
                    <span className="orbital-tag-icon">{petal.icon}</span>
                    <div className="orbital-tag-titles">
                      <span className="orbital-tag-name font-serif">{petal.name}</span>
                      <span className="orbital-tag-sub">{petal.subtitle}</span>
                    </div>
                    <ArrowUpRight size={13} className="orbital-tag-arrow" />
                  </div>
                  <div className="orbital-tag-desc">
                    {petal.tag}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rose-interaction-prompt">
          <Sparkles size={14} color="#D84A58" />
          <span>{currentStrings.landing.tapHint}</span>
        </div>
      </div>

      {/* Grid Editorial de las 5 Dimensiones para Exploración Fluida */}
      <section className="rose-dimensions-matrix">
        <div className="matrix-head">
          <h3 className="matrix-title font-serif">{currentStrings.landing.matrixTitle}</h3>
          <span className="matrix-subtitle">{currentStrings.landing.matrixSubtitle}</span>
        </div>

        <div className="dimensions-grid">
          {petalsData.map((petal) => {
            const isCurrent = activeTab === petal.id;
            return (
              <div 
                key={petal.id}
                className={`dimension-card glass-panel ${isCurrent ? 'current' : ''}`}
                style={{ borderTopColor: petal.color }}
                onClick={() => handlePetalClick(petal.id)}
              >
                <div className="dim-card-top">
                  <span className="dim-badge" style={{ backgroundColor: petal.softBg, color: petal.color }}>
                    {petal.icon}
                  </span>
                  <span className="dim-category" style={{ color: petal.color }}>{petal.tag}</span>
                </div>
                
                <h4 className="dim-name font-serif">{petal.name}</h4>
                <p className="dim-desc">{petal.desc}</p>

                <div className="dim-footer">
                  <span className="dim-action-link" style={{ color: petal.color }}>
                    <span>{currentStrings.landing.openDimension}</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ancla Contemplativa de Marie */}
      <div className="landing-quote-ribbon glass-panel">
        <span className="quote-label font-serif">{currentStrings.landing.anchorLabel}</span>
        <blockquote className="quote-text font-serif">
          {currentStrings.landing.anchorQuote}
        </blockquote>
        <span className="quote-author font-serif">{currentStrings.landing.anchorAuthor}</span>
      </div>
    </div>
  );
}
