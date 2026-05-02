'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to NAI Terminal v1.0', 'Type "help" for commands']);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    switch (trimmed) {
      case 'help':
        response = 'Available commands: help, about, skills, clear, exit';
        break;
      case 'about':
        response = 'Nahead Jokhio - 18-year-old AI Developer from Karachi, Pakistan';
        break;
      case 'skills':
        response = 'Python | TypeScript | Next.js | FastAPI | MCP | OpenAI Agents SDK';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      default:
        response = `Command not found: ${cmd}`;
    }

    setHistory((prev) => [...prev, `$ ${cmd}`, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 w-[600px] h-[400px] bg-black/95 border border-[#3B82F6] rounded-lg shadow-2xl z-[9999] font-mono text-sm overflow-hidden"
        >
          <div className="bg-[#1A2333] px-4 py-2 flex items-center justify-between border-b border-[#3B82F6]">
            <span className="text-[#3B82F6] font-bold">NAI Terminal</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#94A3B8] hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-4 h-[calc(100%-80px)] overflow-y-auto">
            {history.map((line, idx) => (
              <div key={idx} className="text-[#10B981] mb-1">
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 border-t border-[#3B82F6]">
            <div className="flex items-center gap-2">
              <span className="text-[#3B82F6]">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-[#10B981] outline-none"
                autoFocus
              />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
