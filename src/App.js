import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

// Components
import Navigation from './components/Navigation';
import Avatar from './components/Avatar';
import AudioController from './components/AudioController';
import SocialPresence from './components/SocialPresence';

// Context
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { AvatarProvider } from './context/AvatarContext';

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <ThemeProvider>
      <AudioProvider>
        <AvatarProvider>
          <Router>
            <div className="app-container">
              <SocialPresence />
              <AudioController />
              <Navigation />
              <Avatar />
              <main className={`main-content ${isMounted ? 'mounted' : ''}`}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AvatarProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;