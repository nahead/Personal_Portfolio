'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'output' | 'input' | 'command';
  content: string;
}

export default function SecretTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const playBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
      // Audio not supported - silently fail
    }
  };

  const typeText = useCallback(async (text: string) => {
    setIsTyping(true);
    const lines = text.split('\n');

    for (const line of lines) {
      const chars = line.split('');
      let currentLine = '';

      for (const char of chars) {
        currentLine += char;
        await new Promise(resolve => setTimeout(resolve, 20));

        setLines(prev => {
          const newLines = [...prev];
          if (newLines.length === 0 || newLines[newLines.length - 1].type !== 'output') {
            newLines.push({ type: 'output', content: currentLine });
          } else {
            newLines[newLines.length - 1].content = currentLine;
          }
          return newLines;
        });
      }

      if (lines.indexOf(line) < lines.length - 1) {
        setLines(prev => {
          const newLines = [...prev];
          newLines[newLines.length - 1].content += '\n';
          return newLines;
        });
      }
    }

    setIsTyping(false);
  }, []);

  const showWelcome = useCallback(async () => {
    const welcome = `╔═══════════════════════════════════════════════╗
║   NAI TERMINAL — NAHEAD JOKHIO'S CONSOLE     ║
╚═══════════════════════════════════════════════╝

Type 'help' to see available commands.`;
    await typeText(welcome);
  }, [typeText]);

  const executeCommand = async (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    setLines(prev => [...prev, { type: 'command', content: `nahead@portfolio:~$ ${cmd}` }]);

    switch (command) {
      case 'help':
        await typeText(`╭─────────────────────────────────────────╮
│  AVAILABLE COMMANDS                     │
├─────────────────────────────────────────┤
│  whoami    → About Nahead               │
│  skills    → All skills & proficiency   │
│  contact   → How to reach Nahead        │
│  hire      → Hiring information         │
│  projects  → Current projects           │
│  nai       → Talk to NAI AI             │
│  clear     → Clear terminal             │
│  exit      → Close terminal             │
╰─────────────────────────────────────────╯`);
        break;

      case 'whoami':
        await typeText(`╔════════════════════════════════════════╗
║           DEVELOPER PROFILE            ║
╠════════════════════════════════════════╣
║  Name      : Nahead Jokhio             ║
║  Age       : 18 years                  ║
║  Location  : Karachi, Pakistan         ║
║  Course    : GIAIC (2024 - March 2026) ║
║  Status    : Available for hire        ║
║  Mission   : Building the impossible.  ║
╚════════════════════════════════════════╝`);
        break;

      case 'skills':
        await typeText(`╔════════════════════════════════════════╗
║            SKILL MATRIX                ║
╠════════════════════════════════════════╣
║  [████████░░] Python       ★★★★★      ║
║  [███████░░░] TypeScript   ★★★★       ║
║  [███████░░░] JavaScript   ★★★★       ║
║  [███████░░░] Next.js      ★★★★       ║
║  [███████░░░] FastAPI      ★★★★       ║
║  [████████░░] MCP Protocol ★★★★★      ║
║  [████████░░] AI Agents    ★★★★★      ║
╚════════════════════════════════════════╝`);
        break;

      case 'contact':
        await typeText(`╔════════════════════════════════════════╗
║          CONTACT INFORMATION           ║
╠════════════════════════════════════════╣
║  Email    : naheadj@gmail.com          ║
║  GitHub   : github.com/nahead          ║
║  Location : Karachi, Pakistan          ║
║  Response : Within 24 hours            ║
╚════════════════════════════════════════╝`);
        break;

      case 'hire':
        await typeText(`╔════════════════════════════════════════╗
║         AVAILABLE FOR HIRE             ║
╠════════════════════════════════════════╣
║  → Freelance projects                  ║
║  → AI-powered web applications         ║
║  → Full-stack development              ║
║  → API development & integration       ║
╚════════════════════════════════════════╝

[Scrolling to contact section...]`);
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
        break;

      case 'projects':
        await typeText(`╔════════════════════════════════════════╗
║         CURRENT PROJECTS               ║
╠════════════════════════════════════════╣
║  → This portfolio (you're in it)       ║
║  → AI-powered applications             ║
║  → More coming soon...                 ║
╚════════════════════════════════════════╝`);
        break;

      case 'nai':
        await typeText(`[Connecting to NAI agent...]
[Establishing secure connection...]
[Connection established ✓]`);
        setTimeout(() => {
          const naiButton = document.querySelector('[data-nai-trigger]') as HTMLElement;
          if (naiButton) {
            naiButton.click();
          }
        }, 800);
        break;

      case 'clear':
        setLines([]);
        break;

      case 'exit':
        await typeText(`[Closing terminal...]
Goodbye. Press Ctrl+Shift+N to return.`);
        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
        break;

      default:
        await typeText(`Command not found: ${cmd}
Type 'help' for available commands.`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        if (!isOpen) {
          playBeep();
          setTimeout(() => {
            showWelcome();
          }, 300);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showWelcome]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isTyping) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-6 right-6 w-[560px] h-[420px] z-[9999] max-md:w-[calc(100vw-32px)] max-md:h-[70vh] max-md:bottom-4 max-md:right-4"
          style={{
            background: 'rgba(11, 17, 32, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Title Bar */}
          <div
            className="px-4 py-3 flex items-center justify-between border-b relative"
            style={{
              background: 'rgba(26, 35, 51, 0.6)',
              borderColor: 'rgba(30, 58, 95, 0.5)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-[#10B981] hover:brightness-125 transition-all shadow-lg"
                  style={{
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                  }}
                  aria-label="Close terminal"
                />
                <div
                  className="w-3 h-3 rounded-full bg-[#F59E0B]"
                  style={{
                    boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
                  }}
                />
                <div
                  className="w-3 h-3 rounded-full bg-[#EF4444]"
                  style={{
                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
                  }}
                />
              </div>
              <span className="text-[#94A3B8] text-xs font-mono ml-2 tracking-wider">
                NAI TERMINAL v1.0
              </span>
            </div>
            <span className="text-[#94A3B8] text-[10px] font-mono tracking-wide">
              Ctrl+Shift+N
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="p-4 h-[calc(100%-110px)] overflow-y-auto font-mono text-[13px] leading-relaxed custom-scrollbar"
          >
            {lines.map((line, index) => (
              <div
                key={index}
                className={`mb-1.5 ${
                  line.type === 'command'
                    ? 'text-[#3B82F6] font-semibold'
                    : 'text-[#F1F5F9]'
                }`}
                style={{
                  whiteSpace: 'pre-wrap',
                  textShadow: line.type === 'command' ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none',
                }}
              >
                {line.content}
              </div>
            ))}
          </div>

          {/* Input Line */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t"
            style={{
              background: 'rgba(11, 17, 32, 0.8)',
              borderColor: 'rgba(30, 58, 95, 0.5)',
            }}
          >
            <div className="flex items-center gap-2 font-mono text-[13px]">
              <span
                className="text-[#3B82F6] font-semibold"
                style={{
                  textShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                }}
              >
                nahead@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                disabled={isTyping}
                className="flex-1 bg-transparent outline-none text-[#F1F5F9] caret-[#3B82F6] placeholder-[#475569]"
                autoComplete="off"
                spellCheck={false}
                placeholder={isTyping ? 'Processing...' : 'Type a command...'}
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-4 bg-[#3B82F6]"
                style={{
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
                }}
              />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
