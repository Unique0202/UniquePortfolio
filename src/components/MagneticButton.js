import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Wraps any child with a magnetic pull effect.
// strength: how far the element shifts (0–1 fraction of cursor offset)
// The spring config controls how snappy the return-to-center feels.
const MagneticButton = ({ children, strength = 0.28, style }) => {
  const ref = useRef(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy  = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - (left + width  / 2)) * strength);
    y.set((e.clientY - (top  + height / 2)) * strength);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-flex', ...style }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
