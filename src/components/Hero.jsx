import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight, Sparkles, Code, Download } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "I build things for the web.";
  const [commandIndex, setCommandIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const terminalRef = useRef(null);
  const [matrixActive, setMatrixActive] = useState(false);
  const canvasRef = useRef(null);
  const [matrixCharacters, setMatrixCharacters] = useState([]);
  
  // The commands to type in sequence
  const commands = [
    { text: "cd portfolio", delay: 1000 },
    { text: "ls", delay: 500 },
    { text: "cat about.txt", delay: 800 },
  ];

  // Rotating text options for intro
  const introTexts = [
    "I build things for the web.",
    "I create seamless user experiences.",
    "I solve problems with code.",
    "I turn ideas into reality.",
    "I develop full-stack applications."
  ];

  // Typing animation for main intro text
  useEffect(() => {
    if (text.length < introTexts[currentTextIndex].length) {
      const timeout = setTimeout(() => {
        setText(introTexts[currentTextIndex].slice(0, text.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      // Wait before starting the text change process
      const timeout = setTimeout(() => {
        const eraseText = () => {
          if (text.length > 0) {
            setText(text.slice(0, text.length - 1));
            setTimeout(eraseText, 50);
          } else {
            // Move to next text in the array
            setCurrentTextIndex((currentTextIndex + 1) % introTexts.length);
          }
        };
        eraseText();
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [text, currentTextIndex]);

  // Handle the matrix animation
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    return () => clearInterval(interval);
  }, [matrixActive]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);

  // Command typing animation
  useEffect(() => {
    if (commandIndex < commands.length) {
      const timeout = setTimeout(() => {
        setCommandIndex(commandIndex + 1);
        
        // Add a scroll effect to simulate terminal scrolling
        if (terminalRef.current) {
          setTimeout(() => {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }, 100);
        }
      }, commands[commandIndex].delay);
      
      return () => clearTimeout(timeout);
    } else if (commandIndex === commands.length && !showPrompt) {
      // Add a delay before showing final output
      const timeout = setTimeout(() => {
        setShowPrompt(true);
        
        // Scroll to the bottom one more time
        if (terminalRef.current) {
          setTimeout(() => {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }, 100);
        }
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [commandIndex, showPrompt]);

  // Matrix effect toggle
  const toggleMatrix = () => {
    setMatrixActive(!matrixActive);
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-8 bg-gray-900 relative overflow-hidden">
      {/* Matrix Rain Canvas */}
      {matrixActive && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-0"
        />
      )}
      
      {/* Secret click zone to activate Matrix effect */}
      <div 
        className="absolute top-4 right-4 h-6 w-6 cursor-pointer z-20 opacity-20 hover:opacity-80 transition-opacity"
        onClick={toggleMatrix}
        title="Toggle Matrix Effect"
      >
        <Sparkles size={24} className="text-terminal-green" />
      </div>
      
      <div className="max-w-3xl mx-auto w-full relative z-10">
        {/* Terminal window */}
        <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-xl border ${matrixActive ? 'border-terminal-green' : 'border-gray-700'} transition-all duration-500`}>
          {/* Terminal header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-gray-400 text-sm font-mono flex items-center">
              <Terminal size={14} className="mr-2" />
              punit@developer: ~/portfolio
            </div>
          </div>
          
          {/* Terminal content */}
          <div 
            ref={terminalRef} 
            className={`bg-gray-900 p-4 font-mono text-sm md:text-base overflow-auto transition-all duration-500 ${matrixActive ? 'h-96' : 'h-80'}`}
          >
            {/* Command history */}
            <div className="space-y-2 mb-4">
              {commands.slice(0, commandIndex).map((command, index) => (
                <div key={index} className="text-gray-200">
                  <span className="text-green-400">➜</span> <span className="text-blue-400">~/portfolio</span> <span className="text-white">{command.text}</span>
                  
                  {/* Command outputs */}
                  {index === 0 && (
                    <div className="text-gray-400 mt-1 ml-2">
                      Navigated to portfolio directory
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="text-gray-400 mt-1">
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        <span className="text-blue-400">about.txt</span>
                        <span className="text-purple-400">projects/</span>
                        <span className="text-yellow-400">skills.json</span>
                        <span className="text-green-400">contact.sh</span>
                        <span className="text-red-400">resume.pdf</span>
                        <span className="text-cyan-400">config.yml</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* About output */}
            {commandIndex >= 3 && (
              <div className="text-gray-300 space-y-3 animate-fadeIn">
                {showPrompt && (
                  <div className="relative">
                    <div className="absolute -left-5 top-0 bottom-0 w-1 bg-terminal-green"></div>
                    <p className="text-green-400 text-xl md:text-2xl font-bold">
                      Hi, I'm Punit Kumar
                    </p>
                    <p className="text-xl md:text-2xl text-gray-100 mt-2 min-h-[2rem]">
                      {text}<span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>_</span>
                    </p>
                    <p className="text-gray-400 mt-4 leading-relaxed">
                      I'm a full-stack developer specializing in building exceptional digital experiences.
                      Currently focused on creating accessible, human-centered products using React, TypeScript,
                      Python and MongoDB.
                    </p>
                    
                    <div className="pt-6 flex flex-wrap gap-4">
                      <button 
                        onClick={() => window.location.href = '#projects'}
                        className="bg-transparent border border-terminal-green text-terminal-green px-4 py-2 rounded hover:bg-terminal-green/10 transition-all duration-300 flex items-center group"
                      >
                        <Code size={16} className="mr-2" />
                        View My Work
                        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <a 
                        href="/resume.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-terminal-brightBlue text-terminal-brightBlue px-4 py-2 rounded hover:bg-terminal-brightBlue/10 transition-all duration-300 flex items-center"
                      >
                        <Download size={16} className="mr-2" />
                        Download Resume
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Cool typing animation at the bottom */}
            <div className={`mt-8 border-t border-gray-800 pt-4 ${showPrompt ? 'block' : 'hidden'}`}>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="animate-pulse">
                  <span className="text-terminal-green">system</span>:<span className="text-terminal-brightBlue">~$</span>
                </div>
                <div className="typewriter">
                  <span>Ready for the next command...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick status */}
        <div className="mt-8 flex flex-col md:flex-row justify-between text-sm text-gray-500 font-mono">
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            Currently available for new opportunities
          </div>
          <div className="mt-3 md:mt-0">
            <span className="text-gray-400">Last login:</span> {new Date().toLocaleDateString()} @ {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {/* Floating tech badges */}
        <div className="hidden md:block">
          <div className="absolute top-1/4 -right-4 transform rotate-12 bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-gray-700 text-terminal-green font-mono">
            React.js
          </div>
          <div className="absolute bottom-1/4 -left-8 transform -rotate-12 bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-gray-700 text-terminal-purple font-mono">
            Python
          </div>
          <div className="absolute top-1/3 -left-6 transform rotate-3 bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-gray-700 text-terminal-yellow font-mono">
            TypeScript
          </div>
          <div className="absolute bottom-1/3 -right-12 transform -rotate-6 bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-gray-700 text-terminal-blue font-mono">
            MongoDB
          </div>
        </div>
      </div>
      
      {/* Decorative dots */}
      <div className="absolute bottom-12 left-12 hidden md:block">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-700"></div>
          ))}
        </div>
      </div>
      
      {/* Decorative corner brackets */}
      <div className="absolute top-12 left-12 text-3xl text-gray-800 hidden md:block">&#91;&#91;</div>
      <div className="absolute top-12 right-12 text-3xl text-gray-800 hidden md:block">&#93;&#93;</div>
      <div className="absolute bottom-12 right-12 text-3xl text-gray-800 hidden md:block">&#125;&#125;</div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .typewriter span {
          overflow: hidden;
          display: inline-block;
          white-space: nowrap;
          animation: typing 3s steps(40, end) infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
      `}</style>
    </section>
  );
};

export default Hero;