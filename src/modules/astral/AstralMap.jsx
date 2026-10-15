import React, { useState } from 'react';
import { Compass, Sparkles, Moon, Sun, Heart, Flame, Shield, Droplets, Feather, Anchor, RefreshCw } from 'lucide-react';
import { ModuleShell } from '../../components/ModuleShell';
import { useLanguage } from '../../context/LanguageContext';
import { playSoftTap, playSoftChime } from '../../utils/audio';

export default function AstralMap({ soundEnabled, onBack }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('natal'); // 'natal' | 'synastry' | 'medicine'
  const [selectedPlanetKey, setSelectedPlanetKey] = useState('sunCusp');

  const planetKeys = ['sunCusp', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'dragon'];

  const handleSelectTab = (tab) => {
    playSoftTap();
    setActiveTab(tab);
  };

  const handleSelectPlanet = (key) => {
    if (soundEnabled) playSoftTap();
    setSelectedPlanetKey(key);
  };

  const currentPlanet = t(`astral.planets.${selectedPlanetKey}`) || {};
  const alliances = t('astral.synastry.alliances') || [];
  const medicineCards = t('astral.medicine.cards') || [];

  return (
    <ModuleShell
      kicker={t('astral.kicker')}
      title={t('astral.title')}
      lead={t('astral.lead')}
      onBack={onBack}
    >
      {/* Cosmic Identity Header Card */}
      <div className="mx-card glow" style={{ background: 'linear-gradient(135deg, rgba(155, 89, 182, 0.12) 0%, rgba(20, 16, 28, 0.95) 100%)', border: '1px solid rgba(155, 89, 182, 0.35)' }}>
        <div className="mx-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span className="mx-badge" style={{ background: 'rgba(155, 89, 182, 0.25)', color: '#E8DAEF', border: '1px solid rgba(155, 89, 182, 0.4)' }}>
              🐉 22.11.2000
            </span>
            <h2 className="mx-h2" style={{ marginTop: 6, marginBottom: 2 }}>{t('astral.subtitle')}</h2>
            <p className="mx-small" style={{ color: '#D2B4DE' }}>{t('astral.synastryTag')}</p>
          </div>
          <div style={{ fontSize: '1.8rem', opacity: 0.9 }}>✨</div>
        </div>

        {/* Quick Glyphs Row */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {planetKeys.map((k) => {
            const p = t(`astral.planets.${k}`);
            const isSelected = selectedPlanetKey === k && activeTab === 'natal';
            return (
              <button
                key={k}
                onClick={() => {
                  setActiveTab('natal');
                  handleSelectPlanet(k);
                }}
                className={`mx-chip ${isSelected ? 'active' : ''}`}
                style={{
                  padding: '4px 10px',
                  fontSize: '12px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid #BB8FCE' : '1px solid rgba(255,255,255,0.12)',
                  background: isSelected ? 'rgba(155, 89, 182, 0.35)' : 'rgba(255,255,255,0.04)',
                  color: isSelected ? '#FFF' : '#E0D0E8'
                }}
              >
                <span>{p?.symbol}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="mx-segmented" style={{ marginTop: 6 }}>
        <button
          className={`mx-seg-btn ${activeTab === 'natal' ? 'active' : ''}`}
          onClick={() => handleSelectTab('natal')}
        >
          <Compass size={14} aria-hidden="true" />
          <span>{t('astral.tabs.natal')}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeTab === 'synastry' ? 'active' : ''}`}
          onClick={() => handleSelectTab('synastry')}
        >
          <Heart size={14} aria-hidden="true" />
          <span>{t('astral.tabs.synastry')}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeTab === 'medicine' ? 'active' : ''}`}
          onClick={() => handleSelectTab('medicine')}
        >
          <Sparkles size={14} aria-hidden="true" />
          <span>{t('astral.tabs.medicine')}</span>
        </button>
      </div>

      {/* TAB 1: NATAL ESSENCE */}
      {activeTab === 'natal' && (
        <div className="mx-stack animate-fade-in" style={{ gap: 14 }}>
          <div className="mx-card soft">
            <h3 className="mx-h3">{t('astral.natalIntro.title')}</h3>
            <p className="mx-text" style={{ fontSize: '13px', lineHeight: 1.5 }}>
              {t('astral.natalIntro.desc')}
            </p>
          </div>

          {/* Planet Detail Card */}
          <div className="mx-card" style={{ borderLeft: '4px solid #BB8FCE', background: 'rgba(255,255,255,0.03)' }}>
            <div className="mx-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem' }}>{currentPlanet?.symbol}</span>
              <span className="mx-badge" style={{ background: 'rgba(187, 143, 206, 0.2)', color: '#F5EEF8' }}>
                {currentPlanet?.archetype}
              </span>
            </div>
            <h3 className="mx-h2" style={{ marginTop: 10, marginBottom: 8, fontSize: '1.15rem' }}>
              {currentPlanet?.name}
            </h3>
            <p className="mx-text" style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--mx-text, #EAE6DF)' }}>
              {currentPlanet?.desc}
            </p>
          </div>

          {/* Planet Grid Selector */}
          <div className="mx-stack" style={{ gap: 8 }}>
            <span className="mx-kicker" style={{ fontSize: '11px' }}>
              {t('astral.tabs.natal')}:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
              {planetKeys.map((k) => {
                const p = t(`astral.planets.${k}`);
                const isSelected = selectedPlanetKey === k;
                return (
                  <button
                    key={k}
                    onClick={() => handleSelectPlanet(k)}
                    className="mx-card"
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      border: isSelected ? '1.5px solid #BB8FCE' : '1px solid rgba(255,255,255,0.08)',
                      background: isSelected ? 'rgba(155, 89, 182, 0.18)' : 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>{p?.symbol}</div>
                    <div style={{ fontWeight: 600, fontSize: '12px', color: isSelected ? '#FFF' : 'inherit' }}>
                      {p?.archetype}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COSMIC SYNASTRY WITH CABALLERO JAGUAR */}
      {activeTab === 'synastry' && (
        <div className="mx-stack animate-fade-in" style={{ gap: 14 }}>
          <div className="mx-card" style={{ background: 'linear-gradient(135deg, rgba(216, 74, 88, 0.12) 0%, rgba(14, 18, 24, 0.95) 100%)', border: '1px solid rgba(216, 74, 88, 0.3)' }}>
            <div className="mx-row" style={{ gap: 8, alignItems: 'center' }}>
              <Flame size={20} style={{ color: '#E05D44' }} aria-hidden="true" />
              <h3 className="mx-h3" style={{ margin: 0 }}>{t('astral.synastry.introTitle')}</h3>
            </div>
            <p className="mx-text" style={{ marginTop: 8, fontSize: '13px', lineHeight: 1.5 }}>
              {t('astral.synastry.introDesc')}
            </p>
          </div>

          <div className="mx-stack" style={{ gap: 12 }}>
            {Array.isArray(alliances) && alliances.map((alliance, idx) => (
              <div key={idx} className="mx-card soft" style={{ borderLeft: '3px solid #E05D44' }}>
                <h4 className="mx-h3" style={{ fontSize: '0.95rem', color: '#FFF' }}>
                  {alliance.title}
                </h4>
                <p className="mx-text" style={{ marginTop: 6, fontSize: '13px', lineHeight: 1.55 }}>
                  {alliance.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-card" style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <Anchor size={22} style={{ color: '#7DA3BE', margin: '0 auto 8px' }} aria-hidden="true" />
            <p className="mx-small" style={{ fontStyle: 'italic', color: '#D0C8B8', lineHeight: 1.5 }}>
              "Der Drache bringt die Vision der Sterne; die Ratte baut das Fundament der Erde. Gemeinsam ist kein Sturm zu stark."
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: CELESTIAL MEDICINE FOR DAILY STRESS */}
      {activeTab === 'medicine' && (
        <div className="mx-stack animate-fade-in" style={{ gap: 14 }}>
          <div className="mx-card soft">
            <h3 className="mx-h3">{t('astral.medicine.title')}</h3>
            <p className="mx-text" style={{ fontSize: '13px', lineHeight: 1.5 }}>
              {t('astral.medicine.lead')}
            </p>
          </div>

          <div className="mx-stack" style={{ gap: 10 }}>
            {Array.isArray(medicineCards) && medicineCards.map((med, idx) => (
              <div key={idx} className="mx-card" style={{ borderLeft: '3px solid #7DA3BE', background: 'rgba(255,255,255,0.03)' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: '#A9DFBF' }}>
                  {med.title}
                </strong>
                <p className="mx-text" style={{ marginTop: 4, fontSize: '13px', lineHeight: 1.5 }}>
                  {med.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ModuleShell>
  );
}
