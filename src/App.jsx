import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import Header from './components/Header';
import IkigaiRose from './components/IkigaiRose';
import AuraDesireTab from './components/AuraDesireTab';
import SkinBodyTab from './components/SkinBodyTab';
import HobbiesTab from './components/HobbiesTab';
import DreamsTab from './components/DreamsTab';
import ProfileTab from './components/ProfileTab';
import PrivacyShield from './components/PrivacyShield';
import QrModal from './components/QrModal';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('rose'); // 'rose' | 'aura' | 'skin' | 'hobbies' | 'dreams' | 'profile'
  const [currentEnergy, setCurrentEnergy] = useState('serene');
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'desktop'
  const [deviceFinish, setDeviceFinish] = useState('desert'); // 'desert' | 'midnight' | 'silver'
  const [isPrivacyShieldActive, setIsPrivacyShieldActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className="app-root">
      <PhoneFrame
        activeTab={activeTab}
        onSelectTab={setActiveTab}
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
                onOpenRoseOverview={() => setActiveTab('rose')}
                activeTab={activeTab}
              />
            )}

            {activeTab === 'rose' && (
              <IkigaiRose
                activeTab={activeTab}
                onSelectPetal={setActiveTab}
                soundEnabled={soundEnabled}
              />
            )}
            {(activeTab === 'aura' || activeTab === 'mindset' || activeTab === 'sanctuary') && (
              <AuraDesireTab soundEnabled={soundEnabled} />
            )}
            {activeTab === 'skin' && <SkinBodyTab soundEnabled={soundEnabled} />}
            {activeTab === 'hobbies' && <HobbiesTab soundEnabled={soundEnabled} />}
            {activeTab === 'dreams' && <DreamsTab soundEnabled={soundEnabled} />}
            {activeTab === 'profile' && <ProfileTab soundEnabled={soundEnabled} />}
          </>
        )}
      </PhoneFrame>

      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        localIp="192.168.178.83"
        port="5173"
      />
    </div>
  );
}
