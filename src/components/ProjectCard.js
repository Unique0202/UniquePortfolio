import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

const ProjectCard = ({ project, index = 0 }) => {
  const cardRef = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const { playSound } = useAudio();

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setRot({
      x: ((r.height / 2 - (e.clientY - r.top))  / (r.height / 2)) * 6,
      y: (((e.clientX - r.left) - r.width / 2)  / (r.width  / 2)) * 6,
    });
  }, []);

  const resetRot = useCallback(() => setRot({ x: 0, y: 0 }), []);

  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{ transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playSound('hover')}
      onMouseLeave={resetRot}
    >
      {/* Image */}
      <motion.div layoutId={`project-image-${project.id}`} className="card-image">
        <img src={project.imageUrl} alt={project.title} loading="lazy" />
        <div className="card-img-overlay" />
        <span className="card-category">{project.category}</span>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-live-badge"
            onClick={(e) => { e.stopPropagation(); playSound('click'); }}
            aria-label="Live site"
          >
            <span className="live-pulse" />
            Live
          </a>
        )}
      </motion.div>

      {/* Body */}
      <div className="card-body">
        <div className="card-meta-row">
          <span className="card-index">{num}</span>
        </div>

        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>

        {project.stack && project.stack.length > 0 && (
          <div className="card-stack">
            {project.stack.map(t => (
              <span key={t} className="card-tag">{t}</span>
            ))}
          </div>
        )}

        <Link
          to={`/projects/${project.id}`}
          className="card-cta"
          onClick={() => playSound('click')}
        >
          View Project
          <span className="card-cta-arrow">↗</span>
        </Link>
      </div>

      <style jsx>{`
        .project-card {
          position: relative;
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.28s ease;
          will-change: transform;
        }

        /* Red border wipe */
        .project-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--color-accent);
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.4s var(--ease-out-expo), opacity 0.08s ease;
          pointer-events: none;
          z-index: 4;
        }
        .project-card:hover::after { opacity: 1; transform: scaleX(1); }

        /* ── Image ─────────────────────────────────────────────────────── */
        .card-image {
          position: relative;
          height: 215px;
          overflow: hidden;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .project-card:hover .card-image img { transform: scale(1.06); }

        .card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,6,10,0.82) 0%, transparent 55%);
          pointer-events: none;
        }

        /* Category chip — bottom-right of image */
        .card-category {
          position: absolute;
          bottom: 10px;
          right: 11px;
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          background: rgba(0,0,0,0.52);
          border: 1px solid rgba(255,255,255,0.11);
          padding: 3px 9px;
          border-radius: var(--radius-full);
          pointer-events: none;
        }

        /* Live badge — top-left of image */
        .card-live-badge {
          position: absolute;
          top: 10px;
          left: 11px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          background: rgba(0,0,0,0.52);
          border: 1px solid rgba(233,69,96,0.32);
          padding: 3px 9px;
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .card-live-badge:hover { background: rgba(233,69,96,0.14); }

        .live-pulse {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
          animation: livePulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.7); }
        }

        /* ── Body ──────────────────────────────────────────────────────── */
        .card-body {
          padding: 20px;
          transform: translateZ(10px);
        }

        .card-meta-row {
          margin-bottom: 10px;
        }

        .card-index {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          color: var(--color-muted);
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .card-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin-bottom: 14px;
        }

        /* Stack chips */
        .card-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 18px;
        }
        .card-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.38);
          border: 1px solid rgba(255,255,255,0.09);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        /* CTA */
        .card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.035);
          transition: color 0.22s ease,
                      border-color 0.22s ease,
                      background 0.22s ease,
                      gap 0.22s var(--ease-out-expo);
        }
        .card-cta:hover {
          color: var(--color-accent);
          border-color: rgba(233,69,96,0.45);
          background: rgba(233,69,96,0.08);
          gap: 12px;
        }

        .card-cta-arrow {
          display: inline-block;
          font-style: normal;
          transition: transform 0.25s var(--ease-out-expo);
        }
        .card-cta:hover .card-cta-arrow { transform: translate(2px, -2px); }

        @media (max-width: 768px) {
          .card-body  { padding: 16px; }
          .card-title { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
