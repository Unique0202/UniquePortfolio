import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // const { theme } = useTheme();
  const { playSound } = useAudio();
  const { theme, toggleTheme } = useTheme(); // Now using toggleTheme

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];
  const handleThemeToggle = () => {
    toggleTheme();
    playSound('click');
    if (navigator.vibrate) navigator.vibrate(15);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    playSound('click');
    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''} ${theme}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <span className="logo-text">Unique's Portfolio</span>
        </Link>
      {/* Add this hamburger menu button */}
      <button 
        className="menu-toggle" 
        onClick={() => {
          setIsOpen(!isOpen);
          playSound('swoosh');
          if (navigator.vibrate) navigator.vibrate(20);
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {links.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={handleLinkClick}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Add theme toggle button */}
          <button 
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="theme-icon" />
            ) : (
              <Moon size={20} className="theme-icon" />
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: var(--z-navigation);
          padding: var(--space-3);
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }
        
        .navigation.scrolled {
          background-color: ${theme === 'dark' ? 'rgba(12, 12, 14, 0.8)' : 'rgba(245, 245, 247, 0.8)'};
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo {
          display: flex;
          align-items: center;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--text);
          text-decoration: none;
          font-weight: 700;
        }
        
        .logo-text {
          margin-left: var(--space-1);
        }
        
        .nav-links {
          display: flex;
          gap: var(--space-4);
        }
        
        .nav-link {
          color: var(--text);
          text-decoration: none;
          position: relative;
          font-weight: 500;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .nav-link:hover {
          opacity: 1;
          text-decoration: none;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .nav-link.active {
          opacity: 1;
        }
        
        .menu-toggle {
          display: none;
          background: transparent;
          color: var(--text);
          border: none;
          cursor: pointer;
          z-index: 999;
        }
        
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          
          .nav-links {
            position: fixed;
            top: 0;
            right: 0;
            width: 70%;
            height: 100vh;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: var(--card);
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            gap: var(--space-4);
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          }
          
          .nav-links.open {
            transform: translateX(0);
          }
          
          .nav-link {
            font-size: 1.5rem;
            opacity: 0;
            transform: translateY(20px);
          }
          
          .nav-links.open .nav-link {
            opacity: 0.7;
            transform: translateY(0);
            animation: slideInUp 0.5s forwards;
          }
        }
           .theme-toggle {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
          margin-left: var(--space-4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          transition: transform 0.3s ease;
          position: relative;
          top: -5px;
        }
        
        .theme-toggle:hover {
          transform: scale(1.1);
        }
        
        .theme-icon {
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .theme-toggle {
            margin-top: var(--space-4);
            margin-left: 0;
            padding: var(--space-3);
          }
          
          .theme-icon {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;