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
                className="max-w-4xl mx-auto space-y-8"
              >
                <h1 className="text-4xl md:text-6xl font-light flex items-center space-x-4">
                  <Code2 className="w-8 h-8 md:w-12 md:h-12 text-green-500" />
                  <span>Hello, I'm <span className="text-green-500 font-normal">Daryl</span></span>
                </h1>

                <div className="text-xl md:text-2xl text-gray-400 h-12">
                  <Typewriter
                    options={{
                      strings: [
                        'Cybersecurity Student',
                        'Software Developer',
                        'CTF Player',
                        'Security Researcher'
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 80,
                    }}
                  />
                </div>

                <p className="text-gray-400 max-w-2xl font-light leading-relaxed">
                  Welcome to my digital workspace. I specialize in cybersecurity,
                  ethical hacking, and developing secure software solutions.
                </p>

                <div className="flex flex-wrap gap-6 pt-8">
                  <button className="cyber-button">
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
        </main>
      </div>
    </>
  );
}

export default App;