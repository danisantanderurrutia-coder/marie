import React, { useState } from 'react';
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
import { useLanguage } from './context/LanguageContext';
import { getModule } from './modules/registry';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('rose'); // 'rose' | 'aura' | 'skin' | 'hobbies' | 'dreams' | 'profile'
  const [currentEnergy, setCurrentEnergy] = useState('serene');
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'desktop'
  const [deviceFinish, setDeviceFinish] = useState('desert'); // 'desert' | 'midnight' | 'silver'
  const [isPrivacyShieldActive, setIsPrivacyShieldActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null); // module id inside the 'space' tab
  const [moduleIntent, setModuleIntent] = useState(null); // optional hint, e.g. { sos: true }
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { t } = useLanguage();

  const openModule = (id, intent = null) => {
    setActiveModule(id);
    setModuleIntent(intent);
    setActiveTab('space');
  };
  const closeModule = () => { setActiveModule(null); setModuleIntent(null); };
  const selectTab = (tab) => { if (tab !== 'space') closeModule(); else if (activeTab === 'space') closeModule(); setActiveTab(tab); };
  const showSos = !(activeTab === 'space' && activeModule === 'stress') && !!getModule('stress');

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
        onToggleViewMode={setViewMode}
        deviceFinish={deviceFinish}
        onChangeDeviceFinish={setDeviceFinish}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        currentEnergy={currentEnergy}
        onSelectEnergy={setCurrentEnergy}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onTogglePrivacy={() => setIsPrivacyShieldActive(true)}
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
            {activeTab === 'skin' && <SkinBodyTab soundEnabled={soundEnabled} />}
            {activeTab === 'hobbies' && <HobbiesTab soundEnabled={soundEnabled} />}
            {activeTab === 'dreams' && <DreamsTab soundEnabled={soundEnabled} />}
            {activeTab === 'profile' && <ProfileTab soundEnabled={soundEnabled} />}
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
