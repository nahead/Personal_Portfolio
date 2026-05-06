'use client';

import { motion } from 'framer-motion';
import { Download, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function ResumeClient() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[850px] mx-auto">
        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end mb-8 print:hidden"
        >
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </motion.div>

        {/* Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white px-10 py-10">
            <h1 className="text-4xl font-bold mb-2">
              Nahead Jokhio
            </h1>
            <p className="text-lg text-blue-100 font-medium mb-5">
              AI Developer • Full-Stack Engineer
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-blue-100">
              <a href="mailto:naheadj@gmail.com" className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4" />
                naheadj@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Karachi, Pakistan
              </span>
              <a href="https://github.com/nahead" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <ExternalLink className="w-4 h-4" />
                github.com/nahead
              </a>
              <a href="https://linkedin.com/in/nahead" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <ExternalLink className="w-4 h-4" />
                linkedin.com/in/nahead
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-10 py-8 space-y-8">
            {/* Summary */}
            <section>
              <h2 className="text-base font-bold text-blue-800 uppercase tracking-wide mb-3 pb-2 border-b-2 border-blue-600">
                Professional Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Self-taught Full-Stack AI Developer with <strong className="text-gray-900">2+ years</strong> building production applications. Specialized in Python, TypeScript, and AI frameworks (OpenAI SDK, MCP). Deployed scalable systems serving <strong className="text-gray-900">1,500+ users</strong> with <strong className="text-gray-900">99.9% uptime</strong>. GIAIC graduate passionate about leveraging AI for real-world impact.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-base font-bold text-blue-800 uppercase tracking-wide mb-3 pb-2 border-b-2 border-blue-600">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                  <span className="font-bold text-gray-900">Languages:</span>
                  <p className="text-gray-700 mt-1">Python, TypeScript, JavaScript, SQL</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                  <span className="font-bold text-gray-900">Frontend:</span>
                  <p className="text-gray-700 mt-1">Next.js, React, Tailwind CSS, Three.js</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                  <span className="font-bold text-gray-900">Backend:</span>
                  <p className="text-gray-700 mt-1">FastAPI, Node.js, REST APIs, WebSockets</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                  <span className="font-bold text-gray-900">AI/ML:</span>
                  <p className="text-gray-700 mt-1">OpenAI SDK, Gemini API, MCP, AI Agents</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                  <span className="font-bold text-gray-900">Databases:</span>
                  <p className="text-gray-700 mt-1">PostgreSQL, Redis, Upstash</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                  <span className="font-bold text-gray-900">Tools:</span>
                  <p className="text-gray-700 mt-1">Git, Docker, Vercel, Render.com</p>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-base font-bold text-blue-800 uppercase tracking-wide mb-4 pb-2 border-b-2 border-blue-600">
                Featured Projects
              </h2>

              <div className="space-y-6">
                {/* Project 1 */}
                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-900">NAI - AI Portfolio Assistant</h3>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4 font-semibold bg-blue-200 px-3 py-1 rounded-full">Jan 2026 - Present</span>
                  </div>
                  <p className="text-sm text-blue-700 font-semibold mb-3">Full-Stack AI Developer</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Built production AI chatbot serving <strong className="text-gray-900">500+ monthly users</strong> with <strong className="text-gray-900">95% satisfaction rate</strong> using OpenAI Agents SDK and Gemini API</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Implemented Model Context Protocol (MCP) for enhanced context management and multi-turn conversations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Deployed FastAPI backend achieving <strong className="text-gray-900">99.9% uptime</strong>; integrated Redis for visitor memory persistence</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Reduced response latency by <strong className="text-gray-900">40%</strong> through optimized API calls and caching strategies</span>
                    </li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Python', 'FastAPI', 'OpenAI SDK', 'Gemini API', 'Next.js', 'Redis', 'MCP'].map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project 2 */}
                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-900">Interactive 3D Portfolio</h3>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4 font-semibold bg-blue-200 px-3 py-1 rounded-full">Dec 2025 - Present</span>
                  </div>
                  <p className="text-sm text-blue-700 font-semibold mb-3">Frontend Developer</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Developed immersive 3D portfolio achieving <strong className="text-gray-900">90+ Lighthouse score</strong> despite heavy 3D rendering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Engineered 6 interactive zones with smooth camera transitions maintaining <strong className="text-gray-900">60fps</strong> using GSAP</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Optimized bundle size by <strong className="text-gray-900">35%</strong> through code splitting and lazy loading</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Attracted <strong className="text-gray-900">1,000+ visitors</strong> in first month; featured on developer communities</span>
                    </li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Next.js 15', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS'].map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project 3 */}
                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-900">AI Automation Tools & MCP Servers</h3>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4 font-semibold bg-blue-200 px-3 py-1 rounded-full">Oct 2024 - Present</span>
                  </div>
                  <p className="text-sm text-blue-700 font-semibold mb-3">AI/ML Developer</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Developed <strong className="text-gray-900">5+ custom MCP servers</strong> reducing manual tasks by <strong className="text-gray-900">70%</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Built multi-agent systems using OpenAI Agents SDK for complex task orchestration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">•</span>
                      <span>Created documentation tool processing <strong className="text-gray-900">10,000+ lines of code</strong> with 92% accuracy</span>
                    </li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Python', 'TypeScript', 'OpenAI SDK', 'MCP', 'FastAPI'].map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-base font-bold text-blue-800 uppercase tracking-wide mb-4 pb-2 border-b-2 border-blue-600">
                Education
              </h2>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      Governor's Initiative for AI & Computing (GIAIC)
                    </h3>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4 font-semibold bg-blue-200 px-3 py-1 rounded-full">2024 - 2026</span>
                  </div>
                  <p className="text-sm text-blue-700 font-semibold mb-2">Certificate in AI, Web Development & Cloud Computing</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Completed intensive training in AI/ML, Full-Stack Development, and Cloud Computing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Specialized in OpenAI Agents SDK, Model Context Protocol, Next.js, and Python</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-baseline justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Intermediate (Pre-Engineering)</h3>
                    <p className="text-sm text-gray-700">Science Stream - In Progress</p>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4 font-semibold">Present</span>
                </div>

                <div className="flex items-baseline justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Matriculation</h3>
                    <p className="text-sm text-gray-700">Science - Completed</p>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4 font-semibold">2022</span>
                </div>
              </div>
            </section>

            {/* Additional Information */}
            <section>
              <h2 className="text-base font-bold text-blue-800 uppercase tracking-wide mb-3 pb-2 border-b-2 border-blue-600">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900 block mb-1">Languages</span>
                  <p className="text-gray-700">English (Professional)<br/>Urdu (Native)<br/>Sindhi (Native)</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900 block mb-1">Availability</span>
                  <p className="text-gray-700">Remote opportunities<br/>Open to relocation</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900 block mb-1">Interests</span>
                  <p className="text-gray-700">AI/ML Research<br/>Open Source<br/>3D Graphics</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white text-center py-4 px-8">
            <p className="text-sm font-medium">
              Available for remote opportunities worldwide • Passionate about AI & Innovation
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
            margin: 0.35in 0.4in;
            size: letter;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Aggressive font size reduction */
          h1 {
            font-size: 26px !important;
            margin-bottom: 2px !important;
          }
          h2 {
            font-size: 12px !important;
            margin-bottom: 6px !important;
            padding-bottom: 3px !important;
          }
          h3 {
            font-size: 12px !important;
            margin-bottom: 3px !important;
          }
          p, li, span, div {
            font-size: 10px !important;
            line-height: 1.3 !important;
          }

          /* Aggressive spacing reduction */
          section {
            margin-bottom: 8px !important;
            page-break-inside: avoid;
          }
          .px-10 {
            padding-left: 0.5in !important;
            padding-right: 0.5in !important;
          }
          .py-10 {
            padding-top: 0.35in !important;
            padding-bottom: 0.35in !important;
          }
          .py-8 {
            padding-top: 0.2in !important;
            padding-bottom: 0.2in !important;
          }
          .py-4 {
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
          .space-y-8 > * + * {
            margin-top: 8px !important;
          }
          .space-y-6 > * + * {
            margin-top: 6px !important;
          }
          .space-y-4 > * + * {
            margin-top: 5px !important;
          }
          .space-y-3 > * + * {
            margin-top: 4px !important;
          }
          .space-y-2 > * + * {
            margin-top: 3px !important;
          }
          .space-y-1 > * + * {
            margin-top: 2px !important;
          }
          .p-5 {
            padding: 8px !important;
          }
          .p-4 {
            padding: 7px !important;
          }
          .p-3 {
            padding: 6px !important;
          }
          .mb-1 {
            margin-bottom: 2px !important;
          }
          .mb-2 {
            margin-bottom: 4px !important;
          }
          .mb-3 {
            margin-bottom: 5px !important;
          }
          .mb-4 {
            margin-bottom: 6px !important;
          }
          .mb-5 {
            margin-bottom: 8px !important;
          }
          .mt-3 {
            margin-top: 5px !important;
          }
          .gap-2 {
            gap: 3px !important;
          }
          .gap-3 {
            gap: 4px !important;
          }

          /* Make tech badges tiny */
          .rounded-full {
            font-size: 8px !important;
            padding: 1px 6px !important;
            display: inline-block !important;
          }

          /* Compact grid */
          .grid {
            gap: 6px !important;
          }

          /* Prevent orphans */
          .bg-blue-50 {
            page-break-inside: avoid;
          }
          ul {
            page-break-inside: avoid;
            margin-top: 3px !important;
            margin-bottom: 3px !important;
          }
          li {
            margin-bottom: 2px !important;
          }

          /* Compact header contact info */
          .text-sm {
            font-size: 9px !important;
          }
          .text-lg {
            font-size: 14px !important;
          }

          /* Reduce border widths */
          .border-l-4 {
            border-left-width: 3px !important;
          }
          .border-b-2 {
            border-bottom-width: 1px !important;
          }

          /* Make rounded corners smaller */
          .rounded-lg {
            border-radius: 4px !important;
          }
          .rounded-xl {
            border-radius: 6px !important;
          }
        }
      `}</style>
    </main>
  );
}
