export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  coverImage: string;
  category: string;
  date: string;

  // Overview
  problem: string;
  solution: string;

  // Technical Details
  techStack: string[];
  architecture: string;

  // Results
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];

  // Process
  challenges: {
    title: string;
    description: string;
    solution: string;
  }[];

  learnings: string[];

  // Media
  screenshots: {
    url: string;
    caption: string;
  }[];

  codeSnippets: {
    title: string;
    language: string;
    code: string;
    description: string;
  }[];

  // Links
  githubUrl?: string;
  liveUrl?: string;
  demoVideo?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nai-chatbot',
    title: 'NAI: AI-Powered Portfolio Assistant',
    tagline: 'Building an intelligent chatbot with OpenAI Agents SDK',
    coverImage: '/projects/nai-cover.jpg',
    category: 'AI Development',
    date: '2026-03-15',

    problem: `Visitors to portfolios often have questions about the developer's skills, projects, and availability. Traditional static portfolios require users to hunt through multiple pages to find information. This creates friction and reduces engagement.

Additionally, I wanted to showcase my AI development skills in a practical, interactive way that would differentiate my portfolio from others.`,

    solution: `I built NAI (Nahead AI), an intelligent chatbot that serves as a virtual assistant for my portfolio. NAI can answer questions about my skills, projects, education, and availability in natural language.

The chatbot uses the OpenAI Agents SDK with Gemini API for cost-effective, fast responses. It includes context awareness, geolocation detection, and quick reply buttons for common questions.`,

    techStack: [
      'Python 3.11',
      'FastAPI',
      'OpenAI Agents SDK',
      'Gemini API',
      'Next.js 16',
      'TypeScript',
      'Framer Motion',
      'Zustand',
      'Render.com',
    ],

    architecture: `The system follows a client-server architecture:

**Frontend (Next.js):**
- React components for chat interface
- Zustand for state management
- Framer Motion for animations
- Real-time message streaming

**Backend (FastAPI):**
- RESTful API endpoints
- OpenAI Agents SDK integration
- Context management system
- Rate limiting and caching

**AI Layer:**
- Gemini 1.5 Flash model
- Custom agent instructions
- Conversation history management
- Tool integration for portfolio data`,

    metrics: [
      {
        label: 'Total Conversations',
        value: '1,834+',
        description: 'Conversations since launch',
      },
      {
        label: 'Average Response Time',
        value: '1.2s',
        description: 'From user input to AI response',
      },
      {
        label: 'User Satisfaction',
        value: '95%',
        description: 'Based on feedback and engagement',
      },
      {
        label: 'Uptime',
        value: '99.9%',
        description: 'Since deployment',
      },
    ],

    challenges: [
      {
        title: 'Response Time Optimization',
        description: 'Initial implementation had 3-5 second response times, which felt slow and hurt user experience.',
        solution: 'Switched from GPT-4 to Gemini Flash (3x faster), implemented response streaming, added optimistic UI updates, and cached common queries.',
      },
      {
        title: 'Context Management',
        description: 'The agent would forget previous conversation context, leading to repetitive or inconsistent responses.',
        solution: 'Implemented a conversation history system that maintains the last 10 messages, added a memory layer for important facts, and optimized prompt engineering.',
      },
      {
        title: 'Cost Control',
        description: 'API costs were adding up quickly with high traffic and long conversations.',
        solution: 'Implemented request caching, rate limiting on the frontend, optimized prompts to reduce token usage, and switched to Gemini\'s cost-effective pricing.',
      },
    ],

    learnings: [
      'Start with the simplest solution that works. I initially tried to build a complex multi-agent system, but a single well-configured agent proved more effective.',
      'User experience trumps features. A fast, simple chatbot is better than a slow, feature-rich one.',
      'Real user testing is invaluable. Friends and family found bugs and UX issues I never noticed.',
      'Monitor everything. Logging response times, error rates, and popular questions helped me continuously improve NAI.',
      'Cost optimization matters. Without caching and rate limiting, API costs would have been 5x higher.',
    ],

    screenshots: [
      {
        url: '/projects/nai-chat-interface.jpg',
        caption: 'Clean chat interface with quick reply buttons',
      },
      {
        url: '/projects/nai-mobile.jpg',
        caption: 'Mobile-optimized design with smooth animations',
      },
      {
        url: '/projects/nai-context.jpg',
        caption: 'Context-aware responses based on user location',
      },
    ],

    codeSnippets: [
      {
        title: 'Agent Configuration',
        language: 'python',
        code: `from openai_agents import Agent

agent = Agent(
    name="NAI",
    model="gemini-1.5-flash",
    instructions="""
    You are NAI, Nahead Jokhio's AI assistant.

    Your role:
    - Help visitors learn about Nahead's skills and projects
    - Provide accurate information from the portfolio
    - Be friendly, professional, and concise
    - Suggest relevant sections when appropriate

    Available information:
    - Skills: Python, TypeScript, Next.js, FastAPI, MCP, OpenAI Agents SDK
    - Projects: NAI Chatbot, 3D Portfolio, MCP Integration
    - Education: GIAIC IT Course (2024-2026)
    - Location: Karachi, Pakistan
    - Availability: Open to opportunities
    """,
    tools=[get_portfolio_data, get_project_details]
)`,
        description: 'Agent setup with custom instructions and tools',
      },
      {
        title: 'FastAPI Endpoint',
        language: 'python',
        code: `@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Get user message
        message = request.message
        session_id = request.session_id

        # Retrieve conversation history
        history = get_conversation_history(session_id)

        # Run agent with context
        response = await agent.run(
            message,
            context=history
        )

        # Save to history
        save_message(session_id, message, response)

        return {
            "response": response,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return {"error": "Something went wrong"}`,
        description: 'API endpoint handling chat requests with error handling',
      },
      {
        title: 'Frontend Integration',
        language: 'typescript',
        code: `const sendMessage = async (text: string) => {
  setLoading(true);

  // Optimistic update
  const userMessage = { role: 'user', content: text };
  setMessages(prev => [...prev, userMessage]);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        session_id: sessionId
      })
    });

    const data = await response.json();

    // Add AI response
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: data.response
    }]);
  } catch (error) {
    console.error('Chat error:', error);
    // Show error message
  } finally {
    setLoading(false);
  }
};`,
        description: 'React hook for sending messages with optimistic updates',
      },
    ],

    githubUrl: 'https://github.com/nahead/nai-chatbot',
    liveUrl: 'https://naheadjokhio.vercel.app',
  },
];
