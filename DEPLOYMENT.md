# Kashyap Patel Portfolio — Deployment Guide

## Quick Deploy to Vercel

### 1. Push to GitHub
```bash
cd kashyap-portfolio
git init
git add .
git commit -m "Initial portfolio setup"
gh repo create kashyap-portfolio --private --push --source .
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Click Deploy

---

## Adding Your Media

### Homepage Background Videos/Images
Add files to `public/homepage/`:
- `fashion.mp4` or `fashion.jpg`
- `food.mp4` or `food.jpg`  
- `jewellery.mp4` or `jewellery.jpg`
- `products.mp4` or `products.jpg`
- `interiors.mp4` or `interiors.jpg`

**Video specs:** H.264 MP4, 1920x1080, max 15MB each (use compressed versions for web)

### Gallery Pages
1. Add images/videos to the relevant public folder:
   - `public/fashion/` → fashion gallery
   - `public/food-hospitality/` → food gallery
   - `public/jewellery/` → jewellery gallery
   - `public/products/` → products gallery
   - `public/interiors/` → interiors gallery

2. Update the `media` array in the corresponding page:

```tsx
// app/fashion/page.tsx
const media: MediaItem[] = [
  { src: '/fashion/editorial-01.jpg', type: 'image', alt: 'Fashion editorial' },
  { src: '/fashion/campaign-01.jpg', type: 'image', alt: 'Campaign shoot' },
  { src: '/fashion/reel-01.mp4', type: 'video' },
  // Add as many as you want — masonry handles layout automatically
];
```

### Client Logos (Trusted By section)
1. Add logo files to `public/clients/`
2. Open `components/TrustedBySection.tsx`
3. Set `const hasLogos = true;`
4. Update the `clients` array with your logo paths:
```tsx
{ name: 'Brand Name', logo: '/clients/brandname.png' },
```
**Logo specs:** PNG with transparency, ~400x120px max, optimized

---

## Customization

### Colors
Edit `app/globals.css`:
```css
:root {
  --cream: #F2F2EF;     /* Background */
  --accent: #C7E200;    /* Highlight color */
  --dark: #0A0A0A;      /* Text */
}
```

### Contact Details
Already set to your details. To update, edit:
- `app/contact/page.tsx` — contact cards
- `components/Footer.tsx` — footer links
- `components/Navbar.tsx` — mobile menu footer

### SEO
Update `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: "Kashyap Patel — Photographer & Filmmaker",
  description: "Your description here",
  // Add openGraph image:
  openGraph: {
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};
```
Add `public/og-image.jpg` (1200×630px) for social sharing preview.

### Adding Google Analytics
In `app/layout.tsx`, add inside `<head>`:
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" />
```

---

## Project Structure
```
kashyap-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with Navbar
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── contact/page.tsx    # Contact page (dark)
│   ├── fashion/page.tsx    # Fashion gallery
│   ├── food-hospitality/   # Food gallery
│   ├── jewellery/          # Jewellery gallery
│   ├── products/           # Products gallery
│   └── interiors/          # Interiors gallery
├── components/
│   ├── Navbar.tsx          # Fixed nav + mobile menu
│   ├── HeroSection.tsx     # Homepage hero
│   ├── CategorySection.tsx # Full-screen video sections
│   ├── WhatWeDoSection.tsx # Services accordion
│   ├── TrustedBySection.tsx# Client logos
│   ├── CTASection.tsx      # Let's Create Together
│   ├── Footer.tsx          # Site footer
│   ├── GalleryPage.tsx     # Masonry gallery + lightbox
│   ├── CustomCursor.tsx    # Custom cursor
│   └── SmoothScroll.tsx    # Lenis smooth scroll
└── public/
    ├── homepage/           # Background videos/images
    ├── fashion/            # Fashion gallery media
    ├── food-hospitality/   # Food gallery media
    ├── jewellery/          # Jewellery gallery media
    ├── products/           # Products gallery media
    ├── interiors/          # Interiors gallery media
    └── clients/            # Client logo files
```

---

## Performance Tips
- Compress videos using Handbrake (CRF 28, H.264) before uploading
- Use WebP for images (convert with: `cwebp -q 85 input.jpg -o output.webp`)
- Vercel automatically handles image optimization via `next/image`
- Videos are lazy-loaded on mobile automatically
