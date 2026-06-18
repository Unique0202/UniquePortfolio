import React from 'react';
import { Volume2, VolumeX, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

const BAR_DELAYS = [0, 0.18, 0.06, 0.24, 0.12];

const AudioController = () => {
  const { isMuted, toggleMute, isAmbient, toggleAmbient, isPlaying } = useAudio();

  return (
    <div className="audio-ctrl">
      {/* Ambient toggle */}
      <button
        className={`audio-btn ambient-btn ${isAmbient ? 'active' : ''}`}
        onClick={toggleAmbient}
        aria-label={isAmbient ? 'Stop ambient sound' : 'Play ambient sound'}
        title={isAmbient ? 'Ambient on' : 'Ambient off'}
      >
        <Waves size={14} />
      </button>

      {/* Divider */}
      <span className="audio-divider" aria-hidden="true" />

      {/* Mute toggle */}
      <button
        className="audio-btn"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      {/* Wave bars — animate when unmuted, flat when muted */}
      <div className="wave-bars" aria-hidden="true">
        {BAR_DELAYS.map((delay, i) => (
          <motion.span
            key={i}
            className="wave-bar"
            animate={
              !isMuted && isPlaying
                ? { scaleY: [0.15, 1, 0.35, 0.85, 0.15] }
                : { scaleY: 0.15 }
            }
            transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <style jsx>{`
        .audio-ctrl {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(10,10,16,0.55);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-full);
          padding: 6px 12px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 1000;
        }

        .audio-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.38);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px;
          border-radius: 50%;
          transition: color 0.2s ease, background 0.2s ease;
          flex-shrink: 0;
        }
        .audio-btn:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.07);
        }

        .ambient-btn.active {
          color: var(--color-accent);
        }
        .ambient-btn.active:hover {
          color: var(--color-accent);
          background: rgba(233,69,96,0.1);
        }

        .audio-divider {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .wave-bars {
          display: flex; align-items: center;
          gap: 2px; height: 18px;
        }
        .wave-bar {
          display: block;
          width: 3px; height: 13px;
          background: var(--color-accent);
          border-radius: 2px;
          transform-origin: bottom;
        }

        @media (max-width: 768px) {
          .audio-ctrl { bottom: 72px; right: 12px; }
        }
      `}</style>
    </div>
  );
};

export default AudioController;
