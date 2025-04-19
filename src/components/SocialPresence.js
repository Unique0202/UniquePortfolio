import React, { useState, useEffect } from 'react';
import { Users, MessageSquare } from 'lucide-react';

const SocialPresence = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [userName, setUserName] = useState('');
  
  // Simulate the presence of other users
  useEffect(() => {
    // Get or generate a username
    const storedName = localStorage.getItem('portfolioUsername');
    if (storedName) {
      setUserName(storedName);
    } else {
      const randomName = `Guest${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem('portfolioUsername', randomName);
      setUserName(randomName);
    }
    
    // Simulate random active users
    const randomUsers = Math.floor(Math.random() * 5) + 2; // 2-6 users
    setActiveUsers(randomUsers);
    
    // Periodically update active users to simulate people coming and going
    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setActiveUsers(prev => {
        const newValue = prev + change;
        return newValue < 1 ? 1 : (newValue > 8 ? 8 : newValue);
      });
    }, 30000); // Every 30 seconds
    
    // Load comments from local storage
    const savedComments = localStorage.getItem('portfolioComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Sample initial comments
      const initialComments = [
        { name: 'Visitor123', text: 'Great portfolio design!', timestamp: Date.now() - 3600000 },
        { name: 'Designer22', text: 'Love the interaction features', timestamp: Date.now() - 7200000 }
      ];
      setComments(initialComments);
      localStorage.setItem('portfolioComments', JSON.stringify(initialComments));
    }
    
    return () => clearInterval(interval);
  }, []);
  
  // Update local storage when comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('portfolioComments', JSON.stringify(comments));
    }
  }, [comments]);
  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    const newComment = {
      name: userName,
      text: commentInput.trim(),
      timestamp: Date.now()
    };
    
    setComments(prev => [newComment, ...prev]);
    setCommentInput('');
    
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  };
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} h ago`;
    return `${Math.floor(diff / 86400000)} d ago`;
  };

  return (
    <div className={`social-presence ${showComments ? 'expanded' : ''}`}>
      <div className="presence-indicator" onClick={() => setShowComments(!showComments)}>
        <div className="user-count">
          <Users size={16} />
          <span>{activeUsers} online</span>
        </div>
        <div className="comment-count">
          <MessageSquare size={16} />
          <span>{comments.length}</span>
        </div>
      </div>
      
      {showComments && (
        <div className="comments-section">
          <h3>Visitor Comments</h3>
          
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add your comment..."
              maxLength={100}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>
          
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-header">
                    <span className="comment-name">{comment.name}</span>
                    <span className="comment-time">{formatTimestamp(comment.timestamp)}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">Be the first to comment!</p>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .social-presence {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .presence-indicator {
          display: flex;
          align-items: center;
          gap: 15px;
          background-color: var(--card);
          border-radius: var(--radius-full);
          padding: 8px 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .presence-indicator:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .user-count, .comment-count {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.85rem;
          color: var(--text);
        }
        
        .user-count span {
          color: var(--color-success);
          font-weight: 500;
        }
        
        .comments-section {
          background-color: var(--card);
          border-radius: var(--radius-md);
          padding: 15px;
          margin-top: 10px;
          width: 280px;
          max-height: 400px;
          overflow-y: auto;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          animation: slideInUp 0.3s forwards;
        }
        
        .comments-section h3 {
          margin-bottom: 15px;
          font-size: 1.1rem;
          color: var(--text);
        }
        
        .comment-form {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
        }
        
        .comment-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          background-color: var(--bg);
          color: var(--text);
          transition: border-color 0.2s ease;
        }
        
        .comment-input:focus {
          border-color: var(--color-accent);
          outline: none;
        }
        
        .comment-submit {
          padding: 8px 12px;
          background-color: var(--color-accent);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .comment-submit:hover {
          background-color: var(--color-primary);
        }
        
        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .comment {
          padding: 10px;
          border-radius: var(--radius-md);
          background-color: rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease;
        }
        
        .comment:hover {
          transform: translateX(3px);
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 0.85rem;
        }
        
        .comment-name {
          font-weight: 500;
          color: var(--color-accent);
        }
        
        .comment-time {
          color: var(--color-muted);
        }
        
        .comment-text {
          font-size: 0.9rem;
          margin: 0;
          word-break: break-word;
        }
        
        .no-comments {
          color: var(--color-muted);
          font-style: italic;
          text-align: center;
          margin: 10px 0;
        }
        
        @media (max-width: 768px) {
          .social-presence {
            bottom: 10px;
            left: 10px;
          }
          
          .comments-section {
            width: 250px;
            max-height: 300px;
          }
          
          .presence-indicator {
            padding: 6px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default SocialPresence;