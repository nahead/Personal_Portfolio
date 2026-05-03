'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import dynamic from 'next/dynamic';
import { useXPSystem } from '../../hooks/useXPSystem';

const NeuralNetwork = dynamic(() => import('../three/NeuralNetwork'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1120] via-[#1A2333] to-[#0B1120]" />
  ),
});

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Hero() {
  const nameLetters = 'Nahead Jokhio'.split('');
  const { triggerXP } = useXPSystem();

  useEffect(() => {
    // Trigger XP when hero is viewed
    triggerXP('hero_viewed');
  }, [triggerXP]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Neural Network Background */}
      <Suspense fallback={null}>
        <NeuralNetwork />
      </Suspense>

      {/* Content */}
      <div className="container mx-auto px-6 z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Greeting Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#94A3B8] tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-6 sm:mb-8 font-medium"
          >
            Hello, World. I&apos;m
          </motion.p>

          {/* Name with Individual Letter Animation */}
          <div className="mb-10 sm:mb-12">
            <h1 className="text-[clamp(2.5rem,10vw,10rem)] font-black leading-none px-4" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + index * 0.05,
                    ease: [0.6, 0.01, 0.05, 0.95],
                  }}
                  className="inline-block bg-gradient-to-br from-[#F1F5F9] via-[#94A3B8] to-[#3B82F6] bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 60px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  {letter === ' ' ? ' ' : letter}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Typing Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 h-14 sm:h-16 md:h-20 flex items-center justify-center px-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="text-[#94A3B8] mr-3 sm:mr-4 font-medium">I build</span>
            <TypeAnimation
              sequence={[
                'AI Agents',
                2000,
                'Python Systems',
                2000,
                'Next.js Apps',
                2000,
                'FastAPI Backends',
                2000,
                'MCP Integrations',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-bold text-[#3B82F6]"
              cursor={true}
              style={{ display: 'inline-block' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#94A3B8] max-w-[90%] sm:max-w-[600px] mx-auto mb-10 sm:mb-12 md:mb-14 px-4 font-medium leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Building the future with AI — from Karachi to the world
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.1 }}
            className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12 px-4"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B82F6] mb-1">
                <AnimatedCounter end={8} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Skills</div>
            </div>

            <div className="w-px h-10 sm:h-12 bg-[#1E3A5F]" />

            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B82F6] mb-1">
                <AnimatedCounter end={18} />
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Years Old</div>
            </div>

            <div className="w-px h-10 sm:h-12 bg-[#1E3A5F]" />

            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B82F6] mb-1">
                <AnimatedCounter end={2} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Years Building</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#3B82F6] text-white rounded-lg font-semibold text-sm sm:text-base transition-[box-shadow] duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-center"
            >
              Explore My Work
            </motion.a>

            <motion.button
              onClick={() => {
                const chatButton = document.querySelector('[data-nai-chat]');
                if (chatButton) (chatButton as HTMLElement).click();
              }}
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 hover:bg-[#3B82F6]/10"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Chat with NAI
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#3B82F6] text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold"
              >
                AI
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-6 h-10 border-2 border-[#3B82F6] rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"
          />
        </motion.div>
        <span className="text-xs text-[#3B82F6] opacity-60">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
