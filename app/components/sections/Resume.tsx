'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Code } from 'lucide-react';

export default function Resume() {
  const handleViewResume = () => {
    window.open('/resume', '_blank');
  };

  const highlights = [
    {
      icon: Briefcase,
      title: 'Experience',
      items: ['AI Development', 'Full Stack Projects', 'Freelance Work'],
    },
    {
      icon: GraduationCap,
      title: 'Education',
      items: ['GIAIC AI Course', 'Intermediate', 'Self-Taught'],
    },
    {
      icon: Code,
      title: 'Skills',
      items: ['Python, TypeScript', 'Next.js, FastAPI', 'AI & MCP'],
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#1A2333] to-[#0B1120] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-[#3B82F6]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F1F5F9] to-[#3B82F6] bg-clip-text text-transparent">
                Resume
              </h2>
            </div>
            <p className="text-[#94A3B8] text-base sm:text-lg">
              Download my complete professional profile
            </p>
          </motion.div>

          {/* Resume Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl p-8 sm:p-10 mb-8"
          >
            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {highlights.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                  </div>
                  <h3 className="text-[#F1F5F9] font-semibold text-lg mb-2">
                    {section.title}
                  </h3>
                  <ul className="text-[#94A3B8] text-sm space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* View Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <motion.button
                onClick={handleViewResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#3B82F6] text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow"
              >
                <FileText className="w-5 h-5" />
                View Full Resume
              </motion.button>
              <p className="text-[#94A3B8] text-xs sm:text-sm mt-4">
                Last updated: May 2026 • Downloadable PDF available
              </p>
            </motion.div>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <p className="text-[#94A3B8] text-sm">
              Prefer to connect directly?{' '}
              <a
                href="#contact"
                className="text-[#3B82F6] hover:underline font-medium"
              >
                Get in touch
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
