import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const galleryRef = useRef(null);
  const { playSound } = useAudio();
  
  // Mock project data
  useEffect(() => {
    const projectsData = {
      'ar-interface': {
        title: 'Augmented Reality Interface',
        category: 'Mixed Reality',
        description: 'An exploration of spatial interfaces that blend digital and physical environments through gesture recognition and contextual awareness.',
        overview: 'This project explores the potential of augmented reality as a new paradigm for human-computer interaction. The interface overlays digital information onto the physical world, creating a seamless blend of virtual and real environments. Users can interact with digital content through natural gestures, voice commands, and contextual triggers.',
        challenge: 'The main challenge was creating an intuitive system that feels natural and doesn\'t require extensive learning. Additionally, ensuring the interface adapts to different environments and lighting conditions posed significant technical hurdles.',
        approach: 'I approached this by first conducting extensive user research to understand how people naturally interact with physical objects. From there, I developed a gestural language that leveraged existing mental models. The interface uses computer vision to recognize objects and environments, allowing it to adapt its presentation accordingly.',
        outcome: 'The resulting system enables users to interact with digital content in a more natural and intuitive way. User testing showed a 40% reduction in task completion time compared to traditional interfaces for similar tasks. The project has been featured in several design exhibitions and has received positive feedback from the AR/VR community.',
        mainImageUrl: 'https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        gallery: [
          'https://images.pexels.com/photos/6633919/pexels-photo-6633919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/6633911/pexels-photo-6633911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/6633906/pexels-photo-6633906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        toolsUsed: ['Unity', 'ARKit', 'Figma', 'Blender', 'C#'],
        liveUrl: '#',
        year: '2023'
      },
      'multimodal-dashboard': {
        title: 'Multimodal Dashboard',
        category: 'Voice Interaction',
        description: 'A dashboard that combines visual, voice, and touch interactions to create an accessible and efficient user experience.',
        overview: 'The Multimodal Dashboard project reimagines how users interact with complex data sets by combining multiple interaction modalities. It allows users to navigate, filter, and analyze data through voice commands, touch gestures, and traditional inputs, creating a more flexible and accessible experience.',
        challenge: 'The primary challenge was integrating multiple input methods in a way that felt cohesive rather than disjointed. Additionally, ensuring the voice recognition component could handle domain-specific terminology while remaining accurate posed significant technical challenges.',
        approach: 'I adopted a user-centered design process, conducting extensive interviews with potential users to understand their workflows and pain points. The design evolved through multiple iterations, with each prototype tested with real users. For the technical implementation, I used a modular architecture that allowed each interaction modality to seamlessly coordinate with the others.',
        outcome: 'The final product significantly improved both efficiency and accessibility. User testing showed that the multimodal approach reduced task completion time by 35% compared to traditional dashboards. The voice component has proven particularly valuable for users with motor impairments and for scenarios where hands-free operation is beneficial.',
        mainImageUrl: 'https://images.pexels.com/photos/5077393/pexels-photo-5077393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        gallery: [
          'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/5077045/pexels-photo-5077045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/5077069/pexels-photo-5077069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        toolsUsed: ['React', 'D3.js', 'TensorFlow.js', 'Web Speech API', 'Figma'],
        liveUrl: '#',
        year: '2022'
      },
      // Add more projects as needed
    };
    
    setTimeout(() => {
      if (projectsData[id]) {
        setProject(projectsData[id]);
      }
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, [id]);
  
  // Handle gallery navigation
  const nextImage = () => {
    if (!project) return;
    setCurrentImage((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
    playSound('click');
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };
  
  const prevImage = () => {
    if (!project) return;
    setCurrentImage((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
    playSound('click');
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };
  
  // Handle touch gestures for gallery
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left - next image
      nextImage();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right - previous image
      prevImage();
    }
  };
  
  // Project not found
  if (!loading && !project) {
    return (
      <div className="project-not-found">
        <div className="container">
          <h2>Project Not Found</h2>
          <p>The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects" className="back-link">
            <ArrowLeft size={16} />
            Back to Projects
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
            transition: all 0.3s ease;
          }
          
          .back-link:hover {
            background-color: var(--color-accent);
            color: white;
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div className="project-detail-page">
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading project details...</p>
        </div>
      ) : (
        <div className="container">
          <Link to="/projects" className="back-link">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
          
          <header className="project-header">
            <h1>{project.title}</h1>
            <div className="project-meta">
              <span className="project-category">{project.category}</span>
              <span className="project-year">{project.year}</span>
            </div>
          </header>
          
          <div className="project-hero">
            <img 
              src={project.mainImageUrl} 
              alt={project.title} 
              className="main-image"
              loading="lazy"
            />
          </div>
          
          <div className="project-content">
            <div className="project-main">
              <section className="project-section">
                <h2>Overview</h2>
                <p>{project.overview}</p>
              </section>
              
              <section className="project-section">
                <h2>Challenge</h2>
                <p>{project.challenge}</p>
              </section>
              
              <section className="project-section">
                <h2>Approach</h2>
                <p>{project.approach}</p>
              </section>
              
              <section className="project-section">
                <h2>Outcome</h2>
                <p>{project.outcome}</p>
              </section>
              
              <section className="project-section project-gallery" ref={galleryRef}>
                <h2>Project Gallery</h2>
                
                <div 
                  className="gallery-container" 
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <button 
                    className="gallery-nav prev"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="gallery-view">
                    {project.gallery.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`${project.title} - Gallery image ${index + 1}`}
                        className={`gallery-image ${index === currentImage ? 'active' : ''}`}
                        loading="lazy"
                      />
                    ))}
                    
                    <div className="swipe-indicator">Swipe to navigate</div>
                  </div>
                  
                  <button 
                    className="gallery-nav next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                <div className="gallery-indicators">
                  {project.gallery.map((_, index) => (
                    <button 
                      key={index}
                      className={`indicator ${index === currentImage ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentImage(index);
                        playSound('pop');
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </section>
            </div>
            
            <div className="project-sidebar">
              <div className="sidebar-section">
                <h3>Tools & Technologies</h3>
                <ul className="tools-list">
                  {project.toolsUsed.map((tool, index) => (
                    <li key={index} className="tool-item">{tool}</li>
                  ))}
                </ul>
              </div>
              
              {project.liveUrl && (
                <div className="sidebar-section">
                  <h3>Live Project</h3>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="live-link"
                    onClick={() => playSound('success')}
                  >
                    View Live Project
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
              
              <div className="sidebar-section qr-section">
                <h3>View in AR</h3>
                <div className="qr-code">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://example.com/ar-view/${id}`)}`} 
                    alt="QR Code for AR View" 
                    loading="lazy"
                  />
                  <p>Scan to view in augmented reality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .project-detail-page {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        
        .loading-state {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-accent);
          animation: spin 1s ease-in-out infinite;
          margin-bottom: var(--space-3);
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: var(--space-4);
          color: var(--text);
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .back-link:hover {
          color: var(--color-accent);
          text-decoration: none;
        }
        
        .project-header {
          margin-bottom: var(--space-4);
        }
        
        .project-meta {
          display: flex;
          gap: var(--space-3);
          margin-top: var(--space-2);
        }
        
        .project-category {
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.05);
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-accent);
          font-weight: 500;
        }
        
        .project-year {
          display: inline-block;
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--color-muted);
        }
        
        .project-hero {
          margin-bottom: var(--space-4);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
        
        .project-section {
          margin-bottom: var(--space-4);
        }
        
        .project-section h2 {
          margin-bottom: var(--space-3);
          position: relative;
          display: inline-block;
        }
        
        .project-section h2::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: var(--color-accent);
        }
        
        .project-gallery {
          margin-top: var(--space-5);
        }
        
        .gallery-container {
          position: relative;
          margin-top: var(--space-3);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background-color: var(--card);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-view {
          height: 400px;
          position: relative;
          overflow: hidden;
        }
        
        .gallery-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .gallery-image.active {
          opacity: 1;
        }
        
        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.7);
          color: var(--color-primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }
        
        .gallery-nav:hover {
          background-color: white;
          transform: translateY(-50%) scale(1.1);
        }
        
        .gallery-nav.prev {
          left: 20px;
        }
        
        .gallery-nav.next {
          right: 20px;
        }
        
        .gallery-indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: var(--space-3);
        }
        
        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.1);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .indicator.active {
          background-color: var(--color-accent);
          transform: scale(1.3);
        }
        
        .swipe-indicator {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 8px 15px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          opacity: 0.7;
          z-index: 10;
        }
        
        .project-sidebar {
          position: sticky;
          top: 100px;
          align-self: start;
        }
        
        .sidebar-section {
          background-color: var(--card);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          margin-bottom: var(--space-3);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .sidebar-section h3 {
          margin-bottom: var(--space-2);
          font-size: 1.1rem;
        }
        
        .tools-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .tool-item {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 5px 10px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .tool-item:hover {
          background-color: rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .live-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          background-color: var(--color-accent);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .live-link:hover {
          background-color: #d13652;
          transform: translateY(-2px);
          text-decoration: none;
        }
        
        .qr-section {
          text-align: center;
        }
        
        .qr-code img {
          max-width: 150px;
          height: auto;
          margin-bottom: var(--space-2);
        }
        
        .qr-code p {
          font-size: 0.9rem;
          color: var(--color-muted);
        }
        
        @media (max-width: 992px) {
          .project-content {
            grid-template-columns: 1fr;
          }
          
          .project-sidebar {
            position: static;
            margin-top: var(--space-4);
          }
          
          .sidebar-section {
            margin-bottom: var(--space-3);
          }
          
          .gallery-view {
            height: 300px;
          }
        }
        
        @media (max-width: 768px) {
          .gallery-nav {
            width: 30px;
            height: 30px;
          }
          
          .gallery-nav.prev {
            left: 10px;
          }
          
          .gallery-nav.next {
            right: 10px;
          }
          
          .gallery-view {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;