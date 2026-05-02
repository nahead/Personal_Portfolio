export interface Skill {
  name: string;
  icon: string;
  description: string;
  category: 'frontend' | 'backend' | 'ai';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  completedDate: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface VisitorData {
  id: string;
  messages: ChatMessage[];
  lastVisit: number;
  visitCount: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string | number[];
}
