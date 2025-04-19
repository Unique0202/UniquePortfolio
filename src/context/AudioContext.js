import React, { createContext, useContext, useState, useEffect } from 'react';

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
  
  // Sound effects URLs
  const soundEffects = {
    hover: '/sounds/hover.mp3',
    click: '/sounds/click.mp3',
    pop: '/sounds/pop.mp3',
    swoosh: '/sounds/swoosh.mp3',
    success: '/sounds/success.mp3',
    message: '/sounds/message.mp3',
    drop: '/sounds/drop.mp3',
    ambience: '/sounds/ambience.mp3'
  };
  
  // Create audio elements for each sound effect
  useEffect(() => {
    // Mock sound files since we don't have real ones
    const mockSounds = {
      hover: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
      click: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
      pop: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
      swoosh: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
      success: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
      message: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
      drop: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
      ambience: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA'
    };
    
    const elements = {};
    
    Object.keys(soundEffects).forEach(name => {
      const audio = new Audio();
      audio.src = mockSounds[name]; // Using mock data instead of real files
      audio.volume = volume;
      elements[name] = audio;
      
      // Loop ambient sound
      if (name === 'ambience') {
        audio.loop = true;
      }
    });
    
    setAudioElements(elements);
    
    return () => {
      // Clean up audio elements
      Object.values(elements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);
  
  // Update volume for all audio elements when it changes
  useEffect(() => {
    Object.values(audioElements).forEach(audio => {
      audio.volume = volume;
    });
    localStorage.setItem('portfolioVolume', volume.toString());
  }, [volume, audioElements]);
  
  // Save mute preference
  useEffect(() => {
    localStorage.setItem('portfolioMuted', isMuted.toString());
    
    // Start/stop ambient sound based on mute state
    const ambienceAudio = audioElements.ambience;
    if (ambienceAudio) {
      if (isMuted) {
        ambienceAudio.pause();
      } else {
        ambienceAudio.play().catch(() => {
          // Autoplay might be blocked, we'll try again on user interaction
        });
      }
    }
  }, [isMuted, audioElements]);
  
  // Play a sound effect
  const playSound = (name) => {
    if (isMuted || !audioElements[name]) return;
    
    try {
      // Create a new instance to allow overlapping sounds
      const sound = audioElements[name].cloneNode();
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