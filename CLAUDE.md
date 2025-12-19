# Adapty Part 2 - Project Configuration

This file contains essential project configuration and context for AI agents working on this project.

---

## Project Overview

**Project Name**: adapty-pt2
**Description**: Redesign of Adapty.io homepage and blog in modern SaaS style (Attio/Linear/Vercel/Polar.sh)

### Task Requirements (from assignment)
- Full content copy of adapty.io homepage
- Blog visible section (adapty.io/blog) with previews only
- Style: Attio / Linear / Vercel / Polar.sh aesthetic
- **Light theme** (mandatory)
- CMS connected for blog (Sanity.io)
- Production-ready appearance
- Mobile responsive
- Static site (SSG) - content visible in view-source for crawlers
- Buttons/links visual only (don't need to function)

---

## Repository & Deployment

### GitHub
- **Repository**: https://github.com/kirniy/adapty-pt2
- **Branch**: main
- **Visibility**: Public

### Vercel
- **Project Name**: adapty-pt2
- **Project ID**: prj_GqqfXstuzoThn4u3Z2ALWwGjomfd
- **Org ID**: team_wmpr3f4f8wYu7ZUqqOLy0uX0
- **Production URL**: https://adapty-pt2.vercel.app
- **Framework**: Next.js (auto-detected)
- **Git Integration**: Connected to kirniy/adapty-pt2 (auto-deploy on push)
- **PR Comments**: Enabled
- **Deployment Events**: Enabled

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | Framework (App Router, SSG) |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Sanity.io | Latest | Headless CMS for blog |
| Gilroy | - | Custom font (self-hosted) |

---

## Project Structure

```
adapty-pt2/
├── CLAUDE.md              # This file - AI context
├── docs/                  # Documentation
│   ├── README.md          # Project overview
│   ├── VISUAL_REFERENCE.md # Design analysis with screenshots
│   ├── DESIGN_SYSTEM.md   # Colors, typography, components
│   ├── CONTENT_STRUCTURE.md # Content for all sections
│   ├── CMS_SETUP.md       # Sanity.io setup guide
│   └── ASSETS_INVENTORY.md # Asset inventory
├── public/                # Static assets
│   ├── fonts/             # Gilroy font files (81)
│   ├── icons/             # UI, social, and SDK icons
│   ├── images/            # Feature images, case studies, testimonials
│   │   ├── case-studies/  # App icons for case studies (9)
│   │   ├── hero/          # Hero section images
│   │   └── features/      # Feature section images
│   └── logos/             # Adapty + partner/integration logos
├── src/                   # Next.js application
│   ├── app/               # App Router pages
│   │   ├── page.tsx       # Homepage (complete)
│   │   ├── blog/          # Blog listing & detail pages
│   │   ├── api/           # API routes (chat)
│   │   └── studio/        # Sanity Studio embed
│   ├── components/
│   │   ├── sections/      # Homepage sections (9 components)
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── ui/            # Base UI components
│   │   └── animations/    # Animation components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities, Sanity client
└── sanity/                # CMS configuration
    └── schemas/           # blogPost, author, category schemas
```

---

## Design System Quick Reference

### Colors
```css
--brand-primary: #6720FF;    /* Adapty purple */
--bg-primary: #FFFFFF;       /* White background */
--bg-secondary: #FAFAFA;     /* Off-white sections */
--text-primary: #09090B;     /* Near black text */
--text-secondary: #52525B;   /* Gray text */
--border-default: #E4E4E7;   /* Light borders */
```

### Typography
- **Font**: Gilroy (self-hosted in /public/fonts/)
- **H1**: 56px/700 (36px mobile)
- **H2**: 40px/700 (28px mobile)
- **Body**: 16px/400

### Key Components
- Buttons: 8px radius, 12px 24px padding
- Cards: 12px radius, subtle shadow
- Spacing: 4px base unit, 80-120px section gaps

---

## Implementation Status

### ✅ Phase 1: Foundation (COMPLETE)
- [x] Next.js 15 with TypeScript, Tailwind, ESLint, App Router
- [x] Tailwind configured with design tokens
- [x] Gilroy font self-hosted
- [x] Base UI components (Button, Card, Container, Section)

### ✅ Phase 2: Homepage (COMPLETE)
- [x] Navigation with dropdown menus
- [x] Hero section with email input, trust badges
- [x] Ebook promotional badge
- [x] Role cards (Developers, Marketers, App Owners)
- [x] SDK grid (10 platforms including Capacitor, KMP)
- [x] Feature scroll stack (Paywall, A/B Testing, Analytics)
- [x] Case studies (9 real Adapty cases with metrics)
- [x] G2 badges (Winter 2025)
- [x] Integrations marquee (24 integrations)
- [x] Enterprise section
- [x] Stats section (15,000+ apps)
- [x] Footer with all links

### ✅ Phase 3: Blog Infrastructure (COMPLETE)
- [x] Sanity Studio initialized and configured
- [x] Schemas created (blogPost, author, category)
- [x] Blog listing page with category filters
- [x] Blog detail page with Portable Text
- [x] Sanity client and queries set up

### 🔄 Phase 4: Blog Content (IN PROGRESS)
- [ ] Import 50 most recent blog posts from Adapty
- [ ] Download and host blog images locally
- [ ] Create authors and categories in Sanity

### ✅ Phase 5: Polish (COMPLETE)
- [x] Mobile responsive design
- [x] Framer Motion animations
- [x] SEO meta tags
- [x] SSG verified

---

## Sanity CMS

### Setup Commands
```bash
npm install @sanity/client @sanity/image-url next-sanity
npx sanity@latest init --env
```

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Schemas to Create
- `category` - Blog categories
- `author` - Blog authors
- `blogPost` - Blog posts with Portable Text

---

## Reference Sites

| Site | Theme | Key Patterns |
|------|-------|--------------|
| attio.com | Light | Clean hero, product screenshot |
| linear.app | Dark | Bold typography, floating UI |
| vercel.com | Dark | Colorful visuals, metrics |
| polar.sh | Light | Minimal, feature cards |

**Primary references for light theme**: Attio + Polar.sh

---

## Deliverables Checklist

- [x] GitHub repository (public)
- [x] Vercel project linked (adapty-pt2)
- [x] Sanity Studio accessible (embedded at /studio)
- [x] Homepage complete (all sections with real Adapty content)
- [x] Blog page complete (listing + detail pages)
- [x] Mobile responsive (tested on all breakpoints)
- [x] SSG verified (view-source shows content)
- [ ] Blog content imported (50 posts from Adapty)

---

## Important Notes

1. **Static Generation**: Use `generateStaticParams` for SSG
2. **Images**: Use `next/image` for optimization
3. **Fonts**: Self-hosted Gilroy, use `font-display: swap`
4. **CMS**: Sanity Studio must be deployable to show editing capability
5. **Light Theme**: Must be light (white background), not dark

---

## Quick Commands

```bash
# Development
npm run dev           # Start Next.js dev server
cd sanity && npm run dev  # Start Sanity Studio

# Build & Deploy
npm run build         # Build for production
vercel --prod         # Deploy to Vercel

# Sanity
npx sanity deploy     # Deploy Sanity Studio
```

---

## Contact

**Developer**: kirniy
**GitHub**: https://github.com/kirniy
**Project**: https://github.com/kirniy/adapty-pt2
