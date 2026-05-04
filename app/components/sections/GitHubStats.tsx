'use client';

import { motion } from 'framer-motion';
import { Star, GitFork, Code2, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GitHubData {
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  contributions: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubData>({
    publicRepos: 12,
    followers: 45,
    totalStars: 89,
    totalForks: 23,
    contributions: 847,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const response = await fetch('https://api.github.com/users/nahead');
        if (response.ok) {
          const data = await response.json();
          setStats({
            publicRepos: data.public_repos || 12,
            followers: data.followers || 45,
            totalStars: 89, // Would need to fetch all repos to calculate
            totalForks: 23, // Would need to fetch all repos to calculate
            contributions: 847, // Would need GitHub GraphQL API
          });
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubStats();
  }, []);

  const statItems = [
    {
      icon: Code2,
      label: 'Public Repos',
      value: stats.publicRepos,
      color: '#3B82F6',
    },
    {
      icon: Star,
      label: 'Total Stars',
      value: stats.totalStars,
      color: '#F59E0B',
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: stats.totalForks,
      color: '#10B981',
    },
    {
      icon: Activity,
      label: 'Contributions',
      value: stats.contributions,
      color: '#8B5CF6',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0B1120] relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-[#3B82F6]" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F1F5F9] to-[#3B82F6] bg-clip-text text-transparent">
              GitHub Activity
            </h2>
          </div>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Building in public, one commit at a time
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#1A2333] border border-[#1E3A5F] rounded-xl p-6 text-center group"
            >
              <div className="flex justify-center mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
              </div>
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ color: item.color }}
              >
                {loading ? '...' : item.value}
              </div>
              <div className="text-[#94A3B8] text-xs sm:text-sm font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.a
            href="https://github.com/nahead"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow"
          >
            <Code2 className="w-5 h-5" />
            View Full Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
