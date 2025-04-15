'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "Savor Street",
    description: "A modern food delivery platform with real-time tracking and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "#",
    category: "full stack",
    featured: true
  },
  {
    id: 2,
    title: "RickshawGo",
    description: "An innovative ride-hailing service specifically designed for auto-rickshaws in India.",
    image: "https://images.unsplash.com/photo-1532939163844-547f958e91b4?w=800&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Google Maps API"],
    liveUrl: "#",
    category: "full stack"
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    description: "A modern, responsive landing page template for SaaS products.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    category: "frontend"
  },
  {
    id: 4,
    title: "Job Hunt",
    description: "A job search platform with AI-powered job matching and resume analysis.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop",
    tags: ["Next.js", "AI/ML", "PostgreSQL"],
    liveUrl: "#",
    category: "ai/ml",
    featured: true
  },
  {
    id: 5,
    title: "Flickart",
    description: "An e-commerce platform with AR product visualization.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop",
    tags: ["React", "Three.js", "Node.js"],
    liveUrl: "#",
    category: "full stack"
  },
  {
    id: 6,
    title: "Imaginify",
    description: "AI-powered image generation and manipulation tool.",
    image: "https://images.unsplash.com/photo-1525373698358-041e3a460346?w=800&auto=format&fit=crop",
    tags: ["Next.js", "OpenAI", "Cloud Storage"],
    liveUrl: "#",
    category: "ai/ml"
  },
  {
    id: 7,
    title: "Car Marketplace",
    description: "A modern platform for buying and selling cars with virtual tours.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    category: "full stack"
  },
  {
    id: 8,
    title: "AwwardsIn",
    description: "A platform showcasing creative web designs and development.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind CSS"],
    liveUrl: "#",
    category: "frontend"
  },
  {
    id: 9,
    title: "PunitDev",
    description: "Personal developer portfolio with interactive 3D elements.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&auto=format&fit=crop",
    tags: ["React", "Three.js", "GSAP"],
    liveUrl: "#",
    category: "frontend"
  },
  {
    id: 10,
    title: "Astro Forge",
    description: "A space exploration game with realistic physics.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop",
    tags: ["Unity", "C#", "WebGL"],
    liveUrl: "#",
    category: "frontend"
  },
  {
    id: 11,
    title: "SchoolSync",
    description: "Comprehensive school management system with AI-powered analytics.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop",
    tags: ["React", "Node.js", "AI/ML"],
    liveUrl: "#",
    category: "full stack",
    featured: true
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "frontend", "full stack", "ai/ml"];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Explore my latest work and side projects
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group bg-gray-800 rounded-xl overflow-hidden"
            >
              {project.featured && (
                <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Project
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;