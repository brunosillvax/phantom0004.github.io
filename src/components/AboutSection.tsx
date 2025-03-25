import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
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
              I'm a <span className="text-green-400">cybersecurity enthusiast</span> and <span className="text-green-400">ethical hacker</span> with a strong passion for 
              secure software development and offensive research. My journey began in programming but quickly 
              spiraled into a deep obsession with breaking, defending, and <span className="text-green-400">understanding systems from the inside out</span>.
            </p>

            <p className="text-gray-400 leading-relaxed mt-4">
              I'm currently leveling up through <span className="text-green-400">advanced certifications</span>, diving into real-world 
              labs, and staying sharp by competing in <span className="text-green-400">Capture The Flag (CTF)</span> challenges. I also contribute to 
              open-source tools focused on red teaming, automation, and threat detection.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-sm bg-black/30 p-6 rounded-xl border border-green-500/20 shadow-lg"
          >
            <div className="ghost-ascii">
              <pre className="text-green-500 text-center">
{`
⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣦⠀
⠀⠀⠀⠀⣰⣿⡟⢻⣿⡟⢻⣧
⠀⠀⠀⣰⣿⣿⣇⣸⣿⣇⣸⣿
⠀⠀⣴⣿⣿⣿⣿⠟⢻⣿⣿⣿
⣠⣾⣿⣿⣿⣿⣿⣤⣼⣿⣿⠇
⢿⡿⢿⣿⣿⣿⣿⣿⣿⣿⡿⠀
⠀⠀⠈⠿⠿⠋⠙⢿⣿⡿⠁⠀
`}
              </pre>
            </div>

            <div className="text-gray-300 space-y-1 mt-6">
              <p><span className="text-green-400">Alias:</span> Phantom</p>
              <p><span className="text-green-400">Skills:</span> Penetration Testing, Secure Development, Network Security</p>
              <p><span className="text-green-400">Tools:</span> Kali Linux, Burp Suite, Metasploit, Wireshark</p>
              <p><span className="text-green-400">Languages:</span> Python, JavaScript, Bash, C++</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}