import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useMotionTemplate } from 'framer-motion';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

import Navigation from './components/Navigation';
import AudioController from './components/AudioController';
import SocialPresence from './components/SocialPresence';
import CustomCursor from './components/CustomCursor';
import PageIntro from './components/PageIntro';
import Footer from './components/Footer';
import ScrollRail from './components/ScrollRail';
import DotGrid from './components/DotGrid';

import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';

// ── Noise overlay — subtle SVG grain over the entire viewport ────────────────
function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 9999,
        opacity: 0.042,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// ── Cursor spotlight — soft radial glow that tracks the mouse ─────────────────
function CursorSpotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  const bg = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(233,69,96,0.055), transparent 70%)`;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 1,
        background: bg,
      }}
    />
  );
}

const pageVariants = {
  initial: { opacity: 0, clipPath: 'inset(0 0 6% 0)' },
  animate: { opacity: 1, clipPath: 'inset(0 0 0% 0)'  },
  exit:    { opacity: 0 },
};

const pageTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1],
};

function AnimatedRoutes() {
  const location = useLocation();
  const isHome   = location.pathname === '/';

  return (
    <>
      {/* LayoutGroup lets layoutId elements share a coordinate space
          for shared-element transitions between project card and detail. */}
      <LayoutGroup>
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ width: '100%', minHeight: '100%' }}
          >
            <Routes location={location}>
              <Route path="/"             element={<Home />} />
              <Route path="/about"        element={<About />} />
              <Route path="/projects"     element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/contact"      element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      {!isHome && <ScrollRail />}
      {!isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Router>
          <div className="app-container">
            <PageIntro />
            <CustomCursor />
            <DotGrid />
            <NoiseOverlay />
            <CursorSpotlight />
            <SocialPresence />
            <AudioController />
            <Navigation />
            <main className="main-content">
              <AnimatedRoutes />
            </main>
          </div>
        </Router>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
