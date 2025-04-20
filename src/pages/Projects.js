import React, { useState, useEffect, useRef } from 'react';
import { Filter, Search, X } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { useAudio } from '../context/AudioContext';
import AMS1 from '../assets/ams1.jpg';
import AB1 from '../assets/ab1.jpg';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);
  const { playSound } = useAudio();
  
  // projects data
  useEffect(() => {
    const projectsData = [
      {
        id: 'airport-management-system',
        title: 'Airport Management System',
        category: 'Full Stack Website',
        description: 'A full-stack airport management system enabling users to book facilities and view real-time flight details via an interactive interface.',
        imageUrl: AMS1,
        liveUrl: '#'
      },
      {
        id: 'angry-birds',
        title: 'Angry Birds Game',
        category: 'Interactive Game',
        description: 'A multi-level LibGDX game with interactive UI, level saving/loading, and touch-based controls built using Java and Gradle.',
        imageUrl: AB1,
        liveUrl: '#'
      },
      {
        id: 'gesture-controller',
        title: 'Gesture Control System',
        category: 'Motion Sensing',
        description: 'A system that interprets hand movements to control digital interfaces without physical contact.',
        imageUrl: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        liveUrl: '#'
      },
      {
        id: 'audio-visualization',
        title: 'Audio Visualization Tool',
        category: 'Sound Design',
        description: 'An interactive tool that transforms audio input into compelling visual representations.',
        imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        liveUrl: '#'
      },
      {
        id: 'haptic-feedback',
        title: 'Haptic Feedback System',
        category: 'Tactile Design',
        description: 'A system that provides realistic touch sensations in digital environments through vibration patterns.',
        imageUrl: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        liveUrl: '#'
      },
      {
        id: 'adaptive-interface',
        title: 'Context-Aware Interface',
        category: 'Adaptive Design',
        description: 'An interface that adapts its appearance and functionality based on user behavior, time of day, and location.',
        imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        liveUrl: '#'
      }
    ];
    
    setProjects(projectsData);
    setFilteredProjects(projectsData);
    
    // Extract unique categories
    const uniqueCategories = [...new Set(projectsData.map(project => project.category))];
    setCategories(uniqueCategories);
  }, []);
  
  // Handle search and filter
  useEffect(() => {
    let results = projects;
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(project => project.category === selectedCategory);
    }
    
    setFilteredProjects(results);
  }, [searchTerm, selectedCategory, projects]);
  
  // Handle click outside category dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    playSound('click');
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    playSound('swoosh');
  };
  
  return (
    <div className="projects-page">
      <div className="container">
        <header className="projects-header">
          <h1>Projects</h1>
          <p className="lead">
            Explore my portfolio of interaction design projects focusing on multimodal experiences.
          </p>
        </header>
        
        <div className="projects-filters">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div ref={categoryRef} className="category-filter">
            <button 
              className="category-toggle"
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                playSound('pop');
              }}
            >
              <Filter size={18} />
              {selectedCategory || 'All Categories'}
            </button>
            
            {isCategoryOpen && (
              <div className="category-dropdown">
                <div 
                  className={`category-option ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => handleCategorySelect('')}
                >
                  All Categories
                </div>
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    className={`category-option ${category === selectedCategory ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {(searchTerm || selectedCategory) && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="no-results">
              <p>No projects found matching your criteria.</p>
              <button className="reset-button" onClick={clearFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .projects-page {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        
        .projects-header {
          text-align: center;
          margin-bottom: var(--space-4);
        }
        
        .projects-header h1 {
          margin-bottom: var(--space-2);
        }
        
        .projects-header p {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .projects-filters {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
        }
        
        .search-bar {
          flex: 1;
          min-width: 250px;
          position: relative;
          display: flex;
          align-items: center;
          background-color: var(--card);
          border-radius: var(--radius-full);
          padding: 0 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .search-bar svg {
          color: var(--color-muted);
        }
        
        .search-bar input {
          width: 100%;
          border: none;
          background: transparent;
          padding: 12px 10px;
          font-size: 0.95rem;
          color: var(--text);
          outline: none;
        }
        
        .clear-search {
          background: transparent;
          border: none;
          color: var(--color-muted);
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .clear-search:hover {
          color: var(--color-accent);
        }
        
        .category-filter {
          position: relative;
        }
        
        .category-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--card);
          border: none;
          border-radius: var(--radius-full);
          padding: 12px 15px;
          font-size: 0.95rem;
          color: var(--text);
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .category-toggle:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .category-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 200px;
          background-color: var(--card);
          border-radius: var(--radius-md);
          margin-top: 5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          z-index: 100;
          overflow: hidden;
          animation: fadeIn 0.2s ease-out;
        }
        
        .category-option {
          padding: 10px 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .category-option:hover,
        .category-option.active {
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--color-accent);
        }
        
        .clear-filters {
          background-color: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: var(--radius-full);
          padding: 12px 15px;
          font-size: 0.95rem;
          color: var(--color-muted);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .clear-filters:hover {
          background-color: rgba(0, 0, 0, 0.1);
          color: var(--text);
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--space-4);
        }
        
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: var(--space-5);
          background-color: var(--card);
          border-radius: var(--radius-md);
        }
        
        .reset-button {
          margin-top: var(--space-3);
          background-color: var(--color-accent);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .reset-button:hover {
          background-color: #d13652;
          transform: translateY(-2px);
        }
        
        @media (max-width: 992px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }
        
        @media (max-width: 768px) {
          .projects-filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .category-dropdown {
            width: 100%;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;