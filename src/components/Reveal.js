import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const OFFSETS = {
  up:    { y: 28,  x: 0   },
  down:  { y: -28, x: 0   },
  left:  { x: -28, y: 0   },
  right: { x: 28,  y: 0   },
  none:  { x: 0,   y: 0   },
};

const Reveal = ({
  children,
  delay    = 0,
  duration = 0.55,
  direction = 'up',
  amount   = 0.15,
  once     = true,
  className,
  style,
  as: Tag  = 'div',
}) => {
  const { x, y } = OFFSETS[direction] ?? OFFSETS.up;

  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
