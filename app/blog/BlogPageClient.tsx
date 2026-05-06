'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readTime: string;
  coverImage?: string;
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
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
            Blog
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Thoughts on AI, development, and building the future
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">
              Coming Soon
            </h2>
            <p className="text-[#94A3B8] max-w-md mx-auto">
              I'm working on some exciting articles about AI development, my journey, and technical tutorials. Stay tuned!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl overflow-hidden hover:border-[#3B82F6] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] h-full flex flex-col">
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="h-48 bg-gradient-to-br from-[#3B82F6] to-[#1E3A5F] relative overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-[#F1F5F9] mb-3 line-clamp-2 hover:text-[#3B82F6] transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[#94A3B8] text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-[#94A3B8] pt-4 border-t border-[#1E3A5F]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

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
