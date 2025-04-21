import React, { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, Code, Cpu, Star, Zap } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import UniquePic from '../assets/UniquePicedit.jpg';

const About = () => {
  const sectionsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const { playSound } = useAudio();
  
  // Skills data
  const skills = [
    { name: 'UX Design', level: 50 },
    { name: 'Interaction Design', level: 50 },
    { name: 'Front-end Development', level: 60 },
    { name: 'Prototyping', level: 70 },
    { name: 'Back-end Development', level: 65 },
    { name: 'Design Systems', level: 60 }
  ];
  
  // Array of refs for each section
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, 4);
  }, []);
  
  // Track scroll position to highlight current section
  useEffect(() => {
    const handleScroll = () => {
      const pageTop = window.scrollY;
      const pageBottom = pageTop + window.innerHeight;
      let newActiveSection = activeSection;
      
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (sectionTop < pageBottom - 200 && sectionBottom > pageTop + 200) {
          newActiveSection = index;
        }
      });
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
        playSound('swoosh');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, playSound]);
  
  // Animate skill bars when in view
  const skillsRef = useRef(null);
  const [skillsVisible, setSkillsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);
  
  // Handle touch gestures
  const handleTouchStart = (index) => {
    playSound('click');
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section 
          ref={el => sectionsRef.current[0] = el}
          className={`about-hero ${activeSection === 0 ? 'active' : ''}`}
        >
          <div className="about-header">
            <h1>About Me</h1>
            <p className="lead">
            Hey there! I'm Unique, currently pursuing my B.Tech in Computer Science and Design from IIIT-D. With a passion for both programming and design, I strive to create innovative solutions.
            I'm always eager to connect with fellow enthusiasts, professionals, and anyone passionate about technology and design. Feel free to reach out.
            </p>
          </div>
          
          <div className="about-image">
            <img 
              src={UniquePic}
              alt="Working on design projects" 
              className="rounded-image"
            />
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section 
          ref={el => sectionsRef.current[1] = el}
          className={`about-philosophy ${activeSection === 1 ? 'active' : ''}`}
        >
          <h2>Design Philosophy</h2>
          
          <div className="philosophy-grid">
            <div 
              className="philosophy-card"
              onTouchStart={() => handleTouchStart(0)}
            >
              <div className="icon-wrapper">
                <BookOpen size={24} />
              </div>
              <h3>Human-Centered</h3>
              <p>
                I believe in designing for people first, using empathy and research to create experiences that truly resonate.
              </p>
            </div>
            
            <div 
              className="philosophy-card"
              onTouchStart={() => handleTouchStart(1)}
            >
              <div className="icon-wrapper">
                <Zap size={24} />
              </div>
              <h3>Multimodal Interaction</h3>
              <p>
                Combining visual, auditory, and tactile interactions creates richer, more accessible experiences.
              </p>
            </div>
            
            <div 
              className="philosophy-card"
              onTouchStart={() => handleTouchStart(2)}
            >
              <div className="icon-wrapper">
                <Cpu size={24} />
              </div>
              <h3>Context Awareness</h3>
              <p>
                Thoughtful interfaces should adapt to users' needs, environment, and situation.
              </p>
            </div>
            
            <div 
              className="philosophy-card"
              onTouchStart={() => handleTouchStart(3)}
            >
              <div className="icon-wrapper">
                <Star size={24} />
              </div>
              <h3>Mindful Innovation</h3>
              <p>
                Technology should enhance human experiences, not distract from them.
              </p>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section 
          ref={el => {
            sectionsRef.current[2] = el;
            skillsRef.current = el;
          }}
          className={`about-skills ${activeSection === 2 ? 'active' : ''}`}
        >
          <h2>Skills & Expertise</h2>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-header">
                  <h3>{skill.name}</h3>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ 
                      width: skillsVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="expertise-areas">
            <h3>Areas of Expertise</h3>
            
            <div className="expertise-tags">
              <span className="expertise-tag">UX/UI Design</span>
              <span className="expertise-tag">Interaction Design</span>
              <span className="expertise-tag">Back-end Development</span>
              {/* <span className="expertise-tag">Gesture Controls</span>
              <span className="expertise-tag">Voice Interfaces</span>
              <span className="expertise-tag">Haptic Feedback</span> */}
              <span className="expertise-tag">Design Systems</span>
              <span className="expertise-tag">Front-end Development</span>
              <span className="expertise-tag">User Testing</span>
              <span className="expertise-tag">Prototyping</span>
            </div>
          </div>
        </section>
        
{/* Journey Section */}
<section 
  ref={el => sectionsRef.current[3] = el}
  className={`about-journey ${activeSection === 3 ? 'active' : ''}`}
>
  <h2>My Journey</h2>
  
  <div className="timeline">
    <div className="timeline-item">
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div className="timeline-date">2023 - Present</div>
        <h3>BTech in Computer Science & Design</h3>
        <p>Currently in my 2nd year at IIIT-Delhi, exploring full-stack development, UI/UX design, and software engineering fundamentals.</p>
      </div>
    </div>
    
    <div className="timeline-item">
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div className="timeline-date">2022 - 2023</div>
        <h3>JEE Preparation Phase</h3>
        <p>Dedicated year to mastering Physics, Chemistry, and Mathematics for engineering entrance examinations.</p>
      </div>
    </div>
    
    <div className="timeline-item">
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div className="timeline-date">2020 - 2022</div>
        <h3>Higher Secondary Education</h3>
        <p>Completed 12th grade in Science stream with Computer Science, laying foundation for technical career.</p>
      </div>
    </div>
    
    <div className="timeline-item">
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div className="timeline-date">Future Aspirations</div>
        <h3>Full-Stack Developer</h3>
        <p>Working towards mastering both frontend and backend technologies to build complete, scalable web applications.</p>
      </div>
    </div>
  </div>
</section>
      </div>
      
      <style jsx>{`
        .about-page {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        
        section {
          padding: var(--space-5) 0;
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }
        
        section.active {
          opacity: 1;
        }
        
        /* Hero Section */
        .about-hero {
          display: flex;
          align-items: center;
          gap: var(--space-5);
          min-height: 60vh;
        }
        
        .about-header {
          flex: 1;
        }
        
        .about-header h1 {
          margin-bottom: var(--space-3);
          position: relative;
        }
        
        .about-header h1::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: var(--color-accent);
        }
        
        .about-image {
          flex: 1;
        }
        
        .rounded-image {
          border-radius: var(--radius-lg);
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .about-image:hover .rounded-image {
          transform: translateY(-10px) rotate(2deg);
        }
        
        /* Philosophy Section */
        .about-philosophy h2,
        .about-skills h2,
        .about-journey h2 {
          text-align: center;
          margin-bottom: var(--space-4);
          position: relative;
        }
        
        .about-philosophy h2::after,
        .about-skills h2::after,
        .about-journey h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background-color: var(--color-accent);
        }
        
        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-3);
          margin-top: var(--space-4);
        }
        
        .philosophy-card {
          background-color: var(--card);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .philosophy-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: rgba(233, 69, 96, 0.1);
          color: var(--color-accent);
          margin-bottom: var(--space-2);
        }
        
        .philosophy-card h3 {
          margin-bottom: var(--space-2);
        }
        
        /* Skills Section */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-4);
          margin-top: var(--space-4);
        }
        
        .skill-item {
          margin-bottom: var(--space-3);
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-1);
        }
        
        .skill-header h3 {
          font-size: 1rem;
          margin: 0;
        }
        
        .skill-percentage {
          font-weight: 500;
          color: var(--color-accent);
        }
        
        .skill-bar {
          width: 100%;
          height: 8px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .skill-progress {
          height: 100%;
          background-color: var(--color-accent);
          width: 0;
          transition: width 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .expertise-areas {
          margin-top: var(--space-5);
        }
        
        .expertise-areas h3 {
          text-align: center;
          margin-bottom: var(--space-3);
        }
        
        .expertise-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        
        .expertise-tag {
          padding: 8px 16px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .expertise-tag:hover {
          background-color: var(--color-accent);
          color: white;
          transform: translateY(-3px);
        }
        
        /* Journey Section */
        .timeline {
          position: relative;
          max-width: 800px;
          margin: var(--space-4) auto 0;
          padding-left: 40px;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: var(--space-4);
        }
        
        .timeline-marker {
          position: absolute;
          left: -40px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: var(--color-accent);
          border: 3px solid var(--bg);
          box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.3);
        }
        
        .timeline-content {
          background-color: var(--card);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .timeline-content:hover {
          transform: translateX(5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        .timeline-date {
          font-size: 0.9rem;
          color: var(--color-accent);
          font-weight: 500;
          margin-bottom: var(--space-1);
        }
        
        .timeline-content h3 {
          margin-bottom: var(--space-1);
        }
        
        .timeline-content p {
          margin-bottom: 0;
          color: var(--color-muted);
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .about-hero {
            flex-direction: column;
            gap: var(--space-4);
            text-align: center;
          }
          
          .about-header h1::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .about-image {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 768px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
          
          .timeline {
            padding-left: 30px;
          }
          
          .timeline-marker {
            left: -30px;
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;