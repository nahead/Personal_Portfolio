'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useLanguage } from '../../hooks/useLanguage';
import { useXPSystem } from '../../hooks/useXPSystem';

const API_URL = process.env.NEXT_PUBLIC_NAI_BACKEND_URL || 'http://localhost:8001';
const GEO_CACHE_KEY = 'nai_geo_cache';
const GEO_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

interface GeoData {
  country: string;
  city: string;
  timestamp: number;
}

interface ContextData {
  timezone: string;
  local_hour: number;
  language: string;
  country: string;
  city: string;
}

interface ChatRequestBody {
  message: string;
  session_id: string;
  timezone?: string;
  local_hour?: number;
  language?: string;
  country?: string;
  city?: string;
}

export default function NAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => nanoid());
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [contextData, setContextData] = useState<ContextData | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [quickReplies, setQuickReplies] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { language } = useLanguage();
  const { triggerXP } = useXPSystem();

  // Fetch geolocation data with caching
  const fetchGeoData = async (): Promise<{ country: string; city: string }> => {
    try {
      // Check cache first
      const cached = localStorage.getItem(GEO_CACHE_KEY);
      if (cached) {
        const geoData: GeoData = JSON.parse(cached);
        const now = Date.now();
        if (now - geoData.timestamp < GEO_CACHE_DURATION) {
          return { country: geoData.country, city: geoData.city };
        }
      }

      // Fetch fresh data from Next.js API route
      const response = await fetch('/api/geolocation');
      if (!response.ok) throw new Error('Geolocation API failed');

      const data = await response.json();
      const country = data.country || 'Unknown';
      const city = data.city || 'Unknown';

      // Cache the result
      const geoData: GeoData = {
        country,
        city,
        timestamp: Date.now(),
      };
      localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geoData));

      return { country, city };
    } catch {
      // Silently fail - geolocation is optional, we have time-based fallbacks
      return { country: 'Unknown', city: 'Unknown' };
    }
  };

  // Generate personalized welcome message
  const generateWelcomeMessage = (context: ContextData): string => {
    const { country, city, local_hour, language: lang } = context;
    const isPakistan = country === 'Pakistan';
    const isIndia = country === 'India';
    const isUrdu = lang === 'ur';

    // Time of day
    const isNight = local_hour >= 22 || local_hour < 6;
    const isMorning = local_hour >= 6 && local_hour < 12;
    const isAfternoon = local_hour >= 12 && local_hour < 18;
    const isEvening = local_hour >= 18 && local_hour < 22;

    // Pakistan + Urdu
    if (isPakistan && isUrdu) {
      return "السلام علیکم! میں NAI ہوں — Nahead کا AI assistant۔ آپ سے مل کر خوشی ہوئی! 🇵🇰";
    }

    // Pakistan + English
    if (isPakistan) {
      return `Welcome home! I'm NAI — Nahead's AI assistant. Fellow Pakistani spotted! 🇵🇰 ${city !== 'Unknown' ? `Greetings from ${city}!` : ''}`;
    }

    // India
    if (isIndia) {
      return "Hello! I'm NAI — Nahead's AI assistant. Nahead builds across borders. Let's talk! 🇮🇳";
    }

    // Night time (any country)
    if (isNight) {
      return "Working late? I'm NAI — Nahead's AI assistant. I'm here 24/7. What brings you here tonight?";
    }

    // Morning
    if (isMorning) {
      return "Good morning! I'm NAI — Nahead's AI assistant. Starting your day exploring? Let's talk!";
    }

    // Afternoon
    if (isAfternoon) {
      return "Hey! I'm NAI — Nahead's AI assistant. Ask me anything about Nahead, his skills, or how to work with him!";
    }

    // Evening
    if (isEvening) {
      return "Good evening! I'm NAI — Nahead's AI assistant. Curious about Nahead's work? I'm here to help!";
    }

    // Default fallback
    return "Hey! I'm NAI — Nahead's AI assistant. Ask me anything about Nahead, his skills, or how to work with him! 👋";
  };

  // Generate time-aware quick replies
  const generateQuickReplies = (context: ContextData): string[] => {
    const { country, local_hour } = context;
    const isPakistan = country === 'Pakistan';
    const isNight = local_hour >= 22 || local_hour < 6;

    if (isPakistan) {
      return [
        'What can Nahead build?',
        'Is he available for hire?',
        'Tell me his story',
      ];
    }

    if (isNight) {
      return [
        'What can Nahead build?',
        'Is he available now?',
        'Show me his work',
      ];
    }

    return [
      'What can Nahead build?',
      'Is he available for hire?',
      'Tell me his story',
    ];
  };

  // Initialize context on mount
  useEffect(() => {
    const initContext = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const now = new Date();
        const local_hour = now.getHours();
        const geo = await fetchGeoData();

        const context: ContextData = {
          timezone,
          local_hour,
          language,
          country: geo.country,
          city: geo.city,
        };

        setContextData(context);
        setWelcomeMessage(generateWelcomeMessage(context));
        setQuickReplies(generateQuickReplies(context));
      } catch (error) {
        console.error('Failed to initialize context:', error);
        // Fallback to default
        setWelcomeMessage("Hey! I'm NAI — Nahead's AI assistant. Ask me anything about Nahead, his skills, or how to work with him! 👋");
        setQuickReplies([
          'What can Nahead build?',
          'Is he available for hire?',
          'Tell me his story',
        ]);
      }
    };

    initContext();
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 96) + 'px';
    }
  }, [input]);

  const handleQuickReply = (text: string) => {
    setShowWelcome(false);
    handleSend(text);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    setInput('');
    setShowWelcome(false);

    // Trigger XP on first message
    if (messages.length === 0) {
      triggerXP('nai_messaged');
    }

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      id: nanoid(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare request body with context
      const requestBody: ChatRequestBody = {
        message: textToSend,
        session_id: sessionId,
      };

      // Add context data if available
      if (contextData) {
        requestBody.timezone = contextData.timezone;
        requestBody.local_hour = contextData.local_hour;
        requestBody.language = contextData.language;
        requestBody.country = contextData.country;
        requestBody.city = contextData.city;
      }

      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        id: nanoid(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I\'m experiencing high demand right now. Please try again in a moment, or reach out to Nahead directly at naheadj@gmail.com!',
        id: nanoid(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      const wasOpen = isOpen;
      setIsOpen(!isOpen);
      if (!wasOpen) {
        setShowWelcome(messages.length === 0);
        // Trigger XP on first open
        triggerXP('nai_opened');
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Button - Fully Responsive */}
      <motion.div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990]">
        <motion.button
          data-nai-chat
          data-nai-trigger
          onClick={toggleChat}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.4)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 8px 32px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.4)',
              '0 8px 32px rgba(59, 130, 246, 0.6), 0 0 0 20px rgba(59, 130, 246, 0)',
              '0 8px 32px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Chat Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white relative z-10 sm:w-6 sm:h-6 md:w-7 md:h-7"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
              fill="currentColor"
            />
          </svg>

          {/* AI Badge */}
          <motion.div
            className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 px-1.5 py-0.5 sm:px-2 rounded-full text-[8px] sm:text-[10px] font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            AI
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                className="absolute bottom-full mb-2 sm:mb-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap text-xs sm:text-sm font-medium text-white hidden sm:block"
                style={{
                  background: 'rgba(11, 17, 32, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                Chat with NAI
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid rgba(59, 130, 246, 0.3)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat Window - Fully Responsive */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed top-16 bottom-16 left-4 right-4 sm:top-auto sm:bottom-20 sm:left-auto sm:right-6 sm:w-[380px] md:w-[400px] lg:w-[420px] sm:h-[520px] md:h-[580px] lg:h-[600px] sm:max-h-[calc(100vh-8rem)] z-[9989] flex flex-col overflow-hidden"
            style={{
              background: 'rgba(26, 35, 51, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              overscrollBehavior: 'contain',
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)',
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

            {/* Chat Header */}
            <div
              className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center justify-between border-b relative"
              style={{
                background: 'rgba(11, 17, 32, 0.6)',
                borderColor: 'rgba(30, 58, 95, 0.3)',
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Pulsing Status Dot */}
                <div className="relative">
                  <motion.div
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(16, 185, 129, 0.3)',
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                <div>
                  <div className="text-white font-bold text-sm sm:text-base tracking-wide">NAI</div>
                  <div className="text-[#94A3B8] text-[10px] sm:text-xs">Nahead&apos;s AI Assistant</div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Minimize Button */}
                <motion.button
                  onClick={() => setIsMinimized(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#94A3B8] rounded-lg transition-colors duration-200 hover:text-white hover:bg-white/5"
                  aria-label="Minimize"
                >
                  <svg width="14" height="2" viewBox="0 0 16 2" fill="currentColor" className="sm:w-4">
                    <rect width="16" height="2" rx="1" />
                  </svg>
                </motion.button>

                {/* Close Button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#94A3B8] rounded-lg transition-colors duration-200 hover:text-white hover:bg-white/5"
                  aria-label="Close"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="sm:w-3.5 sm:h-3.5">
                    <path d="M1 1L13 13M13 1L1 13" />
                  </svg>
                </motion.button>
              </div>

              {/* Loading Indicator Line */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: [0, 1, 0] }}
                    exit={{ scaleX: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)',
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 custom-scrollbar"
              onWheel={(e) => {
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Welcome Message */}
              {showWelcome && messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* NAI Welcome Bubble */}
                  <div className="flex justify-start">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-[90%] sm:max-w-[85%] px-3 py-2 sm:px-4 sm:py-3 rounded-[16px] sm:rounded-[20px] rounded-bl-[6px]"
                      style={{
                        background: 'rgba(11, 17, 32, 0.8)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <div className="text-[10px] sm:text-xs text-[#3B82F6] mb-1 sm:mb-2 font-semibold tracking-wide">NAI</div>
                      <div className="text-xs sm:text-sm text-[#F1F5F9] leading-relaxed">
                        {welcomeMessage || "Hey! I'm NAI — Nahead's AI assistant. Ask me anything about Nahead, his skills, or how to work with him! 👋"}
                      </div>
                    </motion.div>
                  </div>

                  {/* Quick Reply Chips */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 px-0.5 sm:px-1">
                    {(quickReplies.length > 0 ? quickReplies : [
                      'What can Nahead build?',
                      'Is he available for hire?',
                      'Tell me his story',
                    ]).map((text, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        onClick={() => handleQuickReply(text)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full text-[#F1F5F9] transition-all duration-200 hover:text-white hover:bg-[#3B82F6]/15 hover:border-[#3B82F6]/50 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
                        style={{
                          backgroundColor: 'rgba(11, 17, 32, 0.6)',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] px-3 py-2 sm:px-4 sm:py-3 ${
                      message.role === 'user'
                        ? 'rounded-[16px] sm:rounded-[20px] rounded-br-[6px]'
                        : 'rounded-[16px] sm:rounded-[20px] rounded-bl-[6px]'
                    }`}
                    style={
                      message.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                            boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                          }
                        : {
                            background: 'rgba(11, 17, 32, 0.8)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                          }
                    }
                  >
                    {message.role === 'assistant' && messages[index - 1]?.role !== 'assistant' && (
                      <div className="text-[10px] sm:text-xs text-[#3B82F6] mb-1 sm:mb-2 font-semibold tracking-wide">NAI</div>
                    )}
                    <div className={`whitespace-pre-wrap break-words leading-relaxed text-xs sm:text-sm ${message.role === 'user' ? 'text-white' : 'text-[#F1F5F9]'}`}>
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-2 sm:px-5 sm:py-3 rounded-[16px] sm:rounded-[20px] rounded-bl-[6px]"
                    style={{
                      background: 'rgba(11, 17, 32, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                            boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
                          }}
                          animate={{
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className="p-3 sm:p-4 border-t"
              style={{
                background: 'rgba(11, 17, 32, 0.8)',
                borderColor: 'rgba(30, 58, 95, 0.3)',
              }}
            >
              <div className="flex items-end gap-2 sm:gap-3">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NAI anything..."
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl resize-none focus:outline-none transition-all max-h-20 sm:max-h-24 text-xs sm:text-sm text-[#F1F5F9] placeholder-[#64748B]"
                  style={{
                    background: 'rgba(26, 35, 51, 0.6)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    minHeight: '40px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim() && !isLoading
                      ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                      : 'rgba(59, 130, 246, 0.2)',
                    boxShadow: input.trim() && !isLoading
                      ? '0 4px 16px rgba(59, 130, 246, 0.4)'
                      : 'none',
                  }}
                  whileHover={input.trim() && !isLoading ? { scale: 1.05 } : {}}
                  whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
                  aria-label="Send message"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white sm:w-5 sm:h-5"
                  >
                    <path
                      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
