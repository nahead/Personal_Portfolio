# Image Optimization Guide

## Current Status
Next.js automatically optimizes images when using the `next/image` component with built-in features:
- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive sizing
- Blur placeholder

## Images to Optimize

### 1. OG Image (Social Media Preview)
**Location:** `public/og-image.png`
**Recommended Size:** 1200x630px
**Format:** PNG or WebP
**Action Required:** Create a professional OG image with:
- Your name and title
- Portfolio URL
- Tech stack icons
- Professional design matching portfolio theme

### 2. Resume PDF
**Location:** `public/resume.pdf`
**Action Required:** Add your professional resume PDF
- File name: `resume.pdf`
- Max size: 2MB
- Format: PDF
- Content: Professional CV with all experience, education, skills

### 3. Favicon
**Location:** `public/favicon.ico`
**Recommended:** Also add multiple sizes
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png` (180x180)
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

### 4. Project Images (Database)
Currently using emojis and base64 images. For better performance:
- Upload images to Vercel Blob or Cloudinary
- Use URLs instead of base64
- Let Next.js Image component handle optimization

## Next.js Image Component Usage

### Current Implementation
Most images use standard `<img>` tags. Convert to Next.js Image:

```tsx
// Before
<img src={project.icon} alt={project.title} />

// After
import Image from 'next/image';
<Image 
  src={project.icon} 
  alt={project.title}
  width={96}
  height={96}
  quality={90}
  loading="lazy"
/>
```

## Automatic Optimization Features

### Already Active
- ✅ Automatic format detection (WebP/AVIF)
- ✅ Responsive images
- ✅ Lazy loading
- ✅ Image caching

### To Enable
1. **Blur Placeholder:**
```tsx
<Image 
  src="/image.jpg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

2. **Priority Loading (Above Fold):**
```tsx
<Image 
  src="/hero-image.jpg"
  priority
/>
```

## Image CDN Options

### Option 1: Vercel Blob (Recommended)
```bash
npm install @vercel/blob
```
- Automatic optimization
- Global CDN
- Easy integration

### Option 2: Cloudinary
- Free tier: 25GB storage
- Advanced transformations
- URL-based optimization

### Option 3: Next.js Built-in
- Already configured
- Works with any image source
- No extra setup needed

## Performance Checklist

- [ ] Add og-image.png (1200x630)
- [ ] Add resume.pdf
- [ ] Add all favicon sizes
- [ ] Convert <img> to Next.js Image component
- [ ] Add blur placeholders for large images
- [ ] Use priority for above-fold images
- [ ] Compress existing images (TinyPNG/Squoosh)
- [ ] Set up image CDN (optional)

## Tools for Image Optimization

### Online Tools
- **Squoosh:** https://squoosh.app (Google's image optimizer)
- **TinyPNG:** https://tinypng.com (PNG/JPG compression)
- **SVGOMG:** https://jakearchibald.github.io/svgomg/ (SVG optimization)

### CLI Tools
```bash
# Install Sharp (already in Next.js)
npm install sharp

# Batch convert to WebP
npx @squoosh/cli --webp auto *.png
```

## Expected Performance Gains

After full optimization:
- **Load Time:** 30-50% faster
- **Bandwidth:** 60-80% reduction
- **Lighthouse Score:** +10-15 points
- **SEO Ranking:** Improved

## Current Next.js Config

The project already has optimal image settings in `next.config.ts`:
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## Action Items

1. **Immediate (This Weekend):**
   - Create og-image.png
   - Add resume.pdf
   - Add favicon variants

2. **Next Week:**
   - Convert img tags to Next.js Image
   - Add blur placeholders
   - Compress existing images

3. **Future:**
   - Set up image CDN
   - Implement dynamic image optimization
   - Add image upload optimization in admin
