# Adapty Part 2 - Documentation

This folder contains comprehensive documentation for the Adapty website redesign project.

## Task Overview

**Goal**: Create a redesigned content copy of adapty.io (homepage + blog) in the style of attio/linear/vercel/polar.sh

**Requirements**:
- Light theme (mandatory)
- CMS-connected blog (Sanity.io)
- Production-ready appearance
- Mobile responsive
- Static site (SSG for SEO - content visible in view-source)
- Buttons/links visual only (don't need to function)

## Documentation Files

| File | Description |
|------|-------------|
| [VISUAL_REFERENCE.md](./VISUAL_REFERENCE.md) | **NEW** - Design analysis with screenshots of all reference sites |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Colors, typography, spacing, and component specifications |
| [CONTENT_STRUCTURE.md](./CONTENT_STRUCTURE.md) | Homepage sections and blog structure with actual content |
| [CMS_SETUP.md](./CMS_SETUP.md) | Complete Sanity.io setup guide with schemas and queries |
| [ASSETS_INVENTORY.md](./ASSETS_INVENTORY.md) | Full inventory of copied assets from original project |

## Screenshots

Visual references captured from live sites are in `/docs/screenshots/`:

```
screenshots/
├── reference/           # Design reference sites
│   ├── attio-hero.png
│   ├── attio-homepage-full.png
│   ├── linear-hero.png
│   ├── linear-homepage-full.png
│   ├── vercel-hero.png
│   ├── vercel-homepage-full.png
│   ├── polar-hero.png
│   └── polar-homepage-full.png
└── adapty/              # Current Adapty site
    ├── adapty-hero.png
    ├── adapty-homepage-full.png
    ├── adapty-blog-hero.png
    └── adapty-blog-full.png
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Framework (App Router, SSG) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Sanity.io | Headless CMS |
| Vercel | Deployment |

## Key Decisions

1. **Font**: Gilroy (maintaining brand consistency)
2. **CMS**: Sanity.io (free tier, excellent Next.js integration)
3. **Design**: Light theme inspired by Vercel/Polar.sh aesthetic

## Project Structure

```
adapty-pt2/
├── docs/           # This folder - documentation
├── public/
│   ├── fonts/      # Gilroy font files (81 files)
│   ├── icons/      # UI and social icons
│   ├── flags/      # Language switcher flags
│   ├── logos/      # Adapty and partner logos
│   ├── images/     # Feature images, testimonials
│   └── assets/     # Integrations, case studies
├── src/            # (To be created) Next.js app
├── sanity/         # (To be created) Sanity schemas
└── package.json    # (To be created)
```

## Getting Started

1. Initialize Next.js project:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
   ```

2. Install Sanity:
   ```bash
   npm install @sanity/client @sanity/image-url next-sanity
   npx sanity@latest init --env
   ```

3. Follow guides in this folder to implement

## Deliverables

1. Hosted page on Vercel
2. GitHub repository showing work timeline
3. Prompt history (screenshots)

---

*Created for Adapty entry task Part 2*
