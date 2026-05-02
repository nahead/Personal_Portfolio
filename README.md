# Nahead Jokhio — World's Most Advanced Developer Portfolio

An AI-powered, interactive portfolio showcasing cutting-edge web technologies and intelligent user experiences.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion, GSAP + ScrollTrigger, Lenis (smooth scroll)
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **AI Integration**: OpenAI Agents SDK, Gemini API
- **Backend**: FastAPI (Python)
- **Database**: Upstash Redis (visitor memory)
- **Deployment**: Vercel (frontend), Render.com (backend)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/nahead-jokhio/portfolio.git
cd portfolio

# Install dependencies
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_NAI_BACKEND_URL=http://localhost:8000
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

## 🎨 Features

- **Smooth Scroll**: Lenis-powered buttery smooth scrolling
- **Custom Cursor**: Interactive cursor that responds to hover states
- **Loading Screen**: Animated loading experience
- **Hero Section**: Dynamic typing animation with gradient effects
- **About Section**: Personal story with statistics
- **Skills Section**: Interactive skill cards with hover effects
- **Education Timeline**: Visual journey through education
- **Projects Showcase**: Featured projects with tech stack
- **Contact Form**: Functional contact form with validation
- **NAI Chatbot**: AI-powered assistant (floating button)
- **Secret Terminal**: Hidden terminal (Ctrl+Shift+T)

## 🎯 Color System

```css
Primary: #0B1120 (Deep Navy)
Secondary: #1A2333 (Slate Blue)
Accent: #3B82F6 (Electric Blue)
Text Primary: #F1F5F9
Text Secondary: #94A3B8
Glow: rgba(59,130,246,0.2)
Border: #1E3A5F
Success: #10B981
```

## 📁 Project Structure

```
/app
  /components
    /ui          → Reusable UI components
    /sections    → Page sections (Hero, About, Skills, etc.)
    /three       → Three.js 3D components
    /effects     → Visual effects (Cursor, Loading, etc.)
  /hooks         → Custom React hooks
  /lib           → Utilities and constants
  /types         → TypeScript interfaces
  globals.css
  layout.tsx
  page.tsx
```

## 🚀 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 License

MIT License - feel free to use this as inspiration for your own portfolio!

## 👨‍💻 Developer

**Nahead Jokhio**  
18-year-old AI & Full Stack Developer from Karachi, Pakistan

- GitHub: [@nahead-jokhio](https://github.com/nahead-jokhio)
- Email: nahead.jokhio@example.com
- Location: Karachi, Pakistan

---

Built with ❤️ using Next.js 15 and cutting-edge web technologies.
