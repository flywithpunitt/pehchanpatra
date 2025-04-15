'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/flywithpunitt",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/flywithpunit/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  const personalInfo = {
    technical: {
      languages: "React.JS, JavaScript, Java, Python, TypeScript",
      database: "MongoDB, postgreSQL (proficient)",
      frameworks: "Express.js, Node.js, Next.js",
      tools: "Git, AWS, Docker, Redux, JWT, Material-UI/Bootstrap",
      other: "REST APIs, GraphQL, System Design Skills, Always Learning New Stack, Data Structures and Algorithm"
    },
    story: {
      title: "My Journey",
      content: "Hi! I'm Punit Kumar, a Full Stack Developer passionate about building scalable and efficient web applications. I specialize in modern JavaScript frameworks and have a strong foundation in both frontend and backend development. My journey in tech began with a curiosity about how websites work, which led me to dive deep into web development. I've worked on various projects including AI chatbots, enterprise applications, and innovative web solutions. Through hands-on experience and continuous learning, I've developed expertise in creating user-centric applications that combine beautiful interfaces with robust functionality. I'm particularly proud of my contributions to projects like Full-Stack-AI-Chatbot, HIRIX, and Visor.ai, where I've implemented complex features and optimized performance.",
      highlights: [
        "Expertise in React.js and modern JavaScript",
        "Strong backend skills with Node.js and Express",
        "Experience with MongoDB and SQL databases",
        "Focus on scalable and maintainable solutions",
        "Active open-source contributor on GitHub",
        "Developed multiple full-stack applications",
        "Strong problem-solving abilities",
        "Experience with AI and chatbot development"
      ]
    },
    education: [
      {
        degree: "Bachelor of Commerce",
        institution: "School of Open Learning Bachelor of Commerce",
        year: "2021 - 2024",
        description: "Currently pursuing with focus on business and technology integration"
      }
    ],
    experience: [
      {
        role: "Full Stack Developer",
        company: "Hype Media Agency",
        period: "July 2023 - Present",
        achievements: [
          "Developed comprehensive e-commerce booking platform with React.js, Next.js, and Node.js",
          "Backend Performance & Security: Securing optimized backend services using Node.js, Express.js, or FastAPI while ensuring secure authentication with JWT, OAuth, or session-based auth",
          "Database optimization and management using MongoDB and SQL",
          "Implemented comprehensive testing strategies"
        ]
      },
      {
        role: "Frontend Developer",
        company: "Infogentech",
        period: "Jan 23 - July 23",
        achievements: [
          "Efficient Navigation and Trading Skills: Led UI/UX with strong libraries like material-ui aimed to create code scalability",
          "Understanding Scalability and Implementation: Better testing skills, efficient, and scalable code",
          "Developed and maintained React components with modern practices",
          "Implemented responsive designs and optimized performance"
        ]
      },
      {
        role: "Web Developer",
        company: "Him Village E-Prahari",
        period: "Nov 22 - Dec 22",
        achievements: [
          "Designed and deployed full-stack solutions using React.js, TailwindCSS, and related technologies",
          "Played a key role in building robust APIs and interactive user interfaces for client projects"
        ]
      }
    ],
    projects: [
      {
        name: "BITS Banking System",
        description: "Secure TypeScript Stack MongoDB Stripe Shadcn UI",
        details: "Designed and implemented a comprehensive banking application with modern transaction capabilities and multi-account support, leveraging React and Node APIs"
      },
      {
        name: "Secured Authentication Integration",
        description: "Implemented secure user authentication with Firebase and enhanced application security by integrating OAuth for comprehensive user tracking and session validation"
      },
      {
        name: "Automated Notifications & Alerts",
        description: "Integrated real-time email and SMS notifications using Nodemailer and Twilio, ensuring users receive timely updates on transactions and account activities"
      }
    ]
  };

  const interests = [
    {
      name: "System Design",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      name: "Full Stack Development",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: "Database Design",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      name: "API Development",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Full Stack Developer specializing in modern web technologies
          </p>
        </motion.div>

        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(personalInfo.technical).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <h4 className="text-blue-400 font-medium capitalize">{key}</h4>
                <p className="text-gray-300">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="relative group max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-black rounded-2xl aspect-[4/5] overflow-hidden">
                <img
                  src="/my-photo.jpg"
                  alt="Punit Kumar"
                  className="w-full h-full object-cover object-center rounded-2xl transform transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-lg prose-invert">
              <h3 className="text-3xl font-bold text-white mb-6">
                {personalInfo.story.title}
              </h3>
              <p className="text-gray-300 mb-6">
                {personalInfo.story.content}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalInfo.story.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="flex justify-center space-x-4 mb-12">
            {['story', 'education', 'experience'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {activeTab === 'education' && personalInfo.education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
              >
                <h4 className="text-xl font-semibold text-white mb-2">{item.degree}</h4>
                <p className="text-blue-400 mb-2">{item.institution}</p>
                <p className="text-gray-400 mb-3">{item.year}</p>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}

            {activeTab === 'experience' && personalInfo.experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
              >
                <h4 className="text-xl font-semibold text-white mb-2">{item.role}</h4>
                <p className="text-blue-400 mb-2">{item.company}</p>
                <p className="text-gray-400 mb-4">{item.period}</p>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Interests & Hobbies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  {interest.icon}
                </div>
                <h4 className="text-white font-medium">{interest.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #1f2937 1px, transparent 1px),
            linear-gradient(to bottom, #1f2937 1px, transparent 1px);
          background-size: 24px 24px;
        }
        
        @keyframes gradient-shift {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-1%, -1%) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 10s ease-in-out infinite;
        }

        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>

      <div className="mt-12 flex justify-center space-x-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
          >
            <span className="sr-only">{link.name}</span>
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default About;