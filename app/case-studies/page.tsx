'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { caseStudies } from '@/app/lib/caseStudies';
import CaseStudyCard from '@/app/components/sections/CaseStudyCard';

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#F1F5F9] to-[#3B82F6] bg-clip-text text-transparent">
            Case Studies
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Deep dives into my projects: problems solved, technologies used, and lessons learned
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CaseStudyCard
                slug={study.slug}
                title={study.title}
                tagline={study.tagline}
                coverImage={study.coverImage}
                category={study.category}
                date={study.date}
              />
            </motion.div>
          ))}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#3B82F6]/10 transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
