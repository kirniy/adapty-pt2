# Visual Reference Guide - Adapty Redesign

This document provides visual analysis of the design reference sites and establishes the visual direction for the Adapty redesign.

---

## Task Requirements Recap

**Objective**: Redesign Adapty homepage + blog in the style of Attio / Linear / Vercel / Polar.sh

**Constraints**:
- **Light theme** (mandatory)
- CMS-powered blog (Sanity.io selected)
- Production-ready appearance
- Mobile responsive
- Static site (SSG for SEO/crawlers)
- Buttons/links don't need to function

---

## Design Reference Analysis

### 1. Attio (attio.com) - PRIMARY REFERENCE

**Screenshots**: `screenshots/reference/attio-hero.png`, `attio-homepage-full.png`

**Key Design Patterns**:
- **Background**: Pure white (#FFFFFF)
- **Typography**: Large, bold headlines with tight letter-spacing
- **Hero Structure**:
  - Small pill badge above headline ("Explore our integration with Granola")
  - Large centered headline with line breaks for impact
  - Subtitle in muted gray
  - Two CTA buttons (dark primary, light outline secondary)
- **Navigation**: Clean, minimal with dropdowns, "Sign in" + "Start for free" CTAs
- **Product Showcase**: Full-width dashboard screenshot below hero
- **Spacing**: Generous whitespace, sections clearly separated

**Design Tokens to Extract**:
```css
--attio-bg: #FFFFFF;
--attio-text-primary: #000000;
--attio-text-secondary: #6B7280;
--attio-border: #E5E7EB;
--attio-radius: 8px;
--attio-shadow: 0 1px 3px rgba(0,0,0,0.1);
```

---

### 2. Linear (linear.app) - DARK REFERENCE

**Screenshots**: `screenshots/reference/linear-hero.png`, `linear-homepage-full.png`

**Key Design Patterns**:
- **Background**: Very dark (#0A0A0A or similar)
- **Typography**: Extra large, bold headlines spanning multiple lines
- **Hero Structure**:
  - No badge, direct large headline
  - Subtitle explaining the product
  - Single primary CTA + text link
- **Product Showcase**: UI screenshots floating/overlapping
- **Animation**: Subtle motion and interactions

**Relevant for Light Theme**:
- Typography scale and weight
- Clean, focused messaging
- Product-forward presentation

---

### 3. Vercel (vercel.com) - DARK WITH COLORFUL VISUALS

**Screenshots**: `screenshots/reference/vercel-hero.png`, `vercel-homepage-full.png`

**Key Design Patterns**:
- **Background**: Black with colorful abstract visuals
- **Typography**: Large, centered headlines
- **Hero Structure**:
  - Centered headline + subtitle
  - Two CTA buttons side by side
  - Visual/artistic element below
- **Social Proof**: Customer testimonials with metrics below hero
- **Tabs/Categories**: Filter bar for different use cases

**Relevant for Light Theme**:
- CTA button arrangement
- Social proof with metrics
- Tab-based navigation for content

---

### 4. Polar.sh (polar.sh) - LIGHT THEME REFERENCE

**Screenshots**: `screenshots/reference/polar-hero.png`, `polar-homepage-full.png`

**Key Design Patterns**:
- **Background**: Off-white/white (#FFFFFF)
- **Typography**: Large, single-color headlines (black on white)
- **Hero Structure**:
  - Large centered headline
  - Single line subtitle
  - Two CTA buttons (white primary with border, dark secondary)
- **Feature Cards**:
  - Subtle gray/dark backgrounds
  - Clean typography
  - Small UI elements within cards
- **Layout**: Three-column feature grid

**Design Tokens to Extract**:
```css
--polar-bg: #FFFFFF;
--polar-card-bg: #18181B; /* dark cards on light bg */
--polar-text-primary: #000000;
--polar-text-secondary: #71717A;
--polar-accent: #22C55E; /* green accent */
--polar-radius: 12px;
```

---

## Adapty Current State Analysis

### Homepage (adapty.io)

**Screenshots**: `screenshots/adapty/adapty-hero.png`, `adapty-homepage-full.png`

**Current Design**:
- Light theme with white background
- Purple brand color (#6720FF)
- Hero with email input field + CTAs
- Product screenshots (dashboard + mobile paywall)
- "Trusted by" logo carousel
- Purple gradient accents

**Content to Preserve**:
- "Revenue management for in-app purchases" messaging
- Email signup flow in hero
- Trusted by logos (Feeld, Bumble, WeeWoo, AppNation, Almus, Impala Studios, HubX)
- Product screenshots showing analytics dashboard
- All feature sections and testimonials

---

### Blog (adapty.io/blog)

**Screenshots**: `screenshots/adapty/adapty-blog-hero.png`, `adapty-blog-full.png`

**Current Design**:
- Same light theme as homepage
- "Latest news and insights from Adapty" header
- Search bar + Language/Category filters
- Featured post with large image + excerpt
- Blog cards in grid layout
- Lead capture form inline

**Content to Preserve**:
- Category structure (Analytics, Android, iOS, General, etc.)
- Blog post metadata (date, read time, author)
- Featured post highlighting
- Search and filter functionality (visual only)

---

## Recommended Design Direction

### Primary Inspiration: Attio + Polar.sh Hybrid

**Rationale**: Both use light themes with clean, modern aesthetics. Attio provides excellent navigation and hero patterns, while Polar.sh shows effective feature card layouts.

### Color Palette (Light Theme)

```css
:root {
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAFA;
  --bg-tertiary: #F4F4F5;
  --bg-card: #FFFFFF;

  /* Text */
  --text-primary: #09090B;
  --text-secondary: #52525B;
  --text-tertiary: #A1A1AA;

  /* Brand (Adapty Purple) */
  --brand-primary: #6720FF;
  --brand-hover: #5519CC;
  --brand-light: #F5F3FF;

  /* Borders */
  --border-default: #E4E4E7;
  --border-subtle: #F4F4F5;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
}
```

### Typography Scale

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 (Hero) | 56px | 700 | --text-primary |
| H2 (Section) | 40px | 700 | --text-primary |
| H3 (Card) | 24px | 600 | --text-primary |
| Body | 16px | 400 | --text-secondary |
| Caption | 14px | 500 | --text-tertiary |

### Component Patterns

**Hero Section** (Attio-style):
```
┌─────────────────────────────────────────────────────────┐
│  [Small pill badge - "New: Feature X"]                  │
│                                                         │
│        Large Bold Headline                              │
│        On Multiple Lines                                │
│                                                         │
│  Subtitle text explaining the value proposition         │
│                                                         │
│  [Email Input      ] [Start for free] [Book a demo]    │
│                                                         │
│  "Trusted by 15,000+ apps"                              │
│  [Logo] [Logo] [Logo] [Logo] [Logo]                    │
└─────────────────────────────────────────────────────────┘
```

**Feature Cards** (Polar-style):
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Icon            │ │ Icon            │ │ Icon            │
│                 │ │                 │ │                 │
│ Feature Title   │ │ Feature Title   │ │ Feature Title   │
│                 │ │                 │ │                 │
│ Description     │ │ Description     │ │ Description     │
│ text here       │ │ text here       │ │ text here       │
│                 │ │                 │ │                 │
│ [Mini UI elem]  │ │ [Mini UI elem]  │ │ [Mini UI elem]  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

**Blog Cards** (Modern grid):
```
┌─────────────────────────┐
│  [Image 16:9]           │
├─────────────────────────┤
│  [Category Badge]       │
│                         │
│  Post Title Here        │
│  Max Two Lines          │
│                         │
│  Dec 18, 2025 · 5 min   │
└─────────────────────────┘
```

---

## Implementation Priorities

### Phase 1: Foundation
1. Next.js setup with TypeScript + Tailwind
2. Gilroy font integration
3. Design tokens in Tailwind config
4. Base component library (Button, Card, Input)

### Phase 2: Homepage
1. Navigation with dropdowns
2. Hero section with email capture
3. Trusted-by logo section
4. Feature sections (3-4)
5. Testimonials
6. CTA section
7. Footer

### Phase 3: Blog
1. Sanity CMS integration
2. Blog listing page
3. Category filter bar
4. Blog card component
5. Pagination

### Phase 4: Polish
1. Mobile responsiveness
2. Animations/transitions
3. SEO meta tags
4. Performance optimization

---

## File Structure Reference

```
/docs/screenshots/
├── reference/
│   ├── attio-hero.png
│   ├── attio-homepage-full.png
│   ├── linear-hero.png
│   ├── linear-homepage-full.png
│   ├── vercel-hero.png
│   ├── vercel-homepage-full.png
│   ├── polar-hero.png
│   └── polar-homepage-full.png
└── adapty/
    ├── adapty-hero.png
    ├── adapty-homepage-full.png
    ├── adapty-blog-hero.png
    └── adapty-blog-full.png
```

---

## Quick Reference Comparison

| Aspect | Attio | Linear | Vercel | Polar | Our Design |
|--------|-------|--------|--------|-------|------------|
| Theme | Light | Dark | Dark | Light | **Light** |
| Primary CTA | Dark | Light | Light | White/bordered | **Brand purple** |
| Hero Layout | Centered | Left-aligned | Centered | Centered | **Centered** |
| Product Shots | Full-width | Floating | Abstract | Cards | **Mixed** |
| Cards | White | Dark | Dark | Dark on light | **White with border** |
| Typography | Sans-serif | Sans-serif | Sans-serif | Sans-serif | **Gilroy** |

---

## Notes for Implementation

1. **Keep Adapty brand purple** (#6720FF) as primary color but use sparingly
2. **White/light gray backgrounds** throughout (not dark theme)
3. **Clean borders** instead of heavy shadows
4. **Generous whitespace** between sections (80-120px)
5. **Subtle hover states** with gentle transitions (200ms)
6. **Mobile-first** responsive approach
7. **Static generation** for all pages (SSG in Next.js)
