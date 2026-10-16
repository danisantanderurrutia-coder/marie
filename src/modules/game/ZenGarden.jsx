// src/modules/game/ZenGarden.jsx
// "Zen-Garten & Rosen-Orakel" — sensory touch garden, 3D flip oracle cards, and soul memory.
// High-contrast, tactile, deeply intimate.

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  RotateCw, 
  Heart, 
  Flower2, 
  Flame, 
  Moon, 
  Check, 
  Shuffle,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { playSoftTap, playSoftChime } from '../../utils/audio';
import { LOGO_04 } from '../../utils/assets';

export default function ZenGarden({ onBack, soundEnabled }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('petals'); // 'petals' | 'oracle' | 'memory'

  // --- MODE 1: PETALS ON BREEZE CANVAS ---
  const canvasRef = useRef(null);
  const [bloomedCount, setBloomedCount] = useState(0);

  useEffect(() => {
    if (activeTab !== 'petals') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = canvas.parentElement?.clientWidth || 320;
    let height = canvas.height = 360;

    const petals = [];
    const colors = ['#D84A58', '#E87A88', '#C5A081', '#FADBD8', '#B83246'];

    const addPetal = (x, y) => {
      petals.push({
        x,
        y,
        size: Math.random() * 14 + 10,
        vx: (Math.random() - 0.5) * 1.5 + 0.8, // wind breeze to the right
        vy: Math.random() * 1.5 + 0.8, // slow drift down
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0
      });
      setBloomedCount(c => c + 1);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update petals
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        if (p.life > 140) p.alpha -= 0.012;

        if (p.alpha <= 0 || p.y > height + 20) {
          petals.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.alpha);

        // Draw organic petal curve
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 1.5, -p.size / 2, -p.size * 1.2, 0, -p.size * 1.4);
        ctx.bezierCurveTo(p.size / 2, -p.size * 1.2, p.size / 2, -p.size / 1.5, 0, 0);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handlePointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
      const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
      if (soundEnabled) playSoftTap();
      for (let i = 0; i < 4; i++) {
        addPetal(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20);
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [activeTab, soundEnabled]);

  // --- MODE 2: 3D FLIP ORACLE CARDS ---
  const allOracleCards = t('zengarden.oracleMode.cards') || [];
  const [oracleDeck, setOracleDeck] = useState(() => allOracleCards.slice(0, 3));
  const [flippedCards, setFlippedCards] = useState([false, false, false]);

  const handleFlipCard = (index) => {
    if (soundEnabled) playSoftChime();
    setFlippedCards(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleShuffleOracle = () => {
    if (soundEnabled) playSoftTap();
    setFlippedCards([false, false, false]);
    setTimeout(() => {
      const shuffled = [...allOracleCards].sort(() => Math.random() - 0.5);
      setOracleDeck(shuffled.slice(0, 3));
    }, 250);
  };

  // --- MODE 3: SOUL MEMORY GAME ---
  const memoryIcons = [
    { key: 'rose', icon: Flower2, color: '#D84A58' },
    { key: 'dragon', icon: Compass, color: '#C5A081' },
    { key: 'rat', icon: Flame, color: '#E87A88' },
    { key: 'moon', icon: Moon, color: '#9B59B6' }
  ];

  const generateCards = () => {
    const deck = [];
    memoryIcons.forEach((item, idx) => {
      deck.push({ id: `c_${idx}_1`, key: item.key, icon: item.icon, color: item.color, isFlipped: false, isMatched: false });
      deck.push({ id: `c_${idx}_2`, key: item.key, icon: item.icon, color: item.color, isFlipped: false, isMatched: false });
    });
    return deck.sort(() => Math.random() - 0.5);
  };

  const [memoryCards, setMemoryCards] = useState(generateCards);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const handleMemoryCardClick = (index) => {
    if (memoryCards[index].isFlipped || memoryCards[index].isMatched || selectedIndices.length >= 2) return;

    if (soundEnabled) playSoftTap();

    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      setMemoryMoves(m => m + 1);
      const [firstIdx, secondIdx] = newSelected;
      if (updated[firstIdx].key === updated[secondIdx].key) {
        // Matched!
        if (soundEnabled) playSoftChime();
        updated[firstIdx].isMatched = true;
        updated[secondIdx].isMatched = true;
        setMemoryCards(updated);
        setSelectedIndices([]);

        if (updated.every(c => c.isMatched)) {
          setGameWon(true);
          try {
            confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
        }
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setMemoryCards(prev => {
            const reset = [...prev];
            reset[firstIdx].isFlipped = false;
            reset[secondIdx].isFlipped = false;
            return reset;
          });
          setSelectedIndices([]);
        }, 850);
      }
    }
  };

  const resetMemoryGame = () => {
    if (soundEnabled) playSoftTap();
    setMemoryCards(generateCards());
    setSelectedIndices([]);
    setMemoryMoves(0);
    setGameWon(false);
  };

  return (
    <div className="mx-screen animate-fade-in" style={{ paddingBottom: 40, color: '#241B19' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <button className="mx-back" onClick={onBack} style={{ cursor: 'pointer', color: '#5C4E48' }}>
          <ArrowLeft size={18} aria-hidden="true" /> {t('common.back')}
        </button>
        <span 
          className="mx-badge"
          style={{ background: 'rgba(110, 140, 110, 0.15)', color: '#2D6A4F', border: '1px solid rgba(110, 140, 110, 0.35)', fontWeight: 600 }}
        >
          {t('zengarden.kicker')}
        </span>
      </div>

      <header style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Flower2 size={24} style={{ color: '#D84A58' }} />
          <h1 className="mx-title" style={{ margin: 0, color: '#241B19', fontSize: 26 }}>
            {t('zengarden.title')}
          </h1>
        </div>
        <p className="mx-lead" style={{ marginTop: 6, fontSize: 14.5, color: '#5C4E48', lineHeight: 1.5 }}>
          {t('zengarden.lead')}
        </p>
      </header>

      {/* Segmented Mode Selector */}
      <div className="mx-segmented" style={{ marginBottom: 20 }}>
        <button
          className={`mx-seg-btn ${activeTab === 'petals' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('petals'); }}
        >
          <span>{t('zengarden.tabs.petals')}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeTab === 'oracle' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('oracle'); }}
        >
          <span>{t('zengarden.tabs.oracle')}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeTab === 'memory' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('memory'); }}
        >
          <span>{t('zengarden.tabs.memory')}</span>
        </button>
      </div>

      {/* MODE 1: PETALS IN THE BREEZE */}
      {activeTab === 'petals' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div 
            className="mx-card"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(197, 160, 129, 0.25)',
              borderRadius: 18,
              padding: '16px',
              boxShadow: '0 4px 16px rgba(44, 30, 25, 0.05)',
              textAlign: 'center'
            }}
          >
            <p className="mx-small" style={{ color: '#4A3D38', marginBottom: 10, fontSize: 13.5 }}>
              {t('zengarden.petalsMode.prompt')}
            </p>

            {/* Interactive Canvas Container */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: '360px',
                borderRadius: 14,
                background: 'radial-gradient(circle at 50% 30%, #FFFDF9 0%, #F5ECE0 100%)',
                border: '1.5px dashed rgba(197, 160, 129, 0.4)',
                cursor: 'crosshair',
                overflow: 'hidden',
                touchAction: 'none'
              }}
            >
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

              <div 
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 14,
                  right: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span 
                  style={{
                    fontSize: 12,
                    fontWeight: 650,
                    color: '#B82838',
                    background: 'rgba(255, 255, 255, 0.85)',
                    padding: '4px 10px',
                    borderRadius: 12,
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  🌸 {bloomedCount} {t('zengarden.petalsMode.bloomedCount')}
                </span>
                <span style={{ fontSize: 11, color: '#7A6D65', fontStyle: 'italic' }}>
                  {t('zengarden.petalsMode.breezeHint')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: 3D FLIP ORACLE CARDS */}
      {activeTab === 'oracle' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="mx-small" style={{ color: '#4A3D38', margin: 0, fontSize: 13.5 }}>
              {t('zengarden.oracleMode.prompt')}
            </p>
            <button className="mx-btn ghost small" onClick={handleShuffleOracle} style={{ color: '#241B19', borderColor: '#C5A081' }}>
              <Shuffle size={14} /> {t('zengarden.oracleMode.shuffleBtn')}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {oracleDeck.map((card, idx) => {
              const isFlipped = flippedCards[idx];
              return (
                <div 
                  key={idx}
                  onClick={() => handleFlipCard(idx)}
                  style={{
                    perspective: '1000px',
                    cursor: 'pointer',
                    minHeight: isFlipped ? '150px' : '100px',
                    transition: 'min-height 0.3s ease'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* CARD FRONT (UNFLIPPED - SATEEN VELVET LOGO) */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        borderRadius: 16,
                        padding: '16px 20px',
                        background: 'linear-gradient(135deg, #2A1D24 0%, #171115 100%)',
                        border: '1.5px solid rgba(197, 160, 129, 0.45)',
                        boxShadow: '0 8px 24px rgba(44, 20, 30, 0.15)',
                        display: isFlipped ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <img 
                          src={LOGO_04} 
                          alt="Marie Rose" 
                          style={{ width: 38, height: 38, objectFit: 'contain' }} 
                        />
                        <div>
                          <strong className="font-serif" style={{ color: '#FDF7F2', fontSize: 16, letterSpacing: '0.04em' }}>
                            Orakel der Rose · #{idx + 1}
                          </strong>
                          <span style={{ fontSize: 12, color: '#C5A081', display: 'block', marginTop: 2 }}>
                            {t('zengarden.oracleMode.flipHint')} ✨
                          </span>
                        </div>
                      </div>
                      <Sparkles size={18} style={{ color: '#D84A58' }} />
                    </div>

                    {/* CARD BACK (FLIPPED - HEARTFELT SECRET MESSAGE) */}
                    <div
                      style={{
                        transform: 'rotateY(180deg)',
                        borderRadius: 16,
                        padding: '18px 20px',
                        background: '#FFFFFF',
                        border: '1.5px solid rgba(216, 74, 88, 0.35)',
                        boxShadow: '0 8px 24px rgba(44, 30, 25, 0.08)',
                        display: isFlipped ? 'flex' : 'none',
                        flexDirection: 'column',
                        gap: 8
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong className="font-serif" style={{ fontSize: 17, color: '#B82838' }}>
                          {card.title}
                        </strong>
                        <span style={{ fontSize: 11, color: '#7A6D65' }}>
                          Tippen zum Zudecken
                        </span>
                      </div>

                      <p className="font-serif" style={{ fontSize: 15, color: '#241B19', lineHeight: 1.55, margin: '4px 0' }}>
                        “{card.text}”
                      </p>

                      {card.complice && (
                        <div 
                          style={{ 
                            marginTop: 6, 
                            paddingTop: 8, 
                            borderTop: '1px solid rgba(197, 160, 129, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 12.5,
                            color: '#7A4822',
                            fontStyle: 'italic'
                          }}
                        >
                          <Heart size={14} style={{ color: '#D84A58', flexShrink: 0 }} />
                          <span>{card.complice}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 3: SOUL MEMORY GAME */}
      {activeTab === 'memory' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="mx-small" style={{ color: '#4A3D38', margin: 0, fontSize: 13.5 }}>
              {t('zengarden.memoryMode.prompt')}
            </p>
            <span style={{ fontSize: 12.5, fontWeight: 650, color: '#6A5C56' }}>
              {t('zengarden.memoryMode.moves')}: {memoryMoves}
            </span>
          </div>

          {/* 4x2 Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {memoryCards.map((c, idx) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleMemoryCardClick(idx)}
                  style={{
                    aspectRatio: '1 / 1.15',
                    borderRadius: 14,
                    border: c.isMatched 
                      ? '2px solid #2D6A4F' 
                      : c.isFlipped 
                      ? `2px solid ${c.color}` 
                      : '1.5px solid rgba(197, 160, 129, 0.35)',
                    background: c.isFlipped || c.isMatched ? '#FFFFFF' : 'linear-gradient(135deg, #261D22 0%, #161114 100%)',
                    cursor: c.isMatched ? 'default' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: 8,
                    boxShadow: '0 4px 12px rgba(44, 30, 25, 0.05)',
                    transform: c.isFlipped || c.isMatched ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {c.isFlipped || c.isMatched ? (
                    <>
                      <Icon size={24} style={{ color: c.color }} />
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: '#241B19', textAlign: 'center', lineHeight: 1.1 }}>
                        {t(`zengarden.memoryMode.symbols.${c.key}`)}
                      </span>
                    </>
                  ) : (
                    <img src={LOGO_04} alt="Back" style={{ width: 22, height: 22, opacity: 0.6 }} />
                  )}
                </button>
              );
            })}
          </div>

          {gameWon && (
            <div 
              className="mx-card animate-fade-in"
              style={{
                background: '#FFFFFF',
                border: '2px solid #2D6A4F',
                borderRadius: 16,
                padding: '16px',
                textAlign: 'center',
                boxShadow: '0 6px 20px rgba(45, 106, 79, 0.15)',
                marginTop: 8
              }}
            >
              <h3 style={{ fontSize: 18, color: '#2D6A4F', margin: '0 0 6px', fontWeight: 700 }}>
                ✨ {t('zengarden.memoryMode.wonTitle')}
              </h3>
              <p className="mx-small" style={{ color: '#4A3D38', marginBottom: 12 }}>
                {t('zengarden.memoryMode.wonDesc')}
              </p>
              <button className="mx-btn warm small" onClick={resetMemoryGame}>
                <RotateCw size={14} /> {t('zengarden.memoryMode.playAgain')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
