# UI Components Research: Premium Libraries & Animations

Research compiled from 21st.dev, Magic UI, and GitHub for enhancing Adapty's landing page.

---

## Recommended Libraries

### Primary Libraries (Already Using)
| Library | Purpose | Status |
|---------|---------|--------|
| Framer Motion | Animations, scroll effects, layout transitions | ✅ Installed |
| Tailwind CSS | Utility-first styling | ✅ Installed |
| Lucide React | Icon set | ✅ Installed |

### Recommended Additions
| Library | Purpose | Install Command |
|---------|---------|-----------------|
| **Magic UI** | Premium animated components | `npx shadcn@latest add "https://magicui.design/r/[component]"` |
| **Animata** | Easy animated components | `npm install animata` |
| **Motion** | Production motion library | Already have via framer-motion |

---

## High-Value Components from Magic UI

### Text Animations
| Component | Description | Use Case |
|-----------|-------------|----------|
| **Number Ticker** | Animated counting numbers | Stats section (15,000+ apps) |
| **Text Reveal** | Scroll-triggered text reveal | Hero taglines |
| **Typing Animation** | Typewriter effect | Dynamic hero text |
| **Aurora Text** | Gradient aurora effect | Headlines |
| **Morphing Text** | Words that morph into each other | Feature highlights |

### Special Effects
| Component | Description | Use Case |
|-----------|-------------|----------|
| **Border Beam** | Animated border light | CTAs, cards (already using) |
| **Animated Beam** | Connection lines between elements | SDK integration diagram |
| **Shine Border** | Shimmering border effect | Premium cards |
| **Magic Card** | Spotlight hover effect | Feature cards |
| **Particles** | Floating particle effect | Hero background |

### Layout Components
| Component | Description | Use Case |
|-----------|-------------|----------|
| **Bento Grid** | Modern grid layout | Features section |
| **Marquee** | Infinite scroll carousel | Trusted by logos |
| **Dock** | macOS-style dock | Navigation alternative |
| **Avatar Circles** | Stacked avatar display | Social proof |

### Backgrounds
| Component | Description | Use Case |
|-----------|-------------|----------|
| **Dot Pattern** | SVG dot background | Hero, sections |
| **Grid Pattern** | Line grid background | Feature sections |
| **Flickering Grid** | Animated grid | Hero background |
| **Retro Grid** | Perspective grid | CTA sections |
| **Ripple** | Ripple animation | Button effects |

### Device Mocks
| Component | Description | Use Case |
|-----------|-------------|----------|
| **Safari** | Browser mockup | Dashboard screenshots |
| **iPhone** | iPhone mockup | Mobile app screenshots |

---

## Components from 21st.dev

### Highlighter Effect
```tsx
// Mouse-following spotlight effect on cards
import { HighlightGroup, HighlighterItem, Particles } from "@/components/ui/highlighter";
```
- Creates premium spotlight effect following mouse cursor
- Particles float within highlighted area
- Perfect for feature cards

### Animated Badge
```tsx
// Premium animated badge with beam effect
import { AnimatedBadge } from "@/components/ui/animated-badge";

<AnimatedBadge
  text="Introducing AI Paywalls"
  color="#6720FF"
  href="/features/ai"
/>
```
- Pulsing dot indicator
- SVG path animation
- Click-to-navigate support

### Animated Gradient Text
```tsx
// Shimmering gradient text animation
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
```
- Animated gradient moving through text
- Inner shadow for depth
- Good for announcements

### Timeline Animation
```tsx
// Scroll-triggered reveal animations
import { TimelineContent } from "@/components/ui/timeline-animation";
```
- Staggered reveal on scroll
- Blur-to-clear transition
- Good for testimonial sections

---

## Implementation Priority

### Phase 1: Quick Wins (Already Have/Easy to Add)
1. ✅ **Border Beam** - Already implemented
2. ✅ **Shimmer Button** - Already implemented
3. ✅ **Aurora Background** - Already implemented
4. ✅ **AI Thinking Shimmer** - Just created
5. ✅ **Dot Pattern** - Just created

### Phase 2: High Impact Additions
1. **Number Ticker** - Animate stats (15,000+ apps, $2B+ processed)
2. **Marquee** - Replace static logo row with infinite scroll
3. **Magic Card** - Upgrade feature cards with spotlight effect
4. **Text Reveal** - Add to testimonial quote

### Phase 3: Polish
1. **Particles** - Add floating particles to hero
2. **Animated Beam** - SDK connection diagram
3. **Safari/iPhone Mocks** - Device frames for screenshots
4. **Bento Grid** - Restructure features section

---

## Quick Implementation: Number Ticker

```bash
npx shadcn@latest add "https://magicui.design/r/number-ticker"
```

```tsx
import NumberTicker from "@/components/ui/number-ticker";

// In Stats section
<NumberTicker value={15000} className="text-5xl font-bold" />
<span className="text-foreground-secondary">+ apps</span>
```

---

## Quick Implementation: Marquee

```bash
npx shadcn@latest add "https://magicui.design/r/marquee"
```

```tsx
import Marquee from "@/components/ui/marquee";

<Marquee pauseOnHover className="[--duration:40s]">
  {logos.map((logo) => (
    <Image key={logo} src={`/logos/${logo}.svg`} ... />
  ))}
</Marquee>
```

---

## Attio-Specific Components to Build

### 1. Grid-Trace Glow (Mouse Spotlight on Dots)
```tsx
// Dots that illuminate near mouse cursor
<div className="relative">
  {/* Base dot grid */}
  <div style={{
    backgroundImage: "radial-gradient(#EEEFF1 1px, transparent 1px)",
    backgroundSize: "20px 20px"
  }} />
  {/* Mouse spotlight */}
  <div style={{
    backgroundImage: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y),
      rgba(64, 127, 242, 0.08), transparent 80%)`
  }} />
</div>
```

### 2. Floating Pill Navigation
```tsx
// Active state that animates between nav items
import { motion } from "framer-motion";

{isActive && (
  <motion.div
    layoutId="nav-pill"
    className="absolute inset-0 bg-[#F4F5F6] rounded-lg"
    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
  />
)}
```

### 3. CRM-Style Data Badge
```tsx
// Attio's status badge style
<span className="inline-flex items-center rounded-md px-1.5 py-0.5
  text-[11px] font-medium border border-[#B8D0FF]
  bg-[#E8F2FF]/50 text-[#407FF2]">
  Customer
</span>
```

---

## GitHub Resources

### Curated Lists
- **[awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)** - 200+ shadcn components
- **[awesome-shadcnui](https://github.com/2-fly-4-ai/awesome-shadcnui)** - 50+ animated components
- **[animata](https://github.com/codse/animata)** - Easy animated components

### Template Projects
- **Magic UI Pro** - Premium landing page templates
- **Fusion UI** - 150+ components combining shadcn + Magic UI

---

## CSS Techniques Discovered

### Hover Lag (Attio Style)
```css
/* Slow fade in, fast fade out - feels "sticky" */
.hover-effect {
  transition: opacity 400ms ease-in;
}
.hover-effect:not(:hover) {
  transition: opacity 150ms ease-out;
}
```

### Inner Glow Card
```css
/* Crisp edges on high-res displays */
.inner-glow {
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.1),
    0 0 0 1px #EEEFF1;
}
```

### Content Fade Mask
```css
/* Bleed content into background */
.content-fade {
  mask-image: linear-gradient(to right, black 85%, transparent 100%);
}
```

---

## Next Steps

1. Install Number Ticker for stats animation
2. Consider Marquee for logo section
3. Add Magic Card spotlight effect to feature cards
4. Implement Grid-Trace glow for hero background
5. Create floating pill navigation for sidebar
