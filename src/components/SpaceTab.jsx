import React, { useState, Suspense } from 'react';
import { 
  Flame, 
  ChevronRight, 
  Download, 
  Trash2, 
  ShieldCheck, 
  LifeBuoy, 
  Sparkles, 
  LayoutGrid,
  Flower2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MODULES, getModule } from '../modules/registry';
import { exportAllData, eraseAllData } from '../utils/storage';
import { playSoftTap } from '../utils/audio';
import { SafetyNote } from './ModuleShell';
import IkigaiFlower from './IkigaiFlower';
import PetalFlow from './PetalFlow';

// "Mein Raum" / "Mi Espacio": the Ikigai Rose dashboard + expressive flows + full directory.
export default function SpaceTab({ 
  soundEnabled, 
  activeModule, 
  intent, 
  openModule, 
  closeModule, 
  goToTab, 
  openSupport 
}) {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [selectedPetalId, setSelectedPetalId] = useState(null); // 'body' | 'fire' | 'create' | 'dreams' | 'me'
  const [viewMode, setViewMode] = useState('flower'); // 'flower' | 'all'

  // If a full guided module is currently open (e.g. checkin, bodymap, ideas, heart, etc.)
  const current = activeModule ? getModule(activeModule) : null;
  if (current) {
    const Module = current.Component;
    return (
      <Suspense fallback={<div className="mx-screen"><p className="mx-small">…</p></div>}>
        <Module
          soundEnabled={soundEnabled}
          intent={intent}
          onBack={closeModule}
          openModule={openModule}
          openSupport={openSupport}
        />
      </Suspense>
    );
  }

  // If a petal expressive flow is currently open
  if (selectedPetalId) {
    return (
      <section className="mx-screen animate-fade-in" aria-labelledby="petal-flow-title">
        <PetalFlow
          petalId={selectedPetalId}
          onBack={() => setSelectedPetalId(null)}
          openModule={openModule}
          goToTab={goToTab}
          soundEnabled={soundEnabled}
        />
        <SafetyNote onOpenSupport={openSupport} />
      </section>
    );
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportAllData(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marie-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleErase = () => {
    if (window.confirm(t('privacy.eraseConfirm'))) {
      eraseAllData();
      setMessage(t('privacy.erased'));
      setTimeout(() => window.location.reload(), 900);
    }
  };

  return (
    <section className="mx-screen animate-fade-in" aria-labelledby="hub-title">
      <div className="mx-kicker">{t('ikigai.kicker')}</div>
      <h1 id="hub-title" className="mx-title">{t('ikigai.title')}</h1>
      <p className="mx-lead">{t('ikigai.lead')}</p>

      {/* View Mode Toggle: Flower vs All Tools */}
      <div className="mx-segmented" style={{ margin: '14px 0 10px' }}>
        <button
          className={`mx-seg-btn ${viewMode === 'flower' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setViewMode('flower'); }}
        >
          <Flower2 size={14} aria-hidden="true" />
          <span>{t('ikigai.viewModePill.flower')}</span>
        </button>
        <button
          className={`mx-seg-btn ${viewMode === 'all' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setViewMode('all'); }}
        >
          <LayoutGrid size={14} aria-hidden="true" />
          <span>{t('ikigai.viewModePill.all')}</span>
        </button>
      </div>

      {/* VIEW 1: THE IKIGAI ROSE */}
      {viewMode === 'flower' && (
        <div className="animate-fade-in">
          <IkigaiFlower
            onSelectPetal={(id) => setSelectedPetalId(id)}
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* VIEW 2: ALL DIRECT TOOLS DIRECTORY */}
      {viewMode === 'all' && (
        <div className="hub-grid animate-fade-in" style={{ marginTop: 14 }}>
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                className="hub-card"
                onClick={() => { playSoftTap(); openModule(m.id); }}
              >
                <span className="hub-icon" style={{ background: `${m.color}1f`, color: m.color }}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="hub-text">
                  <strong>{t(`hub.cards.${m.id}.title`)}</strong>
                  <span>{t(`hub.cards.${m.id}.desc`)}</span>
                </span>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            );
          })}
          <button className="hub-card" onClick={() => { playSoftTap(); goToTab('aura'); }}>
            <span className="hub-icon" style={{ background: '#D84A581f', color: '#D84A58' }}>
              <Flame size={22} aria-hidden="true" />
            </span>
            <span className="hub-text">
              <strong>{t('hub.fire.title')}</strong>
              <span>{t('hub.fire.desc')}</span>
            </span>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <SafetyNote onOpenSupport={openSupport} />

      {/* Privacy & Storage Control Card */}
      <div className="mx-card soft" style={{ marginTop: 18 }}>
        <div className="mx-row">
          <ShieldCheck size={20} aria-hidden="true" />
          <h2 className="mx-h2" style={{ margin: 0 }}>{t('privacy.dataTitle')}</h2>
        </div>
        <p className="mx-text" style={{ marginTop: 8 }}>{t('privacy.dataLead')}</p>
        <ul className="mx-small" style={{ paddingLeft: 18, marginTop: 8 }}>
          {(t('privacy.points') || []).map((p) => <li key={p}>{p}</li>)}
        </ul>
        <div className="mx-row" style={{ marginTop: 12 }}>
          <button className="mx-btn ghost" onClick={handleExport}>
            <Download size={16} aria-hidden="true" /> {t('privacy.export')}
          </button>
          <button className="mx-btn ghost" onClick={handleErase}>
            <Trash2 size={16} aria-hidden="true" /> {t('privacy.erase')}
          </button>
        </div>
        {message && <p className="mx-toast" role="status">{message}</p>}
      </div>

      <button className="mx-btn warm full" style={{ marginTop: 14 }} onClick={openSupport}>
        <LifeBuoy size={18} aria-hidden="true" /> {t('safety.helpButton')}
      </button>
    </section>
  );
}
