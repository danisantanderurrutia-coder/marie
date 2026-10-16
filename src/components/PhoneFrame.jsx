import React, { useState, useEffect, useRef } from 'react';
import { 
  Flower2, 
  Flame, 
  Sparkles, 
  Compass, 
  Heart, 
  User,
  Wifi, 
  Battery, 
  Signal, 
  Smartphone, 
  Monitor, 
  QrCode,
  Volume2,
  VolumeX,
  Shield,
  LayoutGrid,
  Lock
} from 'lucide-react';
import { playSoftTap } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import { LOGO_04 } from '../utils/assets';

export default function PhoneFrame({
  activeTab,
  onSelectTab,
  viewMode,
  onToggleViewMode,
  deviceFinish,
  onChangeDeviceFinish,
  onOpenQrModal,
  currentEnergy,
  onSelectEnergy,
  soundEnabled,
  onToggleSound,
  onTogglePrivacy,
  onLockApp,
  floating,
  children
}) {
  const { currentStrings } = useLanguage();
  const [currentTime, setCurrentTime] = useState('');
  const screenRef = useRef(null);

  // Always reset scroll to top smoothly when switching tabs
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const finishStyles = {
    desert: {
      chassisBorder: '12px solid #36302B',
      outerRing: '0 0 0 2px #C5A081'
    },
    midnight: {
      chassisBorder: '12px solid #1C1E24',
      outerRing: '0 0 0 2px #3E4452'
    },
    silver: {
      chassisBorder: '12px solid #E1DFDC',
      outerRing: '0 0 0 2px #A8A5A1'
    }
  };

  const currentFinish = finishStyles[deviceFinish] || finishStyles.desert;

  const tabsData = [
    { id: 'rose', label: currentStrings.tabs.rose.label, desc: currentStrings.tabs.rose.desc, icon: Flower2, color: '#D84A58' },
    { id: 'space', label: currentStrings.tabs.space.label, desc: currentStrings.tabs.space.desc, icon: LayoutGrid, color: '#8E3B46' },
    // 'aura' (Fire & Desire) lives in the desktop sidebar and inside "My space"; the mobile bar keeps 6 slots
    { id: 'aura', label: currentStrings.tabs.aura.label, desc: currentStrings.tabs.aura.desc, icon: Flame, color: '#D84A58', inBar: false },
    { id: 'skin', label: currentStrings.tabs.skin.label, desc: currentStrings.tabs.skin.desc, icon: Sparkles, color: '#7DA3BE' },
    { id: 'hobbies', label: currentStrings.tabs.hobbies.label, desc: currentStrings.tabs.hobbies.desc, icon: Compass, color: '#6E8C6E' },
    { id: 'dreams', label: currentStrings.tabs.dreams.label, desc: currentStrings.tabs.dreams.desc, icon: Heart, color: '#8B8F94' },
    { id: 'profile', label: currentStrings.tabs.profile.label, desc: currentStrings.tabs.profile.desc, icon: User, color: '#C5A081' }
  ];

  const energyEntries = [
    { id: 'serene', label: currentStrings.energies.serene.label, emoji: currentStrings.energies.serene.emoji, color: '#7DA3BE' },
    { id: 'magnetic', label: currentStrings.energies.magnetic.label, emoji: currentStrings.energies.magnetic.emoji, color: '#D84A58' },
    { id: 'curious', label: currentStrings.energies.curious.label, emoji: currentStrings.energies.curious.emoji, color: '#6E8C6E' },
    { id: 'intimate', label: currentStrings.energies.intimate.label, emoji: currentStrings.energies.intimate.emoji, color: '#B23A48' },
    { id: 'dreamy', label: currentStrings.energies.dreamy.label, emoji: currentStrings.energies.dreamy.emoji, color: '#8B8F94' }
  ];

  return (
    <div className={`preview-workbench ${viewMode === 'desktop' ? 'desktop-atelier-mode' : 'phone-preview-mode'}`}>
      {/* Top Utility Bar */}
      <header className="workbench-topbar">
        <div className="brand-group">
          <img src={LOGO_04} alt="Marie Logo" className="workbench-brand-logo-img" />
          <span className="brand-name font-serif">{currentStrings.brandName}</span>
          <span className="brand-edition font-serif">{currentStrings.brandEdition}</span>
        </div>

        <div className="workbench-controls">
          {/* Language Selector in Topbar */}
          <LanguageSwitch variant="compact" />

          {onLockApp && (
            <button
              type="button"
              className="workbench-icon-btn"
              onClick={() => { playSoftTap(); onLockApp(); }}
              title="Lock sanctuary (PIN 2211)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                background: 'rgba(216, 74, 88, 0.1)',
                border: '1px solid rgba(216, 74, 88, 0.28)',
                color: '#D84A58',
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              <Lock size={12} />
              <span>PIN</span>
            </button>
          )}

          <div className="segmented-control">
            <button 
              className={`segmented-btn ${viewMode === 'phone' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); onToggleViewMode('phone'); }}
              title={currentStrings.simulatorIphone}
            >
              <Smartphone size={14} />
              <span>{currentStrings.simulatorIphone}</span>
            </button>
            <button 
              className={`segmented-btn ${viewMode === 'desktop' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); onToggleViewMode('desktop'); }}
              title={currentStrings.modeWebAtelier}
            >
              <Monitor size={14} />
              <span>{currentStrings.modeWebAtelier}</span>
            </button>
          </div>

          {viewMode === 'phone' && (
            <div className="finish-selector">
              <button 
                className={`finish-dot desert ${deviceFinish === 'desert' ? 'active' : ''}`} 
                onClick={() => onChangeDeviceFinish('desert')}
                title={currentStrings.finishDesert}
              />
              <button 
                className={`finish-dot midnight ${deviceFinish === 'midnight' ? 'active' : ''}`} 
                onClick={() => onChangeDeviceFinish('midnight')}
                title={currentStrings.finishMidnight}
              />
              <button 
                className={`finish-dot silver ${deviceFinish === 'silver' ? 'active' : ''}`} 
                onClick={() => onChangeDeviceFinish('silver')}
                title={currentStrings.finishSilver}
              />
            </div>
          )}

          {/* Dev-only: the QR flow sends your LAN address to a third-party QR service, so it never ships in production */}
          {import.meta.env.DEV && (
            <button 
              className="qr-trigger-btn"
              onClick={() => { playSoftTap(); onOpenQrModal(); }}
              title={currentStrings.testOnPhone}
            >
              <QrCode size={14} />
              <span>{currentStrings.testOnPhone}</span>
            </button>
          )}
        </div>
      </header>

      {/* RENDER MODE 1: DESKTOP ATELIER EXPERIENCE (2 Columnas: Menú Lateral + Lienzo Web Amplio) */}
      {viewMode === 'desktop' ? (
        <div className="desktop-atelier-workspace animate-fade-in">
          {/* Left Navigation Sidebar */}
          <aside className="desktop-atelier-sidebar glass-panel">
            <div className="atelier-sidebar-top-section">
              <div className="atelier-brand-lockup">
                <img src={LOGO_04} alt="Marie Logo" className="atelier-logo-img" />
                <div>
                  <h2 className="atelier-name font-serif">{currentStrings.brandName}</h2>
                  <span className="atelier-tagline">{currentStrings.brandTagline}</span>
                </div>
              </div>

              {/* Energy Selector integrado en el menú lateral */}
              <div className="sidebar-energy-block">
                <span className="sidebar-section-kicker">{currentStrings.currentEnergyKicker}</span>
                <div className="sidebar-energy-pills">
                  {energyEntries.map((energy) => {
                    const isSelected = currentEnergy === energy.id;
                    return (
                      <button
                        key={energy.id}
                        className={`sidebar-energy-pill ${isSelected ? 'active' : ''}`}
                        style={isSelected ? { backgroundColor: `${energy.color}25`, borderColor: energy.color, color: '#FFF' } : {}}
                        onClick={() => {
                          playSoftTap();
                          onSelectEnergy(energy.id);
                        }}
                      >
                        <span className="energy-pill-emoji">{energy.emoji}</span>
                        <span className="energy-pill-label">{energy.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation items */}
              <div className="sidebar-nav-block">
                <span className="sidebar-section-kicker">{currentStrings.sectionsKicker}</span>
                <nav className="atelier-nav-stack">
                  {tabsData.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        className={`atelier-nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => { playSoftTap(); onSelectTab(tab.id); }}
                      >
                        <div 
                          className="atelier-icon-wrap"
                          style={isActive ? { background: `${tab.color}25`, color: tab.color } : {}}
                        >
                          <Icon size={18} strokeWidth={isActive ? 2.3 : 1.7} />
                        </div>
                        <div className="atelier-text-wrap">
                          <span className="atelier-tab-name font-serif">{tab.label}</span>
                          <span className="atelier-tab-desc">{tab.desc}</span>
                        </div>
                        {isActive && (
                          <div className="atelier-active-pip" style={{ background: tab.color }} />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Sidebar Bottom: Quick utility actions & Mobile Sync */}
            <div className="atelier-sidebar-bottom-section">
              <div className="sidebar-quick-actions">
                <button 
                  className="sidebar-action-btn"
                  title={soundEnabled ? currentStrings.soundMuted : currentStrings.soundOn}
                  onClick={() => { playSoftTap(); onToggleSound(); }}
                >
                  {soundEnabled ? <Volume2 size={16} color="#D84A58" /> : <VolumeX size={16} color="#8B8F94" />}
                  <span>{soundEnabled ? currentStrings.soundOn : currentStrings.soundMuted}</span>
                </button>

                <button 
                  className="sidebar-action-btn shield"
                  title={currentStrings.discreetFull}
                  onClick={() => { playSoftTap(); onTogglePrivacy(); }}
                >
                  <Shield size={15} color="#C5A081" />
                  <span>{currentStrings.discreetMode}</span>
                </button>
              </div>

              {/* Mobile Sync Card (dev-only: there is no real sync, data stays on this device) */}
              {import.meta.env.DEV && (
                <div className="atelier-sync-card glass-panel" onClick={onOpenQrModal}>
                  <div className="sync-status-badge">
                    <span className="sync-dot-live"></span>
                    <span>{currentStrings.inSyncWithIphone}</span>
                  </div>
                  <p className="sync-card-p">
                    {currentStrings.scanQrCardText}
                  </p>
                  <div className="sync-action-pill">
                    <QrCode size={13} />
                    <span>{currentStrings.viewQrCode}</span>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Center Stage: Lienzo Web Amplio y Optimizado */}
          <main id="main-content" tabIndex={-1} className="desktop-atelier-canvas screen-scroll" ref={screenRef}>
            <div className="desktop-content-max">
              {children}
            </div>
          </main>
        </div>
      ) : (
        /* RENDER MODE 2: IPHONE 16 PRO SIMULATOR */
        <div className="device-stage">
          <div 
            className="iphone-container"
            style={{
              border: currentFinish.chassisBorder,
              boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), ${currentFinish.outerRing}`
            }}
          >
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <div className="island-camera"></div>
              <div className="island-sensor"></div>
            </div>

            {/* Status Bar */}
            <div className="phone-status-bar">
              <span className="status-time">{currentTime || '09:41'}</span>
              <div className="status-icons">
                <Signal size={12} strokeWidth={2.5} />
                <Wifi size={12} strokeWidth={2.5} />
                <Battery size={14} strokeWidth={2.5} className="battery-icon" />
              </div>
            </div>

            {/* Screen Content Wrapper with Ref for instant scroll control */}
            <div className="phone-screen screen-scroll" ref={screenRef}>
              <main id="main-content" tabIndex={-1} className="screen-main-content">
                {children}
              </main>

              {/* Bottom Tab Bar with 6 balanced pillars */}
              <nav className="phone-tab-bar glass-panel">
                <div className="tab-items-row">
                  {tabsData.filter((tab) => tab.inBar !== false).map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        className={`tab-item-btn ${isActive ? 'active' : ''}`}
                        style={isActive ? { color: tab.color } : {}}
                        onClick={() => {
                          playSoftTap();
                          onSelectTab(tab.id);
                        }}
                      >
                        <div className="tab-icon-wrapper">
                          <Icon size={18} strokeWidth={isActive ? 2.4 : 1.7} />
                        </div>
                        <span className="tab-label font-serif">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
                {/* Home Indicator line (iOS standard) */}
                <div className="home-indicator-bar"></div>
              </nav>
              {floating}
            </div>
          </div>
        </div>
      )}
      {viewMode === 'desktop' && floating}
    </div>
  );
}
