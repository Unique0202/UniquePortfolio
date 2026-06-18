import React, { useRef } from 'react';
import { BookOpen, Cpu, Star, Zap, Award, Download, Trophy } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import UniquePic from '../assets/UniquePicedit.jpg';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: EASE, delay },
});

const PHILOSOPHY = [
  {
    icon: <BookOpen size={20} />,
    title: 'Human-Centered',
    body: 'Design for people first — empathy and research over assumption.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Multimodal Interaction',
    body: 'Visual, auditory, and tactile cues together create richer experiences.',
  },
  {
    icon: <Cpu size={20} />,
    title: 'Context Awareness',
    body: "Interfaces that adapt to users' environment and situation feel natural.",
  },
  {
    icon: <Star size={20} />,
    title: 'Mindful Innovation',
    body: 'Technology should enhance human experiences, not distract from them.',
  },
];

const SKILLS = [
  { name: 'React / JavaScript',  level: 80 },
  { name: 'Python / Flask',      level: 72 },
  { name: 'UI/UX Design',        level: 75 },
  { name: 'Java / C++',          level: 68 },
  { name: 'PostgreSQL / SQL',    level: 70 },
  { name: 'Figma / Adobe Suite', level: 73 },
];

const TIMELINE = [
  {
    date: '2023 – Present',
    title: 'B.Tech CS & Design — IIIT-Delhi',
    body: 'Building full-stack systems, exploring UI/UX design, and diving into ML/AI in my 4th year.',
  },
  {
    date: '2022 – 2023',
    title: 'JEE Preparation Phase',
    body: 'Dedicated year mastering Physics, Chemistry, and Mathematics for engineering entrance examinations.',
  },
  {
    date: '2020 – 2022',
    title: 'Higher Secondary Education',
    body: 'Completed 12th in Science with Computer Science, laying the foundation for a technical career.',
  },
  {
    date: 'Next →',
    title: 'ML/AI Research & Advanced Systems',
    body: 'Deep-diving into machine learning, distributed systems, and accessible technology.',
  },
];

const AWARDS = [
  {
    icon: <Trophy size={18} />,
    title: '4th · 54th Youth Parliament',
    body: 'National-level public speaking and policy debate — competed among participants from across India.',
  },
  {
    icon: <Award size={18} />,
    title: '20+ School Merit Certificates',
    body: 'Awarded across co-curricular activities for consistent academic and creative excellence.',
  },
];

const About = () => {
  const skillsRef    = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.3 });
  const { playSound } = useAudio();

  return (
    <div className="about-page">
      <div className="container">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="about-hero">
          <motion.div
            className="about-header"
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="about-eyebrow">// 00 ABOUT</p>
            <h1 className="about-title">About Me</h1>
            <p className="about-lead">
              Hey! I'm Unique — a B.Tech CS&amp;Design student at IIIT-Delhi
              building products at the intersection of beautiful design and
              solid engineering.
            </p>
            <a
              href="/Unique_wg_Resume.pdf"
              download="Unique_Resume.pdf"
              className="resume-btn"
              onClick={() => playSound('click')}
            >
              <Download size={15} />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            className="about-image-wrap"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <motion.div
              className="about-image"
              whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
            >
              <img src={UniquePic} alt="Unique" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Philosophy ───────────────────────────────────────────────────── */}
        <section className="about-section">
          <div className="section-head">
            <motion.p className="eyebrow" {...fadeUp(0)}>// 01 PHILOSOPHY</motion.p>
            <motion.h2 {...fadeUp(0.05)}>How I Think</motion.h2>
          </div>

          <div className="philosophy-grid">
            {PHILOSOPHY.map((p, i) => (
              <motion.div
                key={p.title}
                className="philo-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.09 }}
                onHoverStart={() => playSound('hover')}
              >
                <div className="philo-icon">{p.icon}</div>
                <h3 className="philo-title">{p.title}</h3>
                <p className="philo-body">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────────────── */}
        <section className="about-section" ref={skillsRef}>
          <div className="section-head">
            <motion.p className="eyebrow" {...fadeUp(0)}>// 02 EXPERTISE</motion.p>
            <motion.h2 {...fadeUp(0.05)}>Skills</motion.h2>
          </div>

          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <div className="skill-item" key={skill.name}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
                <div className="skill-track">
                  <motion.div
                    className="skill-fill"
                    initial={{ width: '0%' }}
                    animate={skillsInView ? { width: `${skill.level}%` } : { width: '0%' }}
                    transition={{ duration: 1.0, ease: EASE, delay: i * 0.09 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Awards ───────────────────────────────────────────────────────── */}
        <section className="about-section">
          <div className="section-head">
            <motion.p className="eyebrow" {...fadeUp(0)}>// 03 RECOGNITION</motion.p>
            <motion.h2 {...fadeUp(0.05)}>Awards</motion.h2>
          </div>

          <div className="awards-grid">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                className="award-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              >
                <div className="award-icon">{award.icon}</div>
                <div>
                  <h3 className="award-title">{award.title}</h3>
                  <p className="award-body">{award.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Journey ──────────────────────────────────────────────────────── */}
        <section className="about-section">
          <div className="section-head">
            <motion.p className="eyebrow" {...fadeUp(0)}>// 04 JOURNEY</motion.p>
            <motion.h2 {...fadeUp(0.05)}>My Journey</motion.h2>
          </div>

          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.title}
                className="tl-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
              >
                <div className="tl-marker" />
                <div className="tl-card">
                  <span className="tl-date">{item.date}</span>
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-body">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      <style jsx>{`
        .about-page {
          padding: 60px 0 100px;
          min-height: 100vh;
        }

        .about-section { padding: var(--space-6) 0 0; }

        /* ── Section header pattern ─────────────────────────────────────── */
        .section-head { margin-bottom: var(--space-4); }

        .eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--space-2);
          opacity: 0.85;
        }

        .section-head h2 {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0;
        }

        /* ── Hero ───────────────────────────────────────────────────────── */
        .about-hero {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          padding: var(--space-4) 0 0;
        }

        .about-header { flex: 1; }

        .about-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--space-2);
          opacity: 0.85;
        }

        .about-title {
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin-bottom: var(--space-3);
        }

        .about-lead {
          font-size: 1rem;
          color: var(--color-muted);
          line-height: 1.75;
          max-width: 44ch;
          margin-bottom: var(--space-4);
        }

        .resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: var(--color-accent);
          color: #fff;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .resume-btn:hover {
          background: #d13652;
          transform: translateY(-2px);
          color: #fff;
          text-decoration: none;
        }

        .about-image-wrap {
          flex: 0 0 auto;
          width: 340px;
        }

        .about-image {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .about-image::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--color-accent);
          opacity: 0.18;
          pointer-events: none;
          z-index: 1;
        }

        .about-image img {
          width: 100%;
          display: block;
          border-radius: var(--radius-lg);
        }

        /* ── Philosophy cards ───────────────────────────────────────────── */
        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 12px;
        }

        .philo-card {
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          cursor: default;
          transition: border-color 0.25s ease, transform 0.3s var(--ease-out-expo),
                      background 0.25s ease;
        }
        .philo-card:hover {
          border-color: rgba(233,69,96,0.28);
          background: rgba(233,69,96,0.04);
          transform: translateY(-5px);
        }

        .philo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(233,69,96,0.1);
          color: var(--color-accent);
          margin-bottom: 14px;
        }

        .philo-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .philo-body {
          font-size: 0.86rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin: 0;
        }

        /* ── Skills ─────────────────────────────────────────────────────── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px 40px;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .skill-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
        }

        .skill-pct {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: var(--color-accent);
        }

        .skill-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.07);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .skill-fill {
          height: 100%;
          background: var(--color-accent);
          border-radius: var(--radius-full);
        }

        /* ── Awards ─────────────────────────────────────────────────────── */
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }

        .award-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          transition: border-color 0.25s ease;
        }
        .award-card:hover { border-color: rgba(233,69,96,0.3); }

        .award-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(233,69,96,0.1);
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .award-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .award-body {
          margin: 0;
          font-size: 0.86rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }

        /* ── Timeline ───────────────────────────────────────────────────── */
        .timeline {
          position: relative;
          max-width: 720px;
          padding-left: 36px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 8px;
          bottom: 0;
          left: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--color-accent), rgba(233,69,96,0.06));
        }

        .tl-item {
          position: relative;
          margin-bottom: var(--space-4);
        }
        .tl-item:last-child { margin-bottom: 0; }

        .tl-marker {
          position: absolute;
          left: -40px;
          top: 16px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--color-accent);
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 3px rgba(233,69,96,0.2);
        }

        .tl-card {
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-lg);
          padding: 20px var(--space-3);
          transition: border-color 0.25s ease;
        }
        .tl-card:hover { border-color: rgba(233,69,96,0.22); }

        .tl-date {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.85;
          display: block;
          margin-bottom: 8px;
        }

        .tl-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .tl-body {
          margin: 0;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
        }

        /* ── Responsive ─────────────────────────────────────────────────── */
        @media (max-width: 960px) {
          .about-hero {
            flex-direction: column;
            gap: var(--space-4);
          }
          .about-image-wrap {
            width: 100%;
            max-width: 380px;
            align-self: center;
          }
          .about-lead { max-width: 100%; }
        }

        @media (max-width: 768px) {
          .philosophy-grid { grid-template-columns: 1fr; }
          .skills-grid     { grid-template-columns: 1fr; }
          .awards-grid     { grid-template-columns: 1fr; }
          .timeline        { padding-left: 26px; }
          .tl-marker       { left: -30px; }
        }
      `}</style>
    </div>
  );
};

export default About;
