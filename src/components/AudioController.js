import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const AudioController = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMuted, toggleMute, volume, setVolume } = useAudio();

  useEffect(() => {
    // Show the controller briefly when the page loads
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    // Hide after a short delay to allow interaction
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <div 
      className={`audio-controller ${isVisible ? 'visible' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="audio-toggle" 
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume control"
        />
        <div className="audio-visualizer">
          {Array.from({ length: 5 }).map((_, index) => (
            <span 
              key={index} 
              className={`audio-bar ${!isMuted ? 'active' : ''}`}
              style={{ 
                animationPlayState: !isMuted ? 'running' : 'paused',
                height: `${Math.random() * 10 + 3}px`,  // Random heights
                animationDuration: `${0.5 + Math.random() * 1}s`  // Random durations
              }}
            ></span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .audio-controller {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          background-color: var(--card);
          border-radius: var(--radius-full);
          padding: 6px 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }
        
        .audio-controller.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        
        .audio-toggle {
          background: transparent;
          border: none;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }
        
        .audio-toggle:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .volume-control {
          display: flex;
          align-items: center;
          margin-left: 10px;
          width: 100px;
          overflow: hidden;
          transition: width 0.3s ease;
        }
        
        .volume-slider {
          width: 70px;
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: var(--color-muted);
          outline: none;
          border-radius: 2px;
        }
        
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: var(--color-accent);
          border-radius: 50%;
          cursor: pointer;
        }
        
        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: var(--color-accent);
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
        
        .audio-visualizer {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: 10px;
          height: 20px;
        }
        
        .audio-bar {
          width: 3px;
          background-color: var(--color-accent);
          border-radius: 1px;
          animation: audioWave 0.8s infinite alternate;
        }
        
        .audio-bar.active {
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .audio-controller {
            bottom: 10px;
            right: 10px;
          }
          
          .volume-control {
            width: 50px;
          }
          
          .volume-slider {
            width: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default AudioController;