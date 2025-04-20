import React, { createContext, useContext, useState, useEffect } from 'react';
import hoverSound from '../assets/hover.mp3';
import clickSound from '../assets/click.mp3';
import popSound from '../assets/pop.mp3';
// import swooshSound from '../assets/swoosh.mp3';
// import successSound from '../assets/success.mp3';
// import messageSound from '../assets/message.mp3';
// import dropSound from '../assets/drop.mp3';
// import ambienceSound from '../assets/ambience.mp3';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuted = localStorage.getItem('portfolioMuted');
    return savedMuted === 'true';
  });
  
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('portfolioVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  
  const [audioElements, setAudioElements] = useState({});
  
  // Sound effects with imported files
  const soundEffects = {
    hover: hoverSound,
    click: clickSound,
    pop: popSound,
    // swoosh: swooshSound,
    // success: successSound,
    // message: messageSound,
    // drop: dropSound,
    // ambience: ambienceSound
  };
  
  // Create audio elements for each sound effect
  useEffect(() => {
    const elements = {};
    
    Object.entries(soundEffects).forEach(([name, soundSrc]) => {
      const audio = new Audio(soundSrc);
      audio.volume = volume;
      elements[name] = audio;
      
      if (name === 'ambience') {
        audio.loop = true;
        // Try to play ambient sound (will fail without user interaction)
        audio.play().catch(e => console.log('Autoplay blocked:', e));
      }
    });
    
    setAudioElements(elements);
    
    return () => {
      Object.values(elements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);
  
   // Update volume for all audio elements when it changes
   useEffect(() => {
    Object.values(audioElements).forEach(audio => {
      if (audio) audio.volume = volume;
    });
    localStorage.setItem('portfolioVolume', volume.toString());
  }, [volume, audioElements]);
  
  // Save mute preference
  useEffect(() => {
    localStorage.setItem('portfolioMuted', isMuted.toString());
    
    const ambienceAudio = audioElements.ambience;
    if (ambienceAudio) {
      if (isMuted) {
        ambienceAudio.pause();
      } else {
        ambienceAudio.play().catch(e => console.log('Ambient sound play failed:', e));
      }
    }
  }, [isMuted, audioElements]);
  
  // Play a sound effect
  const playSound = (name) => {
    if (isMuted || !audioElements[name]) return;
    
    try {
      // Create a new instance to allow overlapping sounds
      const sound = new Audio(soundEffects[name]);
      sound.volume = volume;
      sound.play().catch(error => {
        console.log('Audio playback error:', error);
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, volume, setVolume, playSound }}>
      {children}
    </AudioContext.Provider>
  );
};