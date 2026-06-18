import React, { useRef, useEffect } from 'react';

const SPACING    = 38;   // px between dots
const DOT_R      = 1.3;  // dot radius
const PULL_R     = 140;  // cursor influence radius
const MAX_SHIFT  = 18;   // max px a dot moves
const LERP       = 0.1;  // spring speed (0 = no follow, 1 = instant)
const DotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx   = canvas.getContext('2d');
    let animId;
    let dots    = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      dots = [];
      for (let ox = SPACING / 2; ox < canvas.width;  ox += SPACING)
        for (let oy = SPACING / 2; oy < canvas.height; oy += SPACING)
          dots.push({ ox, oy, cx: ox, cy: oy });
    };

    const onMove  = (e) => {
      const r  = canvas.getBoundingClientRect();
      mouse.x  = e.clientX - r.left;
      mouse.y  = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    build();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', build);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = getComputedStyle(document.documentElement).getPropertyValue('--dot-color-rgb').trim() || '255,255,255';
      const dotColor = `rgba(${rgb},0.11)`;
      for (const d of dots) {
        const dx   = mouse.x - d.ox;
        const dy   = mouse.y - d.oy;
        const dist = Math.hypot(dx, dy);
        let tx = d.ox, ty = d.oy;
        if (dist < PULL_R && dist > 0) {
          const f = (1 - dist / PULL_R) * MAX_SHIFT;
          tx = d.ox + (dx / dist) * f;
          ty = d.oy + (dy / dist) * f;
        }
        d.cx += (tx - d.cx) * LERP;
        d.cy += (ty - d.cy) * LERP;

        ctx.beginPath();
        ctx.arc(d.cx, d.cy, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', build);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default DotGrid;
