'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, X, Send } from 'lucide-react';

export default function HiddenTerminal() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'Welcome to Nahead\'s Secret Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setShow((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands: Record<string, string> = {
    help: `Available commands:
  • about    - About Nahead
  • skills   - List technical skills
  • projects - Show projects
  • contact  - Get contact info
  • clear    - Clear terminal
  • matrix   - Enter the Matrix
  • joke     - Random dev joke
  • secret   - ???`,
    about: `Nahead Jokhio
18-year-old AI Developer from Karachi, Pakistan
GIAIC Graduate | Building the future with AI`,
    skills: `Technical Skills:
  ✓ Python (Expert)
  ✓ TypeScript (Advanced)
  ✓ Next.js (Advanced)
  ✓ FastAPI (Advanced)
  ✓ OpenAI Agents SDK (Advanced)
  ✓ MCP (Intermediate)
  ✓ Three.js (Intermediate)`,
    projects: `Featured Projects:
  1. NAI Chatbot - AI assistant with 500+ conversations
  2. 3D Portfolio - Interactive Three.js experience
  3. MCP Integration - Model Context Protocol tools
  4. FastAPI Backend - High-performance API server`,
    contact: `Contact Information:
  📧 Email: naheadj@gmail.com
  💼 LinkedIn: linkedin.com/in/nahead
  🐦 Twitter: @naheadj
  💻 GitHub: github.com/nahead`,
    matrix: `Wake up, Neo...
The Matrix has you...
Follow the white rabbit 🐰
Knock, knock, Neo.`,
    joke: `Why do programmers prefer dark mode?
Because light attracts bugs! 🐛`,
    secret: `🎉 Congratulations! You found the secret command!
Here's your reward: You're awesome! 🌟
Keep exploring, there are more Easter eggs hidden...`,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    setHistory((prev) => [...prev, { type: 'input', text: `$ ${input}` }]);

    if (cmd === 'clear') {
      setHistory([]);
    } else if (commands[cmd]) {
      setHistory((prev) => [...prev, { type: 'output', text: commands[cmd] }]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'output', text: `Command not found: ${cmd}. Type "help" for available commands.` },
      ]);
    }

    setInput('');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-[9999] w-[600px] max-w-[calc(100vw-2rem)]"
        >
          <div className="bg-[#0B1120] border-2 border-[#3B82F6] rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden">
            {/* Header */}
            <div className="bg-[#1A2333] px-4 py-3 flex items-center justify-between border-b border-[#1E3A5F]">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-[#F1F5F9] font-semibold">Secret Terminal</span>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Terminal Content */}
            <div className="h-[400px] overflow-y-auto p-4 font-mono text-sm custom-scrollbar">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    item.type === 'input' ? 'text-[#3B82F6]' : 'text-[#94A3B8]'
                  }`}
                >
                  <pre className="whitespace-pre-wrap">{item.text}</pre>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-[#1E3A5F] p-4">
              <div className="flex items-center gap-2">
                <span className="text-[#3B82F6] font-mono">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent text-[#F1F5F9] outline-none font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-[#3B82F6] hover:text-[#5B9EF7] transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
