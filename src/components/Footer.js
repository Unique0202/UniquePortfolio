import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram } from 'lucide-react';

const NAV = [
  { name: 'About',    path: '/about'    },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact',  path: '/contact'  },
];

const SOCIALS = [
  { href: 'https://github.com/Unique0202',                   icon: <Github size={15} />,    label: 'GitHub'    },
  { href: 'https://www.linkedin.com/in/unique-k-71064a28a/', icon: <Linkedin size={15} />,  label: 'LinkedIn'  },
  { href: 'https://www.instagram.com/unique.02.02/',         icon: <Instagram size={15} />, label: 'Instagram' },
];

const Footer = () => (
  <footer className="site-footer">
    {/* Red accent bar */}
    <div className="footer-accent" />

    <div className="container footer-inner">
      {/* Brand */}
      <div className="footer-brand">
        <Link to="/" className="footer-logo" aria-label="Home">
          <span className="fl-u">U</span>
          <span className="fl-dot">.</span>
        </Link>
        <p className="footer-tagline">Design · Engineer · Build</p>
      </div>

      {/* Nav */}
      <nav className="footer-nav" aria-label="Footer">
        {NAV.map(l => (
          <Link key={l.path} to={l.path} className="footer-link">{l.name}</Link>
        ))}
      </nav>

      {/* Socials */}
      <div className="footer-socials">
        {SOCIALS.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>

    {/* Bottom strip */}
    <div className="footer-bottom">
      <div className="container footer-bottom-inner">
        <p className="footer-copy">© 2026 Unique</p>
        <p className="footer-built">
          {/* Built with React &amp; Framer Motion */}
        </p>
      </div>
    </div>

    <style jsx>{`
      .site-footer {
        border-top: 1px solid var(--glass-border);
        position: relative;
      }

      .footer-accent {
        position: absolute;
        top: 0; left: 0;
        width: 48px; height: 2px;
        background: var(--color-accent);
        border-radius: 0 0 var(--radius-full) var(--radius-full);
      }

      /* ── Main row ──────────────────────────────────────────────────────── */
      .footer-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding-top: var(--space-4);
        padding-bottom: var(--space-4);
        flex-wrap: wrap;
      }

      /* Brand */
      .footer-brand { display: flex; flex-direction: column; gap: 5px; }

      .footer-logo {
        font-family: var(--font-mono);
        font-size: 1.05rem;
        font-weight: 500;
        letter-spacing: -0.02em;
        text-decoration: none;
        line-height: 1;
        transition: opacity 0.2s ease;
      }
      .footer-logo:hover { opacity: 0.75; }

      .fl-u   { color: var(--color-accent); }
      .fl-dot { color: var(--glass-text-faint); }

      .footer-tagline {
        font-family: var(--font-mono);
        font-size: 0.6rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--glass-text-faint);
        margin: 0;
      }

      /* Nav */
      .footer-nav { display: flex; gap: var(--space-4); flex-wrap: wrap; }

      .footer-link {
        font-size: 0.82rem;
        color: var(--glass-text-lo);
        text-decoration: none;
        transition: color 0.2s ease;
        letter-spacing: 0.01em;
      }
      .footer-link:hover { color: var(--text); }

      /* Socials */
      .footer-socials { display: flex; gap: 10px; }

      .footer-social {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px; height: 32px;
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        color: var(--glass-text-lo);
        text-decoration: none;
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      }
      .footer-social:hover {
        color: var(--color-accent);
        border-color: rgba(233,69,96,0.4);
        background: rgba(233,69,96,0.07);
      }

      /* ── Bottom strip ──────────────────────────────────────────────────── */
      .footer-bottom { border-top: 1px solid var(--glass-border); }

      .footer-bottom-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 0;
        flex-wrap: wrap;
        gap: 8px;
      }

      .footer-copy,
      .footer-built {
        font-family: var(--font-mono);
        font-size: 0.6rem;
        letter-spacing: 0.1em;
        color: var(--glass-text-faint);
        margin: 0;
      }

      @media (max-width: 640px) {
        .footer-inner { flex-direction: column; align-items: flex-start; gap: var(--space-3); }
        .footer-nav   { gap: var(--space-3); }
        .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
      }
    `}</style>
  </footer>
);

export default Footer;
