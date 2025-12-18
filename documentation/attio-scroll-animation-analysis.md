# Attio.com Scroll Animation Analysis

> Comprehensive technical documentation of the scroll-triggered animations on attio.com homepage, including the "karaoke" text reveal effect, sticky sections, and dotted background pattern.

## Table of Contents

1. [Overview](#overview)
2. [Animation Sequence](#animation-sequence)
3. [Technical Implementation](#technical-implementation)
4. [CSS Details](#css-details)
5. [JavaScript Implementation](#javascript-implementation)
6. [Replication Guide](#replication-guide)

---

## Overview

Attio's homepage features a sophisticated scroll-driven animation system that creates an engaging storytelling experience. The key components are:

1. **Hero Section** - Standard content that scrolls normally
2. **Sticky Testimonial Section** - Stays fixed while scrolling through a tall container
3. **Karaoke Text Effect** - Words progressively reveal from gray to black as you scroll
4. **Dotted/Striped Background** - Subtle diagonal line pattern

### Tech Stack
- **Framework**: Next.js (detected via `next-size-adjust` meta tag)
- **Styling**: Tailwind CSS with custom properties
- **Animation**: Custom scroll-linked animations (likely Framer Motion's `useScroll`)
- **Fonts**: Tiempos Text (serif), Inter (sans-serif)

---

## Animation Sequence

### Step-by-Step Flow

1. **Initial State (scroll: 0)**
   - Hero section visible with dashboard UI
   - Tab navigation (Data, Workflows, Reporting, Pipeline)
   - Trusted-by logos row

2. **Transition Phase (scroll: ~800-1200px)**
   - Hero content fades/scrolls up
   - Dotted background section enters viewport
   - Quote section becomes sticky

3. **Karaoke Effect (scroll: ~1200-3500px)**
   - Sticky section locks in place
   - Words progressively reveal from light gray to black
   - Each word animates: `translateY(100%) → translateY(0)` + `opacity: 0 → 1`
   - Attribution (name, title, company) also fades in

4. **Completion (scroll: ~3500-4154px)**
   - All text fully revealed
   - Section indicator appears ("[01] POWERFUL PLATFORM")
   - Sticky section releases, content continues scrolling

---

## Technical Implementation

### Section Structure

```html
<!-- Outer wrapper - creates scroll distance -->
<div class="relative w-full max-w-[1392px] border-subtle-stroke lg:border-x"
     style="height: 4154px;">

  <!-- Dotted background pattern -->
  <div class="text-surface-subtle absolute inset-x-0 top-[20px] bottom-[20px] lg:bottom-[80px] xl:bottom-[160px]"
       style="background: repeating-linear-gradient(125deg, transparent 0 6px, #f0f0f2 6px 7px);">
  </div>

  <!-- Sticky container - stays fixed during scroll -->
  <div class="sticky top-[var(--site-header-height)]
              grid h-[calc(100vh-var(--site-header-height))]
              w-full justify-center gap-[36px]
              lg:grid-rows-2 lg:gap-[52px] lg:px-6 lg:pt-[72px]">

    <!-- Quote content -->
    <div class="flex w-full flex-col gap-[24px] px-[20px] lg:gap-[28px] lg:px-[44px]">
      <p class="relative flex w-full flex-wrap text-quote-responsive">
        <!-- Individual word spans -->
        <span class="relative block overflow-clip pb-0.5 text-primary-foreground">
          <span class="inline-block will-change-transform"
                style="transform: translateY(0px); opacity: 1;">
            "When&nbsp;
          </span>
        </span>
        <!-- More word spans... -->
      </p>
    </div>

  </div>
</div>
```

### Key Measurements

| Property | Value | Description |
|----------|-------|-------------|
| Header Height | `calc(68px + 48px)` = 116px | Navigation + banner |
| Viewport Height | 1238px (example) | Full viewport |
| Sticky Height | `calc(100vh - 116px)` = 1122px | Available sticky area |
| Parent Height | 4154px | Creates ~3000px scroll distance |
| Scroll Distance | ~3038px | Parent - Viewport height |

### Scroll Progress Calculation

```javascript
// Scroll progress for the testimonial section
const scrollProgress = (scrollY - sectionTop) / (sectionHeight - viewportHeight);
// Result: 0 (start) to 1 (end)
```

---

## CSS Details

### CSS Custom Properties

```css
:root {
  /* Easing Functions */
  --ease-in-out: cubic-bezier(.2, 0, 0, 1);
  --ease-in-out-cubic: cubic-bezier(.65, 0, .35, 1);
  --ease-out: cubic-bezier(0, 0, 0, 1);
  --ease-out-cubic: cubic-bezier(.33, 1, .68, 1);

  /* Timing */
  --default-transition-duration: .15s;

  /* Layout */
  --site-header-height: calc(68px + 0px + 48px); /* nav + subheader + banner */
  --site-header-z-index: 92;

  /* Colors */
  --color-page-background: #ffffff;
  --color-primary-foreground: lab(10.7201 -0.0959039 -1.54182); /* Near black */
  --color-surface-subtle: lab(96.1596 -0.0828803 -1.13571); /* Light gray for dots */
}
```

### Dotted Background Pattern

```css
.dotted-background {
  position: absolute;
  inset-inline: 0;
  top: 20px;
  bottom: 160px; /* Varies by breakpoint */

  /* Diagonal striped pattern at 125 degrees */
  background-image: repeating-linear-gradient(
    125deg,
    transparent,
    transparent 6px,
    #f0f0f2 6px,    /* Light gray line */
    #f0f0f2 7px     /* 1px line thickness */
  );

  /* Alternative with CSS variables */
  background-image: repeating-linear-gradient(
    125deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 6px,
    var(--color-surface-subtle) 6px,
    var(--color-surface-subtle) 7px
  );
}
```

#### Pattern Breakdown
- **Angle**: 125 degrees (diagonal, top-left to bottom-right)
- **Gap**: 6px transparent
- **Line**: 1px colored (#f0f0f2 or similar light gray)
- **Repeat**: Every 7px

### Quote Typography

```css
.text-quote-responsive {
  /* Base styles */
  position: relative;
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  /* Typography */
  font-family: 'tiemposText', 'Georgia', serif;
  font-weight: 500;
  font-size: 28px; /* Responsive, varies by viewport */
  line-height: calc(1.3em - 2px); /* ~1.23 */
  letter-spacing: -0.42px;
  color: var(--color-primary-foreground);

  /* Responsive sizes */
  /* lg: */ font-size: 24px;
  /* xl: */ font-size: 28px;
  /* 2xl: */ font-size: 32px;

  /* Responsive widths */
  /* lg: */ min-width: 320px; max-width: 320px;
  /* min-[1078px]: */ min-width: 400px; max-width: 400px;
  /* xl: */ min-width: 520px; max-width: 520px;
  /* min-[1360px]: */ min-width: 600px; max-width: 600px;
  /* 2xl: */ min-width: 700px; max-width: 700px;
}
```

### Word Animation Structure

```css
/* Outer span - clips the animated word */
.word-container {
  position: relative;
  display: block;
  overflow: clip; /* Critical for hiding the sliding word */
  padding-bottom: 0.5rem; /* 2px - prevents text cutoff */
}

/* Inner span - the actual animated word */
.word {
  display: inline-block;
  will-change: transform; /* GPU acceleration hint */

  /* Initial state (hidden) */
  transform: translateY(100%);
  opacity: 0;

  /* Revealed state */
  transform: translateY(0px);
  opacity: 1;
}
```

### Sticky Section

```css
.sticky-testimonial {
  position: sticky;
  top: var(--site-header-height); /* 116px */
  height: calc(100vh - var(--site-header-height));

  /* Grid layout for content */
  display: grid;
  justify-content: center;
  gap: 36px;

  /* Responsive */
  /* lg: */ grid-template-rows: repeat(2, 1fr);
  /* lg: */ gap: 52px;
  /* lg: */ padding: 72px 24px 0;
}

/* Parent container - defines scroll height */
.sticky-parent {
  position: relative;
  width: 100%;
  max-width: 1392px;
  height: 4154px; /* Creates ~3000px scroll distance */

  /* Border styling */
  border-color: var(--color-subtle-stroke);
  /* lg: */ border-left-width: 1px;
  /* lg: */ border-right-width: 1px;
}
```

---

## JavaScript Implementation

### Scroll-Linked Animation Logic

The animation uses scroll position to calculate which words should be revealed. Here's a conceptual implementation:

```typescript
// React/Next.js implementation with Framer Motion
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface KaraokeTextProps {
  text: string;
  className?: string;
}

export function KaraokeText({ text, className }: KaraokeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Split text into words
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      <p className="relative flex flex-wrap">
        {words.map((word, index) => (
          <WordSpan
            key={index}
            word={word}
            index={index}
            totalWords={words.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}

interface WordSpanProps {
  word: string;
  index: number;
  totalWords: number;
  scrollProgress: MotionValue<number>;
}

function WordSpan({ word, index, totalWords, scrollProgress }: WordSpanProps) {
  // Calculate when this word should animate
  // Earlier words animate first, creating the karaoke effect
  const wordStart = index / totalWords;
  const wordEnd = (index + 1) / totalWords;

  // Transform scroll progress to word visibility
  const opacity = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [0, 1]
  );

  const y = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    ['100%', '0%']
  );

  return (
    <span className="relative block overflow-clip pb-0.5">
      <motion.span
        className="inline-block will-change-transform"
        style={{ opacity, y }}
      >
        {word}&nbsp;
      </motion.span>
    </span>
  );
}
```

### Vanilla JavaScript Alternative

```javascript
class KaraokeTextAnimation {
  constructor(container, options = {}) {
    this.container = container;
    this.words = container.querySelectorAll('.word');
    this.options = {
      threshold: 0.1,
      rootMargin: '-10% 0px -10% 0px',
      ...options
    };

    this.init();
  }

  init() {
    // Set up Intersection Observer for the container
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
    this.observer.observe(this.container);

    // Set up scroll listener when in view
    this.boundScrollHandler = this.handleScroll.bind(this);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', this.boundScrollHandler, { passive: true });
        this.handleScroll();
      } else {
        window.removeEventListener('scroll', this.boundScrollHandler);
      }
    });
  }

  handleScroll() {
    const rect = this.container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.max(0, Math.min(1,
      (viewportHeight - rect.top) / (viewportHeight + rect.height)
    ));

    // Update each word based on progress
    this.words.forEach((word, index) => {
      const wordProgress = index / this.words.length;
      const isVisible = scrollProgress > wordProgress;

      // Calculate individual word animation progress
      const wordAnimProgress = Math.max(0, Math.min(1,
        (scrollProgress - wordProgress) * this.words.length
      ));

      // Apply transforms
      const translateY = (1 - wordAnimProgress) * 100;
      const opacity = wordAnimProgress;

      word.style.transform = `translateY(${translateY}%)`;
      word.style.opacity = opacity;
    });
  }

  destroy() {
    this.observer.disconnect();
    window.removeEventListener('scroll', this.boundScrollHandler);
  }
}

// Usage
const container = document.querySelector('.karaoke-text');
const animation = new KaraokeTextAnimation(container);
```

### Sticky Section with Scroll Progress

```javascript
function setupStickyScrollSection(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  const parent = section.parentElement;

  function calculateProgress() {
    const parentRect = parent.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const headerHeight = 116; // --site-header-height

    // Calculate how far we've scrolled into the parent
    const scrolledIntoParent = Math.max(0, -parentRect.top + headerHeight);
    const scrollDistance = parent.offsetHeight - viewportHeight;

    // Progress from 0 (just entered) to 1 (about to exit)
    const progress = Math.min(1, scrolledIntoParent / scrollDistance);

    return progress;
  }

  function onScroll() {
    const progress = calculateProgress();

    // Dispatch custom event with progress
    section.dispatchEvent(new CustomEvent('scrollprogress', {
      detail: { progress }
    }));
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  return {
    getProgress: calculateProgress,
    destroy: () => window.removeEventListener('scroll', onScroll)
  };
}
```

---

## Replication Guide

### Step 1: HTML Structure

```html
<!-- Testimonial Section -->
<section class="relative">
  <!-- Parent container with tall height for scroll distance -->
  <div class="testimonial-wrapper relative mx-auto max-w-[1392px]" style="height: 300vh;">

    <!-- Dotted background -->
    <div class="dotted-background absolute inset-x-0 top-5 bottom-5"></div>

    <!-- Sticky content container -->
    <div class="sticky top-[116px] h-[calc(100vh-116px)] flex items-center justify-center">

      <!-- Quote card -->
      <div class="quote-container max-w-3xl px-6">
        <blockquote class="karaoke-text text-quote-responsive">
          <!-- Words will be wrapped in spans by JS or at build time -->
        </blockquote>

        <!-- Attribution -->
        <footer class="mt-8 text-center">
          <cite class="not-italic">
            <span class="font-medium text-gray-900">Margaret Shen</span>
            <span class="text-gray-500">Head of Business Operations, Modal</span>
          </cite>
        </footer>
      </div>

    </div>
  </div>
</section>
```

### Step 2: CSS Styles

```css
/* CSS Custom Properties */
:root {
  --header-height: 116px;
  --ease-emphasized: cubic-bezier(.2, 0, 0, 1);
  --color-dot-pattern: #f0f0f2;
  --color-text-primary: #1a1a1a;
  --color-text-muted: #d1d5db;
}

/* Dotted Background Pattern */
.dotted-background {
  background-image: repeating-linear-gradient(
    125deg,
    transparent,
    transparent 6px,
    var(--color-dot-pattern) 6px,
    var(--color-dot-pattern) 7px
  );
}

/* Quote Typography */
.text-quote-responsive {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* Word Container - clips the sliding text */
.word-container {
  position: relative;
  display: inline-block;
  overflow: clip;
  padding-bottom: 2px;
}

/* Word - the animated element */
.word {
  display: inline-block;
  will-change: transform;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.1s var(--ease-emphasized),
              opacity 0.1s var(--ease-emphasized);
}

.word.visible {
  transform: translateY(0);
  opacity: 1;
}

/* Muted state for unrevealed words (if showing placeholder) */
.word.muted {
  color: var(--color-text-muted);
}
```

### Step 3: React/Next.js Component

```tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TestimonialSectionProps {
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
  };
}

export function TestimonialSection({ quote, author }: TestimonialSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const words = quote.split(' ');

  return (
    <section className="relative">
      {/* Scroll container - creates the scroll distance */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[1392px] border-x border-gray-200"
        style={{ height: '300vh' }} // Adjust for desired scroll distance
      >
        {/* Dotted background */}
        <div
          className="absolute inset-x-0 top-5 bottom-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              125deg,
              transparent,
              transparent 6px,
              #f0f0f2 6px,
              #f0f0f2 7px
            )`
          }}
        />

        {/* Sticky content */}
        <div
          ref={stickyRef}
          className="sticky top-[116px] h-[calc(100vh-116px)] flex items-center justify-center"
        >
          <div className="max-w-3xl px-6 text-center">
            {/* Karaoke Quote */}
            <blockquote className="text-2xl md:text-4xl font-medium leading-tight tracking-tight">
              <p className="flex flex-wrap justify-center">
                {words.map((word, index) => (
                  <KaraokeWord
                    key={index}
                    word={word}
                    index={index}
                    totalWords={words.length}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </p>
            </blockquote>

            {/* Attribution */}
            <motion.footer
              className="mt-8"
              style={{
                opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1])
              }}
            >
              <cite className="not-italic">
                <span className="block font-medium text-gray-900">{author.name}</span>
                <span className="text-gray-500">{author.title}, {author.company}</span>
              </cite>
            </motion.footer>
          </div>
        </div>
      </div>
    </section>
  );
}

interface KaraokeWordProps {
  word: string;
  index: number;
  totalWords: number;
  scrollProgress: any; // MotionValue<number>
}

function KaraokeWord({ word, index, totalWords, scrollProgress }: KaraokeWordProps) {
  // Calculate animation range for this word
  const start = index / totalWords;
  const end = Math.min(1, (index + 0.5) / totalWords);

  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);
  const y = useTransform(scrollProgress, [start, end], ['50%', '0%']);
  const color = useTransform(
    scrollProgress,
    [start, end],
    ['#d1d5db', '#1a1a1a']
  );

  return (
    <span className="relative inline-block overflow-clip pb-0.5">
      <motion.span
        className="inline-block will-change-transform"
        style={{ opacity, y, color }}
      >
        {word}&nbsp;
      </motion.span>
    </span>
  );
}
```

### Step 4: Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        'dot-pattern': '#f0f0f2',
        'text-muted': '#d1d5db',
      },
      transitionTimingFunction: {
        'emphasized': 'cubic-bezier(.2, 0, 0, 1)',
        'emphasized-in': 'cubic-bezier(.05, .7, .1, 1)',
        'emphasized-out': 'cubic-bezier(.3, 0, .8, .15)',
      },
    },
  },
};
```

---

## Summary

### Key Techniques Used

1. **Sticky Positioning** - Section stays fixed while scrolling through a tall parent
2. **Overflow Clipping** - Each word wrapped in a container with `overflow: clip`
3. **Transform Animation** - Words slide up via `translateY()`
4. **Opacity Animation** - Words fade in as they reveal
5. **Scroll Progress Mapping** - Scroll position mapped to animation progress (0-1)
6. **GPU Acceleration** - `will-change: transform` for smooth 60fps animations

### Performance Considerations

- Use `will-change: transform` sparingly, only on animated elements
- Use `passive: true` for scroll event listeners
- Consider using `requestAnimationFrame` for smooth updates
- Use CSS transforms instead of changing layout properties
- Batch DOM reads and writes to avoid layout thrashing

### Browser Support

- `position: sticky` - Supported in all modern browsers
- `overflow: clip` - Supported in Chrome 90+, Firefox 81+, Safari 16+
- CSS `lab()` colors - May need fallbacks for older browsers

---

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [CSS Scroll-Driven Animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS position: sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky)
