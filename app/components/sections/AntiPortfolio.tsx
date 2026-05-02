'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../hooks/useLanguage';
import { content } from '../../lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function AntiPortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const closingRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate label
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      // Animate items with stagger
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.from(item, {
          opacity: 0,
          x: -50,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        });

        // Animate the X mark first, then text
        const xMark = item.querySelector('.x-mark');
        const text = item.querySelector('.item-text');

        if (xMark && text) {
          gsap.from(xMark, {
            scale: 0,
            duration: 0.3,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
            },
          });

          gsap.from(text, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            delay: index * 0.2 + 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
            },
          });
        }
      });

      // Animate closing line
      gsap.from(closingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: t.antiportfolio.items.length * 0.2 + 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [language, t.antiportfolio.items.length]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#0B1120]"
    >
      {/* Label */}
      <div
        ref={labelRef}
        className="text-[#94A3B8] mb-16"
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px',
          letterSpacing: '0.4em',
        }}
      >
        {t.antiportfolio.label}
      </div>

      {/* Items List */}
      <div className="space-y-6 mb-12">
        {t.antiportfolio.items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="flex items-center gap-4"
          >
            {/* X Mark */}
            <span
              className="x-mark text-[#EF4444]"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(28px, 5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              ✗
            </span>

            {/* Text */}
            <span
              className="item-text text-[#F1F5F9]"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(28px, 5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Closing Line */}
      <div
        ref={closingRef}
        className="text-[#3B82F6] text-center italic"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {t.antiportfolio.closing}
      </div>
    </section>
  );
}
