import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="matrix-bg opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-black/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6 text-green-500"
        >
          <Terminal className="w-5 h-5" />
          <span className="font-mono text-sm">system_error.log</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-green-500/5 blur-[2px] rounded-lg" />
          <pre className="font-mono text-green-500 mb-8 text-xs sm:text-sm overflow-x-auto custom-scrollbar relative">
{`
$$\\   $$\\  $$$$$$\\  $$\\   $$\\ 
$$ |  $$ |$$$ __$$\\ $$ |  $$ |
$$ |  $$ |$$$$\\ $$ |$$ |  $$ |
$$$$$$$$ |$$\\$$\\$$ |$$$$$$$$ |
\\_____$$ |$$ \\$$$$ |\\_____$$ |
      $$ |$$ |\\$$$ |      $$ |
      $$ |\\$$$$$$  /      $$ |
      \\__| \\______/       \\__|
`}
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-green-400 h-20 mb-8"
        >
          <Typewriter
            options={{
              strings: [
                'Error 404: Page not found_',
                'Directory scan failed_',
                'System could not locate requested resource_'
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 30,
              delay: 80,
              wrapperClassName: 'typewriter-wrapper',
              cursorClassName: 'typewriter-cursor'
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-2 text-gray-400 text-sm mb-8 font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="text-green-500">~</span>
            <span>Location: {window.location.pathname}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">~</span>
            <span>Timestamp: {new Date().toISOString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">~</span>
            <span>Status: 404 Not Found</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate('/')}
          className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-6 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
        >
          Return Home
        </motion.button>
      </motion.div>
    </div>
  );
}