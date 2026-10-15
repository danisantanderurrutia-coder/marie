import React, { useState } from 'react';
import { Smartphone, X, Copy, Check } from 'lucide-react';
import { playSoftTap } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export default function QrModal({ isOpen, onClose, localIp = '192.168.178.83', port = '5173' }) {
  const { currentStrings } = useLanguage();
  const q = currentStrings.qrModal;
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullUrl = `http://${localIp}:${port}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullUrl)}&bgcolor=FAF7F2&color=2C2523&margin=10`;

  const handleCopy = () => {
    playSoftTap();
    navigator.clipboard?.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="qr-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="qr-modal-header">
          <div className="qr-header-title-group">
            <Smartphone size={20} className="qr-phone-icon" />
            <h3 className="qr-title font-serif">{q.title}</h3>
          </div>
          <button className="qr-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="qr-instruction">
          {q.instruction}
        </p>

        <div className="qr-code-wrapper">
          <img 
            src={qrUrl} 
            alt={`QR Code for ${fullUrl}`} 
            className="qr-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className="qr-link-box">
          <span className="qr-link-text">{fullUrl}</span>
          <button className="qr-copy-btn" onClick={handleCopy} title={q.copyTitle}>
            {copied ? <Check size={15} color="#8A9A86" /> : <Copy size={15} />}
          </button>
        </div>

        <div className="qr-ios-tip">
          <strong>{q.tipLabel}</strong> {q.tipText}
        </div>

        <button className="qr-done-btn" onClick={onClose}>
          {q.doneBtn}
        </button>
      </div>
    </div>
  );
}
