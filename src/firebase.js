import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ─── Setup ────────────────────────────────────────────────────────────────────
// 1. Go to https://console.firebase.google.com and create a free project
// 2. Add a Web app — copy the firebaseConfig object and paste it below
// 3. In the console: Build → Firestore Database → Create database (Start in test mode)
// 4. Replace every "YOUR_..." value below with your actual project values
// ─────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
