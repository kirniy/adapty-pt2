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

### 🔄 Phase 4: Blog Content (PARTIAL - 23/48 posts)
- [x] Import 48 blog posts metadata from Adapty (titles, excerpts, categories, authors)
- [x] Download and host blog cover images locally (/public/blog/)
- [x] Download author avatars from Gravatar (/public/authors/)
- [x] Create authors and categories in Sanity
- [x] Import 23 posts with full Portable Text content
- [ ] Import remaining 25 posts (need to scrape when Firecrawl resets)

### ✅ Phase 5: Polish (COMPLETE)
- [x] Mobile responsive design
- [x] Framer Motion animations
- [x] SEO meta tags
- [x] SSG verified

---

## Sanity CMS

### Project Details
- **Project ID**: `r5c34qsa`
- **Dataset**: `production`
- **API Version**: `2025-12-19`
- **Studio URL**: https://adapty-pt2.vercel.app/studio

### API Token (Write Access)
```
skhXLNL5sRbExh4mLWoJ8X3lRKqsHKOFheVsajGhdt5dDn8alTnuj09lj50GHbJjREIOxn093gMoEx64c
```
Use with: `SANITY_API_TOKEN=<token> node scripts/update-post-content.mjs`

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=r5c34qsa
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-19
```

### Schemas
- `category` - Blog categories (7 categories imported)
- `author` - Blog authors with Gravatar avatars (5 authors imported)
- `blogPost` - Blog posts with Portable Text body

---

## Blog Content Import

### Current Status
- **48 posts** have metadata (title, excerpt, category, author, cover image)
- **23 posts** have full Portable Text content
- **25 posts** still need full content (have excerpts only)

### Scripts Location
All import scripts are in `/scripts/`:

| Script | Purpose |
|--------|---------|
| `blog-posts.json` | Metadata for all 48 posts |
| `crawled-content-raw.json` | Raw Firecrawl output (~3MB) |
| `process-crawled-content.mjs` | Converts markdown → Portable Text |
| `processed-blog-content.json` | 23 posts with full content |
| `update-post-content.mjs` | Updates Sanity with content |

### Posts Missing Full Content (25 posts)
These posts need to be scraped and imported:

```
paywall-newsletter-23
paywall-newsletter-22
paywall-newsletter-21
paywall-newsletter-20
how-health-and-fitness-apps-nail-upselling-on-ios
9-subscription-trends-dominating-2025
how-to-lower-cac-with-ad-platform-signals
state-of-in-app-subscriptions-2025-in-10-minutes
from-pmf-to-profit-in-subscription-app
quickstart-adapty-setup-guide-react-native-with-expo
wwdc25-what-apple-announced
how-to-build-personalized-paywalls
add-android-in-app-purchases-to-your-app
quickstart-adapty-setupguide-ios-with-swiftui
how-to-use-push-notifications-to-increase-app-revenue
quickstart-adapty-setup-guide-ios-with-uikit
guide-to-ad-testing
revenuecat-alternatives-why-i-switched-to-adapty
new-us-ruling-on-external-ios-payments
why-japanese-aso-creatives-need-different-strategy
why-your-web-to-app-funnel-is-broken-and-how-to-fix-it
how-to-optimize-aso-for-japan
what-is-web-to-app-and-how-does-it-work
february-adapty-updates-rich-text-smarter-taxes-and-more
what-japanese-paywalls-look-like-and-why-western-strategies-wont-work
```

### How to Import Remaining Posts

1. **Crawl remaining URLs with Firecrawl** (when API resets):
   ```javascript
   // Use Firecrawl MCP to crawl:
   const urls = [
     'https://adapty.io/blog/paywall-newsletter-23/',
     'https://adapty.io/blog/paywall-newsletter-22/',
     // ... all 25 URLs above
   ];
   // firecrawl_crawl or firecrawl_batch_scrape
   ```

2. **Save crawled content** to `scripts/crawled-content-raw.json`

3. **Process and import**:
   ```bash
   # Process markdown to Portable Text
   node scripts/process-crawled-content.mjs

   # Import to Sanity
   SANITY_API_TOKEN='skhXLNL5sRbExh4mLWoJ8X3lRKqsHKOFheVsajGhdt5dDn8alTnuj09lj50GHbJjREIOxn093gMoEx64c' \
     node scripts/update-post-content.mjs
   ```

### Markdown to Portable Text Conversion
The `process-crawled-content.mjs` script handles:
- Headers (h1-h4)
- Paragraphs with inline formatting (bold, italic, code, links)
- Bullet and numbered lists
- Blockquotes
- Code blocks
- Removes navigation, footer, share buttons, author bios

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
