# Attio DNA - Complete Animation & Design System Reference

**Purpose**: This document contains the complete extracted DNA from Attio.com for implementing in the Adapty redesign. All CSS, animations, and patterns were extracted directly via Chrome DevTools on December 18, 2025.

---

## Key Findings Summary

### Animation Libraries
- **NO external animation libraries** - Pure CSS animations
- Uses **CSS Houdini `@property`** for animatable custom properties
- **Tailwind CSS v4** animation utilities (`animate-in`, `fade-in`, `slide-in-from-*`)
- **Keen Slider** for carousels only
- **number-flow-react** for animated number transitions
- **Radix UI** for accordion/collapsible animations

### Animation Counts
- **49 custom @keyframes** animations
- **113 @property** CSS custom property registrations
- **12 unique easing curves**

---

## 1. The Colorful Gradient Border Animation (Hero Pill)

This is the "colorful thing running around" animation on the hero button/pill.

### CSS @property Registration
```css
@property --ai-hero-box-gradient-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}
```

### Gradient Background
```css
.ai-hero-box-gradient {
  background: conic-gradient(
    from var(--ai-hero-box-gradient-angle) at 50% 50%,
    #fd9038 0%,      /* Orange */
    #f5b900 12%,     /* Yellow */
    #ff5b59 37%,     /* Red/Coral */
    #266df0 62%,     /* Blue */
    #13dd8d 88%,     /* Green */
    #fd9038 100%     /* Orange - loops back */
  );
}
```

### Keyframe Animation
```css
@keyframes ai-hero-box-gradient-spin {
  0% { --ai-hero-box-gradient-angle: 0deg; }
  100% { --ai-hero-box-gradient-angle: 360deg; }
}

.ai-hero-box-gradient-progress {
  animation: 30s linear 0s infinite normal none running ai-hero-box-gradient-spin;
}
```

### Implementation Pattern
```tsx
// The animated pill component structure:
<div className="relative">
  {/* Background gradient layer (animated) */}
  <div className="absolute inset-0 rounded-full ai-hero-box-gradient ai-hero-box-gradient-progress" />

  {/* Inner content with slightly smaller dimensions to create border effect */}
  <div className="relative bg-white rounded-full px-4 py-2 m-[2px]">
    <span className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
      New: Feature announcement
    </span>
  </div>
</div>
```

---

## 2. Workflow Card Animation (Progress Border)

Used on the interactive workflow cards with step-by-step progress.

### CSS @property
```css
@property --workflows-card-gradient-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
```

### Keyframe (Non-linear easing)
```css
@keyframes rotate {
  0% { --workflows-card-gradient-angle: 0deg; }
  18% { --workflows-card-gradient-angle: 76deg; }
  27% { --workflows-card-gradient-angle: 104deg; }
  63% { --workflows-card-gradient-angle: 256deg; }
  72% { --workflows-card-gradient-angle: 284deg; }
  100% { --workflows-card-gradient-angle: 360deg; }
}
```

### Usage
```css
.workflows-hero-card {
  background-image: conic-gradient(#0fc27b var(--workflows-card-gradient-angle), transparent 0);
  animation-name: rotate;
  animation-fill-mode: forwards;
  animation-duration: var(--duration); /* Set via JS based on step timing */
  animation-timing-function: linear;
}
```

---

## 3. Reporting Card Border Animation

### CSS @property
```css
@property --reporting-hero-card-reports-gradient-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
```

### Keyframe
```css
@keyframes rotate-reporting {
  0% { --reporting-hero-card-reports-gradient-angle: 0deg; }
  100% { --reporting-hero-card-reports-gradient-angle: 360deg; }
}
```

### Usage
```css
.reporting-hero-card-reports {
  background: conic-gradient(
    from var(--reporting-hero-card-reports-gradient-angle),
    #709ff500 0%,      /* Transparent light blue */
    #709ff5aa 20%,     /* Semi-transparent light blue */
    #709ff500 27%      /* Transparent */
  );
  border-radius: 16px;
  animation: 10s linear 0s infinite normal none running rotate-reporting;
  position: absolute;
  inset: -1.5px; /* Creates the border effect */
}
```

---

## 4. Data Model Connection Animations (SVG)

Animated connection lines between cards.

```css
@keyframes data-model-cards-mobile-connection-container {
  0% { opacity: 1; }
  50% { opacity: 0.99; } /* Triggers repaint */
}

@keyframes data-model-cards-mobile-connection-forwards {
  0% { stroke-dashoffset: 1px; }
  100% { stroke-dashoffset: 0; }
}

@keyframes data-model-cards-mobile-connection-backwards {
  0% { stroke-dashoffset: -1px; }
  100% { stroke-dashoffset: 0; }
}
```

### Color Cycling Animation
```css
@property --data-model-progress-color-1 { syntax: "<color>"; inherits: false; initial-value: #d2d7de; }
@property --data-model-progress-color-2 { syntax: "<color>"; inherits: false; initial-value: #d2d7de; }
@property --data-model-progress-color-3 { syntax: "<color>"; inherits: false; initial-value: #d2d7de; }

@keyframes data-model-progress-process {
  0%, 100% {
    --data-model-progress-color-1: #d2d7de;
    --data-model-progress-color-2: #d2d7de;
    --data-model-progress-color-3: #d2d7de;
  }
  33%, 66% {
    --data-model-progress-color-1: #f5b900; /* Yellow */
    --data-model-progress-color-2: #ff5b59; /* Red */
    --data-model-progress-color-3: #266df0; /* Blue */
  }
}
```

---

## 5. Scroll-Triggered Animations (Tailwind animate-in)

Attio uses Tailwind CSS v4's built-in animation utilities with staggered delays.

### Animation Classes Pattern
```html
<!-- Fade in with slide from top, staggered delays -->
<div class="fade-in-0 fill-mode-both duration-300 opacity-0" style="animation-delay: 0.32s">
  <span class="slide-in-from-top-2 fill-mode-both duration-300">Content 1</span>
</div>
<div class="fade-in-0 fill-mode-both duration-300 opacity-0" style="animation-delay: 0.48s">
  <span class="slide-in-from-top-2 fill-mode-both duration-300">Content 2</span>
</div>
<div class="fade-in-0 fill-mode-both duration-300 opacity-0" style="animation-delay: 0.64s">
  <span class="slide-in-from-top-2 fill-mode-both duration-300">Content 3</span>
</div>
```

### Enter Animation Keyframe (Tailwind built-in)
```css
@keyframes enter {
  0% {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(
      var(--tw-enter-translate-x, 0),
      var(--tw-enter-translate-y, 0),
      var(--tw-enter-translate-z, 0)
    ) scale3d(
      var(--tw-enter-scale, 1),
      var(--tw-enter-scale, 1),
      var(--tw-enter-scale, 1)
    ) rotate(var(--tw-enter-rotate, 0));
  }
}
```

### Stagger Delay Pattern
- Base delay: 0.32s
- Increment: 0.16s per item
- Pattern: 0.32s → 0.48s → 0.64s → 0.80s

---

## 6. Navigation Animations

```css
@keyframes navigation-enter-from-right {
  0% { opacity: 0; filter: var(--navigation-hidden-filter); transform: translate(200px); }
  100% { opacity: 1; filter: var(--navigation-visible-filter); transform: translate(0px); }
}

@keyframes navigation-enter-from-left {
  0% { opacity: 0; filter: var(--navigation-hidden-filter); transform: translate(-200px); }
  100% { opacity: 1; filter: var(--navigation-visible-filter); transform: translate(0px); }
}

@keyframes navigation-appear {
  0% { opacity: 0; transform: var(--navigation-viewport-hidden-transform); }
  100% { opacity: 1; transform: var(--navigation-viewport-visible-transform); }
}
```

---

## 7. Reveal Animations (Mask-based)

```css
@keyframes reveal-to-right {
  0% { mask-position: 100% 0px; }
  100% { mask-position: 0px 0px; }
}

@keyframes reveal-to-bottom {
  0% { mask-position: 0px 100%; }
  100% { mask-position: 0px 0px; }
}
```

### Mask Gradient Patterns Used
```css
/* Fade to transparent at bottom */
mask: linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%);

/* Radial spotlight effect */
mask: radial-gradient(circle at 50% 80px, rgb(0, 0, 0) 40px, rgba(0, 0, 0, 0) 120px);

/* Edge fade */
mask: linear-gradient(0deg, rgb(0, 0, 0) 0px, rgba(0, 0, 0, 0) 64px);
```

---

## 8. Complete Easing Curves

```css
/* Primary - Smooth deceleration (MOST USED) */
--ease-smooth: cubic-bezier(0.2, 0, 0, 1);

/* Bounce - For playful interactions */
--ease-bounce: cubic-bezier(0.65, 0, 0.35, 1);

/* Standard ease-out */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Sharp start, smooth end */
--ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);

/* Symmetric ease */
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);

/* Very smooth */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);

/* Fast start */
--ease-out-expo: cubic-bezier(0, 0, 0, 1);

/* Linear for continuous animations */
--ease-linear: linear;
```

---

## 9. Transition Durations

| Duration | Usage |
|----------|-------|
| 0.1s | Micro-interactions (hover states) |
| 0.125s | Quick feedback |
| 0.15s | Button hover, focus states |
| 0.167s | Tab switches |
| 0.2s | Standard UI transitions |
| 0.25s | Dropdown menus |
| 0.3s | Panel animations |
| 0.375s | Modal transitions |
| 0.4s | **Primary transition** (color, bg, border) |
| 0.5s | Slide animations |
| 0.6s | Large element animations |
| 0.7s | Complex transitions |
| 1s | Long animations, loading |
| 10s | Continuous gradient rotations |
| 30s | Slow gradient border rotation |

---

## 10. Color Palette

### Gradient Colors (Brand Spectrum)
```css
--gradient-orange: #fd9038;
--gradient-yellow: #f5b900;
--gradient-red: #ff5b59;
--gradient-blue: #266df0;
--gradient-green: #13dd8d;
--gradient-cyan: #A3ECE9;
--gradient-light-blue: #709FF5;
```

### Neutral Colors
```css
--color-page-background: #FFFFFF; /* lab(99.9987% ...) */
--color-black-primary: #1a1a1f;   /* lab(12.7212 ...) - buttons */
--color-text-primary: #2a2a32;    /* lab(20.5697 ...) */
--color-text-secondary: #75777C;
--color-text-muted: #d2d7de;
--color-border: #E6E7EA;
```

---

## 11. Typography

```css
/* Font Families */
font-family: inter, "inter Fallback";                    /* Body */
font-family: interDisplay, "interDisplay Fallback";      /* Headlines */

/* H1 - Hero */
font-size: 64px;
font-weight: 600;
line-height: 64px;  /* 1.0 */
letter-spacing: -1.28px; /* -2% */

/* H2 - Section Headers */
font-size: 40px;
font-weight: 600;
line-height: 48px;

/* H3 - Card Headers */
font-size: 32px;
font-weight: 600;

/* Body */
font-size: 16px;
line-height: 24px; /* 1.5 */

/* Buttons */
font-size: 14px-15px;
font-weight: 500;
```

---

## 12. Component Patterns

### Button Styles
```css
.btn-primary {
  background-color: #1a1a1f; /* Near black */
  color: #f5f5f7;            /* Off-white */
  padding: 0px 12px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  height: 36px;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}

.btn-secondary {
  background-color: #FFFFFF;
  color: #2a2a32;
  padding: 0px 12px;
  border-radius: 10px;
  border: 1px solid #E6E7EA;
  font-weight: 500;
  font-size: 14px;
}
```

### Card Styles
```css
.card {
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px-16px;
  backdrop-filter: blur(4px);
}

.card-elevated {
  box-shadow:
    rgba(28, 40, 64, 0.06) 0px 2px 6px 0px,
    rgba(28, 40, 64, 0.08) 0px 6px 20px -2px;
}
```

---

## 13. All 49 Keyframe Animations

### Core UI
1. `ai-hero-box-gradient-spin` - Gradient border rotation
2. `rotate` - Workflow card progress
3. `rotate-reporting` - Reporting card border
4. `spin` - Loading spinner (360deg)
5. `pulse` - Pulsing opacity (50%)

### Data Model
6. `data-model-cards-mobile-connection-container` - Container trigger
7. `data-model-cards-mobile-connection-forwards` - Line draw forward
8. `data-model-cards-mobile-connection-backwards` - Line draw backward
9. `data-model-progress-process` - Color cycling

### Navigation
10. `navigation-enter-from-right` - Slide from right
11. `navigation-enter-from-left` - Slide from left
12. `navigation-exit-to-right` - Exit to right
13. `navigation-exit-to-left` - Exit to left
14. `navigation-appear` - Viewport appear
15. `navigation-disappear` - Viewport disappear

### Reveal/Fade
16. `reveal-to-right` - Mask reveal right
17. `reveal-to-bottom` - Mask reveal bottom
18. `fadeIn` - Simple fade in
19. `fadeOut` - Simple fade out
20. `enter` - Tailwind enter animation
21. `exit` - Tailwind exit animation

### Slide
22. `slideFromBottom` - Slide from bottom
23. `slideToBottom` - Slide to bottom
24. `slideFromTop` - Slide from top
25. `slideToTop` - Slide to top
26. `slideFromLeft` - Slide from left
27. `slideToLeft` - Slide to left
28. `slideFromRight` - Slide from right
29. `slideToRight` - Slide to right
30. `slideDown` - Accordion expand (Radix)
31. `slideUp` - Accordion collapse (Radix)

### Collapsible
32. `collapsibleSlideDown` - Collapsible expand
33. `collapsibleSlideUp` - Collapsible collapse

### Productivity/Special
34. `productivity-intro-width` - Width expansion
35. `productivity-intro-height` - Height expansion
36. `pricing-cards-grid-line-appear` - Grid line animation
37. `running` - Status running indicator
38. `completed` - Status completed indicator
39. `connection` - Connection opacity

### Swipe
40. `swipe-out-left` - Swipe dismiss left
41. `swipe-out-right` - Swipe dismiss right
42. `swipe-out-up` - Swipe dismiss up
43. `swipe-out-down` - Swipe dismiss down

### Toast (Sonner)
44. `sonner-fade-in` - Toast appear
45. `sonner-fade-out` - Toast disappear
46. `sonner-spin` - Toast loading

### Third-party
47. `intercom-lightweight-app-launcher` - Intercom button
48. `intercom-lightweight-app-gradient` - Intercom gradient
49. `intercom-lightweight-app-messenger` - Intercom messenger

---

## 14. Implementation Checklist for Adapty

### Priority 1: Hero Section
- [ ] Implement animated gradient border pill component
- [ ] Add staggered fade-in animations for stats
- [ ] Apply smooth easing to all transitions

### Priority 2: Feature Cards
- [ ] Create workflow-style animated progress borders
- [ ] Implement tab system with smooth transitions
- [ ] Add hover state animations with scale transform

### Priority 3: Scroll Animations
- [ ] Set up IntersectionObserver for scroll-triggered animations
- [ ] Implement staggered delays (0.16s increments)
- [ ] Add fade-in and slide-in-from-* animations

### Priority 4: Polish
- [ ] Apply mask gradients for edge fading
- [ ] Add number-flow-react for animated counters
- [ ] Implement smooth page transitions

---

## 15. Tailwind Config Additions

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient-spin': 'gradient-spin 30s linear infinite',
        'gradient-spin-fast': 'gradient-spin 10s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-in-bottom': 'slideFromBottom 0.5s cubic-bezier(0.2, 0, 0, 1) forwards',
      },
      keyframes: {
        'gradient-spin': {
          '0%': { '--gradient-angle': '0deg' },
          '100%': { '--gradient-angle': '360deg' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideFromBottom: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.2, 0, 0, 1)',
        'bounce': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
}
```

---

## 16. Required CSS for @property (Add to globals.css)

```css
/* CSS Houdini @property for animatable gradients */
@property --gradient-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}

@property --workflow-progress-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

/* Animated gradient border component */
.animated-gradient-border {
  background: conic-gradient(
    from var(--gradient-angle) at 50% 50%,
    #fd9038 0%,
    #f5b900 12%,
    #ff5b59 37%,
    #266df0 62%,
    #13dd8d 88%,
    #fd9038 100%
  );
  animation: gradient-spin 30s linear infinite;
}

@keyframes gradient-spin {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
```

---

*Extracted from Attio.com on December 18, 2025 via Chrome DevTools MCP*
*For use in Adapty redesign project - Part 2 Entry Task*
