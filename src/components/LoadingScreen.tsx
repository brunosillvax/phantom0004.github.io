import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Reduced loading time from 3000ms to 1500ms
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasLoaded', 'true');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.95 }}
      // Reduced transition delay from 2.5s to 1.25s
      transition={{ duration: 0.6, delay: 1.25, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="space-y-4 font-mono text-green-500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Reduced delay from 0.5s to 0.25s
          transition={{ delay: 0.25 }}
        >
          &gt;_ loading profile data...
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Reduced delay from 1.2s to 0.6s
          transition={{ delay: 0.6 }}
        >
          &gt;_ authenticating user...
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Reduced delay from 1.9s to 0.95s
          transition={{ delay: 0.95 }}
        >
          &gt;_ access granted.
        </motion.div>
      </div>
    </motion.div>
  );
}