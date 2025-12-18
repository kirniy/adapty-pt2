# Design System - Adapty Redesign

This document defines the design tokens and visual language for the Adapty redesign, inspired by modern SaaS aesthetics (Vercel, Linear, Polar.sh, Attio).

---

## Color Palette

### Light Theme (Primary)

```css
:root {
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAFA;
  --bg-tertiary: #F5F5F5;
  --bg-muted: #F9FAFB;

  /* Text */
  --text-primary: #171717;
  --text-secondary: #525252;
  --text-tertiary: #737373;
  --text-muted: #A3A3A3;

  /* Brand - Adapty Purple */
  --brand-primary: #6720FF;
  --brand-primary-hover: #5419D4;
  --brand-primary-light: #EDE9FE;
  --brand-gradient: linear-gradient(135deg, #6720FF 0%, #4F46E5 100%);

  /* Accent Colors */
  --accent-blue: #3B82F6;
  --accent-green: #22C55E;
  --accent-amber: #F59E0B;
  --accent-red: #EF4444;

  /* Borders */
  --border-default: #E5E5E5;
  --border-muted: #F0F0F0;
  --border-focus: #6720FF;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}
```

### Surface Colors (for cards/sections)

| Name | Hex | Usage |
|------|-----|-------|
| Surface Default | #FFFFFF | Card backgrounds |
| Surface Muted | #FAFAFA | Page background |
| Surface Elevated | #FFFFFF | Dropdowns, modals |
| Surface Accent Cream | #FEF9E7 | Feature highlight |
| Surface Accent Green | #ECFDF5 | Success states |
| Surface Accent Purple | #F5F3FF | Brand highlights |

---

## Typography

### Font Family: Gilroy

The Gilroy font family maintains brand consistency from the original Adapty site.

```css
/* Font Face Declarations */
@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/Gilroy-Regular.woff2') format('woff2'),
       url('/fonts/Gilroy-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/Gilroy-Medium.woff2') format('woff2'),
       url('/fonts/Gilroy-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/Gilroy-SemiBold.woff2') format('woff2'),
       url('/fonts/Gilroy-SemiBold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/Gilroy-Bold.woff2') format('woff2'),
       url('/fonts/Gilroy-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/Gilroy-ExtraBold.woff2') format('woff2'),
       url('/fonts/Gilroy-ExtraBold.woff') format('woff');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 (Hero) | 56px / 3.5rem | 700 | 1.1 | -0.02em |
| H2 (Section) | 40px / 2.5rem | 700 | 1.2 | -0.01em |
| H3 (Card Title) | 24px / 1.5rem | 600 | 1.3 | -0.01em |
| H4 (Subsection) | 20px / 1.25rem | 600 | 1.4 | 0 |
| Body Large | 18px / 1.125rem | 400 | 1.6 | 0 |
| Body | 16px / 1rem | 400 | 1.6 | 0 |
| Body Small | 14px / 0.875rem | 400 | 1.5 | 0 |
| Caption | 12px / 0.75rem | 500 | 1.4 | 0.02em |
| Overline | 12px / 0.75rem | 600 | 1.4 | 0.05em |

### Mobile Type Scale

| Element | Mobile Size |
|---------|-------------|
| H1 | 36px / 2.25rem |
| H2 | 28px / 1.75rem |
| H3 | 20px / 1.25rem |
| Body | 16px / 1rem |

---

## Spacing System

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight spacing |
| space-2 | 8px | Icon gaps |
| space-3 | 12px | Small gaps |
| space-4 | 16px | Default gap |
| space-5 | 20px | Medium gap |
| space-6 | 24px | Section padding |
| space-8 | 32px | Large gap |
| space-10 | 40px | XL gap |
| space-12 | 48px | Section margins |
| space-16 | 64px | Large sections |
| space-20 | 80px | Section padding (desktop) |
| space-24 | 96px | Hero spacing |

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 4px | Small elements, badges |
| radius-md | 8px | Buttons, inputs, small cards |
| radius-lg | 12px | Cards, sections |
| radius-xl | 16px | Large cards, modals |
| radius-2xl | 24px | Hero elements |
| radius-full | 9999px | Pills, avatars |

---

## Component Specifications

### Buttons

**Primary Button**
```css
.btn-primary {
  background: var(--brand-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--brand-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  padding: 12px 24px;
  border: 1px solid var(--border-default);
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--text-tertiary);
}
```

### Cards

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-muted);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-card);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}
```

### Input Fields

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-default);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px var(--brand-primary-light);
}
```

### Badges/Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
  background: var(--brand-primary-light);
  color: var(--brand-primary);
}

.badge-category {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}
```

---

## Breakpoints

```css
/* Tailwind defaults */
--screen-sm: 640px;   /* Mobile landscape */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
--screen-2xl: 1536px; /* Extra large */
```

### Responsive Patterns

- **Mobile first**: Start with mobile styles, add complexity at larger screens
- **Container**: Max 1200px with 24px padding (16px on mobile)
- **Grid**: 1 column mobile → 2 columns tablet → 3-4 columns desktop
- **Navigation**: Hamburger menu on mobile, full nav on desktop

---

## Animation & Transitions

```css
/* Timing */
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;

/* Easing */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Hover Effects

- Cards: translateY(-2px) + shadow increase
- Buttons: translateY(-1px) + shadow
- Links: Color change + underline

### Page Transitions

- Fade in on load: opacity 0 → 1 over 300ms
- Stagger children: 50ms delay between items

---

## Tailwind Configuration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          500: '#6720FF',
          600: '#5419D4',
          700: '#4C1D95',
        },
      },
      fontFamily: {
        sans: ['Gilroy', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
    },
  },
}
```

---

## Design Principles

1. **Clean & Minimal**: Generous whitespace, limited color palette
2. **Subtle Depth**: Light shadows and borders for hierarchy
3. **Consistent Radius**: 8px default, 12px for cards
4. **Smooth Interactions**: 200ms transitions, subtle hover states
5. **Mobile First**: Responsive from smallest screen up
6. **Accessibility**: Sufficient contrast ratios (WCAG AA minimum)
