import { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';

export const Hero = memo(function Hero() {
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
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});