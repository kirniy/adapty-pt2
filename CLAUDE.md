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
- **Project ID**: _(to be added after Vercel setup)_
- **Production URL**: _(to be added after deployment)_
- **Framework**: Next.js (auto-detected)

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
│   ├── ASSETS_INVENTORY.md # Asset inventory
│   └── screenshots/       # Visual references
│       ├── reference/     # Attio, Linear, Vercel, Polar
│       └── adapty/        # Current Adapty site
├── public/                # Static assets
│   ├── fonts/             # Gilroy font files (81)
│   ├── icons/             # UI and social icons
│   ├── flags/             # Language flags
│   ├── logos/             # Adapty + partner logos
│   ├── images/            # Feature images, testimonials
│   └── assets/            # Integrations, case studies
├── src/                   # (To create) Next.js app
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   └── lib/               # Utilities, Sanity client
└── sanity/                # (To create) CMS schemas
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

## Implementation Priority

### Phase 1: Foundation
1. `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir`
2. Configure Tailwind with design tokens
3. Set up Gilroy font
4. Create base components (Button, Card, Container)

### Phase 2: Homepage
1. Navigation (logo, links, CTAs)
2. Hero section (headline, email input, trusted-by)
3. Feature sections (SDK, Paywall, A/B Testing, Analytics)
4. Testimonials
5. CTA section
6. Footer

### Phase 3: Blog
1. Initialize Sanity: `npx sanity@latest init --env`
2. Create schemas (blogPost, category, author)
3. Add sample content
4. Build blog listing page
5. Category filter

### Phase 4: Polish
1. Mobile responsiveness
2. Animations
3. SEO meta tags
4. Verify SSG (view-source test)

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
- [ ] Deployed Vercel URL
- [ ] Sanity Studio accessible
- [ ] Homepage complete
- [ ] Blog page complete
- [ ] Mobile responsive
- [ ] SSG verified (view-source shows content)

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
