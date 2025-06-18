import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, X, Maximize2, Minimize2 } from 'lucide-react';

const MatrixBackground = lazy(() => import('./MatrixBackground').then(module => ({ default: module.MatrixBackground })));

const TERMINAL_VERSION = '1.1.0';

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

const TypeWriter = React.memo(function TypeWriter({ 
  text, 
  onComplete, 
  showCursor = true, 
  speed = 'normal' 
}: { 
  text: string; 
  onComplete?: () => void;
  showCursor?: boolean;
  speed?: 'fast' | 'normal';
}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let currentIndex = 0;
    let mounted = true;

    const type = () => {
      if (!mounted) return;
      
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        const delay = speed === 'fast' ? 1 : Math.random() * 5 + 5;
        timerRef.current = setTimeout(type, delay);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    type();

    return () => {
      mounted = false;
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
});

const LineByLine = React.memo(function LineByLine({ 
  lines,
  onComplete,
  speed = 'normal'
}: { 
  lines: string[];
  onComplete?: () => void;
  speed?: 'fast' | 'normal';
}) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isLastLineComplete, setIsLastLineComplete] = useState(false);
  const mountedRef = useRef(true);

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
});

export function Terminal() {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<{ type: 'input' | 'output' | 'ascii' | 'error' | 'success'; content: string | React.ReactNode }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileKeyboardOpen, setIsMobileKeyboardOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setOutput([
        { 
          type: 'ascii', 
          content: (
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-8">
              <motion.pre
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-green-400 text-[8px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre font-bold glitch-text hidden sm:block"
              >
                {titleBanner}
              </motion.pre>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-green-400 text-xl sm:text-2xl md:text-3xl font-bold sm:hidden text-center"
              >
                {`Terminal v${TERMINAL_VERSION}`}
              </motion.h1>
            </div>
          )
        }
      ]);

      if (!hasInitializedRef.current) {
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
            speed="fast"
          />
        }]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getAboutData = () => {
    const aboutContent = [
      '╭─ About Me ──────────────────────────────╮',
      '│                                         ',
      '│  Name: Daryl Gatt                       ',
      '│  Role: Cybersecurity Student & Developer',
      '│                                         ',
      '│  Focused on offensive security labs and ',
      '│  building tools that break, exploit, and',
      '│  better understand system vulnerabilities.',
      '│                                         ',
      '│  Backend developer in the cybersecurity ',
      '│  realm, blending code with exploitation. ',
      '│  Passionate about malware analysis, CTFs,',
      '│  and red team research.                 ',
      '│                                         ',
      '╰─────────────────────────────────────────╯'
    ];
    return aboutContent.join('\n');
  };

  const getProjectsData = () => {
    const projects = [
      '╭─ Featured Projects ─────────────────────╮',
      '│                                        ',
      '│  1. Morpheus IOC Scanner               ',
      '│     YARA-powered IOC detection tool    ',
      '│                                        ',
      '│  2. Deimos Ransomware PoC              ',
      '│     Double-extortion ransomware demo   ',
      '│                                        ',
      '│  3. KRYPT0S Ransomware (Archived)      ',
      '│     Python-based ransomware wiper      ',
      '│                                        ',
      '│  4. PenTest Vault                      ',
      '│     Ethical hacking snippets & tools   ',
      '│                                        ',
      '│  5. ELK Stack Tools (Archived)         ',
      '│     Scripts for ELK stack management   ',
      '│                                        ',
      '│  6. FuzzFindr Web Fuzzer (Archived)    ',
      '│     Lightweight web fuzzing utility    ',
      '│                                        ',
      '│  7. Holocron Archives                  ',
      '│     Discontinued tools worth revisiting',
      '│                                        ',
      '│  → More available on GitHub or         ',
      '│    in the full portfolio               ',
      '╰────────────────────────────────────────╯'
    ];
    return projects.join('\n');
  };

  const getSkillsData = () => {
    const skillsContent = [
      '╭─ Technical Skills ────────────────────────╮',
      '│                                           ',
      '│  Security:  Offensive Dev, Ethical Hacking',
      '│  Languages: Bash, Python, C               ',
      '│  Tools:     Metasploit, custom exploits,  ',
      '│             scenario-specific utilities   ',
      '│  Platforms: Kali Linux, Windows, Ubuntu   ',
      '│                                           ',
      '╰───────────────────────────────────────────╯'
    ];
    return skillsContent.join('\n');
  };

  const getContactData = () => {
    const contactContent = [
      '╭─ Contact Information ──────────────────────╮',
      '│                                            ',
      '│  Email:  phantom.techsec@gmail.com         ',
      '│  GitHub: github.com/phantom0004            ',
      '│  LinkedIn: linkedin.com/in/daryl-gatt-web3 ',
      '│                                            ',
      '│  For secure communication, use PGP key     ',
      '│  available on the main portfolio.          ',
      '│                                            ',
      '╰────────────────────────────────────────────╯'
    ];
    return contactContent.join('\n');
  };

  const commands = [
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
          '│  ls       - List available sections   ',
          '│  whoami   - Display current user      ',
          '│  version  - Terminal version          ',
          '│  social   - Social links              ',
          '│  clear    - Clear terminal screen     ',
          '│  home     - Return to main portfolio  ',
          '│  exit     - Same as home              ',
          '│  quit     - Alias for exit            ',
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
      name: 'ls',
      description: 'List available sections',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'output',
          content: <TypeWriter
            text={'about\nprojects\nskills\ncontact'}
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'whoami',
      description: 'Display current user',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'output',
          content: <TypeWriter
            text="phantom0004"
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'version',
      description: 'Show terminal version',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'output',
          content: <TypeWriter
            text={`v${TERMINAL_VERSION}`}
            onComplete={() => setIsTyping(false)}
            speed="fast"
          />
        }]);
      }
    },
    {
      name: 'social',
      description: 'Display social links',
      action: () => {
        setOutput(prev => [...prev, {
          type: 'output',
          content: <TypeWriter
            text={socialLinks.map(l => `${l.name}: ${l.url}`).join('\n')}
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
                  {`Terminal v${TERMINAL_VERSION}`}
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
    {
      name: 'exit',
      description: 'Exit the terminal',
      action: () => {
        navigate('/');
      }
    },
    {
      name: 'quit',
      description: 'Alias for exit',
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-500 text-xl animate-pulse">
          Initializing Terminal...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[calc(var(--vh,1vh)*100)] bg-black flex items-center justify-center p-2 sm:p-4 relative overflow-hidden cursor-default">
      <Suspense fallback={null}>
        <MatrixBackground />
      </Suspense>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`w-full bg-black/80 border border-green-500/20 backdrop-blur-sm relative z-10 flex flex-col ${
          isMaximized ? 'fixed inset-0 m-0 max-w-none h-full rounded-none' : 'max-w-4xl rounded-lg'
        }`}
      >
        <div className="flex items-center justify-between p-2 bg-black/50 border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <button
              aria-label="Close terminal"
              onClick={() => navigate('/')}
              className="group w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center rounded-full bg-red-500/50 hover:bg-red-500"
            >
              <X className="w-2 h-2 text-black opacity-75 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500/50" />
            <button
              aria-label={isMaximized ? 'Restore terminal' : 'Maximize terminal'}
              onClick={() => setIsMaximized(v => !v)}
              className="group w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center rounded-full bg-green-500/50 hover:bg-green-500"
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 text-black opacity-75 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2 h-2 text-black opacity-75 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[10px] sm:text-xs text-gray-500">{`v${TERMINAL_VERSION}`}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">phantom@portfolio:~</span>
          </div>
        </div>

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