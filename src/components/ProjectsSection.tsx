import { motion } from 'framer-motion';
import { Code2, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'SecureAuth',
    description: 'Zero-trust authentication system with biometric verification',
    tech: ['Python', 'React', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'NetGuard',
    description: 'Network monitoring tool with ML-based threat detection',
    tech: ['Python', 'TensorFlow', 'ElasticSearch'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'CryptoVault',
    description: 'Secure file storage with military-grade encryption',
    tech: ['TypeScript', 'Node.js', 'React'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
];

export function ProjectsSection() {
  return (
    <section className="py-20 bg-black/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Code2 className="w-8 h-8 text-green-500" />
          <span>ls ~/projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-green-500">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}