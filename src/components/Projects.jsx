import React, { useState } from 'react';
import { Github, ExternalLink, Code, Terminal, AlertCircle } from 'lucide-react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    {
      id: 'upi-banking-system',
      title: 'UPI Banking System',
      description: 'A comprehensive banking application with modern transaction capabilities and multi-account support, leveraging Plaid and Docile APIs for enhanced security through multi-factor authentication.',
      technologies: ['React.js', 'TypeScript', 'Clark', 'MongoDB'],
      image: '/src/assets/project1.png',
      codeSnippet: `// Transaction processing middleware
const processTransaction = async (req, res, next) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;
    
    // Verify sufficient funds
    const account = await Account.findById(fromAccount);
    if (account.balance < amount) {
      return res.status(400).json({ 
        error: 'Insufficient funds' 
      });
    }
    
    // Process transaction with atomic operations
    const transaction = await Transaction.create({
      fromAccount,
      toAccount,
      amount,
      status: 'pending'
    });
    
    // Update both accounts atomically
    await Account.bulkWrite([
      { 
        updateOne: {
          filter: { _id: fromAccount },
          update: { $inc: { balance: -amount } }
        }
      },
      { 
        updateOne: {
          filter: { _id: toAccount },
          update: { $inc: { balance: amount } }
        }
      }
    ]);
    
    // Mark transaction as completed
    transaction.status = 'completed';
    await transaction.save();
    
    next();
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Transaction failed' });
  }
};`,
      links: {
        github: 'https://github.com/punitkr/upi-banking',
        live: 'https://upi-banking.vercel.app'
      }
    },
    {
      id: 'imaginify-ai',
      title: 'Imaginify AI Image Editor',
      description: 'Developed an online image editor using Cloudinary AI with features like background removal, object removal, generative fill, and recoloring capabilities with an intuitive interface.',
      technologies: ['React.js', 'Clark', 'MongoDB', 'Stripe', 'Cloudinary AI'],
      image: '/src/assets/project1.png',
      codeSnippet: `// Image transformation component
import { useState } from 'react';
import { CloudinaryUploader } from '../components';

export default function TransformImage({ image, transformations }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  async function handleTransform() {
    try {
      setIsProcessing(true);
      
      // Create transformation parameters
      const params = {
        publicId: image.publicId,
        transformations: [
          ...(transformations.removeBackground ? [{ name: 'bgRemoval' }] : []),
          ...(transformations.recolor ? [{ 
            name: 'recolor', 
            color: transformations.targetColor 
          }] : []),
          ...(transformations.generativeFill ? [{ 
            name: 'generativeFill',
            prompt: transformations.prompt
          }] : [])
        ]
      };
      
      // Process image with Cloudinary
      const response = await fetch('/api/transformations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      const data = await response.json();
      setResult(data.url);
    } catch (error) {
      console.error('Transformation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }
  
  return (
    <div className="transform-container">
      {/* Component JSX */}
    </div>
  );
}`,
      links: {
        github: 'https://github.com/punitkr/imaginify',
        live: 'https://imaginify-ai.vercel.app'
      }
    },
    {
      id: 'mern-job-portal',
      title: 'MERN Stack Interactive Dashboard',
      description: 'Developed a full-featured job portal using the MERN stack, featuring enhanced user engagement and responsiveness. Implemented secure authentication with JWT with secured backend with validators.',
      technologies: ['React.js', 'MongoDB', 'Express.js', 'Node.js', 'JWT'],
      image: '/src/assets/project1.png',
      codeSnippet: `// Authentication middleware with JWT
const authenticateUser = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};`,
      links: {
        github: 'https://github.com/punitkr/job-portal',
        live: 'https://job-dashboard.vercel.app'
      }
    },
    {
      id: 'real-time-chat',
      title: 'Real-time Chat Application',
      description: 'A full-stack real-time chat application with features like private messaging, group chats, read receipts, and media sharing. Built with Socket.IO for real-time communication and React for the frontend.',
      technologies: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB', 'Express.js'],
      image: '/src/assets/project1.png',
      codeSnippet: `// Setting up Socket.IO for real-time chat
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { Message, User, Conversation } from './models';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

// Track online users
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // User authentication
  socket.on('authenticate', async ({ userId }) => {
    try {
      // Update user status to online
      await User.findByIdAndUpdate(userId, { 
        status: 'online',
        lastActive: new Date()
      });
      
      // Store user in online map
      onlineUsers.set(userId, socket.id);
      
      // Notify friends that user is online
      const user = await User.findById(userId).populate('friends');
      user.friends.forEach(friend => {
        const friendSocketId = onlineUsers.get(friend._id.toString());
        if (friendSocketId) {
          io.to(friendSocketId).emit('friend_online', { userId });
        }
      });
    } catch (error) {
      console.error('Authentication error:', error);
    }
  });
  
  // Handle private messages
  socket.on('send_message', async (messageData) => {
    try {
      const { sender, recipient, content, type } = messageData;
      
      // Save message to database
      const newMessage = await Message.create({
        conversation: messageData.conversationId,
        sender,
        content,
        type: type || 'text',
        timestamp: new Date()
      });
      
      // Update conversation with latest message
      await Conversation.findByIdAndUpdate(
        messageData.conversationId,
        { 
          lastMessage: newMessage._id,
          updatedAt: new Date()
        }
      );
      
      // Send to recipient if online
      const recipientSocketId = onlineUsers.get(recipient);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive_message', newMessage);
      }
      
      // Confirm delivery to sender
      socket.emit('message_sent', { 
        messageId: newMessage._id,
        status: 'sent' 
      });
    } catch (error) {
      console.error('Message error:', error);
      socket.emit('message_error', { error: 'Failed to send message' });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', async () => {
    // Find user by socket ID and update status
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        await User.findByIdAndUpdate(userId, { 
          status: 'offline',
          lastActive: new Date()
        });
        
        // Remove from online users
        onlineUsers.delete(userId);
        
        // Notify friends that user is offline
        const user = await User.findById(userId).populate('friends');
        user.friends.forEach(friend => {
          const friendSocketId = onlineUsers.get(friend._id.toString());
          if (friendSocketId) {
            io.to(friendSocketId).emit('friend_offline', { userId });
          }
        });
        
        break;
      }
    }
    
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});`,
      links: {
        github: 'https://github.com/punitkr/realtime-chat',
        live: 'https://realtime-chat.vercel.app'
      }
    }
  ];

  return (
    <section id="projects" className="py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono mb-12">
          <div className="flex items-center text-gray-500">
            <div className="mr-2 text-terminal-green">#</div>
            <div className="mr-2 text-terminal-green">03.</div>
            <h2 className="text-xl text-terminal-white font-semibold">Projects</h2>
            <div className="ml-4 h-px bg-gray-700 flex-grow"></div>
          </div>
          <p className="text-gray-400 mt-4 ml-10">
            Some things I've built
          </p>
        </div>
        
        {/* Project navigation */}
        <div className="terminal-container mb-8">
          <div className="terminal-header">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
            </div>
            <div className="text-terminal-brightBlack font-mono text-sm">
              projects.sh
            </div>
          </div>
          <div className="bg-gray-800 p-2">
            <div className="flex space-x-2 overflow-x-auto">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(index)}
                  className={`px-4 py-2 font-mono text-sm rounded-t-md whitespace-nowrap ${
                    activeProject === index 
                      ? 'bg-gray-900 text-terminal-green border-t border-l border-r border-terminal-green/30' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors'
                  }`}
                >
                  {project.title.split(' ').join('-').toLowerCase()}.js
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Active project display */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Project details - takes 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="terminal-container h-full">
              <div className="terminal-header">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="text-terminal-brightBlack font-mono text-sm flex-1 truncate">
                  {projects[activeProject].id}.js
                </div>
                <div className="flex space-x-3">
                  <a 
                    href={projects[activeProject].links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-terminal-white transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href={projects[activeProject].links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-terminal-white transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div className="p-4 bg-gray-900 font-mono text-sm overflow-auto" style={{ maxHeight: '500px' }}>
                <h3 className="text-terminal-green text-lg mb-2">
                  {projects[activeProject].title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {projects[activeProject].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[activeProject].technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-terminal-brightBlue rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center px-3 rounded-t-md">
                    <Code size={14} className="text-terminal-brightBlack mr-2" />
                    <span className="text-terminal-brightBlack text-xs">code snippet</span>
                  </div>
                  <pre className="mt-6 p-4 bg-gray-800 rounded-md overflow-x-auto">
                    <code className="text-gray-300">
                      {projects[activeProject].codeSnippet}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project image and terminal - takes 2 columns on large screens */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="terminal-container">
              <div className="terminal-header">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="text-terminal-brightBlack font-mono text-sm">
                  preview.png
                </div>
              </div>
              <div className="bg-gray-800">
                <img 
                  src={projects[activeProject].image} 
                  alt={projects[activeProject].title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Interactive terminal */}
            <div className="terminal-container flex-grow">
              <div className="terminal-header">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="text-terminal-brightBlack font-mono text-sm flex items-center">
                  <Terminal size={14} className="mr-2" />
                  terminal
                </div>
              </div>
              <div className="bg-black p-4 font-mono text-sm h-60 overflow-auto">
                <div className="text-terminal-green mb-1">$ project info {projects[activeProject].id}</div>
                <div className="text-terminal-white mb-3">Fetching project details...</div>
                
                <div className="text-terminal-brightYellow mb-1">PROJECT STATUS:</div>
                <div className="text-terminal-white mb-1">- Name: {projects[activeProject].title}</div>
                <div className="text-terminal-white mb-1">- Status: <span className="text-terminal-green">Active</span></div>
                <div className="text-terminal-white mb-1">- Version: 1.0.0</div>
                <div className="text-terminal-white mb-3">- Last Updated: {new Date().toLocaleDateString()}</div>
                
                <div className="text-terminal-brightYellow mb-1">INSTALLATION:</div>
                <div className="text-terminal-white mb-1">$ git clone {projects[activeProject].links.github}</div>
                <div className="text-terminal-white mb-1">$ cd {projects[activeProject].id}</div>
                <div className="text-terminal-white mb-1">$ npm install</div>
                <div className="text-terminal-white mb-3">$ npm run dev</div>
                
                <div className="text-terminal-brightYellow mb-1">NOTE:</div>
                <div className="flex items-start">
                  <AlertCircle size={14} className="text-terminal-brightRed mt-1 mr-2 flex-shrink-0" />
                  <span className="text-terminal-brightWhite">This is a portfolio project. For more details, please visit the GitHub repository.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;