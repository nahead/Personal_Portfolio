# Contact Form Setup Guide

The contact form is configured to send emails directly to **naheadj@gmail.com** using Formspree.

## Setup Steps (5 minutes)

### 1. Create Formspree Account
1. Go to https://formspree.io
2. Sign up for a free account (50 emails/month)
3. Verify your email address

### 2. Create a New Form
1. Click "New Form" in your Formspree dashboard
2. Name it: "Portfolio Contact Form"
3. Set email destination to: **naheadj@gmail.com**
4. Copy your Form ID (looks like: `xyzabc123`)

### 3. Add Form ID to Environment Variables
1. Open `.env.local` file
2. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xyzabc123
   ```
3. Save the file

### 4. Restart Development Server
```bash
npm run dev
```

## How It Works

- **Primary**: Form submits directly to Formspree → delivers to naheadj@gmail.com
- **Fallback**: If Formspree fails, opens user's email client with pre-filled message

## Features

✅ Direct email delivery to naheadj@gmail.com
✅ Spam protection (Formspree handles this)
✅ Email validation
✅ Reply-to field automatically set to sender's email
✅ Subject line: "Portfolio Contact from [Name]"
✅ Fallback to mailto if service is down

## Testing

1. Fill out the contact form on your portfolio
2. Click "Send Message"
3. Check naheadj@gmail.com inbox
4. Email should arrive within seconds

## Free Tier Limits

- 50 submissions per month
- Unlimited forms
- Email notifications
- Spam filtering

Need more? Upgrade to paid plan for unlimited submissions.

## Troubleshooting

**Form not working?**
- Check `.env.local` has correct Form ID
- Restart dev server after changing .env.local
- Verify Formspree form is active in dashboard

**Not receiving emails?**
- Check spam folder in naheadj@gmail.com
- Verify email address in Formspree dashboard
- Test with Formspree's test mode first
