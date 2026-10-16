import React, { useState, useEffect } from 'react';
import PhoneFrame from './components/PhoneFrame';
import Header from './components/Header';
import Landing from './components/Landing';
import AuraDesireTab from './components/AuraDesireTab';
import SkinBodyTab from './components/SkinBodyTab';
import HobbiesTab from './components/HobbiesTab';
import DreamsTab from './components/DreamsTab';
import ProfileTab from './components/ProfileTab';
import PrivacyShield from './components/PrivacyShield';
import QrModal from './components/QrModal';
import SpaceTab from './components/SpaceTab';
import SupportSheet from './components/SupportSheet';
import { Wind } from 'lucide-react';
import AppLock from './components/AppLock';
import { useLanguage } from './context/LanguageContext';
import { getModule } from './modules/registry';
import './App.css';

export default function App() {
  const [isAppUnlocked, setIsAppUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('marie_app_authenticated') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState('rose'); // 'rose' | 'aura' | 'skin' | 'hobbies' | 'dreams' | 'profile'
  const [currentEnergy, setCurrentEnergy] = useState('serene');

  // Auto-detect viewMode: PC/Desktop (>= 900px) opens Desktop Atelier; phone (< 900px) opens Mobile Phone
  const [viewMode, setViewModeState] = useState(() => {
    try {
      const explicit = sessionStorage.getItem('marie_view_mode_explicit');
      if (explicit === 'true') {
        const stored = sessionStorage.getItem('marie_view_mode');
        if (stored === 'phone' || stored === 'desktop') return stored;
      }
      if (typeof window !== 'undefined' && window.innerWidth >= 900) {
        return 'desktop';
      }
    } catch (e) {}
    return 'phone';
  });

  const handleToggleViewMode = (mode) => {
    setViewModeState(mode);
    try {
      sessionStorage.setItem('marie_view_mode', mode);
      sessionStorage.setItem('marie_view_mode_explicit', 'true');
    } catch (e) {}
  };

  useEffect(() => {
    const handleResize = () => {
      try {
        const explicit = sessionStorage.getItem('marie_view_mode_explicit');
        if (explicit !== 'true') {
          const next = window.innerWidth >= 900 ? 'desktop' : 'phone';
          setViewModeState(next);
        }
      } catch (e) {}
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [deviceFinish, setDeviceFinish] = useState('desert'); // 'desert' | 'midnight' | 'silver'
  const [isPrivacyShieldActive, setIsPrivacyShieldActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null); // module id inside the 'space' tab
  const [moduleIntent, setModuleIntent] = useState(null); // optional hint, e.g. { sos: true }
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { t } = useLanguage();

  const handleUnlockApp = () => {
    setIsAppUnlocked(true);
    try {
      sessionStorage.setItem('marie_app_authenticated', 'true');
    } catch (e) {}
  };

  const handleLockApp = () => {
    setIsAppUnlocked(false);
    try {
      sessionStorage.removeItem('marie_app_authenticated');
    } catch (e) {}
  };

  const openModule = (id, intent = null) => {
    setActiveModule(id);
    setModuleIntent(intent);
    setActiveTab('space');
  };
  const closeModule = () => { setActiveModule(null); setModuleIntent(null); };
  const selectTab = (tab) => { if (tab !== 'space') closeModule(); else if (activeTab === 'space') closeModule(); setActiveTab(tab); };
  const showSos = !(activeTab === 'space' && activeModule === 'stress') && !!getModule('stress');

  if (!isAppUnlocked) {
    return <AppLock soundEnabled={soundEnabled} onUnlock={handleUnlockApp} />;
  }

  return (
    <div className="app-root">
      <a className="skip-link" href="#main-content">{t('a11y.skip')}</a>
      <PhoneFrame
        activeTab={activeTab}
        onSelectTab={selectTab}
        floating={showSos && !isPrivacyShieldActive && (
          <button className="mx-sos" onClick={() => openModule('stress', { sos: true })}>
            <Wind size={18} aria-hidden="true" /> {t('stress.sosButton')}
          </button>
        )}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        deviceFinish={deviceFinish}
        onChangeDeviceFinish={setDeviceFinish}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        currentEnergy={currentEnergy}
        onSelectEnergy={setCurrentEnergy}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onTogglePrivacy={() => setIsPrivacyShieldActive(true)}
        onLockApp={handleLockApp}
      >
        {isPrivacyShieldActive ? (
          <PrivacyShield onDismiss={() => setIsPrivacyShieldActive(false)} />
        ) : (
          <>
            {viewMode === 'phone' && (
              <Header
                currentEnergy={currentEnergy}
                onSelectEnergy={setCurrentEnergy}
                onTogglePrivacy={() => setIsPrivacyShieldActive(true)}
                soundEnabled={soundEnabled}
                onToggleSound={() => setSoundEnabled(!soundEnabled)}
                onOpenRoseOverview={() => selectTab('rose')}
                activeTab={activeTab}
              />
            )}

            {activeTab === 'rose' && (
              <Landing openModule={openModule} goToTab={selectTab} openSupport={() => setIsSupportOpen(true)} />
            )}
            {(activeTab === 'aura' || activeTab === 'mindset' || activeTab === 'sanctuary') && (
              <AuraDesireTab soundEnabled={soundEnabled} />
            )}
            {activeTab === 'space' && (
              <SpaceTab
                soundEnabled={soundEnabled}
                activeModule={activeModule}
                intent={moduleIntent}
                openModule={openModule}
                closeModule={closeModule}
                goToTab={selectTab}
                openSupport={() => setIsSupportOpen(true)}
              />
            )}
            {activeTab === 'skin' && <SkinBodyTab soundEnabled={soundEnabled} openModule={openModule} />}
            {activeTab === 'hobbies' && <HobbiesTab soundEnabled={soundEnabled} />}
            {activeTab === 'dreams' && <DreamsTab soundEnabled={soundEnabled} />}
            {activeTab === 'profile' && <ProfileTab soundEnabled={soundEnabled} openModule={openModule} />}
          </>
        )}
      </PhoneFrame>

      <SupportSheet open={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      {import.meta.env.DEV && (
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        localIp="192.168.178.83"
        port="5173"
      />
      )}
    </div>
  );
}
