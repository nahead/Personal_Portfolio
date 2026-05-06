'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readTime: string;
  coverImage?: string;
  content: string;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    async function compileMDX() {
      const compiled = await serialize(post.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      });
      setMdxSource(compiled);
    }
    compileMDX();
  }, [post.content]);

  return (
    <main className="min-h-screen bg-[#0B1120] pt-24 pb-16">
      <article className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#5B9EF7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full font-medium flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-[#F1F5F9] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E3A5F] flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.header>

        {/* Cover Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 rounded-2xl overflow-hidden border border-[#1E3A5F] bg-gradient-to-br from-[#3B82F6] to-[#1E3A5F] h-64 flex items-center justify-center relative"
        >
          <div className="absolute inset-0 bg-[#0B1120]/50" />
          <span className="text-8xl relative z-10">📝</span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {mdxSource ? (
            <MDXRemote {...mdxSource} />
          ) : (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-[#1E3A5F]"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#3B82F6]/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              More Articles
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow"
            >
              Get in Touch
            </Link>
          </div>
        </motion.footer>
      </article>
    </main>
  );
}
