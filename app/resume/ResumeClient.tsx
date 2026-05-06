'use client';

import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Phone, ExternalLink, Globe, Calendar } from 'lucide-react';
import { useRef } from 'react';

export default function ResumeClient() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end gap-4 mb-6 print:hidden"
        >
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:bg-[#2563EB] transition-colors"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </motion.div>

        {/* Resume Container */}
        <motion.div
          ref={resumeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#0B1120] to-[#1A2333] text-white p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-black mb-2">NAHEAD JOKHIO</h1>
            <p className="text-xl sm:text-2xl text-[#3B82F6] font-semibold mb-6">
              AI Developer & Full-Stack Engineer
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3B82F6]" />
                <a href="mailto:naheadj@gmail.com" className="hover:text-[#3B82F6] transition-colors">
                  naheadj@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3B82F6]" />
                <span>Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#3B82F6]" />
                <a href="https://github.com/nahead" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] transition-colors">
                  github.com/nahead
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#3B82F6]" />
                <a href="https://linkedin.com/in/nahead" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] transition-colors">
                  linkedin.com/in/nahead
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 sm:p-12 space-y-8">
            {/* Professional Summary */}
            <section>
              <h2 className="text-2xl font-bold text-[#0B1120] mb-4 pb-2 border-b-2 border-[#3B82F6]">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-[#1A2333] leading-relaxed">
                Self-taught 18-year-old AI Developer and Full-Stack Engineer from Karachi, Pakistan.
                Specialized in building intelligent systems using Python, TypeScript, and modern AI frameworks.
                GIAIC graduate with hands-on experience in OpenAI Agents SDK, Model Context Protocol (MCP),
                and full-stack web development. Passionate about creating innovative solutions that bridge
                AI capabilities with real-world applications.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-2xl font-bold text-[#0B1120] mb-4 pb-2 border-b-2 border-[#3B82F6]">
                TECHNICAL SKILLS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-[#1A2333] mb-2">Programming Languages</h3>
                  <p className="text-[#1A2333]">Python, TypeScript, JavaScript</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2333] mb-2">Frontend Development</h3>
                  <p className="text-[#1A2333]">Next.js, React, Tailwind CSS, Three.js</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2333] mb-2">Backend Development</h3>
                  <p className="text-[#1A2333]">FastAPI, Node.js, REST APIs</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2333] mb-2">AI & Machine Learning</h3>
                  <p className="text-[#1A2333]">OpenAI SDK, Gemini API, MCP, AI Agents</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2333] mb-2">Tools & Platforms</h3>
                  <p className="text-[#1A2333]">Git, Docker, Vercel, Render.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2333] mb-2">Databases</h3>
                  <p className="text-[#1A2333]">PostgreSQL, Redis, Upstash</p>
                </div>
              </div>
            </section>

            {/* Featured Projects */}
            <section>
              <h2 className="text-2xl font-bold text-[#0B1120] mb-4 pb-2 border-b-2 border-[#3B82F6]">
                FEATURED PROJECTS
              </h2>

              <div className="space-y-6">
                {/* NAI Chatbot */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#1A2333]">NAI - AI Portfolio Assistant</h3>
                    <span className="text-sm text-[#3B82F6] font-semibold">2026</span>
                  </div>
                  <p className="text-[#1A2333] mb-2">
                    Intelligent chatbot integrated into portfolio using OpenAI Agents SDK and Gemini API
                  </p>
                  <ul className="list-disc list-inside text-[#1A2333] space-y-1 ml-4">
                    <li>Built with FastAPI backend and Next.js frontend</li>
                    <li>Implements Model Context Protocol (MCP) for enhanced AI interactions</li>
                    <li>Features visitor memory using Upstash Redis</li>
                    <li>Deployed on Render.com with 99.9% uptime</li>
                  </ul>
                  <p className="text-sm text-[#3B82F6] mt-2">
                    <strong>Tech Stack:</strong> Python, FastAPI, OpenAI SDK, Gemini API, Next.js, Redis
                  </p>
                </div>

                {/* 3D Portfolio */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#1A2333]">Interactive 3D Portfolio</h3>
                    <span className="text-sm text-[#3B82F6] font-semibold">2026</span>
                  </div>
                  <p className="text-[#1A2333] mb-2">
                    Immersive 3D portfolio experience with advanced animations and interactions
                  </p>
                  <ul className="list-disc list-inside text-[#1A2333] space-y-1 ml-4">
                    <li>Built with React Three Fiber and Three.js for 3D rendering</li>
                    <li>Implements GSAP and Framer Motion for smooth animations</li>
                    <li>Features 6 interactive zones with camera transitions</li>
                    <li>Optimized for 90+ Lighthouse performance score</li>
                  </ul>
                  <p className="text-sm text-[#3B82F6] mt-2">
                    <strong>Tech Stack:</strong> Next.js 15, TypeScript, Three.js, GSAP, Tailwind CSS
                  </p>
                </div>

                {/* AI Applications */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#1A2333]">AI Agent Systems</h3>
                    <span className="text-sm text-[#3B82F6] font-semibold">2024-2026</span>
                  </div>
                  <p className="text-[#1A2333] mb-2">
                    Collection of AI-powered applications using modern agent frameworks
                  </p>
                  <ul className="list-disc list-inside text-[#1A2333] space-y-1 ml-4">
                    <li>Developed custom MCP servers for specialized AI tasks</li>
                    <li>Implemented multi-agent systems with OpenAI Agents SDK</li>
                    <li>Created automation tools for workflow optimization</li>
                  </ul>
                  <p className="text-sm text-[#3B82F6] mt-2">
                    <strong>Tech Stack:</strong> Python, TypeScript, OpenAI SDK, MCP
                  </p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold text-[#0B1120] mb-4 pb-2 border-b-2 border-[#3B82F6]">
                EDUCATION
              </h2>

              <div className="space-y-4">
                {/* GIAIC */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A2333]">
                        Governor's Initiative for Artificial Intelligence & Computing (GIAIC)
                      </h3>
                      <p className="text-[#3B82F6] font-semibold">IT Course - AI, Web Development & Cloud</p>
                    </div>
                    <span className="text-sm text-[#1A2333] font-semibold whitespace-nowrap ml-4">
                      2024 - 2026
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-[#1A2333] space-y-1 ml-4">
                    <li>Completed comprehensive training in AI/ML, Web Development, and Cloud Computing</li>
                    <li>Specialized in OpenAI Agents SDK and Model Context Protocol</li>
                    <li>Built multiple production-ready projects during the course</li>
                  </ul>
                </div>

                {/* Intermediate */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A2333]">Intermediate (Pre-Engineering)</h3>
                      <p className="text-[#3B82F6] font-semibold">In Progress</p>
                    </div>
                    <span className="text-sm text-[#1A2333] font-semibold whitespace-nowrap ml-4">
                      Present
                    </span>
                  </div>
                </div>

                {/* Matriculation */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A2333]">Matriculation (Science)</h3>
                      <p className="text-[#3B82F6] font-semibold">Completed</p>
                    </div>
                    <span className="text-sm text-[#1A2333] font-semibold whitespace-nowrap ml-4">
                      2022
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Achievements & Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-[#0B1120] mb-4 pb-2 border-b-2 border-[#3B82F6]">
                ACHIEVEMENTS & HIGHLIGHTS
              </h2>
              <ul className="list-disc list-inside text-[#1A2333] space-y-2">
                <li>Self-taught developer from a village near Karachi, proving geography doesn't limit capability</li>
                <li>Successfully completed GIAIC IT Course at age 18</li>
                <li>Built and deployed multiple production-ready AI applications</li>
                <li>Specialized in cutting-edge AI technologies (OpenAI Agents SDK, MCP)</li>
                <li>Created world-class 3D portfolio with 90+ Lighthouse performance score</li>
                <li>Active contributor to open-source projects on GitHub</li>
              </ul>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-2xl font-bold text-[#0B1120] mb-4 pb-2 border-b-2 border-[#3B82F6]">
                LANGUAGES
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="font-bold text-[#1A2333]">English</p>
                  <p className="text-sm text-[#3B82F6]">Professional</p>
                </div>
                <div>
                  <p className="font-bold text-[#1A2333]">Urdu</p>
                  <p className="text-sm text-[#3B82F6]">Native</p>
                </div>
                <div>
                  <p className="font-bold text-[#1A2333]">Sindhi</p>
                  <p className="text-sm text-[#3B82F6]">Native</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="bg-[#0B1120] text-white text-center py-6 px-8">
            <p className="text-sm text-[#94A3B8]">
              Available for remote opportunities worldwide • Open to relocation
            </p>
          </div>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          @page {
            margin: 0.5cm;
            size: A4;
          }
        }
      `}</style>
    </main>
  );
}
