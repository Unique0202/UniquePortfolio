import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import AMS1 from '../assets/ams1.jpg';
import AMS2 from '../assets/ams2.png';
import AMS3 from '../assets/ams3.png';
import AMS4 from '../assets/ams4.png';
import AB1 from '../assets/ab1.jpg';
import AB2 from '../assets/ab2.png';
import AB3 from '../assets/ab3.png';
import AB4 from '../assets/ab4.png';
import AB5 from '../assets/ab5.png';
import AB6 from '../assets/ab6.png';
import AB7 from '../assets/ab7.png';
import FOS1 from '../assets/fos1.jpg';


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
      'airport-management-system': {
        title: 'Airport Management System',
        category: 'Full Stack Website',
        description: 'A full-stack airport management system enabling users to book facilities and view real-time flight details via an interactive interface.',
        overview: 'This project streamlines airport experience by allowing users to book lounges, shops, gyms, and other services online. It includes dedicated portals for users, staff, managers, and an admin for complete control. Users can also access live flight information including gate and terminal details. Built with React, JavaScript, CSS, PostgreSQL, and Python, the platform ensures efficient facility and flight management.',
        challenge: 'Managing different user roles with varying access levels and syncing real-time flight updates with facility bookings posed integration challenges. Ensuring smooth communication between the backend and frontend while maintaining database integrity was critical to the system’s performance and reliability.',
        approach: 'I started by identifying common issues travelers face at airports regarding facility bookings. Then, I designed role-based user interfaces for passengers, staff, and admins. The backend was developed using Python with RESTful routes, and the frontend using React. PostgreSQL handled data storage, and I ensured smooth integration between all components through testing, feedback, and iterative development.',
        outcome: 'The system offers a seamless experience for passengers and staff alike, simplifying facility bookings and flight tracking. Role-based access ensures secure and efficient management of services. Successfully implemented using a full-stack approach, this project enhanced user experience and demonstrated strong backend-frontend integration, making it a scalable solution for modern airports.',
        mainImageUrl: AMS1,
        gallery: [
          AMS2,
          AMS3,
          AMS4
        ],
        toolsUsed: ['React', 'JavaScript', 'CSS', 'PostgreSQL', 'Python', 'REST APIs', 'GitHub', 'Node.js (for routing)', 'VS Code'],
        liveUrl: '#',
        year: '2025'
      },
      'angry-birds': {
        title: 'Angry Birds Game',
        category: 'Interactive Game',
        description: 'A multi-level LibGDX game with interactive UI, level saving/loading, and touch-based controls built using Java and Gradle.',
        overview: 'This game project replicates the Angry Birds-style gameplay with multiple levels, each featuring unique backgrounds and textures. It includes a functional UI with buttons for play, pause, load, settings, and saving progress. Players can select levels, save progress, and resume gameplay. Designed using LibGDX and Java, it showcases proficiency in game logic, UI design, and input handling.',
        challenge: 'Implementing smooth transitions between screens, managing game states like pause and resume, and saving/loading levels dynamically were major hurdles. Handling responsive UI for different resolutions and maintaining level data integrity across sessions required thoughtful logic and testing.',
        approach: 'I began by setting up a LibGDX project with Gradle. Designed separate screens for main menu, level selection, and gameplay. Used input adapters to manage user interaction. Implemented a save/load system and structured level rendering with different assets. Focused on clean code structure, reusable components, and smooth state transitions between screens for an optimal gaming experience.',
        outcome: 'Successfully built a modular, interactive game with clean UI and seamless navigation across levels. The save/load mechanism and level progression system enhanced user engagement. The project demonstrates strong game development skills, event-driven programming, and UI/UX understanding in a LibGDX environment, making it a valuable addition to my portfolio.',
        mainImageUrl: AB1,
        gallery: [
          AB2,
          AB3,
          AB4,
          AB5,
          AB6,
          AB7
        ],
        toolsUsed: ['Java', 'LibGDX', 'Gradle', 'IntelliJ IDEA', 'Scene2D UI', 'GitHub', 'JSON(for save/load)'],
        liveUrl: '#',
        year: '2024'
      },
      'food-ordering-system': {
        title: 'Food Ordering System',
        category: 'Application',
        description: 'A Java-based food ordering system supporting admin and customer roles with robust menu, order, and sales management features.',
        overview: 'ByteMe is a full-fledged food ordering application that supports both admin and customer functionalities. Admins can manage menus, process orders, handle refunds, and generate reports. Customers can log in, place orders, and track order history. The system applies core Java concepts like OOP, collections, file I/O, and exception handling, and is backed by JUnit tests for reliability.',
        challenge: 'Managing complex admin-customer interactions and maintaining data consistency across sessions required meticulous design. Implementing secure login, file-based data handling, and testing corner cases such as invalid orders or empty inventories were particularly challenging and needed robust exception handling and logic validation.',
        approach: 'The project began with defining core user roles and their requirements. Classes were built using OOP principles like inheritance and encapsulation. Java collections managed in-memory data, while file I/O handled persistence. Lambda expressions streamlined data processing. Exception handling was added to improve user experience. JUnit tests validated the system’s reliability under various usage scenarios.',
        outcome: 'Successfully developed a maintainable and modular food ordering system with a clear role-based structure. Users can easily place and manage orders, while admins efficiently oversee operations. The use of object-oriented principles and Java features made the system scalable and reliable, with JUnit test coverage ensuring code correctness and resilience against edge cases.',
        mainImageUrl: FOS1,
        gallery: [
          FOS1,
        ],
        toolsUsed: ['Java', 'OOP', 'HashMap', 'ArrayList', 'File I/O', 'Lambda', 'Streams', 'Exception Handling', 'JUnit 5', 'Maven', 'IntelliJ IDEA'],
        liveUrl: '#',
        year: '2024'
      },
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
              
              {/* <div className="sidebar-section qr-section">
                <h3>View in AR</h3>
                <div className="qr-code">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://example.com/ar-view/${id}`)}`} 
                    alt="QR Code for AR View" 
                    loading="lazy"
                  />
                  <p>Scan to view in augmented reality</p>
                </div>
              </div> */}
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