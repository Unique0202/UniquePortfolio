import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['hero', 'intro', 'featured'];
  const sectionRefs = useRef(sections.map(() => React.createRef()));
  const { theme } = useTheme();
  const { playSound } = useAudio();
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Determine which section is currently in view
      const viewportHeight = window.innerHeight;
      let newCurrentSection = 0;
      
      sectionRefs.current.forEach((ref, index) => {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < viewportHeight / 2 && rect.bottom > 0) {
          newCurrentSection = index;
        }
      });
      
      if (newCurrentSection !== currentSection) {
        setCurrentSection(newCurrentSection);
        playSound('swoosh');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, playSound]);
  
  // Handle gesture-based navigation
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe up - go to next section
      const nextSection = Math.min(currentSection + 1, sections.length - 1);
      if (nextSection !== currentSection) {
        sectionRefs.current[nextSection].current.scrollIntoView({ behavior: 'smooth' });
        playSound('swoosh');
        
        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      }
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe down - go to previous section
      const prevSection = Math.max(currentSection - 1, 0);
      if (prevSection !== currentSection) {
        sectionRefs.current[prevSection].current.scrollIntoView({ behavior: 'smooth' });
        playSound('swoosh');
        
        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      }
    }
  };
  
  // Scroll to next section
  const scrollToNextSection = () => {
    const nextSection = Math.min(currentSection + 1, sections.length - 1);
    sectionRefs.current[nextSection].current.scrollIntoView({ behavior: 'smooth' });
    playSound('click');
  };
  
  return (
    <div 
      className="home-page"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hero Section */}
      <section 
        ref={sectionRefs.current[0]} 
        className={`hero-section ${currentSection === 0 ? 'active' : ''}`}
      >
        <div className="container hero-content">
          <h1 className="text-reveal revealed">
            <span>Imagine</span> <span className="text-accent">Design</span> <span>Build</span>
          </h1>
          
          <p className="lead">
          Merging creative design with technical precision to build seamless, human-centered digital interactions. I’m Unique—a CS & Design engineer exploring the future of tech experiences.


          </p>
          
          <div className="hero-cta">
            <Link to="/projects" className="cta-button primary">
              View My Work
              <ArrowRight size={16} />
            </Link>
            
            <Link to="/contact" className="cta-button secondary">
              Get In Touch
            </Link>
          </div>
          
          <div className="social-links">
            <a href="https://github.com/Unique0202" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/unique-k-71064a28a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:uniquek0202@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <button className="scroll-indicator" onClick={scrollToNextSection} aria-label="Scroll down">
          <ChevronDown size={24} />
        </button>
      </section>
      
      {/* Intro Section */}
      <section 
        ref={sectionRefs.current[1]} 
        className={`intro-section ${currentSection === 1 ? 'active' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="text-reveal revealed">
              <span>About</span> <span>My</span> <span>Work</span>
            </h2>
          </div>
          
          <div className="intro-content">
            <div className="intro-text">
              <p>
                I create thoughtful design experiences that bridge the gap between people and technology.
                My work explores multimodal interactions, context-aware systems, and innovative user interfaces.
              </p>
              
              <p>
                Each project represents a journey of research, iteration, and refinement—focusing on
                how different interaction modalities can enhance user engagement and accessibility.
              </p>
              
              <div className="intro-cta">
                <Link to="/about" className="link-underline">
                  Learn more about my approach
                </Link>
              </div>
            </div>
            
            <div className="intro-image">
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Working on design project" 
                loading="lazy"
                className="rounded-image"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section 
        ref={sectionRefs.current[2]} 
        className={`featured-section ${currentSection === 2 ? 'active' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="text-reveal revealed">
              <span>Featured</span> <span>Projects</span>
            </h2>
            <p>A selection of my latest work showcasing multimodal interaction design.</p>
          </div>
          
          <div className="featured-grid">
            <div className="featured-project">
              <div className="project-preview">
                <img 
                  src="https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Augmented Reality Interface" 
                  loading="lazy"
                />
              </div>
              <div className="project-info">
                <span className="project-category">Mixed Reality</span>
                <h3>Augmented Reality Interface</h3>
                <p>
                  An exploration of spatial interfaces that blend digital and physical environments
                  through gesture recognition and contextual awareness.
                </p>
                <Link to="/projects/ar-interface" className="view-project">
                  View Project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="featured-project reversed">
              <div className="project-preview">
                <img 
                  src="https://images.pexels.com/photos/5077393/pexels-photo-5077393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Voice Interactive Dashboard" 
                  loading="lazy"
                />
              </div>
              <div className="project-info">
                <span className="project-category">Voice Interaction</span>
                <h3>Multimodal Dashboard</h3>
                <p>
                  A dashboard that combines visual, voice, and touch interactions to create
                  an accessible and efficient user experience.
                </p>
                <Link to="/projects/multimodal-dashboard" className="view-project">
                  View Project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="view-all-projects">
            <Link to="/projects" className="cta-button secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .home-page {
          position: relative;
        }
        
        section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-5) 0;
          position: relative;
          transition: opacity 0.5s ease;
        }
        
        section.active {
          opacity: 1;
        }
        
        /* Hero Section */
        .hero-section {
          text-align: center;
          position: relative;
        }
        
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-section h1 {
          margin-bottom: var(--space-4);
        }
        
        .hero-section .lead {
          font-size: 1.25rem;
          margin-bottom: var(--space-4);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-cta {
          display: flex;
          gap: var(--space-3);
          justify-content: center;
          margin-bottom: var(--space-4);
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: var(--radius-full);
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .cta-button.primary {
          background-color: var(--color-accent);
          color: white;
        }
        
        .cta-button.primary:hover {
          background-color: #d13652;
          transform: translateY(-2px);
        }
        
        .cta-button.secondary {
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--text);
        }
        
        .cta-button.secondary:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .social-links {
          display: flex;
          gap: var(--space-3);
          justify-content: center;
          margin-top: var(--space-4);
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--text);
          transition: all 0.3s ease;
        }
        
        .social-links a:hover {
          background-color: var(--color-accent);
          color: white;
          transform: translateY(-3px);
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: transparent;
          border: none;
          color: var(--text);
          cursor: pointer;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
        
        /* Intro Section */
        .section-header {
          text-align: center;
          margin-bottom: var(--space-4);
        }
        
        .intro-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }
        
        .intro-text {
          flex: 1;
        }
        
        .intro-image {
          flex: 1;
          position: relative;
        }
        
        .rounded-image {
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .intro-image:hover .rounded-image {
          transform: translateY(-10px);
        }
        
        .intro-cta {
          margin-top: var(--space-3);
        }
        
        /* Featured Projects */
        .featured-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          margin-top: var(--space-4);
        }
        
        .featured-project {
          display: flex;
          gap: var(--space-4);
          align-items: center;
        }
        
        .featured-project.reversed {
          flex-direction: row-reverse;
        }
        
        .project-preview {
          flex: 1;
          overflow: hidden;
          border-radius: var(--radius-lg);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .project-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .project-preview:hover img {
          transform: scale(1.05);
        }
        
        .project-info {
          flex: 1;
          padding: var(--space-3);
        }
        
        .project-category {
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.05);
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: var(--space-2);
          color: var(--color-accent);
          font-weight: 500;
        }
        
        .project-info h3 {
          margin-bottom: var(--space-2);
        }
        
        .project-info p {
          margin-bottom: var(--space-3);
          color: var(--color-muted);
        }
        
        .view-project {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--text);
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .view-project:hover {
          color: var(--color-accent);
          gap: 8px;
          text-decoration: none;
        }
        
        .view-all-projects {
          text-align: center;
          margin-top: var(--space-5);
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .intro-content,
          .featured-project,
          .featured-project.reversed {
            flex-direction: column;
          }
          
          .project-info {
            text-align: center;
          }
          
          .hero-cta {
            flex-direction: column;
            gap: var(--space-2);
          }
          
          .cta-button {
            width: 100%;
            justify-content: center;
          }
        }
        
        @media (max-width: 768px) {
          section {
            padding: var(--space-4) 0;
          }
          
          .hero-content {
            padding-top: 50px;
          }
          
          .intro-image,
          .project-preview {
            margin: 0 auto;
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;