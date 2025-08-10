import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Terminal className="w-8 h-8 text-green-500" aria-hidden="true" />
          <span>Sobre mim</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-gray-400"
          >
            <p className="leading-relaxed">
              Estudante de Análise e Desenvolvimento de Sistemas, apaixonado por tecnologia e programação.  
              Tenho experiência em desenvolvimento Frontend (HTML, CSS, JavaScript) e conhecimentos em Backend (Java, Python).  
              Busco aprendizado contínuo e inovação, participando de projetos reais e focando em segurança da informação.
            </p>
            
            <p className="leading-relaxed">
              Atualmente estou aprimorando minhas habilidades em React, APIs REST, automação e análise de dados com Python.  
              Também possuo conhecimentos básicos em ferramentas de segurança como Kali Linux, Metasploit, Nmap e SQLMap.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-sm bg-[rgba(var(--bg-rgb),0.3)] p-6 rounded-xl border border-green-500/20 shadow-lg relative group text-gray-300"
          >
            <motion.div 
              className="ghost-ascii relative w-fit mx-auto"
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="ghost-bubble opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500/10 px-3 py-1 rounded-full text-green-400 border border-green-500/20"
                initial={{ y: 10 }}
                animate={{ y: [10, 0, 10] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Olá!
              </motion.div>
              <motion.pre 
                className="text-green-500 text-center transition-colors duration-300 relative ghost-glow"
              >
{`
⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣦⠀
⠀⠀⠀⠀⣰⣿⡟⢻⣿⡟⢻⣧
⠀⠀⠀⣰⣿⣿⣇⣸⣿⣇⣸⣿
⠀⠀⣴⣿⣿⣿⣿⠟⢻⣿⣿⣿
⣠⣾⣿⣿⣿⣿⣿⣤⣼⣿⣿⠇
⢿⡿⢿⣿⣿⣿⣿⣿⣿⣿⡿⠀
⠀⠀⠈⠿⠿⠋⠙⢿⣿⡿⠁⠀
`}
              </motion.pre>
              <div className="absolute inset-0 -z-10 opacity-20 blur-xl bg-green-500/20 rounded-full filter" />
            </motion.div>

            <div className="space-y-1 mt-6 relative z-10">
              <p><span className="text-green-400">Nome:</span> Bruno Sillva</p>
              <p><span className="text-green-400">Contato:</span> brunomatias674@gmail.com | +55 32 99856-7357</p>
              <p><span className="text-green-400">Localização:</span> Muriaé, Minas Gerais, Brasil</p>
              <p><span className="text-green-400">Foco:</span> Desenvolvimento Frontend, Backend, Segurança da Informação</p>
              <p><span className="text-green-400">Ferramentas:</span> React, JavaScript, Java, Python, Tailwind CSS, Git, Docker</p>
              <p><span className="text-green-400">Idiomas:</span> Português (nativo), Inglês básico</p>
              <p><span className="text-green-400">Projetos:</span> APIs REST, Calculadora IMC, Tela de Login Responsiva</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
