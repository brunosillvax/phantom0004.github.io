import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';
import { projects } from './ProjectsSection';
import { experiences } from './ExperienceSection';

interface Command {
  name: string;
  description: string;
  action: () => void;
}

const sections = [
  { id: 'about', name: 'About Me' },
  { id: 'experience', name: 'Experience' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
  { id: 'portfolios', name: 'Portfolios' }
];

const asciiBanner = `
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
                                                                         
`;

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<{ type: 'input' | 'output' | 'ascii'; content: string }[]>([
    { type: 'ascii', content: asciiBanner },
    { type: 'output', content: '\nWelcome to Portfolio Terminal v1.0.0\nType \'help\' for available commands.\n' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const [playKeyPress] = useSound('/sounds/keypress.mp3', { volume: 0.5 });

  const commands: Command[] = [
    {
      name: 'help',
      description: 'Display available commands',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'output',
          content: `
Available commands:
  help          - Display this help message
  clear         - Clear terminal screen
  about         - Display portfolio owner info
  projects      - List project details
  contact       - Show contact information
  skills        - Display technical skills
  show sections - Display available sections
  nav <section> - Navigate to a section
  home          - Return to main portfolio
          `
        }]);
      }
    },
    {
      name: 'clear',
      description: 'Clear terminal screen',
      action: () => {
        setOutput([
          { type: 'ascii', content: asciiBanner },
          { type: 'output', content: '\nTerminal cleared. Type \'help\' for available commands.\n' }
        ]);
      }
    },
    {
      name: 'show',
      description: 'Show available sections',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'output',
          content: `
Available sections:
${sections.map(section => `  - ${section.name} (${section.id})`).join('\n')}
          `
        }]);
      }
    },
    {
      name: 'home',
      description: 'Return to main portfolio',
      action: () => {
        navigate('/');
      }
    },
  ];

  const processCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    
    const foundCommand = commands.find(c => c.name === command);
    
    if (foundCommand) {
      foundCommand.action();
    } else {
      setOutput(prev => [...prev, {
        type: 'output',
        content: `Command not found: ${command}. Type 'help' for available commands.`
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setOutput(prev => [...prev, { type: 'input', content: `$ ${input}` }]);
    setHistory(prev => [input, ...prev]);
    processCommand(input);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="min-h-screen bg-black/90 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="matrix-bg absolute inset-0 opacity-40" />
      
      {/* Particle Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              border: '1px solid rgba(34, 197, 94, 0.1)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.1),transparent_70%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full max-w-3xl bg-black/90 rounded-lg border border-green-500/20 overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(34,197,94,0.2)] relative z-10"
      >
        <div className="flex items-center justify-between p-2 bg-black/50 border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-xs text-gray-500">terminal@portfolio:~</span>
        </div>

        <div
          ref={outputRef}
          className="h-[600px] p-4 overflow-y-auto custom-scrollbar font-mono text-sm space-y-2"
          onClick={() => inputRef.current?.focus()}
        >
          <AnimatePresence>
            {output.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`${
                  line.type === 'input' 
                    ? 'text-green-400' 
                    : line.type === 'ascii' 
                    ? 'text-cyan-400' 
                    : 'text-gray-300'
                } whitespace-pre-wrap`}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                playKeyPress();
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white caret-green-500"
              autoFocus
            />
          </form>
        </div>

        <div className="scan-lines" />
      </motion.div>
    </div>
  );
}