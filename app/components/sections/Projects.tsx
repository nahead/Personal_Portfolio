'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  status: string;
  statusColor: string;
  gradient: string;
  icon: string;
  metrics: Record<string, string>;
  githubUrl?: string;
  liveUrl?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative bg-[#1A2333] border border-[#1E3A5F] rounded-2xl overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#3B82F6] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]">
        {/* Gradient Header */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            {project.icon.startsWith('data:') || project.icon.startsWith('http://') || project.icon.startsWith('https://') ? (
              <img
                src={project.icon}
                alt={project.title}
                className="w-24 h-24 object-contain"
              />
            ) : (
              <span className="text-7xl">{project.icon}</span>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={
                project.status === 'Live' || project.status === 'Active'
                  ? { scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
              style={{
                backgroundColor: `${project.statusColor}30`,
                color: project.statusColor,
                border: `1px solid ${project.statusColor}`,
              }}
            >
              {project.status}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Tagline */}
          <h3 className="text-2xl font-bold text-[#F1F5F9] mb-2">{project.title}</h3>
          <p className="text-sm text-[#3B82F6] mb-4">{project.tagline}</p>

          {/* Description */}
          <p className="text-[#94A3B8] mb-4 leading-relaxed">
            {isExpanded ? project.longDescription : project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="text-center p-2 bg-[#0B1120] rounded-lg border border-[#1E3A5F]">
                <div className="text-xs text-[#94A3B8] mb-1 capitalize">{key}</div>
                <div className="text-sm font-semibold text-[#3B82F6]">{value}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-semibold bg-[#0B1120] text-[#F1F5F9] border border-[#1E3A5F] rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              className="flex-1 px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-semibold text-sm transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Learn More'}
            </motion.button>
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold text-sm transition-colors duration-200 hover:bg-[#3B82F6]/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Code
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg font-semibold text-sm transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Demo
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/admin/projects');
        const data = await response.json();

        if (response.ok) {
          // Transform database format to component format
          const transformedProjects = data.projects.map((p: any) => ({
            id: p.id,
            title: p.title,
            tagline: p.tagline,
            description: p.description,
            longDescription: p.long_description,
            tech: p.tech,
            status: p.status,
            statusColor: p.status_color,
            gradient: p.gradient,
            icon: p.icon,
            metrics: p.metrics,
            githubUrl: p.github_url,
            liveUrl: p.live_url,
          }));
          setProjects(transformedProjects);
        } else {
          setError('Failed to load projects');
        }
      } catch (err) {
        setError('Error loading projects');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#0A0F1A]">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[#3B82F6] mb-4">{'< Projects />'}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F1F5F9] mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-[#94A3B8]">Building solutions that matter</p>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#94A3B8] mt-4">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-[#EF4444] text-lg">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#94A3B8] text-lg">No projects found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#3B82F6] text-white rounded-lg font-semibold transition-[box-shadow] duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            View All Projects on GitHub
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
