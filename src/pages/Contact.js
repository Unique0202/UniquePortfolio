import React, { useState, useRef } from 'react';
import { Send, MapPin, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import MagneticButton from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1];

const feedbackVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.35, ease: EASE } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const FloatingField = ({
  id, name, label, type = 'text', value, onChange, required, as: Tag = 'input', rows, onKeyDown,
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="floating-field">
      <Tag
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown}
        required={required}
        className={Tag === 'textarea' ? 'form-textarea ff-input' : 'form-input ff-input'}
        rows={rows}
        placeholder=""
      />
      <motion.label
        htmlFor={id}
        className="floating-label"
        animate={
          active
            ? { y: -8, scale: 0.78, color: 'var(--color-accent)' }
            : { y: 0,  scale: 1,    color: 'rgba(255,255,255,0.35)' }
        }
        transition={{ duration: 0.22, ease: EASE }}
        style={{ originX: 0, originY: 0.5 }}
      >
        {label}
      </motion.label>
    </div>
  );
};

const SOCIALS = [
  { href: 'https://github.com/Unique0202',                   icon: <Github size={17} />,    label: 'GitHub'    },
  { href: 'https://www.linkedin.com/in/unique-k-71064a28a/', icon: <Linkedin size={17} />,  label: 'LinkedIn'  },
  { href: 'https://www.instagram.com/unique.02.02/',         icon: <Instagram size={17} />, label: 'Instagram' },
];

const INFO = [
  { icon: <MapPin size={16} />, label: 'Location', value: 'New Delhi, India'     },
  { icon: <Mail size={16} />,   label: 'Email',    value: 'uniquek0202@gmail.com' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]     = useState('idle');
  const formRef                 = useRef(null);
  const { playSound, playKey }  = useAudio();

  const handleKeyDown = (e) => {
    if      (e.key === 'Enter')                         playKey('enter');
    else if (e.key === 'Backspace' || e.key === 'Delete') playKey('backspace');
    else if (e.key === ' ')                              playKey('space');
    else if (e.key.length === 1)                         playKey('regular');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .sendForm('service_2nqw5mc', 'template_f81b3aa', formRef.current, 'MMmQdXHE9G1xWitAg')
      .then(() => {
        setStatus('sent');
        playSound('success');
        if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
        playSound('error');
        if (navigator.vibrate) navigator.vibrate(100);
      });
  };

  return (
    <div className="contact-page">
      <div className="container">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.header
          className="contact-header"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="contact-eyebrow">{"// 05 CONTACT"}</p>
          <h1 className="contact-title">Let's Talk.</h1>
          <p className="contact-lead">
            Interested in working together, have a question, or just want
            to say hey? Drop me a message.
          </p>
        </motion.header>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <div className="contact-layout">

          {/* Form panel */}
          <motion.div
            className="contact-panel form-panel"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <p className="panel-eyebrow">{"// SEND A MESSAGE"}</p>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  className="feedback success"
                  variants={feedbackVariants}
                  initial="hidden" animate="visible" exit="exit"
                >
                  <p>Message sent! I'll get back to you soon.</p>
                  <button className="dismiss-btn" onClick={() => setStatus('idle')}>
                    Send Another
                  </button>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  className="feedback error"
                  variants={feedbackVariants}
                  initial="hidden" animate="visible" exit="exit"
                >
                  <p>Something went wrong. Please try again.</p>
                  <button className="dismiss-btn" onClick={() => setStatus('idle')}>
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="contact-form"
                  variants={feedbackVariants}
                  initial="hidden" animate="visible" exit="exit"
                >
                  <div className="form-row">
                    <FloatingField id="name"    name="name"    label="Your Name"      value={formData.name}    onChange={handleChange} required                        onKeyDown={handleKeyDown} />
                    <FloatingField id="email"   name="email"   label="Email Address"  value={formData.email}   onChange={handleChange} required type="email"           onKeyDown={handleKeyDown} />
                  </div>
                  <FloatingField   id="subject" name="subject" label="Subject"        value={formData.subject} onChange={handleChange} required                        onKeyDown={handleKeyDown} />
                  <FloatingField   id="message" name="message" label="Your Message"   value={formData.message} onChange={handleChange} required as="textarea" rows={5} onKeyDown={handleKeyDown} />

                  <MagneticButton strength={0.28} style={{ alignSelf: 'flex-start' }}>
                  <button
                    type="submit"
                    className={`submit-btn ${status === 'sending' ? 'sending' : ''}`}
                    disabled={status === 'sending'}
                    onClick={() => playSound('click')}
                  >
                    {status === 'sending' ? (
                      <><span className="spinner" /> Sending…</>
                    ) : (
                      <>Send Message <Send size={15} /></>
                    )}
                  </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info panel */}
          <motion.div
            className="contact-panel info-panel"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <p className="panel-eyebrow">{"// REACH ME"}</p>

            <div className="info-items">
              {INFO.map(item => (
                <div key={item.label} className="info-item">
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <p className="info-label">{item.label}</p>
                    <p className="info-value">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-section">
              <p className="panel-eyebrow" style={{ marginBottom: '14px' }}>{"// ELSEWHERE"}</p>
              <div className="social-links">
                {SOCIALS.map(s => (
                  <MagneticButton key={s.label} strength={0.3}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                      onMouseEnter={() => playSound('hover')}
                      onClick={() => playSound('click')}
                      aria-label={s.label}
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="availability-note">
              <span className="avail-dot" />
              Available for freelance &amp; internship opportunities
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        .contact-page {
          padding: 60px 0 100px;
          min-height: 100vh;
        }

        /* ── Header ─────────────────────────────────────────────────────── */
        .contact-header { margin-bottom: var(--space-5); }

        .contact-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--space-2);
          opacity: 0.85;
        }

        .contact-title {
          font-size: clamp(2.8rem, 7vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin-bottom: var(--space-3);
        }

        .contact-lead {
          font-size: 1rem;
          color: var(--color-muted);
          max-width: 48ch;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Layout ─────────────────────────────────────────────────────── */
        .contact-layout {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: var(--space-4);
          align-items: start;
        }

        /* ── Panels ─────────────────────────────────────────────────────── */
        .contact-panel {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
        }

        .panel-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.75;
          margin-bottom: var(--space-3);
        }

        /* ── Floating field ─────────────────────────────────────────────── */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 var(--space-3);
        }

        .floating-field {
          position: relative;
          margin-bottom: var(--space-3);
        }

        .floating-label {
          position: absolute;
          left: 14px;
          top: 14px;
          pointer-events: none;
          font-size: 0.9rem;
          transform-origin: left center;
        }

        .ff-input {
          padding: 22px 14px 6px;
          width: 100%;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.04);
          color: var(--text);
          font-family: inherit;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .ff-input:focus {
          border-color: var(--color-accent);
          outline: none;
          box-shadow: 0 0 0 3px rgba(233,69,96,0.12);
        }

        .form-textarea.ff-input {
          resize: vertical;
          min-height: 130px;
        }

        /* ── Feedback ───────────────────────────────────────────────────── */
        .feedback {
          padding: var(--space-3);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-3);
        }
        .feedback.success {
          background: rgba(76,175,80,0.08);
          border: 1px solid rgba(76,175,80,0.35);
        }
        .feedback.error {
          background: rgba(244,67,54,0.08);
          border: 1px solid rgba(244,67,54,0.35);
        }
        .feedback p { margin-bottom: var(--space-2); }

        .dismiss-btn {
          padding: 7px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-full);
          color: var(--text);
          font-size: 0.82rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .dismiss-btn:hover { background: rgba(255,255,255,0.1); }

        .contact-form { display: flex; flex-direction: column; }

        /* ── Submit button ──────────────────────────────────────────────── */
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px 24px;
          background: var(--color-accent);
          color: #fff;
          border: none;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          margin-top: var(--space-2);
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .submit-btn:hover:not(:disabled) {
          background: #d13652;
          transform: translateY(-2px);
        }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Info panel ─────────────────────────────────────────────────── */
        .info-panel {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          background: rgba(233,69,96,0.1);
          color: var(--color-accent);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .info-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-muted);
          margin: 0 0 2px;
        }

        .info-value {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          margin: 0;
        }

        /* Social pills */
        .social-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.03);
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s ease, border-color 0.2s ease,
                      background 0.2s ease, transform 0.25s var(--ease-out-expo);
        }
        .social-pill:hover {
          color: var(--color-accent);
          border-color: rgba(233,69,96,0.4);
          background: rgba(233,69,96,0.07);
          transform: translateX(4px);
          text-decoration: none;
        }

        /* Availability note */
        .availability-note {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.4);
          padding: 10px 14px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-full);
        }

        .avail-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4caf50;
          flex-shrink: 0;
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(76,175,80,0.4); }
          50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(76,175,80,0); }
        }

        /* ── Responsive ─────────────────────────────────────────────────── */
        @media (max-width: 960px) {
          .contact-layout { grid-template-columns: 1fr; }
          .info-panel     { order: -1; }
        }

        @media (max-width: 640px) {
          .form-row       { grid-template-columns: 1fr; gap: 0; }
          .contact-panel  { padding: var(--space-3); }
        }
      `}</style>
    </div>
  );
};

export default Contact;
