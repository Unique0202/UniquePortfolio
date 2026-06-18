import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import AMS1 from '../assets/ams1.jpg';
import AMS2 from '../assets/ams2.png';
import AMS3 from '../assets/ams3.png';
import AMS4 from '../assets/ams4.png';
import AB1  from '../assets/ab1.jpg';
import AB2  from '../assets/ab2.png';
import AB3  from '../assets/ab3.png';
import AB4  from '../assets/ab4.png';
import AB5  from '../assets/ab5.png';
import AB6  from '../assets/ab6.png';
import AB7  from '../assets/ab7.png';
import FOS1 from '../assets/fos1.jpg';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE, delay },
});

const PROJECTS = {
  'lab-inventory-system': {
    title: 'Lab Inventory Management System',
    category: 'Full Stack Web App',
    year: '2026',
    overview:
      "A live-deployed role-based inventory system for IIIT Delhi's CIPD lab. It tracks 200+ equipment items, sends low-stock notifications, and manages purchase requests — all behind a clean React dashboard with role-based access control.",
    challenge:
      'Designing an access-control layer that supports multiple roles (faculty, lab assistant, admin) without code duplication was the key challenge. Ensuring real-time notifications for stock thresholds while keeping the UI responsive across screen sizes added complexity.',
    approach:
      'Built with React and a Node.js REST API backed by PostgreSQL and Prisma ORM. I designed a normalised schema to track item history and implemented JWT-based role differentiation. Notification logic runs server-side and fires on every stock update.',
    outcome:
      "Successfully deployed to IIIT Delhi's infrastructure. The lab staff now manages 200+ items without spreadsheets. The clean UI and email alerts have reduced manual stock checks by an estimated 70%.",
    mainImageUrl: AMS1,
    gallery: [AMS1],
    toolsUsed: ['React', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'REST APIs', 'JWT Auth', 'GitHub', 'VS Code'],
    liveUrl: 'https://lab-mgmt.iiitd.edu.in',
  },
  'ai-tutor-dyslexia': {
    title: 'AI Tutor for Dyslexic Students',
    category: 'AI / Ed-Tech',
    year: '2025',
    overview:
      'An AI-powered adaptive learning platform designed specifically for dyslexic students. The system delivers gamified reading and writing exercises with adaptive difficulty, helping learners build confidence through progressive success.',
    challenge:
      'Calibrating adaptive difficulty is hard — too easy and students lose interest; too hard and they disengage. Designing accessible, distraction-free UI for learners who struggle with standard reading layouts required deep research into dyslexia-friendly design principles.',
    approach:
      'Built with Python on the backend and plain HTML/CSS/JS on the frontend for maximum browser compatibility. The AI module analyses response patterns to adjust exercise difficulty in real time. Dyslexie font and high-contrast themes are used throughout.',
    outcome:
      'Prototype tested with a small student cohort at IIIT Delhi. Early results showed increased engagement and measurable improvement in reading speed for 70% of participants. The gamification layer proved critical for sustained use.',
    mainImageUrl: FOS1,
    gallery: [FOS1],
    toolsUsed: ['Python', 'HTML', 'CSS', 'JavaScript', 'AI / ML', 'Dyslexie Font', 'GitHub'],
    liveUrl: null,
  },
  'airport-management-system': {
    title: 'Airport Management System',
    category: 'React / Flask / PostgreSQL',
    year: '2025',
    overview:
      'A full-stack airport management system enabling users to book facilities (lounges, shops, gyms) and view real-time flight details. Includes dedicated portals for passengers, staff, managers, and admins.',
    challenge:
      'Managing different user roles with varying access levels and syncing real-time flight updates with facility bookings posed integration challenges. Maintaining database integrity across concurrent bookings was critical.',
    approach:
      'Designed role-based React interfaces for all user types. The Flask backend handles RESTful routes, and PostgreSQL manages data storage. Iterative testing and feedback shaped the final UX across all portals.',
    outcome:
      'A seamless, scalable system demonstrating strong backend-frontend integration. Role-based access ensures secure and efficient service management across the entire airport workflow.',
    mainImageUrl: AMS1,
    gallery: [AMS2, AMS3, AMS4],
    toolsUsed: ['React', 'JavaScript', 'CSS', 'Python', 'Flask', 'PostgreSQL', 'REST APIs', 'GitHub'],
    liveUrl: null,
  },
  'angry-birds': {
    title: 'Angry Birds Game',
    category: 'Interactive Game',
    year: '2024',
    overview:
      'A multi-level LibGDX game replicating Angry Birds-style gameplay with unique backgrounds, UI screens for play/pause/settings, level saving/loading, and touch-based controls.',
    challenge:
      'Smooth transitions between screens, managing game states (pause/resume), and saving level data dynamically were major hurdles. Maintaining level data integrity across sessions required careful serialisation logic.',
    approach:
      'LibGDX project with Gradle. Separate screens for main menu, level selection, and gameplay. Used input adapters for interaction. A JSON-based save/load system and structured level rendering with different assets.',
    outcome:
      'A modular, interactive game with clean UI and seamless navigation. The save/load system and level progression enhanced engagement — a strong demonstration of game-dev skills in LibGDX.',
    mainImageUrl: AB1,
    gallery: [AB2, AB3, AB4, AB5, AB6, AB7],
    toolsUsed: ['Java', 'LibGDX', 'Gradle', 'Scene2D UI', 'JSON (save/load)', 'IntelliJ IDEA', 'GitHub'],
    liveUrl: null,
  },
  'food-ordering-system': {
    title: 'Food Ordering System',
    category: 'Application',
    year: '2024',
    overview:
      'ByteMe is a Java-based food ordering application with admin and customer roles. Admins manage menus, orders, and refunds; customers log in, browse, and track their order history.',
    challenge:
      'Managing complex admin-customer interactions and data consistency across sessions required meticulous design. Implementing secure login and validating edge cases needed robust exception handling.',
    approach:
      'Core classes built using OOP principles (inheritance, encapsulation). Java collections for in-memory data, file I/O for persistence, lambda expressions for data processing. JUnit tests validate reliability.',
    outcome:
      'A maintainable, modular system with clear role-based structure. JUnit coverage ensures code correctness, and the OOP architecture makes it straightforward to extend.',
    mainImageUrl: FOS1,
    gallery: [FOS1],
    toolsUsed: ['Java', 'OOP', 'HashMap', 'ArrayList', 'File I/O', 'Lambda', 'JUnit 5', 'Maven', 'IntelliJ IDEA'],
    liveUrl: null,
  },
};

const SECTIONS = [
  { key: 'overview',  label: 'Overview',  num: '01' },
  { key: 'challenge', label: 'Challenge', num: '02' },
  { key: 'approach',  label: 'Approach',  num: '03' },
  { key: 'outcome',   label: 'Outcome',   num: '04' },
];

const ProjectDetail = () => {
  const { id }                             = useParams();
  const [currentImage, setCurrentImage]   = useState(0);
  const galleryRef                         = useRef(null);
  const heroRef                            = useRef(null);
  const { playSound }                      = useAudio();

  const { scrollY } = useScroll();
  const heroImgY    = useTransform(scrollY, [0, 500], ['0%', '18%']);

  const project = PROJECTS[id];

  // Touch swipe for gallery
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd,   setTouchEnd]   = useState(0);

  const nextImage = () => {
    setCurrentImage((p) => (p === project.gallery.length - 1 ? 0 : p + 1));
    playSound('click');
  };

  const prevImage = () => {
    setCurrentImage((p) => (p === 0 ? project.gallery.length - 1 : p - 1));
    playSound('click');
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) nextImage();
    if (touchStart - touchEnd < -100) prevImage();
  };

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="container">
          <h2>Project Not Found</h2>
          <p>The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects" className="back-link">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
        <style jsx>{`
          .project-not-found {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: var(--space-3);
            padding: 10px 20px;
            background-color: var(--card);
            border-radius: var(--radius-full);
            transition: all 0.25s ease;
            color: var(--text);
          }
          .back-link:hover {
            background-color: var(--color-accent);
            color: #fff;
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="container">

        <motion.div {...fadeUp(0)}>
          <Link to="/projects" className="back-link" onClick={() => playSound('click')}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </motion.div>

        <motion.header className="project-header" {...fadeUp(0.05)}>
          <h1>{project.title}</h1>
          <div className="project-meta">
            <span className="project-category">{project.category}</span>
            <span className="project-year">{project.year}</span>
          </div>
        </motion.header>

        {/* layoutId matches ProjectCard — framer-motion morphs the card image into the hero */}
        <motion.div
          ref={heroRef}
          layoutId={`project-image-${id}`}
          className="project-hero"
          style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.img
            src={project.mainImageUrl}
            alt={project.title}
            className="main-image"
            style={{ y: heroImgY, scale: 1.18 }}
            loading="lazy"
          />
        </motion.div>

        <div className="project-content">
          <div className="project-main">
            {SECTIONS.map(({ key, label, num }, i) => (
              <motion.section
                key={key}
                className="project-section"
                {...fadeUp(i * 0.06)}
              >
                <p className="section-counter">{"// "}{num}</p>
                <h2>{label}</h2>
                <p>{project[key]}</p>
              </motion.section>
            ))}

            {/* Gallery */}
            <motion.section
              className="project-section project-gallery"
              ref={galleryRef}
              {...fadeUp(0.25)}
            >
              <h2>Project Gallery</h2>

              <div
                className="gallery-container"
                onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
                onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
                onTouchEnd={handleTouchEnd}
              >
                <button className="gallery-nav prev" onClick={prevImage} aria-label="Previous">
                  <ChevronLeft size={24} />
                </button>

                <div className="gallery-view">
                  {project.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} — screenshot ${i + 1}`}
                      className={`gallery-image ${i === currentImage ? 'active' : ''}`}
                      loading="lazy"
                    />
                  ))}
                  {project.gallery.length > 1 && (
                    <div className="swipe-indicator">Swipe to navigate</div>
                  )}
                </div>

                <button className="gallery-nav next" onClick={nextImage} aria-label="Next">
                  <ChevronRight size={24} />
                </button>
              </div>

              {project.gallery.length > 1 && (
                <div className="gallery-indicators">
                  {project.gallery.map((_, i) => (
                    <button
                      key={i}
                      className={`indicator ${i === currentImage ? 'active' : ''}`}
                      onClick={() => { setCurrentImage(i); playSound('pop'); }}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.div className="project-sidebar" {...fadeUp(0.1)}>
            <div className="sidebar-section">
              <p className="sidebar-eyebrow">{"// STACK"}</p>
              <div className="tools-grid">
                {project.toolsUsed.map((tool) => (
                  <span key={tool} className="tool-tag">{tool}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-eyebrow">{"// YEAR"}</p>
              <p className="sidebar-value">{project.year}</p>
            </div>

            {project.liveUrl && (
              <div className="sidebar-section">
                <p className="sidebar-eyebrow">{"// LIVE"}</p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-link"
                  onClick={() => playSound('success')}
                >
                  View Live <ExternalLink size={14} />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .project-detail-page {
          padding-top: 60px;
          padding-bottom: 80px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: var(--space-4);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--glass-text-lo);
          transition: color 0.2s ease, gap 0.2s ease;
        }
        .back-link:hover { color: var(--text); gap: 12px; text-decoration: none; }

        .project-header { margin-bottom: var(--space-4); }

        .project-meta {
          display: flex;
          gap: 8px;
          margin-top: var(--space-2);
          flex-wrap: wrap;
        }

        .project-category {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent);
          border: 1px solid rgba(233,69,96,0.3);
          background: rgba(233,69,96,0.06);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .project-year {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--glass-text-lo);
          border: 1px solid var(--glass-border);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .project-hero {
          margin-bottom: var(--space-4);
          box-shadow: 0 24px 48px rgba(0,0,0,0.35);
        }

        .main-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .project-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--space-4);
        }

        .project-section { margin-bottom: var(--space-4); }

        .section-counter {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.75;
          margin-bottom: 8px;
        }

        .project-section h2 {
          font-size: clamp(1.3rem, 2.5vw, 1.7rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-3);
        }

        .project-section p {
          font-size: 0.95rem;
          color: var(--glass-text);
          line-height: 1.75;
        }

        .project-gallery { margin-top: var(--space-5); }

        .gallery-container {
          position: relative;
          margin-top: var(--space-3);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
        }

        .gallery-view {
          height: 400px;
          position: relative;
          overflow: hidden;
        }

        .gallery-image {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .gallery-image.active { opacity: 1; }

        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.8);
          width: 38px; height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .gallery-nav:hover {
          background: rgba(233,69,96,0.4);
          border-color: rgba(233,69,96,0.5);
          transform: translateY(-50%) scale(1.08);
        }
        .gallery-nav.prev { left: 14px; }
        .gallery-nav.next { right: 14px; }

        .gallery-indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: var(--space-3);
        }

        .indicator {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .indicator.active {
          background: var(--color-accent);
          transform: scale(1.5);
        }

        .swipe-indicator {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0,0,0,0.45);
          color: #fff;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          pointer-events: none;
          z-index: 10;
        }

        .project-sidebar {
          position: sticky;
          top: 100px;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar-section {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          transition: border-color 0.25s ease;
        }
        .sidebar-section:hover { border-color: var(--glass-border-mid); }

        .sidebar-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .sidebar-value {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--glass-text);
          margin: 0;
        }

        .tools-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tool-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.05em;
          color: var(--glass-text-mid);
          border: 1px solid var(--glass-border);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          cursor: default;
        }
        .tool-tag:hover {
          color: var(--color-accent);
          border-color: rgba(233,69,96,0.3);
          background: rgba(233,69,96,0.06);
        }

        .live-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background: var(--color-accent);
          color: #fff;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .live-link:hover {
          background: #d13652;
          transform: translateY(-2px);
          text-decoration: none;
          color: #fff;
        }

        @media (max-width: 992px) {
          .project-content { grid-template-columns: 1fr; }
          .project-sidebar { position: static; margin-top: var(--space-4); }
          .gallery-view { height: 300px; }
        }

        @media (max-width: 768px) {
          .gallery-nav { width: 32px; height: 32px; }
          .gallery-nav.prev { left: 10px; }
          .gallery-nav.next { right: 10px; }
          .gallery-view { height: 240px; }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
