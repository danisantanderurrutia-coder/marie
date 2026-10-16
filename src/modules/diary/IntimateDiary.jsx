// src/modules/diary/IntimateDiary.jsx
// Marie's Intimate Daily Journal with photo capsule & calendar tracking.
// Local-only, private, compassionate.

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Camera, 
  Image as ImageIcon, 
  Trash2, 
  Save, 
  Check, 
  Sparkles, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  CloudRain,
  Zap,
  Feather,
  Compass
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { playSoftTap, playSoftChime } from '../../utils/audio';

export default function IntimateDiary({ onBack, soundEnabled }) {
  const { language, t } = useLanguage();
  const fileInputRef = useRef(null);

  // Selected date (defaults to today 'YYYY-MM-DD')
  const getTodayStr = () => new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(getTodayStr());

  // Form states for the selected date
  const [mood, setMood] = useState('calm');
  const [text, setText] = useState('');
  const [photoData, setPhotoData] = useState(null); // base64 string
  const [photoCaption, setPhotoCaption] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Key for localStorage
  const entryKey = `marie_diary_${selectedDate}`;

  // Load entry whenever selectedDate changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(entryKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMood(parsed.mood || 'calm');
        setText(parsed.text || '');
        setPhotoData(parsed.photoData || null);
        setPhotoCaption(parsed.photoCaption || '');
      } else {
        setMood('calm');
        setText('');
        setPhotoData(null);
        setPhotoCaption('');
      }
    } catch (e) {
      setMood('calm');
      setText('');
      setPhotoData(null);
      setPhotoCaption('');
    }
  }, [selectedDate, entryKey]);

  // Compute total entries count in localStorage
  const [totalMoments, setTotalMoments] = useState(0);
  const [savedDates, setSavedDates] = useState([]);

  useEffect(() => {
    try {
      const dates = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('marie_diary_')) {
          const d = k.replace('marie_diary_', '');
          dates.push(d);
        }
      }
      setSavedDates(dates);
      setTotalMoments(dates.length);
    } catch (e) {}
  }, [selectedDate, toastMessage]);

  // Photo upload & compression handler
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (soundEnabled) playSoftTap();

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress to max width/height of 750px to keep localStorage safe & light
        const maxDim = 750;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        setPhotoData(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEntry = () => {
    if (soundEnabled) playSoftChime();
    const entry = {
      date: selectedDate,
      mood,
      text,
      photoData,
      photoCaption,
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(entryKey, JSON.stringify(entry));
    } catch (e) {}

    setToastMessage(t('diary.savedToast'));
    setTimeout(() => setToastMessage(''), 2400);
  };

  const handleRemovePhoto = () => {
    if (soundEnabled) playSoftTap();
    setPhotoData(null);
    setPhotoCaption('');
  };

  // Date navigation helpers
  const shiftDay = (days) => {
    if (soundEnabled) playSoftTap();
    const cur = new Date(selectedDate);
    cur.setDate(cur.getDate() + days);
    setSelectedDate(cur.toISOString().slice(0, 10));
  };

  // Format date display
  const formatDateLocale = (dateStr) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      const loc = language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : 'en-US';
      return new Intl.DateTimeFormat(loc, { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }).format(d);
    } catch (e) {
      return dateStr;
    }
  };

  const moodsList = [
    { key: 'calm', icon: Sun, color: '#C5A081' },
    { key: 'stormy', icon: CloudRain, color: '#7DA3BE' },
    { key: 'spark', icon: Zap, color: '#D84A58' },
    { key: 'tender', icon: Feather, color: '#C87D55' },
    { key: 'deep', icon: Compass, color: '#9B59B6' }
  ];

  return (
    <div className="mx-screen animate-fade-in" style={{ paddingBottom: 40 }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <button className="mx-back" onClick={onBack} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={18} aria-hidden="true" /> {t('common.back')}
        </button>
        <span 
          className="mx-badge"
          style={{ background: 'rgba(197, 160, 129, 0.15)', color: '#C5A081', border: '1px solid rgba(197, 160, 129, 0.3)' }}
        >
          {t('diary.kicker')}
        </span>
      </div>

      <header style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="mx-title" style={{ margin: 0 }}>
            {t('diary.title')}
          </h1>
          <span 
            style={{ 
              fontSize: 12, 
              color: '#D84A58', 
              background: 'rgba(216, 74, 88, 0.12)', 
              padding: '4px 10px', 
              borderRadius: 14,
              fontWeight: 600
            }}
          >
            ✨ {totalMoments} {t('diary.streakBadge')}
          </span>
        </div>
        <p className="mx-lead" style={{ marginTop: 4, fontSize: 14 }}>
          {t('diary.lead')}
        </p>
      </header>

      {/* Date Bar & Calendar Navigator */}
      <div 
        className="mx-card soft"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 14px',
          marginBottom: 16
        }}
      >
        <button className="mx-btn ghost small" onClick={() => shiftDay(-1)}>
          <ChevronLeft size={16} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <span className="font-serif" style={{ fontSize: 14, color: '#FFF', fontWeight: 600, display: 'block' }}>
            {formatDateLocale(selectedDate)}
          </span>
          {savedDates.includes(selectedDate) ? (
            <span style={{ fontSize: 11, color: '#6E8C6E', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Check size={11} /> Eintrag vorhanden
            </span>
          ) : (
            <span style={{ fontSize: 11, color: '#A0988A' }}>
              {selectedDate === getTodayStr() ? 'Heute' : 'Kein Eintrag bisher'}
            </span>
          )}
        </div>

        <button className="mx-btn ghost small" onClick={() => shiftDay(1)}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Inner Weather / Mood Selector */}
      <div style={{ marginBottom: 16 }}>
        <span className="mx-small" style={{ color: '#D0C8B8', fontWeight: 600, display: 'block', marginBottom: 8 }}>
          {t('diary.moodPrompt')}
        </span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {moodsList.map((m) => {
            const Icon = m.icon;
            const isSelected = mood === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => { playSoftTap(); setMood(m.key); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 12px',
                  borderRadius: 16,
                  background: isSelected ? `${m.color}25` : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? `1.5px solid ${m.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#FFF' : '#C0B8AA',
                  fontSize: 12,
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} style={{ color: m.color }} />
                <span>{t(`diary.moods.${m.key}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Journaling Textarea */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="diary-entry" className="mx-small" style={{ color: '#D0C8B8', fontWeight: 600, display: 'block', marginBottom: 6 }}>
          {t('diary.journalLabel')}
        </label>
        <textarea
          id="diary-entry"
          className="mx-textarea"
          rows={6}
          placeholder={t('diary.journalPlaceholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', fontSize: 14, lineHeight: 1.6 }}
        />
      </div>

      {/* Photo of the Day (Polaroid Style) */}
      <div className="mx-card soft" style={{ marginBottom: 20, padding: 14 }}>
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          capture="environment"
          style={{ display: 'none' }} 
          onChange={handlePhotoSelect} 
        />

        {!photoData ? (
          <button 
            type="button"
            className="mx-btn ghost full"
            onClick={() => fileInputRef.current?.click()}
            style={{ border: '1px dashed rgba(197, 160, 129, 0.4)', padding: '16px' }}
          >
            <Camera size={18} style={{ color: '#C5A081' }} />
            <span>{t('diary.photoBtn')}</span>
          </button>
        ) : (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Polaroid Frame */}
            <div 
              style={{
                background: '#FAF7F2',
                padding: '12px 12px 20px',
                borderRadius: 8,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                maxWidth: '280px',
                width: '100%',
                margin: '8px auto'
              }}
            >
              <img 
                src={photoData} 
                alt="Moment des Tages"
                style={{ 
                  width: '100%', 
                  height: '220px', 
                  objectFit: 'cover', 
                  borderRadius: 4, 
                  display: 'block' 
                }} 
              />
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <input
                  type="text"
                  placeholder={t('diary.photoCaptionPlaceholder')}
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: 12,
                    color: '#2A2521',
                    outline: 'none',
                    padding: '4px 0'
                  }}
                />
              </div>
            </div>

            {/* Photo Action Buttons */}
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button 
                type="button" 
                className="mx-btn ghost small"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={14} /> {t('diary.photoChange')}
              </button>
              <button 
                type="button" 
                className="mx-btn ghost small"
                onClick={handleRemovePhoto}
                style={{ color: '#D84A58' }}
              >
                <Trash2 size={14} /> {t('diary.photoRemove')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button 
        className="mx-btn warm full" 
        style={{ padding: '14px', fontSize: 14.5, fontWeight: 700 }}
        onClick={handleSaveEntry}
      >
        <Save size={16} />
        <span>{t('diary.saveBtn')}</span>
      </button>

      {toastMessage && (
        <p className="mx-toast animate-fade-in" role="status" style={{ marginTop: 12 }}>
          {toastMessage}
        </p>
      )}

      <p className="mx-small" style={{ textAlign: 'center', color: '#90887A', marginTop: 14, fontSize: 11.5 }}>
        🔒 {t('diary.privacyNote')}
      </p>
    </div>
  );
}
