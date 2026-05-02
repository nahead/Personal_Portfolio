# Admin Dashboard Setup Guide

## Overview
Your portfolio now has a secret admin dashboard at `/admin` where you can manage projects after deployment.

## Local Setup

### 1. Environment Variables
Already configured in `.env.local`:
```env
DATABASE_URL=postgresql://neondb_owner:npg_1ByRPcIw4YQG@ep-muddy-dust-ao8pyptb-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
ADMIN_SECRET=your_secure_admin_password_here
```

**IMPORTANT**: Change `ADMIN_SECRET` to a strong password before deploying!

### 2. Initialize Database
Run this command once to create the projects table:

```bash
npm run dev
```

Then visit: `http://localhost:3000/api/admin/init`

Add this header in your browser (use a tool like Postman or curl):
```
Authorization: Bearer your_secure_admin_password_here
```

Or use curl:
```bash
curl -H "Authorization: Bearer your_secure_admin_password_here" http://localhost:3000/api/admin/init
```

### 3. Access Admin Dashboard
Visit: `http://localhost:3000/admin`

Login with the password you set in `ADMIN_SECRET`.

## Vercel Deployment

### 1. Add Environment Variables in Vercel
Go to your Vercel project settings → Environment Variables:

- `DATABASE_URL`: Your NeonDB connection string
- `ADMIN_SECRET`: Your secure admin password (use a strong password!)

### 2. Deploy
```bash
git add .
git commit -m "Add admin dashboard"
git push
```

Vercel will auto-deploy.

### 3. Initialize Production Database
After deployment, visit:
```
https://your-domain.vercel.app/api/admin/init
```

Use the same Authorization header with your production `ADMIN_SECRET`.

### 4. Access Production Dashboard
Visit: `https://your-domain.vercel.app/admin`

Login with your `ADMIN_SECRET` password.

## Features

### Add Project
- Click "Add Project" button
- Fill in all fields:
  - Title, Icon (emoji), Tagline
  - Short Description, Long Description
  - Tech Stack (comma-separated)
  - Status, Status Color (hex), Gradient (Tailwind classes)
  - Metrics (JSON format)
  - GitHub URL, Live URL (optional)
- Click "Create Project"

### Edit Project
- Click "Edit" on any project
- Update fields
- Click "Update Project"

### Delete Project
- Click "Delete" on any project
- Confirm deletion

## Security Notes

1. **Never commit your real `ADMIN_SECRET`** to git
2. Use a strong password (20+ characters, random)
3. The admin dashboard uses Bearer token authentication
4. Only authenticated requests can create/update/delete projects
5. GET requests (viewing projects) are public

## Project Data Structure

```typescript
{
  title: string;           // "NAI Portfolio Assistant"
  tagline: string;         // "AI-powered portfolio chatbot"
  description: string;     // Short description (1-2 sentences)
  long_description: string; // Detailed description
  tech: string[];          // ["Python", "FastAPI", "OpenAI SDK"]
  status: string;          // "Live", "Active", "Beta", "Completed"
  status_color: string;    // "#10B981" (hex color)
  gradient: string;        // "from-[#3B82F6] to-[#8B5CF6]" (Tailwind)
  icon: string;            // "🤖" (emoji)
  metrics: object;         // {"users": "500+", "uptime": "99.9%"}
  github_url?: string;     // Optional GitHub link
  live_url?: string;       // Optional live demo link
}
```

## Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` is correct in environment variables
- Check NeonDB dashboard for connection issues
- Ensure SSL mode is enabled

### Unauthorized Error
- Verify `ADMIN_SECRET` matches in both .env.local and your request
- Check Authorization header format: `Bearer your_password`

### Projects Not Showing
- Ensure database is initialized (`/api/admin/init`)
- Check browser console for errors
- Verify projects exist in database

## Dashboard URL
- Local: `http://localhost:3000/admin`
- Production: `https://your-domain.vercel.app/admin`

Keep this URL secret! Only share with trusted collaborators.
