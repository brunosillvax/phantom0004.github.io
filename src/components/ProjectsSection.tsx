import { motion } from 'framer-motion';
import { Code2, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'KRYPT0S Ransomware PoC',
    description: 'A sophisticated Python-based ransomware proof of concept designed for educational purposes, demonstrating file encryption techniques on Windows machines.',
    tech: ['Python', 'Cryptography', 'Windows'],
    github: 'https://github.com/phantom0004/KRYPT0S-Ransomware_POC',
  },
  {
    title: 'Morpheus IOC Scanner',
    description: 'An advanced Indicator of Compromise (IOC) detection tool powered by YARA rules and integrated with VirusTotal for precise threat identification.',
    tech: ['Python', 'YARA', 'Cybersecurity'],
    github: 'https://github.com/phantom0004/morpheus_IOC_scanner',
  },
  {
    title: 'ELK Stack Tools',
    description: 'A comprehensive collection of tools, scripts, and documentation for managing and utilizing the ELK (Elasticsearch, Logstash, Kibana) stack effectively.',
    tech: ['ELK Stack', 'Bash', 'Documentation'],
    github: 'https://github.com/phantom0004/elk-stack-tools',
  },
  {
    title: 'FuzzFindr Web Fuzzing Tool',
    description: 'A robust web fuzzing and scraper tool inspired by "ffuf," designed to enhance web security testing through customizable wordlists.',
    tech: ['Python', 'Web Security', 'Fuzzing'],
    github: 'https://github.com/phantom0004/FuzzFindr-Web-Fuzzing-Tool',
  },
  {
    title: 'Sneakerology Website',
    description: 'A school assignment project showcasing various sneakers, allowing users to browse and explore different sneaker models.',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/phantom0004/Sneakerology',
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
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = -(y - centerY) / 15;
                const rotateY = (x - centerX) / 15;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = `rotateX(0deg) rotateY(0deg)`;
              }}
              className="bg-black/50 border border-green-500/20 rounded-lg p-6 shadow-lg transform-gpu transition-transform duration-300 hover:shadow-[0_0_25px_rgba(0,255,0,0.25)] hover:border-green-400"
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