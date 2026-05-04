'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, Download, Globe, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Metric {
  label: string;
  value: number;
  suffix?: string;
  icon: any;
  color: string;
  trend: number;
}

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function MetricsDashboard() {
  const metrics: Metric[] = [
    {
      label: 'Portfolio Views',
      value: 12547,
      icon: Eye,
      color: '#3B82F6',
      trend: 23,
    },
    {
      label: 'NAI Conversations',
      value: 1834,
      icon: MessageSquare,
      color: '#10B981',
      trend: 45,
    },
    {
      label: 'Resume Downloads',
      value: 287,
      icon: Download,
      color: '#F59E0B',
      trend: 12,
    },
    {
      label: 'Unique Visitors',
      value: 8923,
      icon: Users,
      color: '#8B5CF6',
      trend: 18,
    },
  ];

  const countries = [
    { name: 'Pakistan', percentage: 35, flag: '🇵🇰' },
    { name: 'United States', percentage: 28, flag: '🇺🇸' },
    { name: 'United Kingdom', percentage: 15, flag: '🇬🇧' },
    { name: 'Canada', percentage: 12, flag: '🇨🇦' },
    { name: 'Others', percentage: 10, flag: '🌍' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#0B1120] relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-[#3B82F6]" />
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#F1F5F9] to-[#3B82F6] bg-clip-text text-transparent">
              Portfolio Impact
            </h2>
          </div>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Real-time metrics showing portfolio reach and engagement
          </p>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl p-6 hover:border-[#3B82F6] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>

              {/* Value */}
              <div className="text-3xl font-bold text-[#F1F5F9] mb-2">
                <AnimatedCounter end={metric.value} />
              </div>

              {/* Label */}
              <div className="text-[#94A3B8] text-sm mb-3">{metric.label}</div>

              {/* Trend */}
              <div className="flex items-center gap-1 text-[#10B981] text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+{metric.trend}% this month</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-[#3B82F6]" />
            <h3 className="text-2xl font-bold text-[#F1F5F9]">
              Geographic Distribution
            </h3>
          </div>

          <div className="space-y-4">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-[#F1F5F9] font-medium">
                      {country.name}
                    </span>
                  </div>
                  <span className="text-[#3B82F6] font-bold">
                    {country.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${country.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-[#94A3B8] text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
