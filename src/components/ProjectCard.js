import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { playSound } = useAudio();
  
  // 3D effect when mouse moves over the card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
    const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };
  
  // Check if the card is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Handle touch interactions for mobile
  const handleTouchStart = () => {
    playSound('pop');
    setIsHovered(true);
    
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };
  
  const handleTouchEnd = () => {
    setIsHovered(false);
  };
  
  return (
    <div
      ref={cardRef}
      className={`project-card ${isInView ? 'in-view' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('hover');
      }}
      onMouseLeave={() => {
        resetRotation();
        setIsHovered(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="project-image">
        <img src={project.imageUrl} alt={project.title} loading="lazy" />
        
        {/* QR code for physical-digital connection */}
        {isHovered && (
          <div className="project-qr">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`https://example.com/projects/${project.id}`)}`} 
              alt="QR Code" 
              className="qr-code"
            />
            <span>Scan for GitHub Repo</span>
          </div>
        )}
      </div>
      
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <p className="project-description">{project.description}</p>
        
        <div className="project-links">
          <Link to={`/projects/${project.id}`} className="view-link">
            <span>View Project</span>
            <ArrowRight size={16} />
          </Link>
          
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="external-link">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .project-card {
          background-color: var(--card);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s ease;
          cursor: pointer;
          transform-style: preserve-3d;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .project-card.in-view {
          animation: slideInUp 0.6s forwards;
        }
        
        .project-card:hover {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .project-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
          position: relative;
        }
        
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
          transform: scale(1.01);
        }
        
        .project-card:hover .project-image img {
          transform: scale(1.1);
        }
        
        .project-content {
          padding: 20px;
          transform: translateZ(20px);
        }
        
        .project-content h3 {
          margin-bottom: 8px;
          font-size: 1.5rem;
          position: relative;
          display: inline-block;
        }
        
        .project-category {
          color: var(--color-accent);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          font-weight: 500;
        }
        
        .project-description {
          color: var(--color-muted);
          margin-bottom: 20px;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .project-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .view-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--text);
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .view-link:hover {
          color: var(--color-accent);
          gap: 8px;
          text-decoration: none;
        }
        
        .external-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .external-link:hover {
          background-color: var(--color-accent);
          color: white;
        }
        
        .project-qr {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: var(--radius-md);
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateZ(40px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          animation: scaleIn 0.3s forwards;
        }
        
        .qr-code {
          width: 80px;
          height: 80px;
          margin-bottom: 5px;
        }
        
        .project-qr span {
          font-size: 0.8rem;
          color: var(--color-primary);
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .project-card {
            margin-bottom: 20px;
          }
          
          .project-content {
            padding: 15px;
          }
          
          .project-content h3 {
            font-size: 1.2rem;
          }
          
          .project-qr {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;