// src/utils/storage.js
// Privacy first: everything Marie writes stays in this browser (localStorage).
// Nothing is sent anywhere. These helpers keep that in one place so that
// "export my data" and "delete everything" are always honest and complete.

import { useCallback, useEffect, useRef, useState } from 'react';

export const STORAGE_PREFIX = 'marie_';

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false; // private mode or quota: the UI keeps working, just without persistence
  }
}

/** useState that persists to localStorage as JSON (new modules use this). */
export function useLocalState(key, initial) {
  const [value, setValue] = useState(() => readJSON(key, typeof initial === 'function' ? initial() : initial));
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    writeJSON(key, value);
  }, [key, value]);
  return [value, setValue];
}

/** Append-only helper for log-style lists, newest first. */
export function useLog(key) {
  const [items, setItems] = useLocalState(key, []);
  const add = useCallback((entry) => {
    const full = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, at: new Date().toISOString(), ...entry };
    setItems((prev) => [full, ...prev]);
    return full;
  }, [setItems]);
  const update = useCallback((id, patch) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i))), [setItems]);
  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), [setItems]);
  return { items, add, update, remove };
}

export function listOwnKeys() {
  const keys = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) keys.push(k);
    }
  } catch (e) {}
  return keys;
}

export function exportAllData() {
  const data = {};
  listOwnKeys().forEach((k) => {
    const raw = localStorage.getItem(k);
    try { data[k] = JSON.parse(raw); } catch (e) { data[k] = raw; }
  });
  return { app: 'marie', exportedAt: new Date().toISOString(), data };
}

export function eraseAllData() {
  listOwnKeys().forEach((k) => localStorage.removeItem(k));
}

export function dayKey(date = new Date()) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
