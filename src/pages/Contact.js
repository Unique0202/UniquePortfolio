import React, { useState, useRef } from 'react';
import { Send, MapPin, Phone, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useAudio } from '../context/AudioContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef(null);
  const { playSound } = useAudio();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm(
      'service_2nqw5mc',         // Service ID
      'template_f81b3aa',        // Template ID
      formRef.current,
      'MMmQdXHE9G1xWitAg'          // User API Key
    )
    .then((result) => {
      setSent(true);
      playSound('success');
      
      // Haptic feedback for success
      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, (error) => {
      setError(true);
      playSound('error');
      
      // Haptic feedback for error
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    })
    .finally(() => {
      setSending(false);
    });
  };
  
  // Reset success/error messages
  const resetMessages = () => {
    setSent(false);
    setError(false);
  };
  
  return (
    <div className="contact-page">
      <div className="container">
        <header className="contact-header">
          <h1>Get In Touch</h1>
          <p className="lead">
            Interested in working together or have questions about my portfolio?
            Feel free to reach out.
          </p>
        </header>
        
        <div className="contact-content">
          <div className="contact-form-container">
            <h2>Send a Message</h2>
            
            {sent && (
              <div className="message success">
                <p>Your message has been sent successfully!</p>
                <button onClick={resetMessages} className="dismiss-btn">
                  Send Another Message
                </button>
              </div>
            )}
            
            {error && (
              <div className="message error">
                <p>Something went wrong. Please try again.</p>
                <button onClick={resetMessages} className="dismiss-btn">
                  Try Again
                </button>
              </div>
            )}
            
            {!sent && !error && (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this regarding?"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    className="form-textarea"
                    rows="5"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className={`submit-btn ${sending ? 'sending' : ''}`}
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          <div className="contact-info">
            <div className="info-section">
              <h2>Contact Information</h2>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-text">
                    <h3>Location</h3>
                    <p>New Delhi, India</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="info-text">
                    <h3>Phone</h3>
                    <p>+91 9810215968</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <Mail size={20} />
                  </div>
                  <div className="info-text">
                    <h3>Email</h3>
                    <p>uniquek0202@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="info-section">
              <h2>Follow Me</h2>
              
              <div className="social-links">
                <a 
                  href="https://github.com/Unique0202" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="social-link"
                  onClick={() => playSound('click')}
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/unique-k-71064a28a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-link"
                  onClick={() => playSound('click')}
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href="https://www.instagram.com/unique.02.02/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-link"
                  onClick={() => playSound('click')}
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
            
            <div className="info-section qr-section">
              <h2>Scan to Connect</h2>
              
              <div className="qr-code">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.linkedin.com/in/unique-k-71064a28a/" 
                  alt="Contact QR Code" 
                  loading="lazy"
                />
                <p>Scan to add contact information</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      
      <style jsx>{`
        .contact-page {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        
        .contact-header {
          text-align: center;
          margin-bottom: var(--space-5);
        }
        
        .contact-header h1 {
          margin-bottom: var(--space-2);
        }
        
        .contact-header .lead {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-content {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: var(--space-5);
        }
        
        .contact-form-container,
        .contact-info {
          background-color: var(--card);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        
        .contact-form-container h2,
        .contact-info h2 {
          margin-bottom: var(--space-3);
          position: relative;
          display: inline-block;
        }
        
        .contact-form-container h2::after,
        .contact-info h2::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: var(--color-accent);
        }
        
        .message {
          padding: var(--space-3);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-3);
          animation: fadeIn 0.5s ease;
        }
        
        .message.success {
          background-color: rgba(76, 175, 80, 0.1);
          border: 1px solid var(--color-success);
        }
        
        .message.error {
          background-color: rgba(244, 67, 54, 0.1);
          border: 1px solid var(--color-error);
        }
        
        .message p {
          margin-bottom: var(--space-2);
        }
        
        .dismiss-btn {
          padding: 8px 16px;
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .dismiss-btn:hover {
          background-color: var(--bg);
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .form-input,
        .form-textarea {
          padding: 12px 15px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background-color: var(--bg);
          color: var(--text);
          font-family: inherit;
          transition: border-color 0.3s ease;
        }
        
        .form-input:focus,
        .form-textarea:focus {
          border-color: var(--color-accent);
          outline: none;
          box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.2);
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          background-color: var(--color-accent);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: var(--space-2);
        }
        
        .submit-btn:hover:not(:disabled) {
          background-color: #d13652;
          transform: translateY(-2px);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .submit-btn.sending {
          background-color: var(--color-accent);
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        
        .info-section {
          margin-bottom: var(--space-3);
        }
        
        .info-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-top: var(--space-3);
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-2);
        }
        
        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: rgba(233, 69, 96, 0.1);
          color: var(--color-accent);
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        .info-text h3 {
          font-size: 1rem;
          margin-bottom: 2px;
        }
        
        .info-text p {
          color: var(--color-muted);
          margin: 0;
        }
        
        .social-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-top: var(--space-3);
        }
        
        .social-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 15px;
          background-color: rgba(0, 0, 0, 0.03);
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
          color: var(--text);
        }
        
        .social-link:hover {
          background-color: var(--color-accent);
          color: white;
          transform: translateX(5px);
          text-decoration: none;
        }
        
        .qr-section {
          text-align: center;
        }
        
        .qr-code {
          margin-top: var(--space-3);
        }
        
        .qr-code img {
          max-width: 150px;
          height: auto;
          margin-bottom: var(--space-2);
          border-radius: var(--radius-md);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code p {
          font-size: 0.9rem;
          color: var(--color-muted);
        }
        
        @media (max-width: 992px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }
          
          .contact-info {
            order: -1;
          }
        }
        
        @media (max-width: 768px) {
          .contact-form-container,
          .contact-info {
            padding: var(--space-3);
          }
          
          .info-items {
            gap: var(--space-2);
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;