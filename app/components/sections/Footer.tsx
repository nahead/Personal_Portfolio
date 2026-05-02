'use client';

import { motion } from 'framer-motion';

const FOOTER_LINKS = {
  navigation: [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'GitHub', icon: '💻', href: 'https://github.com/nahead' },
    { name: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/nahead/' },
    { name: 'Email', icon: '📧', href: 'mailto:naheadj@gmail.com' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0F1A] border-t border-[#1E3A5F] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-50" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#F1F5F9] to-[#3B82F6] bg-clip-text text-transparent mb-4">
                Nahead Jokhio
              </h3>
              <p className="text-[#94A3B8] mb-6 max-w-md">
                18-year-old AI developer from Karachi, Pakistan. Building intelligent systems that
                solve real-world problems.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-[#10B981] rounded-full"
                />
                <span>Available for opportunities</span>
              </div>
            </motion.div>
          </div>

          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-[#F1F5F9] font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors inline-block hover:translate-x-1 duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-[#F1F5F9] font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors inline-flex items-center gap-2 hover:translate-x-1 duration-300"
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A5F] to-transparent mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#94A3B8] text-sm"
          >
            © {new Date().getFullYear()} Nahead Jokhio. Built with{' '}
            <span className="text-[#3B82F6]">Next.js 15</span> &{' '}
            <span className="text-[#3B82F6]">Three.js</span>
            {' · '}
            <a
              href="/humans"
              className="text-[#1E3A5F] hover:text-[#94A3B8] transition-colors"
            >
              humans
            </a>
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A2333] border border-[#1E3A5F] rounded-lg text-[#3B82F6] hover:border-[#3B82F6] transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <span className="text-sm font-semibold">Back to Top</span>
            <span className="text-lg">↑</span>
          </motion.button>
        </div>

        {/* Tech Stack Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'GSAP', 'Tailwind'].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-[#1A2333] text-[#94A3B8] border border-[#1E3A5F] rounded-full"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-50" />
    </footer>
  );
}
