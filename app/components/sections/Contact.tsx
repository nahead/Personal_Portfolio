'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useXPSystem } from '../../hooks/useXPSystem';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: '💻',
    handle: '@nahead',
    url: 'https://github.com/nahead',
    color: '#F1F5F9',
    description: 'Open source contributions',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    handle: 'Nahead Jokhio',
    url: 'https://www.linkedin.com/in/nahead/',
    color: '#0A66C2',
    description: 'Professional network',
  },
  {
    name: 'Twitter',
    icon: '🐦',
    handle: '@naheadj',
    url: 'https://twitter.com/naheadj',
    color: '#1DA1F2',
    description: 'Follow for updates',
  },
  {
    name: 'Email',
    icon: '📧',
    handle: 'naheadj@gmail.com',
    url: 'mailto:naheadj@gmail.com',
    color: '#3B82F6',
    description: 'Direct contact',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { triggerXP } = useXPSystem();
  const hasTriggeredViewXP = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggeredViewXP.current) {
      hasTriggeredViewXP.current = true;
      triggerXP('contact_viewed');
    }
  }, [isInView, triggerXP]);

  const handleEmailClick = async (e: React.MouseEvent, url: string) => {
    if (url === 'mailto:naheadj@gmail.com') {
      // Try to copy email to clipboard as fallback
      try {
        await navigator.clipboard.writeText('naheadj@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } catch (err) {
        console.log('Clipboard copy failed, mailto will open');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Formspree for direct email delivery
      const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      triggerXP('contact_submitted');

      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);

      // Fallback to mailto if Formspree fails
      const mailtoLink = `mailto:naheadj@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
      window.location.href = mailtoLink;

      alert('Opening your email client as fallback. Please send the message from there.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6] rounded-full filter blur-[128px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full filter blur-[128px] opacity-10" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[#3B82F6] mb-4">{'< Contact />'}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F1F5F9] mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-lg text-[#94A3B8]">Open to opportunities and collaborations</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Availability Card */}
            <div className="p-6 bg-[#1A2333] border border-[#1E3A5F] rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-[#10B981] rounded-full"
                />
                <span className="text-[#10B981] font-semibold">Available for work</span>
              </div>
              <p className="text-[#94A3B8] text-sm mb-3">
                Currently open to freelance projects, full-time opportunities, and exciting collaborations.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <span>⚡</span>
                <span>Typical response time: Within 24 hours</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  onClick={(e) => handleEmailClick(e, link.url)}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 p-4 bg-[#1A2333] border border-[#1E3A5F] rounded-xl transition-[border-color,box-shadow] duration-300 hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group relative"
                >
                  <div className="text-3xl">{link.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm text-[#94A3B8] mb-0.5">{link.description}</div>
                    <div className="font-semibold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                      {link.handle}
                    </div>
                  </div>
                  <div className="text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>

                  {/* Copied notification for email */}
                  {link.name === 'Email' && copiedEmail && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#10B981] text-white text-xs rounded-lg whitespace-nowrap"
                    >
                      Email copied to clipboard!
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#1A2333] border border-[#1E3A5F] rounded-xl text-center">
                <div className="text-2xl font-bold text-[#3B82F6] mb-1">PKT</div>
                <div className="text-xs text-[#94A3B8]">Timezone</div>
              </div>
              <div className="p-4 bg-[#1A2333] border border-[#1E3A5F] rounded-xl text-center">
                <div className="text-2xl font-bold text-[#3B82F6] mb-1">EN/UR</div>
                <div className="text-xs text-[#94A3B8]">Languages</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                  Your Name
                </label>
                <motion.div
                  animate={{
                    borderColor: focusedField === 'name' ? '#3B82F6' : '#1E3A5F',
                  }}
                  className="relative border rounded-xl overflow-hidden transition-colors"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-[#1A2333] text-[#F1F5F9] focus:outline-none"
                    required
                  />
                  {focusedField === 'name' && (
                    <motion.div
                      layoutId="activeField"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
                    />
                  )}
                </motion.div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                  Email Address
                </label>
                <motion.div
                  animate={{
                    borderColor: focusedField === 'email' ? '#3B82F6' : '#1E3A5F',
                  }}
                  className="relative border rounded-xl overflow-hidden transition-colors"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-[#1A2333] text-[#F1F5F9] focus:outline-none"
                    required
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      layoutId="activeField"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
                    />
                  )}
                </motion.div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                  Message
                </label>
                <motion.div
                  animate={{
                    borderColor: focusedField === 'message' ? '#3B82F6' : '#1E3A5F',
                  }}
                  className="relative border rounded-xl overflow-hidden transition-colors"
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#1A2333] text-[#F1F5F9] focus:outline-none resize-none"
                    required
                  />
                  {focusedField === 'message' && (
                    <motion.div
                      layoutId="activeField"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
                    />
                  )}
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full px-8 py-4 bg-[#3B82F6] text-white rounded-xl font-semibold transition-[box-shadow,opacity] duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </span>
                ) : submitSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <span>✓</span>
                    Message Sent!
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#10B981]/20 border border-[#10B981] rounded-xl text-[#10B981] text-sm text-center"
                >
                  Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
