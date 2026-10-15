import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { playSoftTap } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyShield({ onDismiss }) {
  const { currentStrings } = useLanguage();
  const p = currentStrings.privacy;

  return (
    <div className="privacy-shield-container animate-fade-in">
      <div className="shield-top-nav">
        <button className="shield-back-btn" onClick={() => { playSoftTap(); onDismiss(); }}>
          <ArrowLeft size={16} /> {p.backBtn}
        </button>
        <span className="shield-doc-type">{p.docType}</span>
      </div>

      <div className="shield-reading-card">
        <span className="reading-tag font-serif">{p.chapter}</span>
        <h2 className="reading-title font-serif">{p.title}</h2>
        <p className="reading-author">{p.author}</p>

        <div className="reading-divider"></div>

        <p className="reading-paragraph">
          {p.p1}
        </p>
        <p className="reading-paragraph">
          {p.p2}
        </p>

        <div className="shield-action-footer">
          <button className="shield-resume-btn" onClick={() => { playSoftTap(); onDismiss(); }}>
            {p.restoreBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
