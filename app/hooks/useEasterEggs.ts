import { useEffect, useState } from 'react';

export function useKonamiCode(callback: () => void) {
  const [keys, setKeys] = useState<string[]>([]);
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-10);

        // Check if the last 10 keys match the Konami code
        const matches = konamiCode.every((key, index) => key === newKeys[index]);

        if (matches) {
          callback();
          return []; // Reset after successful match
        }

        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
}

export function useConsoleCommands() {
  useEffect(() => {
    const originalLog = console.log;
    let commandBuffer = '';

    // Override console.log to detect commands
    console.log = function (...args: any[]) {
      const message = args.join(' ').toLowerCase();
      commandBuffer += message;

      // Check for commands
      if (commandBuffer.includes('hire me')) {
        showHireMessage();
        commandBuffer = '';
      } else if (commandBuffer.includes('help')) {
        showHelpMessage();
        commandBuffer = '';
      } else if (commandBuffer.includes('about')) {
        showAboutMessage();
        commandBuffer = '';
      }

      // Keep buffer small
      if (commandBuffer.length > 100) {
        commandBuffer = commandBuffer.slice(-50);
      }

      originalLog.apply(console, args);
    };

    // Welcome message
    console.log('%c🚀 Welcome to Nahead\'s Portfolio!', 'font-size: 20px; color: #3B82F6; font-weight: bold;');
    console.log('%cTry typing: hire me, help, or about', 'color: #94A3B8;');

    return () => {
      console.log = originalLog;
    };
  }, []);
}

function showHireMessage() {
  console.clear();
  console.log(
    '%c💼 SPECIAL OFFER UNLOCKED!',
    'font-size: 24px; color: #10B981; font-weight: bold; background: #0B1120; padding: 10px;'
  );
  console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ctext y=\'50\' font-size=\'50\'%3E🎉%3C/text%3E%3C/svg%3E") no-repeat;');
  console.log('%cYou found the secret command!', 'font-size: 16px; color: #3B82F6;');
  console.log('%c', 'font-size: 1px;');
  console.log('%cAs a reward, here\'s my direct contact:', 'color: #F1F5F9;');
  console.log('%c📧 Email: naheadj@gmail.com', 'color: #3B82F6; font-weight: bold;');
  console.log('%c💼 LinkedIn: linkedin.com/in/nahead', 'color: #3B82F6; font-weight: bold;');
  console.log('%c🐦 Twitter: @naheadj', 'color: #3B82F6; font-weight: bold;');
  console.log('%c', 'font-size: 1px;');
  console.log('%c💡 Bonus: Mention you found this Easter egg for priority consideration!', 'color: #10B981; font-style: italic;');
}

function showHelpMessage() {
  console.clear();
  console.log('%c🎮 Easter Egg Commands', 'font-size: 20px; color: #3B82F6; font-weight: bold;');
  console.log('%c', 'font-size: 1px;');
  console.log('%c📝 Available Commands:', 'color: #F1F5F9; font-weight: bold;');
  console.log('%c  • hire me    - Unlock special contact info', 'color: #94A3B8;');
  console.log('%c  • about      - Learn about this portfolio', 'color: #94A3B8;');
  console.log('%c  • help       - Show this message', 'color: #94A3B8;');
  console.log('%c', 'font-size: 1px;');
  console.log('%c🎯 Hidden Features:', 'color: #F1F5F9; font-weight: bold;');
  console.log('%c  • Konami Code (↑↑↓↓←→←→BA) - Try it!', 'color: #94A3B8;');
  console.log('%c  • Click the logo 10 times - Something special happens', 'color: #94A3B8;');
  console.log('%c  • Press Ctrl+` - Hidden terminal', 'color: #94A3B8;');
}

function showAboutMessage() {
  console.clear();
  console.log('%c👨‍💻 About This Portfolio', 'font-size: 20px; color: #3B82F6; font-weight: bold;');
  console.log('%c', 'font-size: 1px;');
  console.log('%cBuilt with:', 'color: #F1F5F9; font-weight: bold;');
  console.log('%c  • Next.js 16 + TypeScript', 'color: #94A3B8;');
  console.log('%c  • Three.js + React Three Fiber', 'color: #94A3B8;');
  console.log('%c  • Framer Motion + GSAP', 'color: #94A3B8;');
  console.log('%c  • FastAPI + OpenAI Agents SDK', 'color: #94A3B8;');
  console.log('%c  • Tailwind CSS', 'color: #94A3B8;');
  console.log('%c', 'font-size: 1px;');
  console.log('%c🎨 Features:', 'color: #F1F5F9; font-weight: bold;');
  console.log('%c  • AI-powered chatbot (NAI)', 'color: #94A3B8;');
  console.log('%c  • 3D interactive world', 'color: #94A3B8;');
  console.log('%c  • Easter eggs (you found one!)', 'color: #94A3B8;');
  console.log('%c  • Blog with MDX', 'color: #94A3B8;');
  console.log('%c', 'font-size: 1px;');
  console.log('%c⭐ Star the repo: github.com/nahead', 'color: #10B981; font-weight: bold;');
}
