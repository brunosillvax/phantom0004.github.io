import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';
import { MatrixBackground } from './MatrixBackground';
import { Terminal as TerminalIcon, Github, ExternalLink } from 'lucide-react';

interface Command {
  name: string;
  description: string;
  action: () => void;
}

const titleBanner = `
 ____              _        _____     _   _   
|    \\ ___ ___ _ _| |      |   __|___| |_| |_                                 
|  |  | .'|  _| | | |      |  |  | .'|  _|  _|
|____/|__,|_| |_  |_|      |_____|__,|_| |_|  
              |___|                           
`;

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/phantom0004', icon: Github },
];

const TypeWriter: React.FC<{ 
  text: string; 
  onComplete?: () => void;
  showCursor?: boolean;
  speed?: 'fast' | 'normal';
}> = ({ text, onComplete, showCursor = true, speed = 'normal' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let currentIndex = 0;

    const type = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        const minDelay = speed === 'fast' ? 1 : 5;
        const maxDelay = speed === 'fast' ? 2 : 10;
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        timerRef.current = setTimeout(type, delay);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    type();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, onComplete, speed]);

  return (
    <span className="font-mono">
      {displayText}
      {showCursor && !isComplete && (
        <span className="terminal-cursor-blink" />
      )}
    </span>
  );
};

const LineByLine: React.FC<{ 
  lines: string[];
  onComplete?: () => void;
  speed?: 'fast' | 'normal';
}> = ({ lines, onComplete, speed = 'normal' }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const mountedRef = useRef(false);
  const [isLastLineComplete, setIsLastLineComplete] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleLineComplete = () => {
    if (!mountedRef.current) return;
    
    if (currentLineIndex === lines.length - 1) {
      setIsLastLineComplete(true);
      onComplete?.();
    } else {
      setCompletedLines(prev => [...prev, lines[currentLineIndex]]);
      setCurrentLineIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-1">
      {completedLines.map((line, index) => (
        <div key={index} className="font-mono text-xs sm:text-sm md:text-base break-words">{line}</div>
      ))}
      {currentLineIndex < lines.length && (
        isLastLineComplete && currentLineIndex === lines.length - 1 ? (
          <div className="font-mono text-xs sm:text-sm md:text-base break-words">{lines[currentLineIndex]}</div>
        ) : (
          <TypeWriter 
            text={lines[currentLineIndex]} 
            onComplete={handleLineComplete}
            showCursor={!isLastLineComplete && currentLineIndex === lines.length - 1}
            speed={speed}
          />
        )
      )}
    </div>
  );
};

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<{ type: 'input' | 'output' | 'ascii' | 'error' | 'success'; content: string | React.ReactNode }[]>([
    { 
      type: 'ascii', 
      content: (
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-8">
          <motion.pre
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-green-400 text-[8px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre font-bold glitch-text hidden sm:block"
            style={{ 
              textShadow: '2px 2px 0px rgba(34, 197, 94, 0.2), -2px -2px 0px rgba(34, 197, 94, 0.2)',
              animation: 'glitch 3s infinite'
            }}
          >
            {titleBanner}
          </motion.pre>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-green-400 text-xl sm:text-2xl md:text-3xl font-bold sm:hidden text-center"
          >
            Terminal v1.0
          </motion.h1>
        </div>
      )
    }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileKeyboardOpen, setIsMobileKeyboardOpen] = useState(false);
  
  const [playKeyPress] = useSound('/sounds/keypress.mp3', { volume: 0.5 });

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    const steps = [
      'msf exploit(linux/ssh/libssh_auth_bypass) > exploit',
      '[*] Started reverse TCP handler on 10.10.14.1:4444',
      '[*] Attempting to bypass authentication...',
      '[*] Exploit successful, sending payload...',
      '[*] Meterpreter session 1 opened (10.10.14.1:4444 -> 10.10.14.22:58342)',
      'meterpreter > shell'
    ];

    setIsTyping(true);
    setOutput(prev => [...prev, { 
      type: 'output',
      content: <LineByLine 
        lines={steps} 
        onComplete={() => setIsTyping(false)}
        speed="normal"
      />
    }]);
  }, []);

  const getAboutData = () => {
    const aboutContent = [
      '╭─ About Me ──────────────────────────────╮',
      '│                                         ',
      '│  Name: Daryl Gatt                       ',
      '│  Role: Cybersecurity Professional       ',
      '│                                         ',
      '│  A passionate cybersecurity enthusiast  ',
      '│  with expertise in penetration testing, ',
      '│  secure development, and offensive      ',
      '│  security research.                     ',
      '│                                         ',
      '╰─────────────────────────────────────────╯'
    ];
    return aboutContent.join('\n');
  };

  const getProjectsData = () => {
    const projects = [
      '╭─ Projects ──────────────────────────────╮',
      '│                                         ',
      '│  1. KRYPT0S Ransomware PoC              ',
      '│     Educational ransomware impl.        ',
      '│                                         ',
      '│  2. Morpheus IOC Scanner                ',
      '│     Advanced threat detection           ',
      '│                                         ',
      '│  3. FuzzFindr Web Fuzzing Tool          ',
      '│     Web security testing framework      ',
      '│                                         ',
      '│  4. ELK Stack Tools                     ',
      '│     ELK stack management suite          ',
      '│                                         ',
      '╰─────────────────────────────────────────╯'
    ];
    return projects.join('\n');
  };

  const getSkillsData = () => {
    const skillsContent = [
      '╭─ Technical Skills ────────────────────────╮',
      '│                                          ',
      '│  Security:  Penetration Testing, OSINT   ',
      '│  Languages: Python, JavaScript, C++      ',
      '│  Tools:     Burp Suite, Metasploit       ',
      '│  Platforms: Linux, Windows, Cloud        ',
      '│                                          ',
      '╰───────────────────────────────────────────╯'
    ];
    return skillsContent.join('\n');
  };

  const getContactData = () => {
    const contactContent = [
      '╭─ Contact Information ──────────────────────╮',
      '│                                           ',
      '│  Email:  phantom.techsec@gmail.com        ',
      '│  GitHub: github.com/phantom0004           ',
      '│                                           ',
      '│  For secure communication, use PGP key    ',
      '│  available on the main portfolio.         ',
      '│                                           ',
      '╰────────────────────────────────────────────╯'
    ];
    return contactContent.join('\n');
  };

  const commands: Command[] = [
    {
      name: 'help',
      description: 'Display available commands',
      action: () => {
        const helpContent = [
          '╭─ Available Commands ───────────────────╮',
          '│                                       ',
          '│  help     - Display this help message ',
          '│  about    - Display portfolio info    ',
          '│  projects - List project details      ',
          '│  skills   - Display technical skills  ',
          '│  contact  - Show contact information  ',
          '│  clear    - Clear terminal screen     ',
          '│  home     - Return to main portfolio  ',
          '│                                       ',
          '╰─────────────────────────────────────────╯'
        ];
        setOutput(prev => [...prev, {
          type: 'success',
          content: <TypeWriter 
            text={`\n${helpContent.join('\n')}\n`} 
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'about',
      description: 'Display portfolio owner info',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'success',
          content: <TypeWriter 
            text={`\n${getAboutData()}\n`} 
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'projects',
      description: 'List project details',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'success',
          content: <TypeWriter 
            text={`\n${getProjectsData()}\n`} 
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'skills',
      description: 'Display technical skills',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'success',
          content: <TypeWriter 
            text={`\n${getSkillsData()}\n`} 
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'contact',
      description: 'Show contact information',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'success',
          content: <TypeWriter 
            text={`\n${getContactData()}\n`} 
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'clear',
      description: 'Clear terminal screen',
      action: () => {
        setOutput([
          { 
            type: 'ascii', 
            content: (
              <div className="flex flex-col items-center space-y-6">
                <motion.pre
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-400 text-[8px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre font-bold hidden sm:block"
                >
                  {titleBanner}
                </motion.pre>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-400 text-xl sm:text-2xl md:text-3xl font-bold sm:hidden text-center"
                >
                  Terminal v1.0
                </motion.h1>
              </div>
            )
          },
          { 
            type: 'output', 
            content: <TypeWriter 
              text="Terminal cleared. Type 'help' for commands." 
              onComplete={() => setIsTyping(false)}
              speed="fast"
            />
          }
        ]);
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
    
    setIsTyping(true);
    const foundCommand = commands.find(c => c.name === command);
    
    if (foundCommand) {
      foundCommand.action();
    } else {
      setOutput(prev => [...prev, {
        type: 'error',
        content: <TypeWriter 
          text={`Command not found: ${command}. Type 'help' for available commands.`}
          onComplete={() => setIsTyping(false)}
          speed="fast"
        />
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsTyping(true);
    setOutput(prev => [...prev, { 
      type: 'input', 
      content: <TypeWriter 
        text={`phantom@portfolio:~$ ${input}`}
        onComplete={() => {
          processCommand(input);
        }}
        showCursor={false}
        speed="fast"
      />
    }]);
    
    setHistory(prev => [input, ...prev]);
    setInput('');
    setHistoryIndex(-1);

    if (terminalContentRef.current) {
      setTimeout(() => {
        terminalContentRef.current?.scrollTo({
          top: terminalContentRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
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

  return (
    <div className="min-h-screen min-h-[calc(var(--vh,1vh)*100)] bg-black flex items-center justify-center p-2 sm:p-4 relative overflow-hidden cursor-default">
      <MatrixBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full max-w-4xl bg-black/80 rounded-lg border border-green-500/20 backdrop-blur-sm relative z-10 flex flex-col"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-2 bg-black/50 border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[10px] sm:text-xs text-gray-500">v1.0.0</span>
            <span className="text-[10px] sm:text-xs text-gray-500">phantom@portfolio:~</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalContentRef}
          className="flex-1 h-[60vh] sm:h-[70vh] md:h-[calc(100vh-12rem)] md:max-h-[700px] p-3 sm:p-6 font-mono text-xs sm:text-sm overflow-y-auto custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
          style={{
            height: isMobileKeyboardOpen ? '40vh' : undefined
          }}
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
                    ? ''
                    : line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'success'
                    ? 'text-green-400'
                    : 'text-gray-300'
                } whitespace-pre-wrap mb-4 matrix-text break-words`}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {!isTyping && (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400 text-xs sm:text-sm whitespace-nowrap">phantom@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  playKeyPress();
                }}
                onFocus={() => setIsMobileKeyboardOpen(true)}
                onBlur={() => setIsMobileKeyboardOpen(false)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-green-500 text-xs sm:text-sm w-full"
                autoFocus
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </form>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="p-2 border-t border-green-500/20 bg-black/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-green-400 transition-colors"
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                );
              })}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-500">
              Type <span className="rainbow-text font-bold">'help'</span> for commands
            </span>
          </div>
        </div>

        <div className="scan-lines hidden sm:block" />
      </motion.div>
    </div>
  );
}

export default Terminal;