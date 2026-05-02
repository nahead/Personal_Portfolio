import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nahead Jokhio — The Human',
  description: 'Not the portfolio. Not the AI. Just Nahead.',
};

export default function HumansPage() {
  // Trigger XP on mount
  if (typeof window !== 'undefined') {
    localStorage.setItem('nai_xp_humans', 'true');
  }

  return (
    <div
      className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6 py-20"
      style={{ cursor: 'default' }}
    >
      <div className="max-w-[560px] w-full">
        {/* URL Label */}
        <div
          className="text-[#3B82F6] mb-10"
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '12px',
          }}
        >
          nahead-portfolio.vercel.app/humans
        </div>

        {/* Heading */}
        <h1
          className="text-[#F1F5F9] mb-6"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
          }}
        >
          Hi. I&apos;m Nahead.
        </h1>

        {/* Body Content */}
        <div
          className="text-[#94A3B8] space-y-4"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            lineHeight: 1.8,
          }}
        >
          <p>
            Not the portfolio. Not the AI. Not the animations.
            <br />
            Just me.
          </p>

          <p>
            I&apos;m 18. I live near a motorway in Karachi, Pakistan —
            far from Silicon Valley, far from the startup world,
            far from where people expect developers to come from.
          </p>

          <p>
            My parents didn&apos;t know what programming was
            when I started. I didn&apos;t have a mentor.
            I had GIAIC, the internet, and a lot of curiosity.
          </p>

          <p>
            I learned Python. Then TypeScript. Then Next.js.
            Then FastAPI. Then MCP. Then AI Agents.
            One by one. Alone. From a village.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1E3A5F] my-6" />

        {/* Highlighted Paragraph */}
        <div
          className="text-[#F1F5F9] mb-4"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            lineHeight: 1.8,
          }}
        >
          <p>
            Everything you saw in this portfolio —
            I built it. Every line of code. Every animation.
            NAI — the AI you just talked to — I made that.
          </p>
        </div>

        {/* Back to Regular */}
        <div
          className="text-[#94A3B8]"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            lineHeight: 1.8,
          }}
        >
          <p>
            I&apos;m not saying this to impress you.
            I&apos;m saying it because it matters where it comes from.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1E3A5F] my-6" />

        {/* Final Message */}
        <div
          className="text-[#94A3B8] mb-8"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            lineHeight: 1.8,
          }}
        >
          <p>
            If you&apos;re reading this, you&apos;re curious.
            <br />
            I like curious people.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <h2
            className="text-[#F1F5F9] mb-3"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            Let&apos;s talk.
          </h2>

          <a
            href="mailto:naheadj@gmail.com"
            className="text-[#3B82F6] hover:underline block mb-2"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '14px',
            }}
          >
            naheadj@gmail.com
          </a>

          <a
            href="https://github.com/nahead"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors block"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '13px',
            }}
          >
            github.com/nahead
          </a>
        </div>

        {/* Footer Link */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-[#1E3A5F] hover:text-[#94A3B8] transition-colors"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
            }}
          >
            ← back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
