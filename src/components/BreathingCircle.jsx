import React, { useEffect, useRef, useState } from 'react';
import './BreathingCircle.css';

// Visual breathing companion. The text label always states the phase, so it works without animation
// (prefers-reduced-motion users still get "In / Out" and a counter).
export default function BreathingCircle({ inSec = 4, outSec = 6, cycles = 3, labels, startLabel, stopLabel, onDone, autoStart = false }) {
  const [running, setRunning] = useState(autoStart);
  const [phase, setPhase] = useState('in');
  const [cycle, setCycle] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!running) return undefined;
    const runPhase = (p, c) => {
      setPhase(p);
      setCycle(c);
      timer.current = setTimeout(() => {
        if (p === 'in') runPhase('out', c);
        else if (c + 1 >= cycles) { setRunning(false); onDone?.(); }
        else runPhase('in', c + 1);
      }, (p === 'in' ? inSec : outSec) * 1000);
    };
    runPhase('in', 0);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div className="breath">
      <div
        className={`breath-circle ${running ? `is-${phase}` : ''}`}
        style={{ '--in': `${inSec}s`, '--out': `${outSec}s` }}
        aria-hidden="true"
      >
        <span>{running ? (phase === 'in' ? labels.in : labels.out) : ''}</span>
      </div>
      <p className="mx-small" role="status" aria-live="polite">
        {running ? `${phase === 'in' ? labels.in : labels.out} · ${cycle + 1}/${cycles}` : ''}
      </p>
      <button className="mx-btn ghost" onClick={() => setRunning((r) => !r)}>{running ? stopLabel : startLabel}</button>
    </div>
  );
}
