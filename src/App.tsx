import React from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { Terminal, Code2, Home, User, Briefcase, Mail, Menu, X, Link, Github, ExternalLink, Heart } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import Typewriter from 'typewriter-effect';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { PortfoliosSection } from './components/PortfoliosSection';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      controls.start({ opacity: latest > 50 ? 0.9 : 1 });
    });

    return () => unsubscribe();
  }, [controls, scrollY]);

  const navItems = [
    { name: 'home', icon: Home },
    { name: 'about', icon: User },
    { name: 'experience', icon: Briefcase },
    { name: 'projects', icon: Code2 },
    { name: 'profiles', icon: Link },
    { name: 'contact', icon: Mail },
  ];

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <div className="matrix-bg" />
        
        <motion.nav
          initial={{ opacity: 1 }}
          animate={controls}
          className="fixed top-0 w-full z-50 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2"
              >
                <span className="font-light tracking-wider">
                  <span className="terminal-prompt">
                    <span className="terminal-cursor"></span>
                  </span>
                  &nbsp;daryl@portfolio:~$
                </span>
              </motion.div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.name}
                      className="nav-item group flex items-center space-x-2 text-sm tracking-wider text-gray-300 hover:text-green-500 transition-colors duration-300"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>{item.name}.sh</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden text-green-500 hover:text-green-400 transition-colors"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-lg md:hidden"
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            variants={menuVariants}
          >
            <div className="p-6 space-y-6">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.name}
                    className="flex items-center space-x-3 text-gray-300 hover:text-green-500 transition-colors w-full"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-lg">{item.name}.sh</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.nav>

        <main>
          <section className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="max-w-2xl px-6 md:px-12 text-center md:text-left space-y-8 relative"
                >
                  {/* Glowing flare behind text */}
                  <div className="absolute inset-0 blur-2xl opacity-20">
                    <div className="w-80 h-80 bg-green-500/20 rounded-full mx-auto animate-pulse"></div>
                  </div>

                  {/* Main headline */}
                  <h1 className="text-4xl md:text-6xl font-light flex flex-col items-center md:items-start justify-center space-y-4 z-10 relative">
                    <span className="flex items-center gap-3">
                      <span className="tracking-wide">
                        Hello, I'm{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-300 drop-shadow-md">
                          Daryl
                        </span>
                        <span className="malta-flag-wrapper">
                          <img 
                            src="/assets/malta_flag.png" 
                            alt="Malta Flag" 
                            className="malta-flag-image"
                          />
                        </span>
                      </span>
                    </span>
                  </h1>

                  {/* Typewriter title */}
                  <div className="text-xl md:text-2xl text-gray-400 h-12 z-10 relative font-mono">
                    <Typewriter
                      options={{
                        strings: [
                          'Cybersecurity Student',
                          'Software Developer',
                          'CTF Player',
                          'Security Researcher',
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 80,
                      }}
                    />
                  </div>

                  {/* Subtext */}
                  <p className="text-gray-400 max-w-3xl mx-auto md:mx-0 leading-relaxed font-light z-10 relative">
                    Welcome to my digital workspace — built with purpose and precision. I specialize in{' '}
                    <span className="text-green-400 font-medium">ethical hacking</span>,{' '}
                    <span className="text-green-400 font-medium">secure software development</span>, and
                    translating exploits into opportunities.
                  </p>

                  {/* Command-style button */}
                  <div className="pt-6 z-10 relative">
                    <button className="cyber-button border border-green-500/30 hover:border-green-500 px-8 py-3 rounded-md tracking-wider">
                      <Code2 className="w-5 h-5 mr-2 inline-block" />
                      [$ view_projects]
                    </button>
                  </div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 blur-2xl opacity-30">
                    <div className="w-full h-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full"></div>
                  </div>
                  <motion.div
                    className="relative z-10 rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="/assets/portfolio_image.png"
                      alt="Daryl Gatt"
                      className="w-[400px] h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <PortfoliosSection />
          <ContactSection />

          <footer className="bg-black/30 text-gray-400 py-12 border-t border-green-500/10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Navigation</h3>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <button className="text-gray-400 hover:text-green-400 transition-colors">
                          {item.name}.sh
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Connect</h3>
                  <div className="flex flex-col gap-3">
                    <a href="https://github.com/phantom0004" target="_blank" rel="noopener noreferrer" 
                       className="footer-link">
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                    <a href="mailto:phantom.techsec@gmail.com" className="footer-link">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                    <a href="https://linkedin.com/in/phantom" target="_blank" rel="noopener noreferrer" 
                       className="footer-link">
                      <ExternalLink className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-500">
                    <Terminal className="w-5 h-5" />
                    <span className="font-mono text-sm">v1.0</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Built with <Heart className="w-4 h-4 inline text-red-500 animate-pulse" /> using React, 
                    Tailwind CSS, and Framer Motion.
                  </p>
                  <p className="text-xs opacity-60">
                    © {new Date().getFullYear()} Daryl Gatt. All rights reserved.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-green-500/10 text-center text-xs">
                <p className="text-gray-500">
                  <span className="text-green-500">$</span> whoami | grep "security"
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;