import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { useAudio } from '../context/AudioContext';
import AMS1 from '../assets/ams1.jpg';
import AB1  from '../assets/ab1.jpg';
import FOS1 from '../assets/fos1.jpg';

const EASE = [0.22, 1, 0.36, 1];

const ALL_PROJECTS = [
  {
    id: 'lab-inventory-system',
    title: 'Lab Inventory Management System',
    category: 'Full-Stack',
    description: 'Role-based system deployed live at IIIT Delhi — tracks 200+ equipment items with low-stock alerts and purchase request workflows.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
    imageUrl: AMS1,
    liveUrl: 'https://lab-mgmt.iiitd.edu.in',
  },
  {
    id: 'ai-tutor-dyslexia',
    title: 'AI Tutor for Dyslexic Students',
    category: 'AI / ML',
    description: 'Adaptive learning platform with gamified reading modules — 70% of participants showed measurable improvement in reading speed.',
    stack: ['Python', 'HTML/CSS/JS', 'AI/ML'],
    imageUrl: FOS1,
    liveUrl: null,
  },
  {
    id: 'airport-management-system',
    title: 'Airport Management System',
    category: 'Full-Stack',
    description: 'Full-stack platform for booking airport facilities and viewing real-time flight details via role-based interactive portals.',
    stack: ['React', 'Flask', 'PostgreSQL'],
    imageUrl: AMS1,
    liveUrl: null,
  },
  {
    id: 'angry-birds',
    title: 'Angry Birds Game',
    category: 'Game',
    description: 'Multi-level physics game with interactive UI, dynamic level saving/loading, and touch-based controls — built from scratch in Java.',
    stack: ['Java', 'LibGDX', 'Gradle'],
    imageUrl: AB1,
    liveUrl: null,
  },
  {
    id: 'food-ordering-system',
    title: 'Food Ordering System',
    category: 'App',
    description: 'Java-based ordering application with admin and customer roles, menu management, and complete order tracking.',
    stack: ['Java', 'OOP'],
    imageUrl: FOS1,
    liveUrl: null,
  },
];

const TABS = ['All', 'Full-Stack', 'AI / ML', 'Game', 'App'];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { playSound } = useAudio();

  const filtered = activeTab === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === activeTab);

  return (
    <div className="projects-page">
      <div className="container">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.header
          className="projects-header"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="projects-eyebrow">{"// 01 WORK"}</p>
          <h1 className="projects-title">Projects</h1>
          <p className="projects-lead">
            From live-deployed systems to interactive games — work spanning
            full-stack engineering, AI, and creative design.
          </p>
        </motion.header>

        {/* ── Filter tabs ──────────────────────────────────────────────────── */}
        <motion.div
          className="filter-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
        >
          <div className="filter-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => { setActiveTab(tab); playSound('click'); }}
              >
                {activeTab === tab && (
                  <motion.span
                    className="tab-pip"
                    layoutId="tab-pip"
                    transition={{ duration: 0.28, ease: EASE }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
          <span className="filter-count">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* ── Grid ────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="projects-grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      <style jsx>{`
        .projects-page {
          padding: 60px 0 100px;
          min-height: 100vh;
        }

        /* ── Header ─────────────────────────────────────────────────────── */
        .projects-header { margin-bottom: var(--space-5); }

        .projects-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--space-2);
          opacity: 0.85;
        }

        .projects-title {
          font-size: clamp(2.8rem, 7vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin-bottom: var(--space-3);
        }

        .projects-lead {
          font-size: 1rem;
          color: var(--color-muted);
          max-width: 52ch;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Filter ─────────────────────────────────────────────────────── */
        .filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .filter-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .filter-tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 18px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,255,255,0.09);
          background: transparent;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.42);
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }
        .filter-tab:hover {
          color: rgba(255,255,255,0.72);
          border-color: rgba(255,255,255,0.18);
        }
        .filter-tab.active {
          color: #fff;
          border-color: rgba(233,69,96,0.5);
          background: rgba(233,69,96,0.1);
        }

        /* Animated pip inside active tab */
        .tab-pip {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
          flex-shrink: 0;
        }

        .filter-count {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--color-muted);
          white-space: nowrap;
        }

        /* ── Grid ───────────────────────────────────────────────────────── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: var(--space-4);
        }

        @media (max-width: 768px) {
          .projects-grid  { grid-template-columns: 1fr; }
          .filter-count   { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Projects;
