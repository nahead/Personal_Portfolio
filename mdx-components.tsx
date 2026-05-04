import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-[#F1F5F9] mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-[#F1F5F9] mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-[#F1F5F9] mb-3 mt-4">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-[#94A3B8] text-lg leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-[#94A3B8] mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-[#94A3B8] mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[#3B82F6] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-[#1A2333] text-[#3B82F6] px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#1A2333] border border-[#1E3A5F] rounded-xl p-4 overflow-x-auto mb-6">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#3B82F6] pl-4 italic text-[#94A3B8] my-4">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
