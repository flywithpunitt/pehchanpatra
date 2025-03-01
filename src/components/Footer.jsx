import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Heart, Code, Terminal, Cpu, ExternalLink, Coffee } from 'lucide-react';

const Footer = () => {
  const [glitchText, setGlitchText] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [showConsoleMessage, setShowConsoleMessage] = useState(false);
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Occasional text glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => {
        setGlitchText(false);
      }, 150);
    }, 10000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Show console message when footer is first rendered
  useEffect(() => {
    console.log("%c👋 Welcome to my portfolio!", "color: #4ade80; font-size: 1.5rem; font-weight: bold;");
    console.log("%c✨ Thanks for checking out the console! Feel free to explore my code.", "color: #60a5fa; font-size: 1rem;");
    console.log("%c🔍 Looking for hidden features? Try the Konami code on the contact page...", "color: #f472b6; font-size: 0.9rem;");
    
    setShowConsoleMessage(true);
  }, []);
  
  const toggleMatrix = () => {
    setMatrixActive(!matrixActive);
  };

  return (
    <footer className="py-8 px-8 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
      {/* Matrix background when activated */}
      {matrixActive && (
        <div className="absolute inset-0 matrix-background opacity-20 pointer-events-none"></div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 font-mono text-sm text-gray-500 relative">
            <div className={`${glitchText ? 'glitch-text' : ''}`}>
              <div className="flex items-center">
                <Terminal size={14} className="mr-2 text-terminal-green" />
                <span className="text-terminal-white">
                  <span className="text-terminal-green">$</span> echo <span className="text-terminal-yellow">"Built with passion"</span>
                </span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="text-gray-600">© {new Date().getFullYear()} Punit Kumar • Made with</span>
                <Heart size={12} className="mx-1 text-terminal-red hover-pulse" />
                <span>and</span>
                <Coffee size={12} className="mx-1 text-terminal-yellow hover-pulse" />
              </div>
            </div>
            
            {/* Console message indicator */}
            {showConsoleMessage && (
              <div className="hidden md:block absolute -top-4 -left-4 text-xs text-terminal-brightBlue animate-pulse">
                <div className="flex items-center">
                  <Code size={12} className="mr-1" />
                  <span>Check the console!</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/punitkr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-container"
              aria-label="GitHub Profile"
            >
              <div className="shine-effect"></div>
              <Github size={18} className="social-icon" />
            </a>
            <a 
              href="https://linkedin.com/in/punitkumar182" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-container"
              aria-label="LinkedIn Profile"
            >
              <div className="shine-effect"></div>
              <Linkedin size={18} className="social-icon" />
            </a>
            <a 
              href="mailto:punitkumar9168@gmail.com" 
              className="social-icon-container"
              aria-label="Email"
            >
              <div className="shine-effect"></div>
              <Mail size={18} className="social-icon" />
            </a>
            <button 
              onClick={toggleMatrix}
              className="social-icon-container"
              aria-label="Toggle Matrix Effect"
            >
              <div className="shine-effect"></div>
              <Cpu size={18} className={`social-icon ${matrixActive ? 'text-terminal-green animate-pulse' : ''}`} />
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="font-mono text-xs text-gray-600 mb-3 md:mb-0">
            <span className="text-terminal-green">$</span> Thank you for visiting my portfolio!
          </div>
          
          {/* System status indicators */}
          <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-terminal-green animate-pulse mr-1"></span>
              <span>SYSTEM ONLINE</span>
            </div>
            <div>|</div>
            <div className="terminal-time">{currentTime}</div>
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="grid grid-cols-9 gap-1 mt-6">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className={`h-0.5 bg-gray-800 rounded ${i === 4 ? 'bg-terminal-green animate-pulse' : ''}`}
            ></div>
          ))}
        </div>
        
        {/* Binary footer */}
        <div className="mt-4 text-center">
          <div className="inline-block px-2 py-1 bg-gray-800 rounded-md">
            <div className="text-xs font-mono text-gray-600 binary-text overflow-hidden">
              01010000 01110101 01101110 01101001 01110100
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .glitch-text {
          position: relative;
        }
        
        .glitch-text::before, .glitch-text::after {
          content: "$ echo \"Built with passion\"";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        
        .glitch-text.glitch::before {
          color: #ff00ff;
          opacity: 0.5;
          transform: translateX(-2px);
          animation: glitch-anim 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .glitch-text.glitch::after {
          color: #00ffff;
          opacity: 0.5;
          transform: translateX(2px);
          animation: glitch-anim 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse;
        }
        
        @keyframes glitch-anim {
          0% { opacity: 0.5; transform: translateX(0); }
          20% { opacity: 0.5; transform: translateX(2px); }
          40% { opacity: 0.5; transform: translateX(-2px); }
          60% { opacity: 0.5; transform: translateX(1px); }
          80% { opacity: 0.5; transform: translateX(-1px); }
          100% { opacity: 0; transform: translateX(0); }
        }
        
        .matrix-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, 
            rgba(0, 0, 0, 0) 0%, 
            rgba(0, 100, 0, 0.05) 25%, 
            rgba(0, 150, 0, 0.1) 50%, 
            rgba(0, 100, 0, 0.05) 75%,
            rgba(0, 0, 0, 0) 100%);
          animation: matrix-scan 2s linear infinite;
        }
        
        @keyframes matrix-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .social-icon-container {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(75, 85, 99, 0.3);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .social-icon-container:hover {
          background-color: rgba(75, 85, 99, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(78, 222, 128, 0.5);
        }
        
        .social-icon {
          color: #6b7280;
          transition: color 0.3s ease;
          z-index: 2;
        }
        
        .social-icon-container:hover .social-icon {
          color: #4ade80;
        }
        
        .shine-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
          z-index: 1;
        }
        
        .social-icon-container:hover .shine-effect {
          left: 100%;
          transition: 0.5s;
        }
        
        .hover-pulse:hover {
          animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .terminal-time {
          font-family: monospace;
          position: relative;
        }
        
        .terminal-time::before {
          content: "";
          position: absolute;
          left: -10px;
          top: 50%;
          width: 6px;
          height: 6px;
          background-color: #4ade80;
          border-radius: 50%;
          transform: translateY(-50%);
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .binary-text {
          position: relative;
          letter-spacing: 1px;
          mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
          animation: scroll-binary 20s linear infinite;
        }
        
        @keyframes scroll-binary {
          0% { transform: translateX(50%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;