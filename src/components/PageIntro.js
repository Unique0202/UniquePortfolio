import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE     = [0.22, 1, 0.36, 1];
const EASE_IN  = [0.76, 0, 0.24, 1];
const SESSION_KEY = 'uq_intro_shown';

const PageIntro = () => {
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem(SESSION_KEY); }
    catch { return false; }
  });

  useEffect(() => {
    if (!visible) return;
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}

    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-intro"
          initial={{ y: '0%' }}
          exit={{ y: '-100%', transition: { duration: 0.65, ease: EASE_IN } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: '#0d0d12',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            <span style={{ color: '#e94560' }}>U</span>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>.</span>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              margin: 0,
            }}
          >
            Unique
          </motion.p>

          {/* Loading bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              background: '#e94560',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageIntro;
