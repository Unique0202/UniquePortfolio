# Unique Kumar — Portfolio

Personal portfolio website built with React and Framer Motion. Dark engineering aesthetic, synthesized audio feedback, and a public guestbook.

**Live:** [uniquekumar.dev](https://uniquekumar.dev) <!-- update with actual URL -->

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (Create React App) |
| Animations | Framer Motion 12 |
| Routing | React Router v6 |
| Database | Firebase Firestore (guestbook) |
| Email | EmailJS (contact form) |
| Audio | Web Audio API (synthesized, no MP3s) |
| Icons | Lucide React |
| Fonts | JetBrains Mono · Inter |

---

## Features

- **Page transitions** — clip-path reveal on enter, fade on exit
- **Shared-element transition** — project card image morphs into detail hero via `layoutId`
- **Scroll progress rail** — fixed right-side indicator on all pages
- **Synthesized audio** — click, hover, success/error tones + mechanical keyboard sounds in the contact form; ambient drone toggle
- **Public guestbook** — real-time Firestore feed; all visitors share the same notes
- **Custom cursor** — dot + ring that tracks mouse position
- **PageIntro** — branded loading screen on first visit (session-gated)

---

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Firebase Setup (Guestbook)

The guestbook requires a free Firebase project.

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project
2. Add a **Web app** and copy the config object
3. Go to **Build → Firestore Database → Create database** (start in test mode)
4. Paste your values into `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey:            "...",
  authDomain:        "....firebaseapp.com",
  projectId:         "...",
  storageBucket:     "....appspot.com",
  messagingSenderId: "...",
  appId:             "...",
};
```

Until configured, the guestbook shows a setup prompt instead of erroring.

---

## Project Structure

```
src/
├── pages/
│   ├── Home.js          # Hero, bento grid, stats, skills
│   ├── About.js         # Timeline, philosophy, awards
│   ├── Projects.js      # Filterable project grid
│   ├── ProjectDetail.js # Parallax hero, gallery, sidebar
│   └── Contact.js       # EmailJS form, social links
├── components/
│   ├── Navigation.js    # Floating pill nav + mobile bar
│   ├── ProjectCard.js   # 3D tilt card with red border wipe
│   ├── SocialPresence.js# Firestore guestbook widget
│   ├── AudioController.js # Mute toggle + ambient drone
│   ├── CustomCursor.js  # Dot + ring cursor
│   ├── ScrollRail.js    # Fixed scroll progress indicator
│   ├── PageIntro.js     # First-visit branded loader
│   ├── Reveal.js        # whileInView animation wrapper
│   └── Footer.js        # Three-column footer
├── context/
│   ├── AudioContext.js  # Web Audio API synth engine
│   └── ThemeContext.js  # Dark/light toggle
└── firebase.js          # Firestore initialisation
```

---

## Environment

No `.env` file needed. EmailJS keys are in `Contact.js`. Firebase config goes in `firebase.js`. Neither file contains secrets — both are public-facing client configs.

---

## Build

```bash
npm run build
```

Output goes to `/build`. Deploy to Netlify, Vercel, or any static host.
