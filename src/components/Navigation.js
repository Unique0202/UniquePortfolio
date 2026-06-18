import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import MagneticButton from './MagneticButton';

const LINKS = [
  { name: 'Home',     path: '/' },
  { name: 'About',    path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact',  path: '/contact' },
];

const EASE = [0.22, 1, 0.36, 1];

const Navigation = () => {
  const location              = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { playSound }          = useAudio();

  // Close any lingering state on route change (no-op kept for future use)
  useEffect(() => {}, [location]);

  const handleLink  = () => { playSound('click');  if (navigator.vibrate) navigator.vibrate(15); };
  const handleTheme = () => { toggleTheme(); playSound('click'); if (navigator.vibrate) navigator.vibrate(15); };
  const handleHover = () => playSound('hover');

  // /projects also highlights when viewing /projects/:id
  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      {/* ── Desktop floating pill ─────────────────────────────────────────────── */}
      <motion.nav
        className="nav-pill"
        // x: '-50%' keeps centering as a framer-motion value so y-animation
        // composes correctly (CSS transform would be overridden by framer)
        style={{ x: '-50%' }}
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.65, ease: EASE }}
        aria-label="Main navigation"
      >
        {/* Logo mark */}
        <MagneticButton strength={0.35}>
          <Link to="/" className="nav-logo" onClick={handleLink} onMouseEnter={handleHover} aria-label="Home">
            U<span className="nav-logo-dot">.</span>
          </Link>
        </MagneticButton>

        {/* Nav links */}
        <ul className="nav-links">
          {LINKS.map(({ name, path }) => {
            const active = isActive(path);
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`nav-link${active ? ' active' : ''}`}
                  onClick={handleLink}
                  onMouseEnter={handleHover}
                >
                  {name}
                  {active && (
                    <motion.span
                      className="nav-dot"
                      layoutId="nav-dot"
                      transition={{ duration: 0.32, ease: EASE }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle */}
        <MagneticButton strength={0.4}>
          <motion.button
            className="nav-theme"
            onClick={handleTheme}
            onMouseEnter={handleHover}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            whileTap={{ scale: 0.85 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                exit={{    opacity: 0, rotate:  45, scale: 0.7 }}
                transition={{ duration: 0.22, ease: EASE }}
                style={{ display: 'flex' }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </MagneticButton>
      </motion.nav>

      {/* ── Mobile bottom tab bar ─────────────────────────────────────────────── */}
      <nav className="nav-mobile" aria-label="Mobile navigation">
        {LINKS.map(({ name, path }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`nav-mobile-link${active ? ' active' : ''}`}
              onClick={handleLink}
              onMouseEnter={handleHover}
            >
              {name}
              {active && (
                <motion.span
                  className="nav-dot"
                  layoutId="nav-dot-mobile"
                  transition={{ duration: 0.32, ease: EASE }}
                />
              )}
            </Link>
          );
        })}

        <motion.button
          className="nav-theme nav-mobile-theme"
          onClick={handleTheme}
          aria-label="Toggle theme"
          whileTap={{ scale: 0.85 }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.button>
      </nav>

      <style jsx>{`
        /* ── Floating pill ───────────────────────────────────────────────────── */
        .nav-pill {
          position: fixed;
          top: 20px;
          left: 50%;
          z-index: var(--z-navigation);
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(10, 10, 16, 0.45);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-full);
          padding: 6px 8px 6px 6px;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.35),
            0 1px 0 rgba(255,255,255,0.10) inset,
            0 -1px 0 rgba(0,0,0,0.2) inset;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Monogram logo */
        .nav-logo {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-accent);
          text-decoration: none;
          padding: 4px 14px 4px 8px;
          letter-spacing: -0.02em;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
          margin-right: 6px;
          line-height: 1;
          transition: border-color 0.3s ease;
        }
        .nav-logo:hover { color: var(--color-accent); opacity: 0.85; }

        .nav-logo-dot {
          color: rgba(255,255,255,0.35);
          transition: color 0.3s ease;
        }

        /* Link list */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6px 14px;
          font-size: 0.84rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          border-radius: var(--radius-full);
          transition: color 0.2s ease;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .nav-link:hover  { color: rgba(255,255,255,0.85); }
        .nav-link.active { color: #fff; }

        /* Sliding dot under active link */
        .nav-dot {
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 6px var(--color-accent);
          flex-shrink: 0;
        }

        /* Theme icon button */
        .nav-theme {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          margin-left: 8px;
          flex-shrink: 0;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .nav-theme:hover {
          color: rgba(255,255,255,0.85);
          border-color: rgba(255, 255, 255, 0.18);
        }

        /* ── Light mode overrides ────────────────────────────────────────────── */
        .theme-light .nav-pill {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-color: rgba(255,255,255,0.75);
          box-shadow:
            0 4px 24px rgba(0,0,0,0.08),
            0 1px 0 rgba(255,255,255,0.95) inset,
            0 -1px 0 rgba(0,0,0,0.04) inset;
        }
        .theme-light .nav-logo {
          border-right-color: rgba(0,0,0,0.1);
        }
        .theme-light .nav-logo-dot {
          color: rgba(0,0,0,0.32);
        }
        .theme-light .nav-link {
          color: rgba(0,0,0,0.52);
        }
        .theme-light .nav-link:hover  { color: rgba(0,0,0,0.88); }
        .theme-light .nav-link.active { color: rgba(0,0,0,0.92); }
        .theme-light .nav-theme {
          color: rgba(0,0,0,0.52);
          border-color: rgba(0,0,0,0.1);
        }
        .theme-light .nav-theme:hover {
          color: rgba(0,0,0,0.88);
          border-color: rgba(0,0,0,0.22);
        }

        /* ── Mobile bottom bar ──────────────────────────────────────────────── */
        .nav-mobile { display: none; }

        @media (max-width: 640px) {
          .nav-pill   { display: none; }

          .nav-mobile {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: var(--z-navigation);
            background: rgba(10, 10, 16, 0.55);
            backdrop-filter: blur(24px) saturate(160%);
            -webkit-backdrop-filter: blur(24px) saturate(160%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px 4px;
            padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
            justify-content: space-around;
            align-items: center;
            transition: background 0.3s ease, border-color 0.3s ease;
          }

          .nav-mobile-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            font-size: 0.7rem;
            font-weight: 500;
            color: rgba(255,255,255,0.4);
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .nav-mobile-link.active { color: #fff; }
          .nav-mobile-link:hover  { color: rgba(255,255,255,0.8); }

          .nav-mobile-theme {
            margin-left: 0;
            border: 1px solid rgba(255,255,255,0.07);
          }

          .theme-light .nav-mobile {
            background: rgba(255, 255, 255, 0.55);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-top-color: rgba(255,255,255,0.7);
          }
          .theme-light .nav-mobile-link       { color: rgba(0,0,0,0.48); }
          .theme-light .nav-mobile-link.active { color: rgba(0,0,0,0.9); }
          .theme-light .nav-mobile-link:hover  { color: rgba(0,0,0,0.82); }
          .theme-light .nav-mobile-theme { border-color: rgba(0,0,0,0.1); color: rgba(0,0,0,0.52); }
        }
      `}</style>
    </>
  );
};

export default Navigation;
