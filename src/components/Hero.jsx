import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight, Sparkles, Code, Download, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [commandIndex, setCommandIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [particlesActive, setParticlesActive] = useState(true);
  const terminalRef = useRef(null);
  const [matrixActive, setMatrixActive] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  
  // The commands to type in sequence
  const commands = [
    { text: "cd portfolio", delay: 1000 },
    { text: "echo $SIGNATURE", delay: 500 },
    { text: "cat introduction.txt", delay: 800 },
  ];

  // Rotating text options for intro - updated based on resume
  const introTexts = [
    "< Full Stack Developer />",
    "{ Problem Solver }",
    "[ Creative Coder ]",
    "// Digital Craftsman",
    "/* Tech Enthusiast */"
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/flywithpunitt",
      color: "hover:text-[#2ea44f]"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/flywithpunit/",
      color: "hover:text-[#0a66c2]"
    }
  ];

  // Particle animation with connecting lines
  useEffect(() => {
    if (!particlesActive || !particlesRef.current) return;

    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 150;
    let mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.baseColor = Math.random() > 0.5 ? '#00ff9d' : '#00d8ff';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseRadius) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 2;
            this.y -= Math.sin(angle) * 2;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.baseColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(0, 255, 200, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [particlesActive]);

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

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      {/* Particle effect canvas */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Matrix effect canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: matrixActive ? 0.1 : 0 }}
      />

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 max-w-2xl text-center lg:text-left space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-gray-700"
              >
                <span className="text-sm md:text-base text-gray-300">Welcome to my portfolio</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl xl:text-7xl font-bold"
              >
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Punit Kumar
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-200 h-[40px] flex items-center justify-center lg:justify-start"
              >
                <span>{text}</span>
                <span className={`inline-block w-[3px] h-[30px] bg-blue-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0"
              >
                Passionate about building scalable and efficient web applications. Specializing in modern JavaScript frameworks with a strong foundation in both frontend and backend development.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                className="px-8 py-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-full font-medium flex items-center gap-2 hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-gray-500/25 border border-gray-700"
              >
                <Download className="w-5 h-5" />
                Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 hover:text-white transition-all transform hover:scale-110 ${link.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2 max-w-2xl"
          >
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-800/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-gray-400 font-mono">punit@dev ~ $</span>
                </div>
              </div>
              <div
                ref={terminalRef}
                className="p-6 font-mono text-sm md:text-base text-gray-300 space-y-4 h-[300px] md:h-[350px] overflow-y-auto custom-scrollbar"
              >
                {commands.map((cmd, index) => (
                  <div key={index} className={`transition-all duration-300 ${index <= commandIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center gap-2 text-green-400">
                      <ChevronRight className="w-4 h-4" />
                      <span>{cmd.text}</span>
                    </div>
                    {index === 2 && showPrompt && (
                      <div className="mt-4 text-blue-400 leading-relaxed">
                        Hi! I'm Punit Kumar, a Full Stack Developer passionate about crafting innovative digital solutions. Let's build something amazing together!
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-400 text-sm">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-2 h-2 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.7);
        }
      `}</style>
    </section>
  );
};

export default Hero;