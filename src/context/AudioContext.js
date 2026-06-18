import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const Ctx = createContext();
export const useAudio = () => useContext(Ctx);

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Always schedule slightly ahead of currentTime so sounds land in the future,
// even when the AudioContext was just resumed (resume() is async).
const LEAD = 0.015; // 15 ms lookahead

const ramp = (param, from, to, t, dur) => {
  param.cancelScheduledValues(t);
  param.setValueAtTime(from, t);
  param.exponentialRampToValueAtTime(Math.max(to, 0.0001), t + dur);
};

// ─── UI Sound synthesizers ────────────────────────────────────────────────────

const synthClick = (ac) => {
  const t = ac.currentTime + LEAD;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain); gain.connect(ac.destination);
  osc.type = 'sine';
  ramp(osc.frequency, 620, 300, t, 0.05);
  ramp(gain.gain,     0.18, 0.0001, t, 0.05);
  osc.start(t); osc.stop(t + 0.06);
};

const synthHover = (ac) => {
  const t = ac.currentTime + LEAD;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain); gain.connect(ac.destination);
  osc.type = 'sine';
  ramp(osc.frequency, 3200, 6400, t, 0.03);
  ramp(gain.gain,     0.04, 0.0001, t, 0.03);
  osc.start(t); osc.stop(t + 0.035);
};

const synthSuccess = (ac) => {
  [[0, 520, 0.12], [0.09, 780, 0.10]].forEach(([delay, freq, vol]) => {
    const t = ac.currentTime + LEAD + delay;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    ramp(gain.gain, vol, 0.0001, t, 0.14);
    osc.start(t); osc.stop(t + 0.16);
  });
};

const synthError = (ac) => {
  const t = ac.currentTime + LEAD;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain); gain.connect(ac.destination);
  osc.type = 'sawtooth';
  ramp(osc.frequency, 220, 110, t, 0.10);
  ramp(gain.gain,     0.15, 0.0001, t, 0.10);
  osc.start(t); osc.stop(t + 0.11);
};

// ─── Keyboard synth ───────────────────────────────────────────────────────────

const makeNoiseBuf = (ac, dur) => {
  const n   = Math.ceil(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, n, ac.sampleRate);
  const d   = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  return src;
};

export const synthKey = (ac, type = 'regular') => {
  const t = ac.currentTime + LEAD;
  const CFG = {
    regular:   { dur: 0.020, freq: 1800, q: 1.2, nvol: 0.20, tick: { freq: 3000, dur: 0.010, vol: 0.06, wave: 'square' } },
    space:     { dur: 0.026, freq:  380, q: 0.5, nvol: 0.22 },
    backspace: { dur: 0.024, freq:  900, q: 1.0, nvol: 0.18, tick: { freq: 2200, dur: 0.013, vol: 0.04, wave: 'square' } },
    enter:     { dur: 0.052, freq:  600, q: 0.6, nvol: 0.25, tick: { freq:  160, dur: 0.070, vol: 0.18, wave: 'sine'   } },
  };
  const cfg = CFG[type] ?? CFG.regular;

  const noise  = makeNoiseBuf(ac, cfg.dur);
  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass'; filter.frequency.value = cfg.freq; filter.Q.value = cfg.q;
  const ng = ac.createGain();
  ramp(ng.gain, cfg.nvol, 0.0001, t, cfg.dur);
  noise.connect(filter); filter.connect(ng); ng.connect(ac.destination);
  noise.start(t); noise.stop(t + cfg.dur + 0.01);

  if (cfg.tick) {
    const osc = ac.createOscillator(); const og = ac.createGain();
    osc.connect(og); og.connect(ac.destination);
    osc.type = cfg.tick.wave; osc.frequency.value = cfg.tick.freq;
    ramp(og.gain, cfg.tick.vol, 0.0001, t, cfg.tick.dur);
    osc.start(t); osc.stop(t + cfg.tick.dur + 0.01);
  }
};

const SYNTHS = {
  click:   synthClick,
  hover:   synthHover,
  pop:     synthClick,
  swoosh:  synthClick,
  success: synthSuccess,
  error:   synthError,
  message: synthClick,
  drop:    synthClick,
};

// ─── Ambient drone ────────────────────────────────────────────────────────────

const buildAmbient = (ac) => {
  const master = ac.createGain();
  master.gain.setValueAtTime(0, ac.currentTime);
  master.gain.linearRampToValueAtTime(0.065, ac.currentTime + 2.5);
  master.connect(ac.destination);

  const nodes = [];

  // Brown noise (looping)
  const bufSize = 2 * ac.sampleRate;
  const nBuf    = ac.createBuffer(1, bufSize, ac.sampleRate);
  const data    = nBuf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufSize; i++) {
    const w = Math.random() * 2 - 1;
    data[i] = (last + 0.02 * w) / 1.02;
    last = data[i];
    data[i] *= 3.5;
  }
  const noiseNode = ac.createBufferSource();
  noiseNode.buffer = nBuf; noiseNode.loop = true;
  const lpf = ac.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 200; lpf.Q.value = 0.4;
  const ng  = ac.createGain(); ng.gain.value = 0.38;
  noiseNode.connect(lpf); lpf.connect(ng); ng.connect(master);
  noiseNode.start(); nodes.push(noiseNode);

  // Drone: A1 (55 Hz), E2 (82.4 Hz), A2 (110 Hz)
  [[55, 0.16], [82.4, 0.12], [110, 0.10]].forEach(([freq, vol]) => {
    const osc = ac.createOscillator(); const og = ac.createGain();
    osc.type = 'sine'; osc.frequency.value = freq; og.gain.value = vol;
    osc.connect(og); og.connect(master);
    osc.start(); nodes.push(osc);
  });

  // Slow LFO tremolo (0.07 Hz ≈ one breath per 14 s)
  const lfo = ac.createOscillator(); const lg = ac.createGain();
  lfo.type = 'sine'; lfo.frequency.value = 0.07; lg.gain.value = 0.012;
  lfo.connect(lg); lg.connect(master.gain);
  lfo.start(); nodes.push(lfo);

  return { master, nodes };
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AudioProvider = ({ children }) => {
  const [isMuted,    setIsMuted]    = useState(() => localStorage.getItem('portfolioMuted') === 'true');
  const [isAmbient,  setIsAmbient]  = useState(false);
  const [isPlaying,  setIsPlaying]  = useState(false);
  const acRef        = useRef(null);
  const ambientRef   = useRef(null);
  const playTimerRef = useRef(null);

  // Pre-warm the AudioContext on first user gesture so it's always running
  // before the first playSound call arrives.
  const getAC = useCallback(() => {
    if (!acRef.current) {
      acRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (acRef.current.state === 'suspended') {
      acRef.current.resume().catch(() => {});
    }
    return acRef.current;
  }, []);

  useEffect(() => {
    const warmUp = () => {
      getAC(); // create + resume on first real interaction
      document.removeEventListener('pointerdown', warmUp);
    };
    document.addEventListener('pointerdown', warmUp);
    return () => document.removeEventListener('pointerdown', warmUp);
  }, [getAC]);

  // Pause/resume when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (!acRef.current) return;
      document.hidden ? acRef.current.suspend() : acRef.current.resume().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const stopAmbient = useCallback(() => {
    if (!ambientRef.current) return;
    const ac = getAC();
    const { master, nodes } = ambientRef.current;
    master.gain.cancelScheduledValues(ac.currentTime);
    master.gain.setValueAtTime(master.gain.value, ac.currentTime);
    master.gain.linearRampToValueAtTime(0, ac.currentTime + 1.4);
    setTimeout(() => {
      nodes.forEach(n => { try { n.stop(); } catch { /**/ } });
      ambientRef.current = null;
    }, 1500);
  }, [getAC]);

  const startAmbient = useCallback(() => {
    if (ambientRef.current) return;
    ambientRef.current = buildAmbient(getAC());
  }, [getAC]);

  const toggleAmbient = useCallback(() => {
    setIsAmbient(prev => {
      if (!prev) { startAmbient(); return true;  }
      else        { stopAmbient();  return false; }
    });
  }, [startAmbient, stopAmbient]);

  // Cleanup
  useEffect(() => () => stopAmbient(), [stopAmbient]);

  const triggerPlaying = useCallback(() => {
    setIsPlaying(true);
    clearTimeout(playTimerRef.current);
    playTimerRef.current = setTimeout(() => setIsPlaying(false), 700);
  }, []);

  const playSound = useCallback((name) => {
    if (isMuted) return;
    const fn = SYNTHS[name];
    if (!fn) return;
    try { fn(getAC()); triggerPlaying(); } catch { /**/ }
  }, [isMuted, getAC, triggerPlaying]);

  const playKey = useCallback((type) => {
    if (isMuted) return;
    try { synthKey(getAC(), type); triggerPlaying(); } catch { /**/ }
  }, [isMuted, getAC, triggerPlaying]);

  const toggleMute = () =>
    setIsMuted(v => {
      localStorage.setItem('portfolioMuted', String(!v));
      return !v;
    });

  return (
    <Ctx.Provider value={{ isMuted, toggleMute, isAmbient, toggleAmbient, isPlaying, playSound, playKey }}>
      {children}
    </Ctx.Provider>
  );
};
