import React, { useState, useEffect, useRef } from 'react';
import { useAvatarContext } from '../context/AvatarContext';
import { useAudio } from '../context/AudioContext';

const Avatar = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('happy'); // happy, curious, surprised, thinking
  const avatarRef = useRef(null);
  const { avatarState, setAvatarState } = useAvatarContext();
  const { playSound } = useAudio();
  
  // Track movement
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial greeting based on time of day
    const hour = new Date().getHours();
    let greeting = '';
    let newMood = 'happy';
    
    if (hour < 12) {
      greeting = "Good morning! Welcome to my portfolio.";
    } else if (hour < 18) {
      greeting = "Good afternoon! Thanks for stopping by.";
    } else {
      greeting = "Good evening! Explore my work at your leisure.";
      newMood = 'curious';
    }
    
    // Schedule the greeting to appear after a brief delay
    const timer = setTimeout(() => {
      speak(greeting);
      setMood(newMood);
    }, 2000);
    
    // Define avatar behavior
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle scroll events to update avatar state
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 300 && !isMinimized) {
      setIsMinimized(true);
      setMood('curious');
    } else if (scrollPosition <= 300 && isMinimized) {
      setIsMinimized(false);
    }
  };

  // Make the avatar speak
  const speak = (text, durationMs = 4000) => {
    setMessage(text);
    setIsSpeaking(true);
    playSound('message');
    
    // Stop speaking after duration
    setTimeout(() => {
      setIsSpeaking(false);
      setMessage('');
    }, durationMs);
  };

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      playSound('pop');
      setMood('surprised');
      speak("You can drag me around!");
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Ensure avatar stays within viewport bounds
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      playSound('drop');
      setMood('happy');
    }
  };

  // Handle click on avatar
  const handleClick = () => {
    if (!isSpeaking) {
      const messages = [
        "Need help navigating? Just ask!",
        "Check out my projects section to see my best work.",
        "I've integrated multiple interaction modalities in this portfolio.",
        "Try using different gestures to interact with the content.",
        "The design adapts based on time of day and your device."
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      speak(randomMessage);
      setMood('thinking');
      playSound('click');
      
      // Simulate haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    } else {
      // Dismiss message if already speaking
      setIsSpeaking(false);
      setMessage('');
      setMood('happy');
    }
  };

  // Register global event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) {
        handleMouseMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
          preventDefault: () => {}
        });
      }
    });
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={avatarRef}
      className={`avatar-container ${isMinimized ? 'minimized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleMouseDown({
          clientX: touch.clientX,
          clientY: touch.clientY,
          preventDefault: () => e.preventDefault()
        });
      }}
      onClick={handleClick}
    >
      <div className={`avatar ${mood}`}>
        {/* Avatar face/expression based on mood */}
        <div className="avatar-face">
          <div className={`avatar-eyes ${isSpeaking ? 'speaking' : ''}`}>
            <div className="avatar-eye left"></div>
            <div className="avatar-eye right"></div>
          </div>
          <div className={`avatar-mouth ${isSpeaking ? 'speaking' : ''}`}></div>
        </div>
      </div>
      
      {isSpeaking && (
        <div className="avatar-speech">
          <p>{message}</p>
        </div>
      )}
      
      <style jsx>{`
        .avatar-container {
          position: fixed;
          z-index: var(--z-avatar);
          transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          cursor: grab;
          user-select: none;
          touch-action: none;
        }
        
        .avatar-container.dragging {
          cursor: grabbing;
          transition: none;
        }
        
        .avatar-container.minimized {
          transform: scale(0.7);
        }
        
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          animation: float 6s ease-in-out infinite;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        
        .avatar.happy {
          background-color: var(--color-accent);
        }
        
        .avatar.curious {
          background-color: #4a6fa5;
        }
        
        .avatar.surprised {
          background-color: #ffb347;
          transform: scale(1.1);
        }
        
        .avatar.thinking {
          background-color: #9c88ff;
        }
        
        .avatar-face {
          width: 40px;
          height: 40px;
          position: relative;
        }
        
        .avatar-eyes {
          display: flex;
          justify-content: space-between;
          width: 24px;
          margin: 0 auto;
        }
        
        .avatar-eye {
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        
        .avatar-eyes.speaking .avatar-eye {
          height: 2px;
          border-radius: 2px;
          margin-top: 3px;
        }
        
        .avatar-mouth {
          width: 16px;
          height: 8px;
          background-color: white;
          border-radius: 0 0 8px 8px;
          margin: 8px auto 0;
          transition: all 0.2s ease;
        }
        
        .avatar-mouth.speaking {
          height: 10px;
          border-radius: 4px;
          animation: speak 0.3s infinite alternate;
        }
        
        @keyframes speak {
          from { height: 4px; width: 12px; }
          to { height: 10px; width: 16px; }
        }
        
        .avatar-speech {
          position: absolute;
          bottom: 70px;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
          color: #333;
          padding: 10px 15px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 250px;
          min-width: 150px;
          animation: fadeIn 0.3s ease-out;
          z-index: 1000;
        }
        
        .avatar-speech:after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid white;
        }
        
        .avatar-speech p {
          margin: 0;
          font-size: 0.9rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Avatar;