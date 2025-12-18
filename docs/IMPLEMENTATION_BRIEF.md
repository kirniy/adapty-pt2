# Adapty Redesign - Implementation Brief

**Send this entire document to the implementing model.**

---

## Your Mission

You are redesigning **adapty.io** in the style of **Attio.com**. This is a visual redesign - you keep 100% of Adapty's content but apply Attio's design DNA, animations, and aesthetic.

**Project Location**: `/Users/kirniy/dev/adapty-pt2`
**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Sanity.io (blog)
**Theme**: Light mode only (mandatory)

---

## Critical Context

### What Already Exists
- Basic Next.js project is set up and running at `localhost:3000`
- Homepage at `src/app/page.tsx` is ~35% complete (missing major sections)
- Assets are in `/public/` (logos, images, icons, SDKs, integrations)
- Documentation in `/docs/` including `ATTIO_DNA.md` with all extracted CSS

### What's Wrong with Current Implementation
1. **Wrong headline**: Says "Grow your in-app subscription revenue" - should be "Revenue management for in-app purchases"
2. **Wrong trust count**: Shows "8,000+ apps" - should be "15,000+ apps"
3. **Missing 11+ major content sections** from adapty.io
4. **No Attio-style animations** implemented yet
5. **60+ unused assets** sitting in `/public/`

---

## Task 1: Implement the Animated Gradient Border Pill

This is the hero announcement pill with the colorful border animation.

### Add to `src/app/globals.css`:
```css
/* CSS Houdini @property for animatable gradients */
@property --gradient-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}

.animated-gradient-border {
  position: relative;
  border-radius: 9999px;
}

.animated-gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  padding: 2px;
  background: conic-gradient(
    from var(--gradient-angle) at 50% 50%,
    #fd9038 0%,
    #f5b900 12%,
    #ff5b59 37%,
    #266df0 62%,
    #13dd8d 88%,
    #fd9038 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: gradient-spin 30s linear infinite;
}

@keyframes gradient-spin {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
```

### Create `src/components/ui/AnimatedPill.tsx`:
```tsx
interface AnimatedPillProps {
  children: React.ReactNode;
}

export function AnimatedPill({ children }: AnimatedPillProps) {
  return (
    <div className="animated-gradient-border inline-flex">
      <div className="bg-white rounded-full px-4 py-1.5 text-sm font-medium">
        {children}
      </div>
    </div>
  );
}
```

---

## Task 2: Fix the Hero Section Content

### Current (WRONG):
```tsx
<h1>Grow your in-app subscription revenue</h1>
<p>Trusted by 8,000+ apps worldwide</p>
```

### Correct (from adapty.io):
```tsx
<AnimatedPill>
  <span className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    New: AI-Powered Paywall Builder
  </span>
</AnimatedPill>

<h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
  Revenue management<br />
  for in-app purchases
</h1>

<p className="text-xl text-foreground-secondary">
  Adapty helps mobile apps analyze and grow in-app subscription revenue
  with paywall A/B testing, instant analytics, and server-side purchase
  validation across iOS, Android, and cross-platform frameworks.
</p>

{/* Trust line */}
<p>Trusted by 15,000+ apps worldwide</p>
```

---

## Task 3: Add Missing Content Sections

The current page is missing these sections from adapty.io. Add them in order:

### 3.1 Stats Section (after hero)
```tsx
<Section className="py-16 border-y border-border-subtle">
  <Container>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { value: '$1B+', label: 'Revenue tracked' },
        { value: '15,000+', label: 'Apps powered' },
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '<50ms', label: 'API response' },
      ].map((stat, i) => (
        <div
          key={stat.label}
          className="opacity-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards"
          style={{ animationDelay: `${0.1 + i * 0.1}s` }}
        >
          <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
          <div className="text-foreground-secondary mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
  </Container>
</Section>
```

### 3.2 SDK Code Snippet Section
Show real code example with syntax highlighting. Use the SDK logos from `/public/sdks/`.

### 3.3 Full SDK Grid
Use all SDK icons: swift.svg, kotlin.svg, react-native.svg, flutter.svg, unity.svg, etc.

### 3.4 Integrations Carousel
Create a scrolling marquee using logos from `/public/integrations/`:
- amplitude.svg, appsflyer.svg, braze.svg, firebase.svg, mixpanel.svg, onesignal.svg, segment.svg, etc.

### 3.5 G2 Badges Section
Use badges from `/public/images/g2-badges/`:
- leader-winter-2025.svg
- high-performer-winter-2025.svg
- best-support-winter-2025.svg
- easiest-setup-winter-2025.svg
- momentum-leader-winter-2025.svg

### 3.6 Case Studies Grid
Cards linking to customer success stories with company logos.

### 3.7 Enterprise Section
Security badges, compliance info, SOC2, GDPR, etc.

### 3.8 Pricing Preview
Simple pricing tiers or "Start free" CTA.

---

## Task 4: Implement Attio-Style Animations

### 4.1 Add to Tailwind Config (`tailwind.config.ts`):
```ts
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.2, 0, 0, 1)',
        'bounce': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.2, 0, 0, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

### 4.2 Staggered Animation Pattern
Apply to all grid/list sections:
```tsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="opacity-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards duration-500"
    style={{ animationDelay: `${0.1 + index * 0.15}s` }}
  >
    {/* content */}
  </div>
))}
```

### 4.3 Scroll-Triggered Animations
Create a hook `useScrollAnimation.ts`:
```tsx
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

---

## Task 5: Apply Attio's Design Tokens

### Colors (update `tailwind.config.ts`):
```ts
colors: {
  background: {
    DEFAULT: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F4F5F6',
  },
  foreground: {
    DEFAULT: '#181818',
    secondary: '#75777C',
    muted: '#A1A1AA',
  },
  brand: {
    DEFAULT: '#6366F1', // Adapty purple
    light: '#EEF2FF',
  },
  border: {
    DEFAULT: '#E5E7EB',
    subtle: '#F3F4F6',
  },
  // Gradient colors for animated border
  gradient: {
    orange: '#fd9038',
    yellow: '#f5b900',
    red: '#ff5b59',
    blue: '#266df0',
    green: '#13dd8d',
  },
}
```

### Typography:
- Hero H1: 64px, font-weight 700, line-height 1.1, letter-spacing -2%
- Section H2: 48px, font-weight 700, letter-spacing -1%
- Body: 16px, line-height 1.5
- Buttons: 14-15px, font-weight 500

### Border Radius:
- Buttons: 10px
- Cards: 12-16px
- Pills: 9999px (full)

### Shadows:
```ts
boxShadow: {
  'card': '0 2px 8px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)',
  'elevated': '0 8px 30px rgba(0,0,0,0.08)',
}
```

---

## Task 6: Component Styling Updates

### Buttons
```tsx
// Primary button
<Button className="bg-foreground text-white hover:bg-foreground/90 rounded-[10px] px-4 h-10 font-medium transition-all duration-300 ease-smooth">
  Start for free
</Button>

// Secondary button
<Button variant="secondary" className="border border-border rounded-[10px] px-4 h-10 font-medium hover:bg-background-secondary transition-all duration-300 ease-smooth">
  Book a demo
</Button>
```

### Cards with Hover Effect
```tsx
<div className="group bg-white border border-border-subtle rounded-2xl p-6 transition-all duration-300 ease-smooth hover:shadow-card hover:-translate-y-1">
  {/* Card content */}
</div>
```

---

## Task 7: File Structure

Ensure these components exist:
```
src/
├── app/
│   ├── page.tsx              # Homepage (UPDATE THIS)
│   ├── globals.css           # Add gradient animation CSS
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── AnimatedPill.tsx  # CREATE
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── ...
│   ├── sections/
│   │   ├── Hero.tsx          # UPDATE with correct content
│   │   ├── Stats.tsx         # CREATE
│   │   ├── SDKGrid.tsx       # UPDATE to use all SDKs
│   │   ├── Integrations.tsx  # CREATE marquee
│   │   ├── G2Badges.tsx      # CREATE
│   │   ├── CaseStudies.tsx   # CREATE
│   │   └── ...
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
└── hooks/
    └── useScrollAnimation.ts # CREATE
```

---

## Task 8: Quality Checklist

Before considering done, verify:

- [ ] Animated gradient pill works in hero
- [ ] Correct headline: "Revenue management for in-app purchases"
- [ ] Correct count: "15,000+ apps"
- [ ] Stats section with staggered animations
- [ ] All SDK icons displayed
- [ ] Integrations marquee scrolling
- [ ] G2 badges displayed
- [ ] All hover states use `ease-smooth` (cubic-bezier(0.2, 0, 0, 1))
- [ ] Staggered animations on all grid sections
- [ ] Cards have hover lift effect
- [ ] Typography matches Attio specs
- [ ] Light theme only, clean white backgrounds
- [ ] Mobile responsive

---

## Reference Files

Read these files for complete context:
1. `/docs/ATTIO_DNA.md` - Complete CSS extractions, all 49 keyframes
2. `/docs/EXTRACTED_STYLES.md` - Design tokens
3. `/docs/CONTENT_STRUCTURE.md` - Full content inventory
4. `/docs/ASSETS_INVENTORY.md` - All available assets

---

## Priority Order

1. **First**: Fix hero content + add animated pill
2. **Second**: Add missing sections (Stats, Integrations, G2)
3. **Third**: Apply Attio animations globally
4. **Fourth**: Polish transitions and hover states
5. **Fifth**: Mobile responsiveness check

---

**Remember**: This is a REDESIGN. Keep ALL adapty.io content, apply Attio's visual style. The site should look like Attio built it for Adapty.
