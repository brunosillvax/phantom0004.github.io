import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Terminal className="w-8 h-8 text-green-500" />
          <span>whoami</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-400 leading-relaxed">
              I'm a passionate cybersecurity professional and ethical hacker with a focus on 
              secure software development and penetration testing. My journey in tech started 
              with programming and evolved into a deep fascination with security.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Currently pursuing advanced certifications in cybersecurity while actively 
              participating in CTF competitions and contributing to open-source security tools.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-sm space-y-2 bg-black/30 p-6 rounded-lg border border-green-500/20"
          >
            <pre className="text-green-500">
              {`
 _____ _            _    _ _   
|_   _| |          | |  | | |  
  | | | |__   ___  | |  | | |_ 
  | | | '_ \\ / _ \\ | |/\\| | __|
  | | | | | |  __/ \\  /\\  / |_ 
  \\_/ |_| |_|\\___|  \\/  \\/ \\__|
              `}
            </pre>
            <div className="text-gray-500">
              <p>Skills: Penetration Testing, Secure Development, Network Security</p>
              <p>Tools: Kali Linux, Burp Suite, Metasploit, Wireshark</p>
              <p>Languages: Python, JavaScript, Bash, C++</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}