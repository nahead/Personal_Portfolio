# How to Add Your Real Projects

## Location
File: `app/components/sections/Projects.tsx`

## Structure
Each project needs these fields:

```typescript
{
  id: 1,                                    // Unique number
  title: 'Project Name',                    // Main title
  tagline: 'Short one-liner',              // Brief description
  description: 'Short description...',      // Card description (2-3 lines)
  longDescription: 'Detailed info...',      // Expanded view (3-4 lines)
  tech: ['Tech1', 'Tech2', 'Tech3'],       // Tech stack array
  status: 'Live',                           // Live/Active/Completed/Beta
  statusColor: '#10B981',                   // Color for status badge
  gradient: 'from-[#3B82F6] to-[#8B5CF6]', // Tailwind gradient
  icon: '🤖',                               // Emoji icon
  metrics: {                                // Key metrics
    users: '500+',
    uptime: '99.9%',
    responseTime: '<200ms'
  },
}
```

## Status Colors
- **Live**: `#10B981` (Green)
- **Active**: `#3B82F6` (Blue)
- **Completed**: `#10B981` (Green)
- **Beta**: `#F59E0B` (Orange)
- **In Progress**: `#8B5CF6` (Purple)

## Gradient Options
Choose from these Tailwind gradients:
- `from-[#3B82F6] to-[#8B5CF6]` - Blue to Purple
- `from-[#10B981] to-[#3B82F6]` - Green to Blue
- `from-[#F59E0B] to-[#EF4444]` - Orange to Red
- `from-[#8B5CF6] to-[#EC4899]` - Purple to Pink
- `from-[#06B6D4] to-[#3B82F6]` - Cyan to Blue

## Example: Your Real Project

```typescript
{
  id: 1,
  title: 'E-Commerce Platform',
  tagline: 'Full-stack online store with payment integration',
  description: 'Built a complete e-commerce solution with product management, cart system, and Stripe payment integration.',
  longDescription: 'Developed a production-ready e-commerce platform featuring user authentication, product catalog, shopping cart, order management, and secure payment processing. Includes admin dashboard for inventory management.',
  tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
  status: 'Live',
  statusColor: '#10B981',
  gradient: 'from-[#3B82F6] to-[#8B5CF6]',
  icon: '🛒',
  metrics: { 
    products: '500+', 
    orders: '1K+', 
    revenue: '$50K+' 
  },
}
```

## Steps to Add Your Projects

1. Open `app/components/sections/Projects.tsx`
2. Find the `PROJECTS` array (line 6)
3. Replace the example projects with your real projects
4. Make sure each project has a unique `id`
5. Choose appropriate emoji icons from: https://emojipedia.org
6. Save the file

## Tips

- Keep descriptions concise and impactful
- Use metrics that showcase your project's success
- Choose tech stack items that are most relevant
- Use emojis that represent your project well
- Test the expanded view by clicking "View Details"

## Need Help?

Tell me about your projects and I'll format them for you! Include:
- Project name
- What it does
- Technologies used
- Current status
- Any impressive metrics (users, performance, etc.)
