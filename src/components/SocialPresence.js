import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection, addDoc, onSnapshot,
  orderBy, query, limit, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const EASE = [0.22, 1, 0.36, 1];
const MAX_NOTES = 20;

const panelVariants = {
  hidden:  { opacity: 0, y: 14, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.26, ease: EASE } },
  exit:    { opacity: 0, y: 8,  scale: 0.97, transition: { duration: 0.18 } },
};

const formatAge = (ts) => {
  if (!ts) return '';
  const diff = Date.now() - ts;
  if (diff < 60_000)     return 'just now';
  if (diff < 3_600_000)  return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
};

const SocialPresence = () => {
  const [open, setOpen]       = useState(false);
  const [notes, setNotes]     = useState([]);
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState('idle'); // idle | sending | sent | error
  const [fbError, setFbError] = useState(false);
  const panelRef              = useRef(null);

  // Real-time Firestore listener
  useEffect(() => {
    let unsub;
    try {
      const q = query(
        collection(db, 'guestbook'),
        orderBy('timestamp', 'desc'),
        limit(MAX_NOTES),
      );
      unsub = onSnapshot(
        q,
        (snap) => {
          setNotes(
            snap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              timestamp: doc.data().timestamp?.toDate?.()?.getTime?.() ?? Date.now(),
            })),
          );
          setFbError(false);
        },
        () => setFbError(true),
      );
    } catch {
      setFbError(true);
    }
    return () => unsub?.();
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimName = name.trim().slice(0, 50);
    const trimMsg  = message.trim().slice(0, 280);
    if (!trimName || !trimMsg) return;

    setStatus('sending');
    try {
      await addDoc(collection(db, 'guestbook'), {
        name:      trimName,
        text:      trimMsg,
        timestamp: serverTimestamp(),
      });
      setName('');
      setMessage('');
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="gb-root" ref={panelRef}>

      {/* ── Pill trigger ─────────────────────────────────────────────────── */}
      <button
        className="gb-pill"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle guestbook"
      >
        <MessageSquare size={14} />
        <span>Leave a note</span>
        {notes.length > 0 && (
          <span className="gb-badge">{notes.length}</span>
        )}
      </button>

      {/* ── Slide-up panel ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="gb-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="gb-header">
              <p className="gb-eyebrow">{"// GUESTBOOK"}</p>
              <button className="gb-close" onClick={() => setOpen(false)} aria-label="Close">
                <X size={15} />
              </button>
            </div>

            {fbError ? (
              <p className="gb-error-msg">
                Firebase not configured — see <code>src/firebase.js</code>.
              </p>
            ) : (
              <>
                {/* Form */}
                <form className="gb-form" onSubmit={handleSubmit}>
                  <input
                    className="gb-input"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                    required
                    disabled={status === 'sending'}
                  />
                  <textarea
                    className="gb-textarea"
                    placeholder="Say something…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={280}
                    required
                    rows={3}
                    disabled={status === 'sending'}
                  />
                  <div className="gb-form-foot">
                    <span className="gb-chars">{message.length}/280</span>
                    <button
                      type="submit"
                      className="gb-send"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending'
                        ? <span className="gb-spinner" />
                        : <><Send size={13} /> Post</>
                      }
                    </button>
                  </div>

                  <AnimatePresence>
                    {status === 'sent' && (
                      <motion.p className="gb-feedback success"
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        Posted! Thanks for leaving a note ✦
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p className="gb-feedback error"
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        Couldn't post — check your connection.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>

                {/* Notes list */}
                {notes.length > 0 && (
                  <div className="gb-notes">
                    <p className="gb-notes-label">{"// "}{notes.length}{" note"}{notes.length !== 1 ? 's' : ''}</p>
                    {notes.map((n) => (
                      <div key={n.id} className="gb-note">
                        <div className="gb-note-meta">
                          <span className="gb-note-name">{n.name}</span>
                          <span className="gb-note-time">{formatAge(n.timestamp)}</span>
                        </div>
                        <p className="gb-note-text">{n.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {notes.length === 0 && status === 'idle' && (
                  <p className="gb-empty">No notes yet — be the first!</p>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gb-root {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 1000;
        }

        /* ── Pill ──────────────────────────────────────────────────────── */
        .gb-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(13,13,18,0.55);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-full);
          padding: 8px 14px;
          font-size: 0.78rem;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .gb-pill:hover {
          border-color: rgba(233,69,96,0.4);
          color: rgba(255,255,255,0.9);
          transform: translateY(-2px);
        }

        .gb-badge {
          background: var(--color-accent);
          color: #fff;
          font-size: 0.62rem;
          font-weight: 700;
          border-radius: 99px;
          padding: 1px 6px;
          line-height: 1.4;
        }

        /* ── Panel ─────────────────────────────────────────────────────── */
        .gb-panel {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 0;
          width: 300px;
          background: rgba(10,10,16,0.96);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-lg);
          padding: 16px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          max-height: 500px;
          overflow-y: auto;
        }

        /* ── Header ─────────────────────────────────────────────────────── */
        .gb-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .gb-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.8;
          margin: 0;
        }

        .gb-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px; height: 26px;
          border-radius: 50%;
          color: rgba(255,255,255,0.4);
          transition: color 0.2s ease, background 0.2s ease;
        }
        .gb-close:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.07); }

        /* ── Form ───────────────────────────────────────────────────────── */
        .gb-form { display: flex; flex-direction: column; gap: 8px; }

        .gb-input,
        .gb-textarea {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.04);
          color: var(--text);
          font-family: var(--font-main);
          font-size: 0.88rem;
          resize: none;
          transition: border-color 0.2s ease;
        }
        .gb-input::placeholder,
        .gb-textarea::placeholder { color: rgba(255,255,255,0.25); }
        .gb-input:focus,
        .gb-textarea:focus {
          border-color: rgba(233,69,96,0.5);
          outline: none;
          box-shadow: 0 0 0 3px rgba(233,69,96,0.1);
        }
        .gb-input:disabled,
        .gb-textarea:disabled { opacity: 0.5; }

        .gb-form-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .gb-chars {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: rgba(255,255,255,0.25);
        }

        .gb-send {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 14px;
          background: var(--color-accent);
          color: #fff;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .gb-send:hover:not(:disabled) { background: #d13652; }
        .gb-send:disabled { opacity: 0.6; cursor: not-allowed; }

        .gb-spinner {
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: gbSpin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes gbSpin { to { transform: rotate(360deg); } }

        .gb-feedback {
          font-size: 0.78rem;
          padding: 7px 10px;
          border-radius: var(--radius-md);
          margin: 0;
        }
        .gb-feedback.success {
          background: rgba(76,175,80,0.1);
          border: 1px solid rgba(76,175,80,0.25);
          color: #4caf50;
        }
        .gb-feedback.error {
          background: rgba(244,67,54,0.1);
          border: 1px solid rgba(244,67,54,0.25);
          color: #f44336;
        }

        /* ── Notes ──────────────────────────────────────────────────────── */
        .gb-notes {
          margin-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 12px;
        }

        .gb-notes-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          opacity: 0.6;
          margin-bottom: 10px;
        }

        .gb-note {
          padding: 9px 11px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 7px;
        }
        .gb-note:last-child { margin-bottom: 0; }

        .gb-note-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .gb-note-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-accent);
        }

        .gb-note-time {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em;
        }

        .gb-note-text {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.55);
          margin: 0;
          line-height: 1.5;
          word-break: break-word;
        }

        .gb-empty {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.2);
          text-align: center;
          margin: 14px 0 4px;
        }

        .gb-error-msg {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          margin: 0;
        }
        .gb-error-msg code {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--color-accent);
        }

        @media (max-width: 480px) {
          .gb-root  { bottom: 72px; left: 12px; }
          .gb-panel { width: calc(100vw - 24px); }
        }
      `}</style>
    </div>
  );
};

export default SocialPresence;
