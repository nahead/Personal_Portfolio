'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Ahmed Khan',
    role: 'Senior Developer',
    company: 'Tech Solutions Karachi',
    image: '👨‍💻',
    text: 'Nahead delivered an exceptional AI chatbot for our platform. His understanding of OpenAI Agents SDK and FastAPI is impressive for someone his age.',
    rating: 5,
  },
  {
    name: 'Sarah Ali',
    role: 'Product Manager',
    company: 'Digital Innovations',
    image: '👩‍💼',
    text: 'Working with Nahead was a great experience. He completed our Next.js project ahead of schedule with clean, maintainable code.',
    rating: 5,
  },
  {
    name: 'Dr. Imran Siddiqui',
    role: 'GIAIC Instructor',
    company: 'Governor Initiative AI',
    image: '👨‍🏫',
    text: 'One of the most dedicated students in our AI course. Nahead consistently goes beyond the curriculum to master advanced concepts.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-b from-[#0B1120] via-[#1A2333] to-[#0B1120] relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#F1F5F9] to-[#3B82F6] bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-[#94A3B8] text-lg sm:text-xl max-w-2xl mx-auto">
            Feedback from clients, colleagues, and mentors
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl p-6 sm:p-8 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-[#3B82F6]" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#3B82F6] text-xl">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#94A3B8] text-base sm:text-lg mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E3A5F] flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="text-[#F1F5F9] font-semibold text-base sm:text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#94A3B8] text-sm">
                    {testimonial.role}
                  </p>
                  <p className="text-[#3B82F6] text-xs font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6]/0 to-[#3B82F6]/0 group-hover:from-[#3B82F6]/5 group-hover:to-[#3B82F6]/10 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Add Your Testimonial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[#94A3B8] text-sm sm:text-base mb-4">
            Worked with me? Share your experience
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold text-sm sm:text-base hover:bg-[#3B82F6]/10 transition-colors"
          >
            Leave a Testimonial
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
