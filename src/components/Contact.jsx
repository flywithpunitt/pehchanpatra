import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Send, AlertCircle, CheckCircle, Terminal, Command, Copy, Cpu, Wifi, HardDrive, Code, Zap } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [commandOutput, setCommandOutput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [typingAnimation, setTypingAnimation] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [cursor, setCursor] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const terminalRef = useRef(null);
  
  // Konami code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  const commands = [
    { command: 'whoami', delay: 1000 },
    { command: 'ls -la /contact', delay: 1500 },
    { command: 'cat contact_info.txt', delay: 1200 },
  ];
  
  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);
  
  // Konami code easter egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if the pressed key matches the next key in the Konami sequence
      if (e.key === konamiCode[konamiProgress]) {
        const nextProgress = konamiProgress + 1;
        setKonamiProgress(nextProgress);
        
        // If the sequence is complete, trigger the easter egg
        if (nextProgress === konamiCode.length) {
          setShowEasterEgg(true);
          setKonamiProgress(0);
          
          // Add special command to terminal
          setCommandOutput(prev => 
            prev + "visitor@punit-portfolio:~$ sudo unlock_debug_mode\n" +
            "🎮 DEBUG MODE ACTIVATED - Welcome hacker!\n" +
            "All systems accessible. Matrix mode engaged.\n\n"
          );
          
          // Scroll terminal to bottom
          if (terminalRef.current) {
            setTimeout(() => {
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }, 100);
          }
          
          // Reset easter egg after 15 seconds
          setTimeout(() => {
            setShowEasterEgg(false);
          }, 15000);
        }
      } else {
        // Reset progress if wrong key
        setKonamiProgress(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);
  
  // Command execution animation
  useEffect(() => {
    if (currentCommandIndex < commands.length) {
      setTypingAnimation('');
      
      // Type the command character by character
      const command = commands[currentCommandIndex].command;
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex < command.length) {
          setTypingAnimation(prev => prev + command[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          
          // After typing finishes, add command to history and show output
          setTimeout(() => {
            setCommandHistory(prev => [...prev, command]);
            setTypingAnimation('');
            
            // Generate command output based on the command
            generateCommandOutput(command);
            
            // Move to next command after delay
            setTimeout(() => {
              setCurrentCommandIndex(currentCommandIndex + 1);
            }, commands[currentCommandIndex].delay);
          }, 500);
        }
      }, 100);
      
      return () => clearInterval(typingInterval);
    }
  }, [currentCommandIndex]);
  
  const generateCommandOutput = (command) => {
    switch (command) {
      case 'whoami':
        setCommandOutput(prev => 
          prev + "visitor@punit-portfolio:~$ whoami\n" +
          "visitor\n\n"
        );
        break;
      case 'ls -la /contact':
        setCommandOutput(prev => 
          prev + "visitor@punit-portfolio:~$ ls -la /contact\n" +
          "total 4\n" +
          "drwxr-xr-x  2 punit developers  4096 Mar 1 2025 .\n" +
          "drwxr-xr-x 14 punit developers  4096 Mar 1 2025 ..\n" +
          "-rw-r--r--  1 punit developers   256 Mar 1 2025 contact_info.txt\n" +
          "-rw-r--r--  1 punit developers   417 Mar 1 2025 .message_form\n" +
          "-rw-r--r--  1 punit developers   128 Mar 1 2025 README.md\n\n"
        );
        break;
      case 'cat contact_info.txt':
        setCommandOutput(prev => 
          prev + "visitor@punit-portfolio:~$ cat contact_info.txt\n" +
          "// Contact Information\n" +
          "{\n" +
          "  name: \"Punit Kumar\",\n" +
          "  email: \"punitkumar182@gmail.com\",\n" +
          "  linkedin: \"https://linkedin.com/in/punitkumar182\",\n" +
          "  github: \"https://github.com/punitkr\",\n" +
          "  availability: \"Open to new opportunities\"\n" +
          "}\n\n" +
          "To send a message, please use the form below or contact directly via email.\n\n"
        );
        break;
      default:
        setCommandOutput(prev => 
          prev + `visitor@punit-portfolio:~$ ${command}\n` +
          `Command not found: ${command}\n\n`
        );
    }
  };
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('punitkumar182@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    // Simulate form submission
    setTimeout(() => {
      // Form validation would go here in a real implementation
      if (name && email && message) {
        // Success simulation
        setCommandOutput(prev => 
          prev + `visitor@punit-portfolio:~$ send_message "${name}" "${email}"\n` +
          "Message successfully sent! Expect a response soon.\n" +
          "Exit code: 0\n\n"
        );
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Error simulation
        setCommandOutput(prev => 
          prev + `visitor@punit-portfolio:~$ send_message "${name}" "${email}"\n` +
          "Error: Missing required fields\n" +
          "Exit code: 1\n\n"
        );
        setSubmitStatus('error');
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };
  
  const runCustomCommand = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = e.target.value.trim();
      if (command) {
        generateCommandOutput(command);
        e.target.value = '';
      }
    }
  };

  return (
    <section id="contact" className={`py-20 px-8 bg-gray-900 relative ${showEasterEgg ? 'glitch-bg' : ''}`}>
      {/* Floating binary in the background when easter egg is active */}
      {showEasterEgg && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="binary-bit"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <div className="font-mono mb-12">
          <div className="flex items-center text-gray-500">
            <div className="mr-2 text-terminal-green">#</div>
            <div className="mr-2 text-terminal-green">04.</div>
            <h2 className="text-xl text-terminal-white font-semibold">Contact</h2>
            <div className="ml-4 h-px bg-gray-700 flex-grow"></div>
          </div>
          <p className="text-gray-400 mt-4 ml-10">
            Let's build something together
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main terminal */}
          <div className="lg:col-span-3">
            <div className="terminal-container h-full">
              <div className="terminal-header">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="text-terminal-brightBlack font-mono text-sm flex items-center">
                  <Terminal size={14} className="mr-2" />
                  visitor@punit-portfolio:~
                </div>
              </div>
              <div 
                ref={terminalRef}
                className={`bg-black p-4 font-mono text-sm h-96 overflow-auto relative ${showEasterEgg ? 'matrix-mode' : ''}`}
              >
                {/* Matrix-inspired background animation */}
                <div className={`absolute inset-0 overflow-hidden z-0 ${showEasterEgg ? 'opacity-40' : 'opacity-20'}`}>
                  <div className="matrix-rain"></div>
                </div>
                
                {/* Terminal content */}
                <div className="relative z-10">
                  <div className="text-terminal-green mb-4">Welcome to Punit's terminal. Type or use the form to get in touch.</div>
                  
                  {/* Command output */}
                  <div className="text-terminal-white whitespace-pre-line">{commandOutput}</div>
                  
                  {/* Current typing animation */}
                  <div className="flex items-center">
                    <span className="text-terminal-green mr-2">visitor@punit-portfolio:~$</span>
                    <span className="text-terminal-white">{typingAnimation}</span>
                    <span className={`ml-0.5 inline-block w-2 h-4 bg-terminal-white ${cursor ? 'opacity-100' : 'opacity-0'}`}></span>
                  </div>
                </div>
                
                {/* Simulated active processes */}
                <div className="mt-8 border-t border-gray-800 pt-4">
                  <div className="text-xs text-gray-500 mb-2">Active Processes:</div>
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center justify-between bg-gray-900/50 px-2 py-1 rounded text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-gray-400">contact_service.js</span>
                      </div>
                      <span className="text-gray-500">PID: 1337</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-900/50 px-2 py-1 rounded text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-gray-400">mail_sender.js</span>
                      </div>
                      <span className="text-gray-500">PID: 4242</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-900/50 px-2 py-1 rounded text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-gray-400">notification_handler.js</span>
                      </div>
                      <span className="text-gray-500">PID: 8080</span>
                    </div>
                  </div>
                </div>
                
                {/* System resources */}
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">System Resources:</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>CPU</span>
                        <span>32%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1">
                        <div className="bg-terminal-blue h-1 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Memory</span>
                        <span>547MB / 2GB</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1">
                        <div className="bg-terminal-green h-1 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Network</span>
                        <span>1.2 MB/s</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1">
                        <div className="bg-terminal-purple h-1 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Custom command input */}
                <div className="mt-4 flex items-center bg-gray-900/70 backdrop-blur-sm rounded p-2 border border-gray-800">
                  <Command size={14} className="text-terminal-green mr-2" />
                  <input
                    type="text"
                    placeholder="Type a command (try 'help', 'contact', or 'projects')"
                    className="bg-transparent border-none outline-none text-terminal-white w-full font-mono text-sm"
                    onKeyDown={runCustomCommand}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="terminal-container">
              <div className="terminal-header">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="text-terminal-brightBlack font-mono text-sm">
                  contact-form.js
                </div>
              </div>
              <div className="bg-gray-900 p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-terminal-brightBlue text-sm font-mono mb-1">
                      const name = 
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="'Your Name'"
                      className="w-full bg-gray-800 border border-gray-700 text-terminal-white p-2 rounded font-mono text-sm focus:border-terminal-green focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-terminal-brightBlue text-sm font-mono mb-1">
                      const email = 
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="'your.email@example.com'"
                      className="w-full bg-gray-800 border border-gray-700 text-terminal-white p-2 rounded font-mono text-sm focus:border-terminal-green focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-terminal-brightBlue text-sm font-mono mb-1">
                      const message = 
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="'Your message here...'"
                      rows="4"
                      className="w-full bg-gray-800 border border-gray-700 text-terminal-white p-2 rounded font-mono text-sm focus:border-terminal-green focus:outline-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className={`${showEasterEgg ? 'bg-terminal-green/30 animate-pulse' : 'bg-terminal-green/10'} border border-terminal-green/50 text-terminal-green px-4 py-2 rounded flex items-center justify-center w-full font-mono hover:bg-terminal-green/20 transition-colors duration-300 relative overflow-hidden`}
                    disabled={submitStatus === 'loading'}
                  >
                    {showEasterEgg && (
                      <div className="absolute inset-0 cyber-grid opacity-20"></div>
                    )}
                
                    {submitStatus === 'loading' ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-terminal-green mr-2"></div>
                        Processing...
                      </div>
                    ) : submitStatus === 'success' ? (
                      <div className="flex items-center">
                        <CheckCircle size={16} className="mr-2" />
                        Message Sent!
                      </div>
                    ) : submitStatus === 'error' ? (
                      <div className="flex items-center">
                        <AlertCircle size={16} className="mr-2" />
                        Error. Try Again.
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send size={16} className="mr-2" />
                        submit()
                      </div>
                    )}
                  </button>
                </form>
                
                {/* Quick contact info */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-terminal-white font-mono text-sm mb-3">// Quick connect</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail size={16} className="text-terminal-blue mr-3" />
                      <span className="text-gray-300 text-sm font-mono truncate">punitkumar182@gmail.com</span>
                      <button 
                        onClick={handleCopyEmail}
                        className="ml-2 text-gray-500 hover:text-terminal-white transition-colors"
                        aria-label="Copy email address"
                      >
                        {copied ? <CheckCircle size={14} className="text-terminal-green" /> : <Copy size={14} />}
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <Linkedin size={16} className="text-terminal-blue mr-3" />
                      <a 
                        href="https://linkedin.com/in/punitkumar182" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 text-sm font-mono hover:text-terminal-green transition-colors"
                      >
                        linkedin.com/in/punitkumar182
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <Github size={16} className="text-terminal-blue mr-3" />
                      <a 
                        href="https://github.com/punitkr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 text-sm font-mono hover:text-terminal-green transition-colors"
                      >
                        github.com/punitkr
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive connection visualization */}
        <div className="mt-12 py-6 relative">
          {/* Network visualization */}
          <div className="network-visualization">
            <div className="network-node main-node"></div>
            <div className="network-node node-1"></div>
            <div className="network-node node-2"></div>
            <div className="network-node node-3"></div>
            <div className="network-node node-4"></div>
            <div className="network-node node-5"></div>
            <div className="network-connection connection-1"></div>
            <div className="network-connection connection-2"></div>
            <div className="network-connection connection-3"></div>
            <div className="network-connection connection-4"></div>
            <div className="network-connection connection-5"></div>
            <div className="data-packet packet-1"></div>
            <div className="data-packet packet-2"></div>
            <div className="data-packet packet-3"></div>
            <div className="data-packet packet-4"></div>
            <div className="data-packet packet-5"></div>
          </div>
          
          {/* ASCII art signature overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-mono text-xs text-gray-600 whitespace-pre overflow-auto z-10 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/80 px-8">
{`
  _____                _  _     _  __                                  
 |  __ \\              (_)| |   | |/ /                                  
 | |__) |_   _  _ __   _ | |_  | ' / _   _  _ __ ___    __ _  _ __    
 |  ___/| | | || '_ \\ | || __| |  < | | | || '_ \\ _ \\  / _\` || '__|   
 | |    | |_| || | | || || |_  | . \\| |_| || | | | | || (_| || |      
 |_|     \\__,_||_| |_||_| \\__| |_|\\_\\\\__,_||_| |_| |_| \\__,_||_|  
                                      Full Stack Developer
`}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, 
                      rgba(0, 255, 70, 0.2) 0%, 
                      rgba(0, 255, 70, 0.1) 50%, 
                      rgba(0, 255, 70, 0) 100%);
          animation: matrixRain 8s linear infinite;
        }
        
        .matrix-mode {
          position: relative;
          color: #0f0 !important;
          text-shadow: 0 0 5px #0f0;
        }
        
        .matrix-mode::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
        }
        
        .glitch-bg {
          animation: glitchEffect 0.2s infinite;
        }
        
        @keyframes glitchEffect {
          0% { background-color: #111827; }
          1% { background-color: #0a1122; }
          2% { background-color: #111827; }
          3% { background-color: #122038; }
          5% { background-color: #111827; }
          98% { background-color: #111827; }
          100% { background-color: #111827; }
        }
        
        .network-visualization {
          position: relative;
          width: 100%;
          height: 120px;
        }
        
        .network-node {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #4ade80;
          z-index: 2;
        }
        
        .main-node {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          background-color: #60a5fa;
          box-shadow: 0 0 10px #60a5fa;
        }
        
        .node-1 { top: 20%; left: 10%; background-color: #4ade80; }
        .node-2 { top: 70%; left: 20%; background-color: #a78bfa; }
        .node-3 { top: 30%; left: 80%; background-color: #f87171; }
        .node-4 { top: 80%; left: 85%; background-color: #fcd34d; }
        .node-5 { top: 10%; left: 40%; background-color: #22d3ee; }
        
        .network-connection {
          position: absolute;
          height: 1px;
          background-color: rgba(75, 85, 99, 0.6);
          z-index: 1;
          transform-origin: 0 0;
        }
        
        .connection-1 {
          top: 50%;
          left: 50%;
          width: 40%;
          transform: rotate(155deg);
        }
        
        .connection-2 {
          top: 50%;
          left: 50%;
          width: 30%;
          transform: rotate(200deg);
        }
        
        .connection-3 {
          top: 50%;
          left: 50%;
          width: 32%;
          transform: rotate(30deg);
        }
        
        .connection-4 {
          top: 50%;
          left: 50%;
          width: 38%;
          transform: rotate(315deg);
        }
        
        .connection-5 {
          top: 50%;
          left: 50%;
          width: 25%;
          transform: rotate(100deg);
        }
        
        .data-packet {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #4ade80;
          z-index: 3;
        }
        
        .packet-1 {
          animation: movePacket1 3s linear infinite;
          background-color: #4ade80;
        }
        
        .packet-2 {
          animation: movePacket2 4s linear infinite;
          background-color: #a78bfa;
        }
        
        .packet-3 {
          animation: movePacket3 5s linear infinite;
          background-color: #f87171;
        }
        
        .packet-4 {
          animation: movePacket4 3.5s linear infinite;
          background-color: #fcd34d;
        }
        
        .packet-5 {
          animation: movePacket5 4.5s linear infinite;
          background-color: #22d3ee;
        }
        
        @keyframes movePacket1 {
          0% { top: 20%; left: 10%; }
          50% { top: 50%; left: 50%; }
          100% { top: 20%; left: 10%; }
        }
        
        @keyframes movePacket2 {
          0% { top: 70%; left: 20%; }
          50% { top: 50%; left: 50%; }
          100% { top: 70%; left: 20%; }
        }
        
        @keyframes movePacket3 {
          0% { top: 30%; left: 80%; }
          50% { top: 50%; left: 50%; }
          100% { top: 30%; left: 80%; }
        }
        
        @keyframes movePacket4 {
          0% { top: 80%; left: 85%; }
          50% { top: 50%; left: 50%; }
          100% { top: 80%; left: 85%; }
        }
        
        @keyframes movePacket5 {
          0% { top: 10%; left: 40%; }
          50% { top: 50%; left: 50%; }
          100% { top: 10%; left: 40%; }
        }
        
        .binary-bit {
          position: absolute;
          color: #4ade80;
          font-family: monospace;
          font-size: 12px;
          animation: floatUp 8s linear infinite;
          user-select: none;
        }
        
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        
        .cyber-grid {
          background-image: 
            linear-gradient(0deg, transparent 24%, rgba(74, 222, 128, .3) 25%, rgba(74, 222, 128, .3) 26%, transparent 27%, transparent 74%, rgba(74, 222, 128, .3) 75%, rgba(74, 222, 128, .3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(74, 222, 128, .3) 25%, rgba(74, 222, 128, .3) 26%, transparent 27%, transparent 74%, rgba(74, 222, 128, .3) 75%, rgba(74, 222, 128, .3) 76%, transparent 77%, transparent);
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default Contact;