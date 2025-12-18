# Attio Technical Architecture & Design Analysis

> This document serves as a blueprint for replicating the Attio design system. All data is extracted from the technical dump of attio.com.

---

## 1. Core Visual Tokens

### Color Palette

Attio uses a "Soft Tech" palette. It avoids pure black and instead uses high-contrast greys.

| Role | Hex Code | Tailwind Usage |
|------|----------|----------------|
| Surface (Main) | `#FFFFFF` | `bg-white` |
| Surface (Soft) | `#FAFAFB` | `bg-[#FAFAFB]` |
| Border (Subtle) | `#EEEFF1` | `border-[#EEEFF1]` |
| Primary Text | `#1C1D1F` | `text-[#1C1D1F]` |
| Secondary Text | `#5C5E63` | `text-[#5C5E63]` |
| Action Blue | `#407FF2` | `text-[#407FF2]` |

### Typography

- **UI/Sans**: Inter (variable weight)
- **Monospace**: JetBrains Mono (used for data values)
- **Serif (Display)**: Tiempos Text (used for specific quotes/testimonials)

---

## 2. Advanced Component Logic

### A. The "AI Thinking" State

**Location**: Inside the sidebar or search bars when processing.
**Purpose**: Provides high-end visual feedback for async actions.

```html
<!-- REPLICATION CODE -->
<div class="relative flex items-center gap-x-1.5 px-3 py-1.5 rounded-lg overflow-hidden">
  <span class="text-sm font-medium tracking-tight">
    <span class="bg-clip-text text-transparent animate-shimmer"
      style="background-image: linear-gradient(131.88deg, #DC8FA5 0%, #70A1F0 50%, #DC8FA5 100%);
             background-size: 300%;
             background-position: -200% 0%;">
      AI is thinking...
    </span>
  </span>
</div>

<style>
@keyframes shimmer {
  from { background-position: 200% 0%; }
  to { background-position: -200% 0%; }
}
.animate-shimmer {
  animation: shimmer 3s infinite linear;
}
</style>
```

### B. The Home UI Data Table

**Location**: The main marketing showcase.
**Purpose**: To show complex data in a clean, readable grid.
**Insight**: Instead of standard HTML tables, they use `display: grid` with fixed row heights and `overflow: hidden` for smooth truncation.

```html
<!-- THE GRID STRUCTURE -->
<div class="grid w-full auto-rows-[44px] border-t border-[#EEEFF1]"
     style="grid-template-columns: 240px 180px minmax(200px, 1fr) 140px;">

  <!-- Header Row -->
  <div class="flex items-center px-4 bg-[#FAFAFB] border-b border-r border-[#EEEFF1] text-xs font-semibold text-[#75777C] uppercase tracking-wider">
    Company
  </div>
  <div class="flex items-center px-4 bg-[#FAFAFB] border-b border-r border-[#EEEFF1] text-xs font-semibold text-[#75777C] uppercase tracking-wider">
    Status
  </div>
  <!-- ... etc -->

  <!-- Data Row -->
  <div class="flex items-center px-4 border-b border-r border-[#EEEFF1] bg-white group hover:bg-[#FAFAFB]">
    <div class="flex items-center gap-2">
      <div class="size-6 rounded bg-black flex items-center justify-center text-[10px] text-white">V</div>
      <span class="text-sm font-medium">Vercel</span>
    </div>
  </div>
  <div class="flex items-center px-4 border-b border-r border-[#EEEFF1] bg-white">
    <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F2FF] text-[#407FF2] border border-[#B8D0FF]">
      Customer
    </span>
  </div>
</div>
```

---

## 3. Interaction Design (UX Insights)

### Smooth Sidebar Navigation

**Location**: The left-hand navigation menu.
**Effect**: Items don't just "highlight"; they slide and fade.
**Technique**: Use of `cubic-bezier(0.65, 0, 0.35, 1)` and `transition-duration: 500ms`.

### The "Floating" Section Transition

**Location**: Transitions between marketing blocks.
**Technique**: CSS Masking.

They use a mask to fade the bottom of a section into the next:

```css
mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
```

### SVG Pattern Background

**Location**: Page-wide background.
**Purpose**: Adds "texture" without slowing down page load.

```html
<svg width="100%" height="100%" class="opacity-30 pointer-events-none fixed inset-0">
  <defs>
    <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.5" fill="#EEEFF1" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#dot-grid)" />
</svg>
```

---

## 4. Key Libraries Detected

Based on the file structure and classes, you should install these for a perfect replica:

| Library | Purpose |
|---------|---------|
| **Tailwind CSS** | For the utility-first architecture |
| **Lucide React** | For the iconography (most icons match the Lucide set) |
| **Framer Motion** | Specifically for the layout animations (`layoutId` is used for moving tabs) |
| **Radix UI** | The primitives (Dropdowns, Dialogs) follow Radix's accessibility and class patterns |

---

## 5. Summary of "Premium" Polish

To achieve the Attio look, focus on:

| Aspect | Recommendation |
|--------|----------------|
| **Border Radius** | Use `10px` for buttons and `12px` for cards |
| **Shadows** | Almost non-existent. They use subtle borders (`1px solid #EEEFF1`) instead of heavy shadows |
| **Whitespace** | Extremely generous. Sections have `py-24` or `py-32` padding |
| **Borders** | They use "Inner Borders" (`ring-offset`) on hover to avoid layout shifts |

---

## 6. CSS Custom Properties Reference

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
  --site-header-height: calc(68px + 48px); /* nav + banner */
  --site-header-z-index: 92;

  /* Colors (LAB to Hex approximations) */
  --color-primary-foreground: #1a1a1a;
  --color-surface-subtle: #f0f0f2;
  --color-border-subtle: #eeeff1;
}
```

---

## 7. Animation Keyframes

```css
/* Shimmer effect for AI states */
@keyframes shimmer {
  from { background-position: 200% 0%; }
  to { background-position: -200% 0%; }
}

/* Slide up reveal */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Pulse for live indicators */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```
