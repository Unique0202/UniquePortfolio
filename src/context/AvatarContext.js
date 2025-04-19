import React, { createContext, useContext, useState } from 'react';

const AvatarContext = createContext();

export const useAvatarContext = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
  const [avatarState, setAvatarState] = useState({
    mood: 'happy', // happy, curious, surprised, thinking
    isVisible: true,
    messages: [
      "Welcome to my portfolio!",
      "Explore my projects using gestures and interactions.",
      "I've designed this site with multiple modalities in mind.",
      "Try changing the theme or interacting with project cards.",
      "Need help navigating? Just ask me!"
    ],
    currentMessage: '',
    position: { x: 20, y: 20 }
  });

  return (
    <AvatarContext.Provider value={{ avatarState, setAvatarState }}>
      {children}
    </AvatarContext.Provider>
  );
};