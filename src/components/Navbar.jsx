import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Terminal, Code, ChevronRight, Monitor, Cpu, HardDrive, Server } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const typingTextRef = useRef('> cd /portfolio && ls -la');
  const typingTimer = useRef(null);
  const logoRef = useRef(null);
  
  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);
  
  // Typing animation for terminal text
  useEffect(() => {
    if (currentTypingIndex < typingTextRef.current.length) {
      const timeout = setTimeout(() => {
        setTypingText(prevText => prevText + typingTextRef.current[currentTypingIndex]);
        setCurrentTypingIndex(prevIndex => prevIndex + 1);
      }, 50);
      
      return () => clearTimeout(timeout);
    } else if (!typingComplete) {
      // Short delay before showing the status bar
      const timeout = setTimeout(() => {
        setTypingComplete(true);
        setShowStatusBar(true);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [currentTypingIndex, typingComplete]);
  
  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance of glitching
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
        }, 150);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Handle scroll and set active section
  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      setIsScrolled(window.scrollY > 10);
      
      // Set active section based on scroll position
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset typing animation
  const resetTypingAnimation = () => {
    setTypingText('');
    setCurrentTypingIndex(0);
    setTypingComplete(false);
    setShowStatusBar(false);
    
    // Clear previous timer if it exists
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    
    // Set a delay before restarting the animation
    typingTimer.current = setTimeout(() => {
      typingTextRef.current = `> cd /${activeSection} && ls -la`;
      setCurrentTypingIndex(0);
    }, 200);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    resetTypingAnimation();
  };

  // Hover effect on logo
  const handleLogoHover = () => {
    if (logoRef.current) {
      logoRef.current.classList.add('logo-pulse');
      setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.classList.remove('logo-pulse');
        }
      }, 500);
    }
  };

  const navLinks = ['home', 'about', 'skills', 'projects', 'contact'];
  const navIcons = {
    'home': <Monitor size={14} />,
    'about': <Server size={14} />,
    'skills': <Code size={14} />,
    'projects': <HardDrive size={14} />,
    'contact': <Terminal size={14} />
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl py-3' : 'bg-transparent py-5'
    } ${isGlitching ? 'navbar-glitch' : ''}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          className={`font-mono text-lg font-bold relative ${isGlitching ? 'text-glitch' : ''}`}
          onMouseEnter={handleLogoHover}
          onClick={() => handleNavLinkClick('home')}
        >
          <div className="flex items-center">
            <Cpu 
              ref={logoRef}
              size={18} 
              className={`mr-2 ${isScrolled ? 'text-terminal-green' : 'text-terminal-green'}`} 
            />
            <span>
              <span className={`${isScrolled ? 'text-terminal-green' : 'text-terminal-green'}`}>punit</span>
              <span className={`${isScrolled ? 'text-terminal-white' : 'text-gray-300'}`}>@dev</span>
              <span className={`${isScrolled ? 'text-terminal-green' : 'text-terminal-green'}`}>~$</span>
            </span>
          </div>
          
          <div className="hidden md:block absolute -bottom-4 left-0 right-0 h-6 pointer-events-none">
            <div className="terminal-typing text-xs text-gray-500">
              <span>{typingText}</span>
              <span className={`inline-block w-1.5 h-3 bg-terminal-green ml-0.5 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </div>
            
            {showStatusBar && (
              <div className="navbar-status-bar text-xs text-gray-600 mt-1 flex items-center justify-between animate-fade-in">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-terminal-green mr-1 animate-pulse"></div>
                  <span>Section: {activeSection}</span>
                </div>
                <div className="flex items-center">
                  <span className="opacity-50 mr-1">|</span>
                  <span className="text-terminal-green">200 OK</span>
                </div>
              </div>
            )}
          </div>
        </a>
        
        {/* Mobile menu button */}
        <button 
          className={`md:hidden text-gray-100 focus:outline-none transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} className="text-terminal-red" /> : <Menu size={24} className="text-terminal-green" />}
        </button>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-1">
          {navLinks.map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`}
                onClick={() => handleNavLinkClick(section)}
                className={`capitalize py-2 px-3 rounded-md hover:bg-gray-800/50 hover:text-terminal-green transition duration-300 relative flex items-center ${
                  activeSection === section 
                    ? 'text-terminal-green bg-gray-800/30 nav-active' 
                    : 'text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{navIcons[section]}</span>
                  <span className="text-sm">{section}</span>
                </div>
                
                {activeSection === section && (
                  <span className="ml-2 opacity-70">
                    <ChevronRight size={14} />
                  </span>
                )}
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-md ${
                  activeSection === section ? 'nav-glow' : 'opacity-0'
                }`}></div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100 shadow-xl border-b border-gray-800' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul className="px-6 py-4 space-y-2">
          {navLinks.map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`}
                onClick={() => handleNavLinkClick(section)}
                className={`block capitalize py-2 px-4 rounded-md transition duration-300 flex items-center justify-between ${
                  activeSection === section 
                    ? 'text-terminal-green bg-gray-800/30 border-l-2 border-terminal-green' 
                    : 'text-gray-300 hover:bg-gray-800/20'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{navIcons[section]}</span>
                  <span>{section}</span>
                </div>
                
                {activeSection === section && (
                  <span className="animate-pulse">
                    <ChevronRight size={16} />
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile status indicator */}
        <div className="px-6 py-3 border-t border-gray-800 flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-500">
            <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse mr-2"></div>
            <span>punit@developer</span>
          </div>
          <div className="text-terminal-green font-mono">
            cd /{activeSection}
          </div>
        </div>
      </div>
      
      {/* CSS Styles */}
      <style jsx>{`
        .navbar-glitch {
          animation: glitch 0.2s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          60% { transform: translate(2px, -2px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          90% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }
        
        .text-glitch {
          position: relative;
        }
        
        .text-glitch::before,
        .text-glitch::after {
          content: "punit@dev~$";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        
        .text-glitch::before {
          color: #ff00ff;
          z-index: -1;
          animation: glitch-anim 0.4s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        
        .text-glitch::after {
          color: #00ffff;
          z-index: -2;
          animation: glitch-anim 0.4s cubic-bezier(.25, .46, .45, .94) reverse both infinite;
        }
        
        @keyframes glitch-anim {
          0% { transform: translate(0); }
          25% { transform: translate(1px); }
          50% { transform: translate(-1px); }
          75% { transform: translate(1px, -1px); }
          100% { transform: translate(-1px, 1px); }
        }
        
        .nav-active::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #4ade80;
          transform: scaleX(0);
          transform-origin: left;
          animation: nav-underline 0.3s ease forwards;
        }
        
        @keyframes nav-underline {
          to { transform: scaleX(1); }
        }
        
        .nav-glow {
          box-shadow: 0 0 5px rgba(74, 222, 128, 0.3);
          animation: glow-pulse 2s infinite;
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(74, 222, 128, 0.3); }
          50% { box-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
        }
        
        .logo-pulse {
          animation: logo-pulse-anim 0.5s ease;
        }
        
        @keyframes logo-pulse-anim {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .terminal-typing {
          height: 1.5rem;
          overflow: hidden;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;