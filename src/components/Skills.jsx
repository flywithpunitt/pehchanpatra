import React from 'react';

const Skills = () => {
  const skills = [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'],
      icon: '{ }'
    },
    {
      category: 'Frontend',
      items: ['React', 'TailwindCSS', 'JavaScript', 'TypeScript'],
      icon: '</>'
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'Python', 'Socket.IO'],
      icon: '()'
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'SQL'],
      icon: '[]'
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'Postman', 'VSCode'],
      icon: '//'
    },
    {
      category: 'Other',
      items: ['JWT', 'OAuth', 'REST APIs', 'Authentication'],
      icon: '&&'
    }
  ];

  return (
    <section id="skills" className="py-20 px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono mb-12">
          <div className="flex items-center text-gray-500">
            <div className="mr-2 text-terminal-green">#</div>
            <div className="mr-2 text-terminal-green">02.</div>
            <h2 className="text-xl text-terminal-white font-semibold">Skills & Tools</h2>
            <div className="ml-4 h-px bg-gray-700 flex-grow"></div>
          </div>
          <p className="text-gray-400 mt-4 ml-10">
            A collection of technologies I work with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup, index) => (
            <div key={index} className="bg-gray-800 rounded-md overflow-hidden border border-gray-700 terminal-container">
              {/* Terminal header */}
              <div className="terminal-header justify-between">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                  </div>
                  <div className="text-terminal-brightBlue font-mono text-sm">
                    {skillGroup.category.toLowerCase()}.js
                  </div>
                </div>
                <div className="text-gray-500 text-sm font-mono mr-2">{skillGroup.icon}</div>
              </div>

              {/* Terminal content */}
              <div className="p-5">
                <h3 className="text-terminal-green font-mono text-lg mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-900 text-terminal-white rounded-md text-sm font-mono border border-gray-700 hover:border-terminal-green transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code animation */}
        <div className="mt-16 font-mono text-sm text-gray-500">
          <div className="terminal-container">
            <div className="terminal-header">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
              </div>
              <div className="text-terminal-brightBlack font-mono text-sm">
                development-approach.js
              </div>
            </div>
            <div className="terminal-content">
              <p className="mb-2"><span className="text-terminal-green">// My development approach</span></p>
              <p className="mb-2"><span className="text-terminal-purple">function</span> <span className="text-terminal-blue">solveProblems</span>() {`{`}</p>
              <p className="ml-4 mb-1"><span className="text-terminal-brightBlack">// 1. Understand the requirements thoroughly</span></p>
              <p className="ml-4 mb-1"><span className="text-terminal-brightBlack">// 2. Break down complex problems into manageable parts</span></p>
              <p className="ml-4 mb-1"><span className="text-terminal-brightBlack">// 3. Research and identify the best tools for the job</span></p>
              <p className="ml-4 mb-1"><span className="text-terminal-brightBlack">// 4. Write clean, maintainable code</span></p>
              <p className="ml-4 mb-1"><span className="text-terminal-brightBlack">// 5. Test thoroughly</span></p>
              <p className="ml-4 mb-1"><span className="text-terminal-brightBlack">// 6. Optimize for performance and user experience</span></p>
              <p className="ml-4 mb-2"><span className="text-terminal-purple">return</span> <span className="text-terminal-yellow">'Efficient and scalable solutions'</span>;</p>
              <p>{`}`}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;