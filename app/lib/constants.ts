export const COLORS = {
  primary: '#0B1120',
  secondary: '#1A2333',
  accent: '#3B82F6',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  glow: 'rgba(59, 130, 246, 0.2)',
  glowStrong: 'rgba(59, 130, 246, 0.4)',
  border: '#1E3A5F',
  success: '#10B981',
  error: '#EF4444',
} as const;

export const SKILLS = [
  {
    name: 'Python',
    icon: '🐍',
    description: 'Backend development, AI agents, FastAPI',
    category: 'backend',
  },
  {
    name: 'TypeScript',
    icon: '📘',
    description: 'Type-safe JavaScript for scalable applications',
    category: 'frontend',
  },
  {
    name: 'JavaScript',
    icon: '⚡',
    description: 'Modern ES6+ for dynamic web experiences',
    category: 'frontend',
  },
  {
    name: 'Next.js',
    icon: '▲',
    description: 'React framework for production applications',
    category: 'frontend',
  },
  {
    name: 'FastAPI',
    icon: '⚙️',
    description: 'High-performance Python web framework',
    category: 'backend',
  },
  {
    name: 'MCP',
    icon: '🔌',
    description: 'Model Context Protocol for AI integrations',
    category: 'ai',
  },
  {
    name: 'OpenAI Agents SDK',
    icon: '🤖',
    description: 'Building intelligent AI agents',
    category: 'ai',
  },
  {
    name: 'Gemini API',
    icon: '✨',
    description: 'Google AI for advanced applications',
    category: 'ai',
  },
] as const;

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
} as const;

export const GITHUB_USERNAME = 'nahead-jokhio';

export const NAI_BACKEND_URL = process.env.NEXT_PUBLIC_NAI_BACKEND_URL || 'http://localhost:8000';

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: 'https://linkedin.com/in/nahead-jokhio',
  email: 'nahead.jokhio@example.com',
} as const;
