import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SPRING = { damping: 22, stiffness: 350, mass: 0.45 };

const CustomCursor = () => {
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ring follows with spring lag — gives the "weight" feeling
  const ringX = useSpring(mouseX, SPRING);
  const ringY = useSpring(mouseY, SPRING);

  // Center both elements on the cursor point
  const dotLeft  = useTransform(mouseX, x => x - 4);
  const dotTop   = useTransform(mouseY, y => y - 4);
  const ringLeft = useTransform(ringX,  x => x - 16);
  const ringTop  = useTransform(ringY,  y => y - 16);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true);
      }
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onEnter);
    document.addEventListener('mouseout',   onLeave);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onEnter);
      document.removeEventListener('mouseout',   onLeave);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [mouseX, mouseY, visible]);

  // Don't render on touch devices (no mouse)
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot — snaps exactly to cursor */}
      <motion.div
        className="cursor-dot"
        style={{ left: dotLeft, top: dotTop }}
        animate={{
          opacity:    visible ? 1 : 0,
          scale:      hovered ? 0 : clicking ? 0.6 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />

      {/* Ring — lags behind with spring, morphs on hover */}
      <motion.div
        className="cursor-ring"
        style={{ left: ringLeft, top: ringTop }}
        animate={{
          opacity:         visible ? 1 : 0,
          scale:           clicking ? 0.75 : hovered ? 1.4 : 1,
          borderColor:     hovered
            ? 'rgba(233, 69, 96, 0.9)'
            : 'rgba(233, 69, 96, 0.55)',
          backgroundColor: hovered
            ? 'rgba(233, 69, 96, 0.08)'
            : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
