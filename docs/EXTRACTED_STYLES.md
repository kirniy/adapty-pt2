# Extracted Styles Reference

Styles extracted directly from reference sites via Chrome DevTools. Use these as the authoritative source for the Adapty redesign.

---

## Attio.com (PRIMARY - Light Theme)

### Typography

```css
/* Body */
font-family: inter, "inter Fallback";
font-size: 16px;
line-height: 22px;

/* H1 - Hero Headlines */
font-family: interDisplay, "interDisplay Fallback";
font-size: 64px;
font-weight: 600;
line-height: 64px;
letter-spacing: -1.28px;

/* Font Scale (all sizes used) */
10px, 11px, 12px, 13px, 14px, 15px, 16px, 18px, 20px, 28px, 32px, 40px, 56px, 64px
```

### Colors

```css
/* Backgrounds */
--bg-white: rgb(255, 255, 255);
--bg-light: rgb(251, 251, 251);
--bg-muted: rgb(244, 245, 246);
--bg-subtle: rgb(238, 239, 241);
--bg-dark: lab(10.7201 -0.0959039 -1.54182); /* near black */

/* Text */
--text-primary: lab(10.7201 -0.0959039 -1.54182); /* #181818 approx */
--text-secondary: rgb(117, 119, 124);
--text-muted: lab(50.3787 -1.31875 -9.56043);

/* Borders */
--border-default: rgb(238, 239, 241);
--border-subtle: rgb(230, 231, 234);
--border-focus: rgb(38, 109, 240); /* blue focus ring */

/* Accent */
--accent-blue: rgb(38, 109, 240);
--accent-purple: rgb(145, 98, 249);
--accent-green: rgb(221, 249, 228);
--accent-pink: rgb(251, 132, 167);
```

### Shadows

```css
/* Card Shadow - Subtle */
--shadow-card: oklch(0 0 0 / 0.01) 0px 1px 2px 0px,
               oklch(0 0 0 / 0.02) 0px 2px 4px -1px,
               oklch(0 0 0 / 0.03) 0px 4px 8px -2px;

/* Elevated Shadow - Dropdowns/Modals */
--shadow-elevated: rgba(28, 40, 64, 0.06) 0px 2px 6px 0px,
                   rgba(28, 40, 64, 0.08) 0px 6px 20px -2px;

/* Small Shadow - Buttons */
--shadow-sm: rgb(224, 224, 224) 0px 0px 1px 0px,
             rgba(24, 39, 75, 0.02) 0px 1px 2px -1px,
             rgba(24, 39, 75, 0.06) 0px 2px 2px -1px;
```

### Transitions

```css
/* Standard transition */
transition: color 0.4s cubic-bezier(0.2, 0, 0, 1),
            background-color 0.4s cubic-bezier(0.2, 0, 0, 1),
            border-color 0.4s cubic-bezier(0.2, 0, 0, 1);

/* Transform */
transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1);

/* Easing curve */
--ease-smooth: cubic-bezier(0.2, 0, 0, 1);
--ease-bounce: cubic-bezier(0.65, 0, 0.35, 1);
```

### Layout

```css
/* Container widths */
--container-max: 1440px;
--container-lg: 1280px;
--container-md: 1008px;
--container-sm: 896px;

/* Common spacing */
padding: 0px 24px;     /* horizontal container */
padding: 72px 24px 0px; /* section top */
padding: 0px 48px;     /* larger horizontal */
padding: 0px 80px;     /* hero sections */
```

### Components

```css
/* Button */
padding: 0px 12px;
border-radius: 10px;
font-weight: 500;
font-size: 15px;

/* Nav height */
height: 116px;
```

---

## Linear.app (Dark Theme Reference)

### Typography

```css
/* Body */
font-family: "Inter Variable", "SF Pro Display", -apple-system, system-ui, sans-serif;
font-size: 16px;
line-height: 24px;
background-color: rgb(8, 9, 10);
color: rgb(247, 248, 248);

/* H1 */
font-size: 64px;
font-weight: 510;
line-height: 67.84px;
letter-spacing: -1.408px;

/* Font weights */
400, 510, 538

/* Font sizes */
10px, 12px, 13px, 14px, 15px, 16px, 17px, 21px, 24px, 40px, 56px, 64px
```

### Button

```css
padding: 0px 12px;
border-radius: 8px;
font-weight: 510;
font-size: 13px;
```

---

## Vercel.com (Dark Theme Reference)

### Typography

```css
/* Body */
font-family: Geist, Arial, sans-serif;
font-size: 16px;
background-color: rgb(0, 0, 0);
color: rgb(237, 237, 237);

/* H1 */
font-size: 48px;
font-weight: 600;
line-height: 48px;
letter-spacing: -2.283px;

/* Font sizes */
6px, 7px, 12px, 13px, 14px, 16px, 18px, 20px, 24px, 32px, 40px, 48px
```

### CSS Variables

```css
--geist-radius: 6px;
--geist-marketing-radius: 8px;
--ds-focus-color: hsla(210, 100%, 66%, 1);
--geist-text-gradient: linear-gradient(180deg, #fff 0%, #ffffffbf 100%);
--shadow-smallest: 0 0 0 1px #333;
--ds-shadow-border: 0 0 0 1px #ffffff25, 0 0 0 1px hsla(0, 0%, 0%, 1);
```

### Button

```css
background-color: rgb(10, 10, 10);
padding: 0px 6px;
border-radius: 6px;
font-weight: 500;
font-size: 14px;
```

---

## Polar.sh (Light/Dark Hybrid)

### Typography

```css
/* Body */
font-family: GeistSans, "GeistSans Fallback", sans-serif;
font-size: 16px;
line-height: 24px;

/* H1 */
font-size: 72px;
font-weight: 400;
line-height: 90px;
letter-spacing: -1.8px;

/* H2 */
font-size: 36px;
font-weight: 400;
line-height: 54px;

/* Font sizes */
10px, 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px, 60px, 72px
```

### Border Radii

```css
5.6px, 7.6px, 9.6px, 12px, 16px, 24px, 32px
```

---

## Consolidated Design Tokens for Adapty

Based on the extraction, here's the recommended design system:

### Colors (Light Theme)

```css
:root {
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAFA;
  --bg-tertiary: #F4F5F6;
  --bg-muted: #EEEFF1;

  /* Text */
  --text-primary: #181818;
  --text-secondary: #75777C;
  --text-muted: #A1A1AA;

  /* Brand */
  --brand-primary: #6720FF;
  --brand-hover: #5519CC;
  --brand-light: #F5F3FF;

  /* Borders */
  --border-default: #E6E7EA;
  --border-subtle: #F0F0F0;
  --border-focus: #266DF0;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-card: 0 2px 6px rgba(28,40,64,0.06), 0 6px 20px -2px rgba(28,40,64,0.08);
  --shadow-elevated: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
}
```

### Typography

```css
:root {
  /* Font Family - Use Gilroy as primary */
  --font-sans: 'Gilroy', system-ui, sans-serif;

  /* Font Sizes */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 40px;
  --text-5xl: 48px;
  --text-6xl: 56px;
  --text-7xl: 64px;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Letter Spacing */
  --tracking-tighter: -0.02em;
  --tracking-tight: -0.01em;
  --tracking-normal: 0;
}
```

### Spacing

```css
:root {
  /* Base: 4px */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Container */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1200px;
  --container-2xl: 1440px;
}
```

### Border Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

### Transitions

```css
:root {
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 400ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.2, 0, 0, 1);
}
```

---

## Tailwind Config Mapping

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#F4F5F6',
          muted: '#EEEFF1',
        },
        foreground: {
          DEFAULT: '#181818',
          secondary: '#75777C',
          muted: '#A1A1AA',
        },
        brand: {
          DEFAULT: '#6720FF',
          hover: '#5519CC',
          light: '#F5F3FF',
        },
        border: {
          DEFAULT: '#E6E7EA',
          subtle: '#F0F0F0',
          focus: '#266DF0',
        },
      },
      fontFamily: {
        sans: ['Gilroy', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        '4xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 6px rgba(28,40,64,0.06), 0 6px 20px -2px rgba(28,40,64,0.08)',
        'elevated': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
}
```

---

## Component Examples

### Primary Button

```css
.btn-primary {
  background-color: var(--brand-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  transition: all 200ms var(--ease-smooth);
}

.btn-primary:hover {
  background-color: var(--brand-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-card);
}
```

### Secondary Button

```css
.btn-secondary {
  background-color: transparent;
  color: var(--text-primary);
  padding: 12px 24px;
  border: 1px solid var(--border-default);
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  transition: all 200ms var(--ease-smooth);
}

.btn-secondary:hover {
  background-color: var(--bg-secondary);
  border-color: var(--text-muted);
}
```

### Card

```css
.card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 200ms var(--ease-smooth);
}

.card:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}
```

---

*Extracted on December 18, 2025 via Chrome DevTools MCP*
