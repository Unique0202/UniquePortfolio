import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import AMS1 from '../assets/ams1.jpg';
import AB1  from '../assets/ab1.jpg';
import FOS1 from '../assets/fos1.jpg';

// ─── Constants ───────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1];

const HERO_CHARS = 'UNIQUE'.split('').map((char, idx) => ({ char, idx }));

const ROLES = ['Full-Stack Engineer', 'UI/UX Designer', 'ML Builder'];

const MARQUEE_ITEMS = [
  'React', 'Python', 'Framer Motion', 'PostgreSQL',
  'Figma', 'Java', 'C++', 'Flask', 'Node.js', 'UI/UX Design', 'TypeScript',
];

const BENTO = [
  {
    src: AMS1, title: 'Airport Management System',
    sub: 'Full-stack airport ops platform',
    tags: ['React', 'Flask', 'PostgreSQL'],
    to: '/projects/airport-management-system',
  },
  {
    src: AB1,  title: 'Angry Birds',
    sub: 'Physics-based Java clone',
    tags: ['Java', 'LibGDX'],
    to: '/projects/angry-birds',
  },
  {
    src: FOS1, title: 'Food Ordering System',
    sub: 'End-to-end ordering platform',
    tags: ['React', 'Node.js'],
    to: '/projects/food-ordering-system',
  },
];

const STATS = [
  { value: 5,  suffix: '',  label: 'Projects Built',  sub: 'shipped to production'  },
  { value: 4,  suffix: '+', label: 'Years Coding',    sub: 'since 2020'             },
  { value: 10, suffix: '+', label: 'Technologies',    sub: 'frontend to ML'         },
  { value: 20, suffix: '+', label: 'Certifications',  sub: 'merit & competition'    },
];

const SKILLS = [
  'React', 'JavaScript', 'Python', 'Flask',
  'Java', 'C++', 'PostgreSQL', 'Node.js',
  'Figma', 'Adobe Suite', 'UI/UX Design', 'LibGDX',
  'TypeScript', 'HTML / CSS',
];

// ─── CountUp ─────────────────────────────────────────────────────────────────

function CountUp({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration  = 1400;
    const startTime = performance.now();
    const tick = (now) => {
      const t      = Math.min((now - startTime) / duration, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Home ─────────────────────────────────────────────────────────────────────

const Home = () => {
  // Typewriter
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);

  const containerRef      = useRef(null);
  const sectionRefs       = useRef([]);
  const currentSectionRef = useRef(0);
  const { playSound }     = useAudio();

  // Typewriter loop
  useEffect(() => {
    const word = ROLES[roleIdx];
    let timer;
    if (!deleting && displayed === word) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed === '') {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    } else {
      timer = setTimeout(() => {
        setDisplayed(deleting
          ? word.slice(0, displayed.length - 1)
          : word.slice(0, displayed.length + 1));
      }, deleting ? 40 : 80);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  const scrollToNext = () => {
    sectionRefs.current[1]?.scrollIntoView({ behavior: 'smooth' });
    playSound('click');
  };

  const vp = (amount = 0.15) => ({ once: true, amount, root: containerRef });

  // Scroll progress rail
  const { scrollYProgress } = useScroll({ container: containerRef });
  const dotTop     = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="home-page" ref={containerRef}>

      {/* ── 0: Hero ─────────────────────────────────────────────────────────── */}
      <section ref={(el) => (sectionRefs.current[0] = el)} className="hero-section">

        {/* Top-right status badge */}
        <motion.div
          className="status-badge"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0  }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          <span className="status-dot" aria-hidden="true" />
          IIIT-Delhi · 4th Year
        </motion.div>

        {/* Content */}
        <div className="hero-body container">

          <motion.p
            className="hero-label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: EASE }}
          >
            engineer, designer, builder.
          </motion.p>

          <h1 className="hero-name" aria-label="Unique">
            {HERO_CHARS.map(({ char, idx }) => (
              <span key={idx} className="char-wrap">
                <motion.span
                  className="char"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%'   }}
                  transition={{ delay: 0.12 + idx * 0.065, duration: 0.65, ease: EASE }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <span className="hero-role-text">{displayed}</span>
            <span className="hero-cursor" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5, ease: EASE }}
          >
            <a href="https://github.com/Unique0202" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/unique-k-71064a28a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:uniquek0202@gmail.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Bottom-left scroll cue */}
        <motion.button
          className="scroll-cue"
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            scroll to explore ↓
          </motion.span>
        </motion.button>

        {/* Marquee strip */}
        <div className="hero-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="marquee-item">
                {item}<span className="marquee-sep"> ·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1: Intro ────────────────────────────────────────────────────────── */}
      <section ref={(el) => (sectionRefs.current[1] = el)} className="intro-section">
        <div className="container intro-grid">

          <motion.div
            className="intro-quote-col"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp(0.4)}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <blockquote className="intro-quote">
              "I build things that <span className="text-accent">work</span> and look good doing it."
            </blockquote>
          </motion.div>

          <motion.div
            className="intro-bio-col"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp(0.4)}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <p className="intro-bio">
              4th-year CS + Design student at IIIT-Delhi. I ship full-stack
              systems, design interfaces, and explore ML — always chasing the
              overlap between beautiful and functional.
            </p>
            <div className="intro-actions">
              <Link to="/projects" className="cta-btn primary" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                View Work <ArrowUpRight size={15} />
              </Link>
              <a href="/Unique_wg_Resume.pdf" download className="cta-btn secondary" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                Resume ↓
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 2: Bento featured ───────────────────────────────────────────────── */}
      <section ref={(el) => (sectionRefs.current[2] = el)} className="bento-section">
        <div className="container">

          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp(0.5)}
            transition={{ duration: 0.5, ease: EASE }}
          >
            // 02 SELECTED WORK
          </motion.p>

          <div className="bento-grid">
            {BENTO.map(({ src, title, sub, tags, to }, i) => (
              <motion.div
                key={i}
                className={`bento-cell bento-pos-${i}`}
                onMouseEnter={() => playSound('hover')}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp(0.12)}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              >
                <Link to={to} className="bento-link">
                  <img src={src} alt={title} className="bento-img" loading="lazy" />
                  <div className="bento-overlay" />

                  {/* Index label */}
                  <span className="bento-index" aria-hidden="true">
                    0{i + 1}
                  </span>

                  <div className="bento-content">
                    <p className="bento-sub">{sub}</p>
                    <p className="bento-title">{title}</p>
                    <div className="bento-tags">
                      {tags.map(t => <span key={t} className="bento-tag">{t}</span>)}
                    </div>
                  </div>

                  <span className="bento-arrow" aria-hidden="true">↗</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View all link */}
          <motion.div
            className="bento-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp(0.5)}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            <Link to="/projects" className="bento-view-all">
              View all projects <span className="bento-va-arrow">↗</span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── 3: Stats + Skills ───────────────────────────────────────────────── */}
      <section ref={(el) => (sectionRefs.current[3] = el)} className="stats-section">
        <div className="container">

          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp(0.4)}
            transition={{ duration: 0.5, ease: EASE }}
          >
            // 03 AT A GLANCE
          </motion.p>

          {/* Achievement callout */}
          <motion.div
            className="achievement-badge"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp(0.4)}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          >
            <span className="achievement-star">★</span>
            4th Place · 54th Youth Parliament · National-level public speaking &amp; policy debate
          </motion.div>

          {/* Stat cards */}
          <div className="stats-grid">
            {STATS.map(({ value, suffix, label, sub }, i) => (
              <motion.div
                key={label}
                className="stat-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp(0.3)}
                transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              >
                <div className="stat-number">
                  <CountUp value={value} suffix={suffix} />
                </div>
                <p className="stat-label">{label}</p>
                <p className="stat-sub">{sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech stack */}
          <motion.div
            className="skills-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp(0.2)}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          >
            <p className="skills-eyebrow">// Tech Stack</p>
            <div className="skills-grid">
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-badge"
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={vp(0.1)}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Scroll progress rail ────────────────────────────────────────────── */}
      <div className="progress-track-wrap" aria-hidden="true">
        <div className="progress-track" />
        <motion.div className="progress-fill" style={{ height: fillHeight }} />
        <motion.div className="progress-dot"  style={{ top: dotTop }} />
      </div>

      <style jsx>{`
        /* ── Container ──────────────────────────────────────────────────── */
        .home-page {
          /* Pull up behind the nav so content reaches the true top */
          margin-top: -88px;
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y proximity;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .home-page::-webkit-scrollbar { display: none; }

        /* Base — layout only, no forced height */
        section {
          display: block;
          position: relative;
        }

        /* Hero is full 100vh — content pushed below the nav pill */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          scroll-snap-align: start;
          /* top padding clears the 56px pill + 20px offset + breathing room */
          padding: 100px 0 var(--space-4);
        }

        /* Intro: two-column text */
        .intro-section {
          padding: var(--space-6) 0;
        }

        /* Bento: content-height grid */
        .bento-section {
          padding: var(--space-5) 0 var(--space-6);
        }

        /* Stats: strip */
        .stats-section {
          padding: var(--space-5) 0 var(--space-6);
        }

        /* ── Hero ───────────────────────────────────────────────────────── */
        .status-badge {
          position: absolute;
          top: var(--space-3);
          right: var(--space-4);
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-muted);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-full);
          padding: 6px 14px;
          z-index: 2;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4caf50;
          box-shadow: 0 0 6px #4caf50;
          animation: status-pulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }

        .hero-body { padding-top: var(--space-2); }

        .hero-label {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--space-3);
          opacity: 0.85;
        }
        .hero-label::before { content: '// '; opacity: 0.55; }

        .hero-name {
          font-size: clamp(5rem, 14vw, 13rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.88;
          margin-bottom: var(--space-3);
          display: flex;
        }

        .char-wrap {
          display: inline-block;
          overflow: hidden;
          padding-bottom: 0.1em;
          margin-bottom: -0.1em;
          vertical-align: bottom;
        }
        .char { display: inline-block; }

        .hero-role {
          display: flex;
          align-items: center;
          margin-bottom: var(--space-3);
          min-height: 2.4rem;
        }
        .hero-role-text {
          font-size: clamp(1.1rem, 2.2vw, 1.75rem);
          font-weight: 300;
          color: var(--color-muted);
          letter-spacing: -0.01em;
        }
        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--color-accent);
          margin-left: 3px;
          vertical-align: middle;
          animation: blink-caret 1.1s step-end infinite;
        }
        @keyframes blink-caret {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .hero-social {
          display: flex;
          gap: var(--space-3);
        }
        .hero-social a {
          color: var(--color-muted);
          transition: color 0.2s ease;
        }
        .hero-social a:hover { color: var(--color-accent); }

        .scroll-cue {
          position: absolute;
          bottom: var(--space-5);
          left: var(--space-4);
          background: none;
          border: none;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-muted);
          opacity: 0.5;
          padding: 0;
          transition: opacity 0.2s ease;
        }
        .scroll-cue:hover { opacity: 1; }

        /* ── Marquee ────────────────────────────────────────────────────── */
        .hero-marquee {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 10px 0;
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee-scroll 26s linear infinite;
        }
        .marquee-item {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-muted);
          padding: 0 2.5rem;
          flex-shrink: 0;
        }
        .marquee-sep { color: var(--color-accent); }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Intro ──────────────────────────────────────────────────────── */
        .intro-grid {
          display: grid;
          grid-template-columns: 56% 1fr;
          gap: var(--space-4);
          align-items: center;
        }
        .intro-quote {
          font-size: clamp(1.9rem, 3.6vw, 2.8rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: var(--text);
          margin: 0;
          border: none;
          padding: 0;
        }
        .intro-bio-col {
          padding-left: var(--space-4);
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .intro-bio {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(232, 232, 240, 0.72);
          margin-bottom: var(--space-4);
          max-width: 38ch;
        }
        .intro-actions { display: flex; gap: var(--space-3); flex-wrap: wrap; }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.22s ease;
        }
        .cta-btn.primary {
          background: var(--color-accent);
          color: #fff;
        }
        .cta-btn.primary:hover { background: #d13652; transform: translateY(-1px); }
        .cta-btn.secondary {
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text);
        }
        .cta-btn.secondary:hover {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.04);
        }

        /* ── Bento ──────────────────────────────────────────────────────── */
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--space-3);
          opacity: 0.8;
        }

        /* ── Bento grid — featured left + two stacked right ─────────────── */
        .bento-grid {
          display: grid;
          grid-template-columns: 5fr 4fr;
          grid-template-rows: 220px 220px;
          gap: 10px;
        }
        /* AMS spans both rows on the left */
        .bento-pos-0 { grid-column: 1; grid-row: 1 / 3; }
        /* AB and FOS stack on the right */
        .bento-pos-1 { grid-column: 2; grid-row: 1; }
        .bento-pos-2 { grid-column: 2; grid-row: 2; }

        .bento-cell {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.07);
        }
        /* Red border wipe */
        .bento-cell::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--color-accent);
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s var(--ease-out-expo), opacity 0.08s ease;
          pointer-events: none;
          z-index: 3;
        }
        .bento-cell:hover::after { opacity: 1; transform: scaleX(1); }

        .bento-link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: none;
          color: inherit;
        }

        .bento-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s var(--ease-out-expo);
        }
        .bento-cell:hover .bento-img { transform: scale(1.05); }

        /* Heavier dark gradient so text is always readable */
        .bento-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top,  rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, transparent 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 40%);
          transition: opacity 0.3s ease;
        }
        .bento-cell:hover .bento-overlay { opacity: 0.85; }

        /* 01 / 02 / 03 index label — top left */
        .bento-index {
          position: absolute;
          top: 14px;
          left: 16px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.55);
          z-index: 2;
          background: rgba(0,0,0,0.35);
          padding: 2px 7px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .bento-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px var(--space-3) var(--space-3);
          z-index: 2;
        }
        .bento-sub {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
          margin-bottom: 5px;
        }
        /* Hide sub-description on the compact right cells — too cramped */
        .bento-pos-1 .bento-sub,
        .bento-pos-2 .bento-sub { display: none; }
        .bento-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        /* Larger title for the featured cell */
        .bento-pos-0 .bento-title {
          font-size: 1.25rem;
        }
        .bento-tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .bento-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.14);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        /* Arrow button — top right */
        .bento-arrow {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          z-index: 2;
          transition: background 0.22s ease, color 0.22s ease,
                      border-color 0.22s ease, transform 0.3s var(--ease-out-expo);
        }
        .bento-cell:hover .bento-arrow {
          background: var(--color-accent);
          border-color: transparent;
          color: #fff;
          transform: translate(2px, -2px);
        }

        /* View-all footer */
        .bento-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 14px;
        }
        .bento-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 7px 16px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-full);
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .bento-view-all:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.05);
        }
        .bento-va-arrow {
          display: inline-block;
          transition: transform 0.25s var(--ease-out-expo);
        }
        .bento-view-all:hover .bento-va-arrow { transform: translate(2px, -2px); }

        /* ── Stats ──────────────────────────────────────────────────────── */
        .achievement-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border: 1px solid rgba(233,69,96,0.28);
          border-radius: var(--radius-full);
          background: rgba(233,69,96,0.06);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.6);
          margin-bottom: var(--space-4);
        }
        .achievement-star {
          color: var(--color-accent);
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: var(--space-5);
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-lg);
          padding: var(--space-4) var(--space-3);
          text-align: center;
          transition: border-color 0.25s ease, background 0.25s ease,
                      transform 0.3s var(--ease-out-expo);
        }
        .stat-card:hover {
          border-color: rgba(233,69,96,0.3);
          background: rgba(233,69,96,0.05);
          transform: translateY(-4px);
        }
        .stat-number {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--text);
          margin-bottom: 10px;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.58);
          margin-bottom: 4px;
        }
        .stat-sub {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-muted);
          margin: 0;
        }

        /* Tech stack */
        .skills-wrap {
          padding-top: var(--space-4);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .skills-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.75;
          margin-bottom: var(--space-3);
        }
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.52);
          padding: 6px 14px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.025);
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          cursor: default;
        }
        .skill-badge:hover {
          color: var(--color-accent);
          border-color: rgba(233,69,96,0.35);
          background: rgba(233,69,96,0.07);
        }

        /* ── Scroll progress rail ────────────────────────────────────────── */
        .progress-track-wrap {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 180px;
          z-index: 50;
        }
        .progress-track {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
        }
        .progress-fill {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          background: var(--color-accent);
          border-radius: 2px;
        }
        .progress-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 8px var(--color-accent), 0 0 18px rgba(233,69,96,0.4);
        }

        /* ── Responsive ─────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100vh;
            padding: 88px 0 var(--space-3);
          }
          .intro-section  { padding: var(--space-4) 0; }
          .bento-section  { padding: var(--space-3) 0 var(--space-4); }
          .stats-section  { padding: var(--space-3) 0 var(--space-4); }

          .intro-grid {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 220px 160px 160px;
          }
          .bento-pos-0 { grid-column: 1; grid-row: 1; }
          .bento-pos-1 { grid-column: 1; grid-row: 2; }
          .bento-pos-2 { grid-column: 1; grid-row: 3; }
          .bento-pos-0 .bento-title { font-size: 1rem; }

          .stats-grid { grid-template-columns: 1fr 1fr; }
          .achievement-badge { font-size: 0.6rem; padding: 6px 12px; }
          .skills-grid { gap: 6px; }
          .skill-badge { font-size: 0.65rem; padding: 5px 11px; }

          .status-badge        { display: none; }
          .progress-track-wrap { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Home;
