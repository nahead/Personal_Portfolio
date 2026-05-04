'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code, CheckCircle, AlertCircle, Lightbulb, Code2 } from 'lucide-react';
import { CaseStudy } from '@/app/lib/caseStudies';
import Prism from 'prismjs';
import { useEffect } from 'react';

export default function CaseStudyDetail({ study }: { study: CaseStudy }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B1120] pt-24 pb-16">
      <article className="container mx-auto px-6 max-w-5xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#5B9EF7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full font-medium">
              {study.category}
            </span>
            <span className="text-[#94A3B8] text-sm">
              {new Date(study.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#F1F5F9] mb-4 leading-tight">
            {study.title}
          </h1>

          <p className="text-xl text-[#94A3B8] mb-6">{study.tagline}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#3B82F6]/10 transition-colors"
              >
                <Code className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </motion.header>

        {/* Problem */}
        <Section title="The Problem" icon={AlertCircle}>
          <p className="text-[#94A3B8] text-lg leading-relaxed whitespace-pre-line">
            {study.problem}
          </p>
        </Section>

        {/* Solution */}
        <Section title="The Solution" icon={CheckCircle}>
          <p className="text-[#94A3B8] text-lg leading-relaxed whitespace-pre-line">
            {study.solution}
          </p>
        </Section>

        {/* Tech Stack */}
        <Section title="Tech Stack" icon={Code2}>
          <div className="flex flex-wrap gap-3">
            {study.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#1A2333] border border-[#1E3A5F] text-[#F1F5F9] rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* Architecture */}
        {study.architecture && (
          <Section title="Architecture">
            <div className="bg-[#1A2333] border border-[#1E3A5F] rounded-xl p-6">
              <pre className="text-[#94A3B8] text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {study.architecture}
              </pre>
            </div>
          </Section>
        )}

        {/* Metrics */}
        <Section title="Results & Impact">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {study.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A2333] border border-[#1E3A5F] rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-[#3B82F6] mb-2">
                  {metric.value}
                </div>
                <div className="text-[#F1F5F9] font-semibold mb-1">
                  {metric.label}
                </div>
                <div className="text-[#94A3B8] text-sm">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Challenges */}
        <Section title="Challenges & Solutions">
          <div className="space-y-6">
            {study.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A2333] border border-[#1E3A5F] rounded-xl p-6"
              >
                <h4 className="text-xl font-bold text-[#F1F5F9] mb-3">
                  {challenge.title}
                </h4>
                <div className="mb-4">
                  <span className="text-[#EF4444] font-semibold text-sm">Challenge: </span>
                  <span className="text-[#94A3B8]">{challenge.description}</span>
                </div>
                <div>
                  <span className="text-[#10B981] font-semibold text-sm">Solution: </span>
                  <span className="text-[#94A3B8]">{challenge.solution}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Code Snippets */}
        {study.codeSnippets && study.codeSnippets.length > 0 && (
          <Section title="Code Highlights">
            <div className="space-y-8">
              {study.codeSnippets.map((snippet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4 className="text-lg font-bold text-[#F1F5F9] mb-2">
                    {snippet.title}
                  </h4>
                  <p className="text-[#94A3B8] text-sm mb-3">
                    {snippet.description}
                  </p>
                  <div className="bg-[#1A2333] border border-[#1E3A5F] rounded-xl overflow-hidden">
                    <div className="bg-[#0B1120] px-4 py-2 border-b border-[#1E3A5F]">
                      <span className="text-[#3B82F6] text-sm font-mono">
                        {snippet.language}
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto custom-scrollbar">
                      <code className={`language-${snippet.language} text-sm`}>
                        {snippet.code}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Learnings */}
        <Section title="Key Learnings" icon={Lightbulb}>
          <div className="space-y-4">
            {study.learnings.map((learning, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] font-bold">
                  {index + 1}
                </div>
                <p className="text-[#94A3B8] text-lg leading-relaxed flex-1">
                  {learning}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-8 border-t border-[#1E3A5F]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#3B82F6]/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              More Case Studies
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow"
            >
              Let's Work Together
            </Link>
          </div>
        </motion.footer>
      </article>
    </main>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: any;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        {Icon && <Icon className="w-6 h-6 text-[#3B82F6]" />}
        <h2 className="text-3xl font-bold text-[#F1F5F9]">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
