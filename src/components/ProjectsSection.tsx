import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code2, Github, ExternalLink, Star } from 'lucide-react';

const projects = [
  {
    title: 'Calculadora IMC Interativa',
    description: 'Uma aplicação web para calcular o Índice de Massa Corporal com interface amigável e responsiva, usando manipulação dinâmica do DOM.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/brunosillvax/Calculadora-IMC',
    featured: true
  },
  {
    title: 'API REST para Desafios DIO',
    description: 'API RESTful construída em Java para gerenciar dados e operações em projetos de backend, focada em boas práticas e estrutura organizada.',
    tech: ['Java', 'API REST', 'Backend'],
    github: 'https://github.com/brunosillvax/api-rest-dio',
  },
  {
    title: 'Tela de Login Responsiva',
    description: 'Interface moderna e responsiva para autenticação, com foco em usabilidade e design clean.',
    tech: ['HTML', 'CSS'],
    github: 'https://github.com/brunosillvax/login-page',
  },
  {
    title: 'Projeto Portfólio Pessoal',
    description: 'Site de portfólio pessoal desenvolvido para apresentar habilidades e projetos, com design responsivo e interativo.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/brunosillvax/brunosillvax.github.io',
  },
  {
    title: 'Estudos e Testes em Kali Linux',
    description: 'Scripts e anotações para aprendizado prático em ferramentas de segurança ofensiva no Kali Linux.',
    tech: ['Bash', 'Kali Linux', 'Segurança'],
    github: 'https://github.com/brunosillvax/kali-tests',
  }
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const isFeatured = project.featured;
  const borderColor = isFeatured ? 'border-amber-500/40' : 'border-green-500/20';
  const glowColor = isFeatured ? 'rgba(245, 158, 11, 0.06)' : 'rgba(34, 197, 94, 0.06)';
  const hoverGlowColor = isFeatured ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      className={`group relative rounded-xl bg-[rgba(var(--bg-rgb),0.5)] border ${borderColor} p-6 shadow-lg ${
        isFeatured ? 'md:col-span-2 lg:col-span-3' : ''
      } min-h-fit`}
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      onTouchStart={handleInteraction}
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${window.innerWidth < 768 ? '300px' : '600px'} circle at ${mouseX}px ${mouseY}px,
            ${glowColor},
            transparent 40%
          )
        `,
      }}
    >
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${window.innerWidth < 768 ? '200px' : '400px'} circle at ${mouseX}px ${mouseY}px,
              ${hoverGlowColor},
              transparent 40%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xl font-semibold ${
            isFeatured ? 'text-amber-500 group-hover:text-amber-400' : 'text-green-500 group-hover:text-green-400'
          } transition-colors flex items-center gap-2`}>
            {project.title}
            {isFeatured && (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-amber-500 fill-amber-500/50" aria-hidden="true" />
              </motion.div>
            )}
          </h3>
        </div>
        
        <p className={`text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors ${
          isFeatured ? 'md:text-base' : ''
        }`}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(tech => (
            <span
              key={tech}
              className={`text-xs px-2 py-1 rounded-full ${
                isFeatured 
                  ? 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/15 group-hover:text-amber-400'
                  : 'bg-green-500/10 text-green-500 group-hover:bg-green-500/15 group-hover:text-green-400'
              } transition-all`}
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
            className={`flex items-center gap-2 text-gray-400 ${
              isFeatured ? 'hover:text-amber-500' : 'hover:text-green-500'
            } transition-colors`}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>Source</span>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-gray-400 ${
                isFeatured ? 'hover:text-amber-500' : 'hover:text-green-500'
              } transition-colors`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-[rgba(var(--bg-rgb),0.3)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Code2 className="w-8 h-8 text-green-500" aria-hidden="true" />
          <span>ls ~/projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
