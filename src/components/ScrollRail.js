import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollRail = () => {
  const { scrollYProgress } = useScroll();
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dotTop     = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="scroll-rail-wrap" aria-hidden="true">
      <div className="scroll-rail-track" />
      <motion.div className="scroll-rail-fill" style={{ height: fillHeight }} />
      <motion.div className="scroll-rail-dot"  style={{ top: dotTop }} />

      <style jsx>{`
        .scroll-rail-wrap {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 180px;
          z-index: 50;
          pointer-events: none;
        }
        .scroll-rail-track {
          position: absolute;
          inset: 0;
          background: var(--glass-border);
          border-radius: 2px;
        }
        .scroll-rail-fill {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          background: var(--color-accent);
          border-radius: 2px;
        }
        .scroll-rail-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 8px var(--color-accent), 0 0 18px rgba(233,69,96,0.4);
        }
        @media (max-width: 768px) {
          .scroll-rail-wrap { display: none; }
        }
      `}</style>
    </div>
  );
};

export default ScrollRail;
