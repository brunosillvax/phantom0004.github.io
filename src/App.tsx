import React from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { Terminal, Code2 } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';

function App() {
  const controls = useAnimation();
  const { scrollY } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      controls.start({ opacity: latest > 50 ? 0.9 : 1 });
    });

    return () => unsubscribe();
  }, [controls, scrollY]);

  return (
    <>
      <LoadingScreen />
      <div className="cursor-cyber fixed top-0 left-0 w-1 h-5 pointer-events-none z-[9999]"></div>
      <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-cyber">
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
                <Terminal className="w-6 h-6 text-green-500" />
                <span className="font-light tracking-wider">daryl@portfolio:~$</span>
              </motion.div>
              
              <div className="hidden md:flex items-center space-x-8">
                {['about', 'projects', 'contact'].map((item, i) => (
                  <motion.button
                    key={item}
                    className="nav-item text-sm tracking-wider text-gray-300 hover:text-green-500 transition-colors duration-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {item}.sh
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>

        <main>
          <section className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-8 relative"
            >
              {/* Glowing flare behind text */}
              <div className="absolute inset-0 blur-2xl opacity-20">
                <div className="w-80 h-80 bg-green-500/20 rounded-full mx-auto animate-pulse"></div>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl md:text-6xl font-light flex flex-col items-center justify-center space-y-4 z-10 relative">
                <span className="flex items-center gap-3">
                  <Code2 className="w-8 h-8 md:w-12 md:h-12 text-green-500 animate-pulse" />
                  <span className="tracking-wide">
                    Hello, I'm{' '}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-300 drop-shadow-md">
                      Daryl
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
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed font-light z-10 relative">
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

            </div>
          </section>

          <AboutSection />
          <ProjectsSection />
          <ContactSection />

          <footer className="bg-black text-gray-500 py-8 border-t border-green-500/10">
            <div className="container mx-auto px-4 text-sm flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">└─</span>
                <p>
                  daryl@portfolio:~$ <span className="text-white">v1.0</span>
                </p>
              </div>

              <div className="opacity-70 text-xs tracking-wider font-mono">
                © {new Date().getFullYear()} Daryl Gatt. All rights reserved.
              </div>

              <div className="flex space-x-4 text-green-500 text-lg">
                <a href="https://github.com/phantom0004" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
                  <i className="devicon-github-original" />
                </a>
                <a href="mailto:phantom.techsec@gmail.com" className="hover:text-green-400 transition">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}

export default App;