'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface CaseStudyCardProps {
  slug: string;
  title: string;
  tagline: string;
  coverImage: string;
  category: string;
  date: string;
}

export default function CaseStudyCard({
  slug,
  title,
  tagline,
  coverImage,
  category,
  date,
}: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${slug}`}>
      <motion.article
        whileHover={{ y: -5 }}
        className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl overflow-hidden hover:border-[#3B82F6] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] h-full flex flex-col group"
      >
        {/* Cover Image */}
        <div className="h-64 bg-gradient-to-br from-[#3B82F6] to-[#1E3A5F] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0B1120]/50 group-hover:bg-[#0B1120]/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">📱</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category & Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full font-medium">
              {category}
            </span>
            <span className="text-xs text-[#94A3B8]">
              {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-[#F1F5F9] mb-2 group-hover:text-[#3B82F6] transition-colors">
            {title}
          </h3>

          {/* Tagline */}
          <p className="text-[#94A3B8] mb-4 flex-1">{tagline}</p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-[#3B82F6] font-semibold group-hover:gap-3 transition-all">
            <span>Read Case Study</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
