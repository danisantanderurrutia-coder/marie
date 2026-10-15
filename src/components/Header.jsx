import React from 'react';
import { Volume2, VolumeX, Shield } from 'lucide-react';
import { playSoftTap } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitch from './LanguageSwitch';

export default function Header({ 
  currentEnergy, 
  onSelectEnergy, 
  onTogglePrivacy, 
  soundEnabled, 
  onToggleSound,
  onOpenRoseOverview,
  activeTab
}) {
  const { currentStrings } = useLanguage();

  const today = new Intl.DateTimeFormat(currentStrings.dateLocale || 'en-US', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  }).format(new Date());

  const energyEntries = [
    { id: 'serene', label: currentStrings.energies.serene.label, emoji: currentStrings.energies.serene.emoji, color: '#7DA3BE' },
    { id: 'magnetic', label: currentStrings.energies.magnetic.label, emoji: currentStrings.energies.magnetic.emoji, color: '#D84A58' },
    { id: 'curious', label: currentStrings.energies.curious.label, emoji: currentStrings.energies.curious.emoji, color: '#6E8C6E' },
    { id: 'intimate', label: currentStrings.energies.intimate.label, emoji: currentStrings.energies.intimate.emoji, color: '#B23A48' },
    { id: 'dreamy', label: currentStrings.energies.dreamy.label, emoji: currentStrings.energies.dreamy.emoji, color: '#8B8F94' }
  ];

  return (
    <header className="app-header-compact">
      <div className="header-main-bar">
        {/* Brand with Wild Rose Ikigai emblem */}
        <button 
          className="brand-emblem-btn" 
          onClick={() => { playSoftTap(); onOpenRoseOverview(); }}
          title={currentStrings.tabs.rose.label}
        >
          <div className="wild-rose-logo-icon">
            <img src="/logo_04.png" alt="Marie Logo 04" className="header-logo-img" />
          </div>
          <div className="brand-text-stack">
            <div className="brand-line">
              <span className="brand-title font-serif">{currentStrings.brandName}</span>
              <span className="date-capsule">{today}</span>
            </div>
            <span className="brand-sub-ikigai">{currentStrings.subIkigai}</span>
          </div>
        </button>

        {/* Quick Actions (Language, Sound, Discreet) */}
        <div className="header-quick-actions">
          <LanguageSwitch variant="compact" showIcon={false} />

          <button 
            className="compact-action-btn" 
            title={soundEnabled ? currentStrings.soundMuted : currentStrings.soundOn}
            onClick={() => {
              playSoftTap();
              onToggleSound();
            }}
          >
            {soundEnabled ? <Volume2 size={15} color="#D84A58" /> : <VolumeX size={15} color="#8B8F94" />}
          </button>

          <button 
            className="compact-action-btn shield-btn" 
            title={currentStrings.discreetFull}
            onClick={() => {
              playSoftTap();
              onTogglePrivacy();
            }}
          >
            <Shield size={14} />
            <span>{currentStrings.discreetMode}</span>
          </button>
        </div>
      </div>

      {/* Energy Pills Selector - Smooth and non-intrusive */}
      <div className="energy-strip-container">
        <div className="energy-strip-scroll screen-scroll">
          {energyEntries.map((energy) => {
            const isSelected = currentEnergy === energy.id;
            return (
              <button
                key={energy.id}
                className={`energy-strip-pill ${isSelected ? 'active' : ''}`}
                style={isSelected ? { backgroundColor: energy.color, borderColor: energy.color } : {}}
                onClick={() => {
                  playSoftTap();
                  onSelectEnergy(energy.id);
                }}
              >
                <span>{energy.emoji}</span>
                <span>{energy.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
