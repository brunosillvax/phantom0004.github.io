import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion, useAnimation, useScroll, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Home, User, Briefcase, Send, Menu, X, Link, Github, ExternalLink, Heart, ChevronDown } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import Typewriter from 'typewriter-effect';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { PortfoliosSection } from './components/PortfoliosSection';
import { CustomCursor } from './components/CustomCursor';
import { NotFound } from './components/NotFound';
import { Terminal as TerminalComponent } from './components/Terminal';
import { BackToTopButton } from './components/BackToTopButton';
import { ParticleBackground } from './components/ParticleBackground';
import { HackerEffects } from './components/HackerEffects';
import { Layout } from './components/Layout';

const navItems = [
  { name: 'home', icon: Home, href: '#home', label: 'Navigate to home section' },
  { name: 'about', icon: User, href: '#about', label: 'Learn more about me' },
  { name: 'experience', icon: Briefcase, href: '#experience', label: 'View my experience' },
  { name: 'projects', icon: Code2, href: '#projects', label: 'Browse my projects' },
  { name: 'portfolios', icon: Link, href: '#portfolios', label: 'View my portfolios' },
  { name: 'contact', icon: Send, href: '#contact', label: 'Contact me' }
];

function Navigation() {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.substring(1));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      controls.start({ opacity: latest > 50 ? 0.9 : 1 });
    });

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      unsubscribe();
      document.body.style.overflow = '';
    };
  }, [controls, scrollY, isMenuOpen]);

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 1 }}
      animate={controls}
      className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/80 border-b border-green-500/20"
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="font-light tracking-wider text-sm sm:text-base whitespace-nowrap">
              <span className="text-green-500">$</span>
              &nbsp;daryl@portfolio:~
              <span className="terminal-cursor"></span>
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-item group flex items-center space-x-2 text-sm tracking-wider text-gray-300 hover:text-green-500 transition-colors duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline">{item.name}.sh</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-green-500 hover:text-green-400 transition-colors z-[60] p-2"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="w-8 h-8" />
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-lg z-50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <motion.div
        className="fixed top-0 right-0 h-[90vh] w-[80vw] sm:w-80 bg-black/98 backdrop-blur-lg md:hidden pt-16 px-4 z-50 overflow-y-auto"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col items-center space-y-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center justify-center space-x-3 text-white hover:text-green-400 transition-colors w-full text-base font-medium py-2 px-4 min-h-[44px] relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative leading-none">
                  {item.name}.sh
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 origin-left transform scale-x-0 transition-transform duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section 
      id="home" 
      role="banner"
      aria-label="Welcome section"
      className="min-h-[100svh] flex items-center justify-center pt-[var(--header-height)]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="max-w-2xl px-4 md:px-12 text-center md:text-left space-y-6 md:space-y-8 relative"
          >
            <div className="absolute inset-0 blur-2xl opacity-20">
              <div className="w-60 sm:w-80 h-60 sm:h-80 bg-green-500/20 rounded-full mx-auto animate-pulse"></div>
            </div>

            <h1 className="flex flex-col items-center md:items-start gap-2 md:gap-4 z-10 relative">
              <span className="block">Hello,</span>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span>I'm&nbsp;</span>
                <motion.span 
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300"
                  whileHover={{ 
                    filter: "brightness(1.5)",
                    textShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.7)",
                      "0 0 35px rgba(34, 197, 94, 0.5)",
                      "0 0 50px rgba(34, 197, 94, 0.3)"
                    ].join(", ")
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  Daryl
                </motion.span>
                <motion.span
                  animate={{
                    rotate: [0, 20, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-4xl inline-flex"
                  role="img"
                  aria-label="Waving hand"
                >
                  👋
                </motion.span>
              </div>
            </h1>

            <div className="text-xl md:text-2xl text-gray-400 h-12 z-10 relative font-mono flex items-center justify-center md:justify-start">
              <span className="text-green-500 mr-2 hidden md:inline">&gt;</span>
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
                  cursor: '█'
                }}
              />
            </div>

            <p className="text-gray-400 max-w-3xl mx-auto md:mx-0 leading-relaxed font-light z-10 relative">
              Welcome to my digital workspace — built with purpose and precision. I specialize in{' '}
              <span className="text-green-400 font-medium">ethical hacking</span>,{' '}
              <span className="text-green-400 font-medium">secure software development</span>, and
              translating exploits into opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 z-10 relative">
              <motion.button
                onClick={() => window.location.href = '/terminal'}
                className="cyber-button w-full sm:w-auto text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View portfolio in terminal mode"
              >
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View Portfolio as Terminal</span>
              </motion.button>

              <motion.a
                href="#about"
                className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors group text-sm sm:text-base"
                whileHover={{ y: 5 }}
                transition={{ duration: 0.3 }}
                aria-label="Scroll to about section"
              >
                <span>Learn more about me</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="relative hidden md:block"
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
                className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer 
      id="footer" 
      role="contentinfo"
      aria-label="Site footer"
      className="bg-black/30 text-gray-400 py-4 sm:py-6 md:py-8 border-t border-green-500/10 relative z-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-2 sm:mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className="text-left text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                  aria-label={item.label}
                >
                  <item.icon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{item.name}.sh</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-2 sm:mb-4">Connect</h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              <a href="https://github.com/phantom0004" target="_blank" rel="noopener noreferrer" 
                 className="footer-link hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                 aria-label="Visit my GitHub profile">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>GitHub</span>
              </a>
              <a href="mailto:phantom.techsec@gmail.com" 
                 className="footer-link hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                 aria-label="Send me an email">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Email</span>
              </a>
              <a href="https://mt.linkedin.com/in/daryl-gatt-web3" target="_blank" rel="noopener noreferrer" 
                 className="footer-link hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                 aria-label="Connect with me on LinkedIn">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 lg:text-right">
            <div className="flex items-center gap-2 text-green-500 lg:justify-end">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-mono text-xs sm:text-sm">v1.0</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed flex items-center gap-2 lg:justify-end">
              Built with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" /> using React
            </p>
            <p className="text-[10px] sm:text-xs opacity-60">
              © {new Date().getFullYear()} Daryl Gatt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-black relative">
      <ParticleBackground />
      <LoadingScreen />
      <Navigation />
      
      <main id="main-content" role="main" className="relative z-10">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <PortfoliosSection />
        <ContactSection />
      </main>
      
      <Footer />
      <BackToTopButton />
      <div className="matrix-bg pointer-events-none" aria-hidden="true" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <HackerEffects />
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/terminal" element={<TerminalComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;