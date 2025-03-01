import React, { useState, useEffect } from 'react';
import { Code, Terminal, Cpu, Database, Zap, RefreshCw, Layers, RotateCcw } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  const fullText = `I'm a passionate Full Stack Developer with experience at HypeMediaAgency, Infogentech, and Him Village ePrahari. Currently specializing in building scalable frontend applications using React.js, Next.js, and optimized backend services with Node.js, Express.js. I'm skilled in database optimization and secure authentication systems.`;
  
  useEffect(() => {
    if (activeTab === 'profile') {
      setIsTyping(true);
      setTypedText('');
      setTypingComplete(false);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(prevText => prevText + fullText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTypingComplete(true);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [activeTab]);
  
  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section id="about" className={`py-20 px-8 relative ${glitchEffect ? 'glitch' : ''}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-terminal-green/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-terminal-blue/5 blur-3xl rounded-full"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="font-mono mb-12">
          <div className="flex items-center text-gray-500">
            <div className="mr-2 text-terminal-green">#</div>
            <div className="mr-2 text-terminal-green">01.</div>
            <h2 className="text-xl text-terminal-white font-semibold">About Me</h2>
            <div className="ml-4 h-px bg-gray-700 flex-grow"></div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="terminal-container mb-8">
          <div className="terminal-header">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
            </div>
            <div className="text-terminal-brightBlack font-mono text-sm">
              about.js - punit-dev-profile
            </div>
          </div>
          <div className="bg-gray-800 p-2 flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 font-mono text-sm rounded-t-md whitespace-nowrap ${
                activeTab === 'profile' 
                  ? 'bg-gray-900 text-terminal-green border-t border-l border-r border-terminal-green/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors'
              }`}
            >
              profile.js
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 font-mono text-sm rounded-t-md whitespace-nowrap ${
                activeTab === 'experience' 
                  ? 'bg-gray-900 text-terminal-blue border-t border-l border-r border-terminal-blue/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors'
              }`}
            >
              experience.js
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 font-mono text-sm rounded-t-md whitespace-nowrap ${
                activeTab === 'education' 
                  ? 'bg-gray-900 text-terminal-purple border-t border-l border-r border-terminal-purple/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors'
              }`}
            >
              education.js
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 font-mono text-sm rounded-t-md whitespace-nowrap ${
                activeTab === 'skills' 
                  ? 'bg-gray-900 text-terminal-yellow border-t border-l border-r border-terminal-yellow/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors'
              }`}
            >
              skills.js
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="terminal-container bg-gray-900 p-5 font-mono text-sm min-h-[30rem]">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="text-terminal-green text-xl mr-3">&gt;</div>
                <h3 className="text-xl text-terminal-white font-semibold">Punit Kumar | Full Stack Developer</h3>
              </div>
              
              <div className="code-block mb-6 bg-gray-800/50 p-4 rounded-md">
                <div className="typing-container relative">
                  <p className="text-gray-300 leading-relaxed">
                    {typedText}
                    {isTyping && <span className="typing-cursor">|</span>}
                  </p>
                  {typingComplete && (
                    <div className="mt-4 text-terminal-brightBlack">
                      // Contact Information
                    </div>
                  )}
                </div>
              </div>
              
              {typingComplete && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  <div className="bg-gray-800/30 p-4 rounded-md border border-gray-700 hover:border-terminal-green/50 transition-colors">
                    <div className="flex items-center mb-3">
                      <Terminal className="text-terminal-green mr-2" size={18} />
                      <h4 className="text-terminal-green font-medium">Personal Info</h4>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex">
                        <span className="text-terminal-brightBlack w-24">Name:</span>
                        <span>Punit Kumar</span>
                      </li>
                      <li className="flex">
                        <span className="text-terminal-brightBlack w-24">Phone:</span>
                        <span>9891545852</span>
                      </li>
                      <li className="flex overflow-hidden">
                        <span className="text-terminal-brightBlack w-24">Email:</span>
                        <span className="truncate">punitkumar9168@gmail.com</span>
                      </li>
                      <li className="flex">
                        <span className="text-terminal-brightBlack w-24">Location:</span>
                        <span>India</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/30 p-4 rounded-md border border-gray-700 hover:border-terminal-blue/50 transition-colors">
                    <div className="flex items-center mb-3">
                      <Zap className="text-terminal-blue mr-2" size={18} />
                      <h4 className="text-terminal-blue font-medium">Extra Skills</h4>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-terminal-blue mr-2 text-xs">⚡</span>
                        <span>Video Editor</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-terminal-blue mr-2 text-xs">⚡</span>
                        <span>Problem Solving Skills</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-terminal-blue mr-2 text-xs">⚡</span>
                        <span>Data Structures and Algorithm</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-terminal-blue mr-2 text-xs">⚡</span>
                        <span>Always Learning New things</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {typingComplete && (
                <div className="mt-8 bg-black/30 p-4 rounded-md border border-gray-800 animate-fade-in">
                  <div className="flex items-center mb-3">
                    <Code className="text-terminal-green mr-2" size={18} />
                    <h4 className="text-terminal-white font-medium">const status = {`{`}</h4>
                  </div>
                  <div className="ml-6">
                    <p className="text-gray-300 mb-1">
                      <span className="text-terminal-brightBlue">currentlyWorking:</span> <span className="text-terminal-yellow">true</span>,
                    </p>
                    <p className="text-gray-300 mb-1">
                      <span className="text-terminal-brightBlue">openToOpportunities:</span> <span className="text-terminal-yellow">true</span>,
                    </p>
                    <p className="text-gray-300 mb-1">
                      <span className="text-terminal-brightBlue">lookingForProjects:</span> <span className="text-terminal-yellow">true</span>,
                    </p>
                    <p className="text-gray-300">
                      <span className="text-terminal-brightBlue">currentFocus:</span> <span className="text-terminal-green">"Building scalable applications with modern tech"</span>
                    </p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-terminal-white font-medium">{`}`};</h4>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="text-terminal-blue text-xl mr-3">&gt;</div>
                <h3 className="text-xl text-terminal-white font-semibold">Work Experience</h3>
              </div>
              
              <div className="terminal-window-content space-y-6">
                {/* HypeMediaAgency */}
                <div className="experience-item">
                  <div className="mb-3 pb-2 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-green rounded-full mr-3"></div>
                      <h4 className="text-terminal-green font-medium">HypeMediaAgency</h4>
                    </div>
                    <span className="text-gray-500 text-xs">Feb 2025 – Present</span>
                  </div>
                  <h5 className="text-terminal-white mb-2">Full Stack Developer</h5>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-terminal-blue mr-2 mt-1">▹</span>
                      <div>
                        <span className="font-medium text-terminal-white">Component-Based Architecture & State Management:</span>
                        <p className="text-sm text-gray-400">Master building scalable frontend applications using React.js, Next.js, or Vue.js with efficient state management solutions like Redux, Zustand, or React Context API. Learn to optimize component re-renders and handle complex UI interactions seamlessly.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-terminal-blue mr-2 mt-1">▹</span>
                      <div>
                        <span className="font-medium text-terminal-white">Backend Performance & Security:</span>
                        <p className="text-sm text-gray-400">Develop optimized backend services using Node.js, Express.js, or FastAPI while ensuring secure authentication with JWT, OAuth, or session-based auth. Implement database optimization techniques like indexing, caching (Redis), and query optimization (MongoDB, PostgreSQL) to handle high-traffic applications efficiently.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Infogentech */}
                <div className="experience-item">
                  <div className="mb-3 pb-2 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-purple rounded-full mr-3"></div>
                      <h4 className="text-terminal-purple font-medium">Infogentech</h4>
                    </div>
                    <span className="text-gray-500 text-xs">Dec 2024 – Feb 2025</span>
                  </div>
                  <h5 className="text-terminal-white mb-2">Python Developer</h5>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-terminal-purple mr-2 mt-1">▹</span>
                      <div>
                        <span className="font-medium text-terminal-white">Efficient Debugging and Testing Skills:</span>
                        <p className="text-sm text-gray-400">Learn to write unit tests using libraries like unittest or pytest to ensure code reliability. Debugging tools like pdb or IDE-integrated debuggers are essential for resolving issues effectively.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-terminal-purple mr-2 mt-1">▹</span>
                      <div>
                        <span className="font-medium text-terminal-white">Understanding Scalability and Optimization:</span>
                        <p className="text-sm text-gray-400">Master writing clean, efficient, and scalable code. Learn about advanced data structures, algorithms, and libraries like numpy or pandas for handling large datasets and optimizing performance in Python applications.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Him Village */}
                <div className="experience-item">
                  <div className="mb-3 pb-2 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-yellow rounded-full mr-3"></div>
                      <h4 className="text-terminal-yellow font-medium">Him Village ePrahari</h4>
                    </div>
                    <span className="text-gray-500 text-xs">Nov 2024 – Dec 2024</span>
                  </div>
                  <h5 className="text-terminal-white mb-2">Developer Intern (Remote)</h5>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-terminal-yellow mr-2 mt-1">▹</span>
                      <div>
                        <p className="text-sm">Designed and deployed full-stack solutions using React.js, Tailwind CSS, and +8 related technologies.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-terminal-yellow mr-2 mt-1">▹</span>
                      <div>
                        <p className="text-sm">Played a key role in building robust APIs and interactive user interfaces for client projects.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="text-terminal-purple text-xl mr-3">&gt;</div>
                <h3 className="text-xl text-terminal-white font-semibold">Education</h3>
              </div>
              
              <div className="terminal-window-content space-y-8">
                <div className="bg-gray-800/30 p-5 rounded-md border border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-terminal-purple font-medium text-lg">Delhi University</h4>
                    <div className="px-2 py-1 bg-terminal-purple/10 border border-terminal-purple/20 rounded text-terminal-purple text-xs">
                      2023 – 2026
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">School of Open Learning</p>
                  <p className="text-terminal-white font-medium">Bachelor of Commerce</p>
                  <div className="mt-4 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-terminal-purple mr-2"></div>
                    <span className="text-gray-400 text-sm">Currently pursuing</span>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-md border border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-terminal-yellow font-medium text-lg">G.M.N.R.T Int COLLEGE</h4>
                    <div className="px-2 py-1 bg-terminal-yellow/10 border border-terminal-yellow/20 rounded text-terminal-yellow text-xs">
                      2020 – 2022
                    </div>
                  </div>
                  <p className="text-terminal-white font-medium">12th Science Stream</p>
                  <div className="mt-4 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-terminal-yellow mr-2"></div>
                    <span className="text-gray-400 text-sm">Completed</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-block px-4 py-2 bg-gray-800/50 rounded-md text-gray-500 text-sm border border-gray-700">
                    <span className="typing-effect">// Education is the foundation of growth</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="text-terminal-yellow text-xl mr-3">&gt;</div>
                <h3 className="text-xl text-terminal-white font-semibold">Technical Skills</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Languages */}
                <div className="skill-card">
                  <div className="flex items-center mb-3">
                    <Code className="text-terminal-green mr-2" size={18} />
                    <h4 className="text-terminal-green font-medium">Languages</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'TypeScript'].map((skill, index) => (
                      <span key={index} className="skill-pill bg-terminal-green/10 text-terminal-green">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Frameworks */}
                <div className="skill-card">
                  <div className="flex items-center mb-3">
                    <Layers className="text-terminal-blue mr-2" size={18} />
                    <h4 className="text-terminal-blue font-medium">Frameworks</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Node.js', 'Next.js', 'Express.js'].map((skill, index) => (
                      <span key={index} className="skill-pill bg-terminal-blue/10 text-terminal-blue">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Databases */}
                <div className="skill-card">
                  <div className="flex items-center mb-3">
                    <Database className="text-terminal-purple mr-2" size={18} />
                    <h4 className="text-terminal-purple font-medium">Databases</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['MongoDB', 'PostgreSQL', 'Supabase', 'SQL'].map((skill, index) => (
                      <span key={index} className="skill-pill bg-terminal-purple/10 text-terminal-purple">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Libraries */}
                <div className="skill-card">
                  <div className="flex items-center mb-3">
                    <Cpu className="text-terminal-yellow mr-2" size={18} />
                    <h4 className="text-terminal-yellow font-medium">Libraries</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Clerk', 'Tailwind CSS', 'Socket.IO', 'Shadcn UI', 'Material-UI', 'Bootstrap'].map((skill, index) => (
                      <span key={index} className="skill-pill bg-terminal-yellow/10 text-terminal-yellow">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Tools */}
                <div className="skill-card">
                  <div className="flex items-center mb-3">
                    <RotateCcw className="text-terminal-red mr-2" size={18} />
                    <h4 className="text-terminal-red font-medium">Tools</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'Vercel', 'Render', 'VS Code'].map((skill, index) => (
                      <span key={index} className="skill-pill bg-terminal-red/10 text-terminal-red">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Development Approach */}
                <div className="skill-card col-span-1 md:col-span-2 mt-4">
                  <div className="flex items-center mb-3">
                    <RefreshCw className="text-terminal-brightBlue mr-2" size={18} />
                    <h4 className="text-terminal-brightBlue font-medium">Development Approach</h4>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700 text-gray-400 text-sm">
                    <p><span className="text-terminal-brightBlue">1.</span> Understand the requirements thoroughly</p>
                    <p><span className="text-terminal-brightBlue">2.</span> Break down complex problems into manageable parts</p>
                    <p><span className="text-terminal-brightBlue">3.</span> Research and identify the best tools for the job</p>
                    <p><span className="text-terminal-brightBlue">4.</span> Write clean, maintainable code with good documentation</p>
                    <p><span className="text-terminal-brightBlue">5.</span> Test thoroughly to ensure reliability</p>
                    <p><span className="text-terminal-brightBlue">6.</span> Optimize for performance and user experience</p>
                    <p><span className="text-terminal-brightBlue">7.</span> Deploy with proper monitoring and error handling</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .skill-card {
          @apply bg-gray-800/30 p-4 rounded-md border border-gray-700 hover:border-opacity-50 transition-all;
        }
        
        .skill-pill {
          @apply px-2 py-1 rounded-md text-xs font-medium;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .typing-cursor {
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          position: relative;
          animation: typing 3s steps(30, end);
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        .glitch {
          animation: glitch 0.3s linear;
        }
        
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
      `}</style>
    </section>
  );
};

export default About;