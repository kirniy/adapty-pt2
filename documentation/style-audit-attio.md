# Style Audit: Adapty vs Attio Design Specs

## Executive Summary

This audit compares the current Adapty implementation against Attio's design system specifications.

---

## Color Palette Comparison

| Element | Attio Spec | Current Value | Status |
|---------|-----------|---------------|--------|
| Surface (Main) | `#FFFFFF` | `#FFFFFF` | ✅ Match |
| Surface (Soft) | `#FAFAFB` | `#FAFAFA` | ⚠️ Close |
| Border (Subtle) | `#EEEFF1` | `#F0F0F0` | ⚠️ Different |
| Primary Text | `#1C1D1F` | `#181818` | ⚠️ Different |
| Secondary Text | `#5C5E63` | `#75777C` | ⚠️ Different |
| Action Color | `#407FF2` (blue) | `#6720FF` (purple) | ✅ Intentional (brand) |

### Recommendation
Update globals.css and tailwind.config.ts to use Attio-exact colors:

```css
--color-background-secondary: #FAFAFB;
--color-background-muted: #EEEFF1;
--color-foreground: #1C1D1F;
--color-foreground-secondary: #5C5E63;
```

---

## Typography Comparison

| Element | Attio Spec | Current Value | Status |
|---------|-----------|---------------|--------|
| UI Font | Inter | Gilroy | ⚠️ Different |
| Mono Font | JetBrains Mono | System | ⚠️ Missing |
| Serif Font | Tiempos Text | None | ⚠️ Missing |

### Recommendation
1. Keep Gilroy as primary (brand identity)
2. Add JetBrains Mono for code/data values
3. Add serif font for testimonials (Tiempos Text or Georgia fallback)

---

## Border Radius Comparison

| Element | Attio Spec | Current Value | Status |
|---------|-----------|---------------|--------|
| Buttons | 10px | 10px | ✅ Match |
| Cards | 12px | 24px (rounded-3xl) | ⚠️ Different |
| Inputs | 8px | 8px | ✅ Match |

### Recommendation
Consider using `rounded-lg` (12px) for cards instead of `rounded-3xl` (24px) for more Attio-like feel.

---

## Shadow Philosophy

| Aspect | Attio Approach | Current Implementation | Status |
|--------|----------------|------------------------|--------|
| Primary Style | Subtle 1px borders | Box shadows | ⚠️ Different |
| Cards | `1px solid #EEEFF1` | `shadow-card` | ⚠️ Different |
| Hover States | Inner borders (ring-offset) | translate-y + shadow | ⚠️ Different |

### Recommendation
Attio uses almost no shadows, preferring subtle borders. Current implementation uses shadows which adds more visual weight. Consider:
- Replace `shadow-card` with `border border-[#EEEFF1]`
- Use `ring` utilities for hover states instead of shadows

---

## Spacing Analysis

| Element | Attio Spec | Current Value | Status |
|---------|-----------|---------------|--------|
| Section Padding | `py-24` to `py-32` | Various | ⚠️ Audit needed |
| Whitespace | Extremely generous | Moderate | ⚠️ Could be more |

---

## CSS Custom Properties

### Attio Easing Functions (for reference)
```css
--ease-in-out: cubic-bezier(.2, 0, 0, 1);
--ease-in-out-cubic: cubic-bezier(.65, 0, .35, 1);
--ease-out: cubic-bezier(0, 0, 0, 1);
--ease-out-cubic: cubic-bezier(.33, 1, .68, 1);
```

### Current Implementation
```css
--animate-smooth: cubic-bezier(0.2, 0, 0, 1); ✅ Matches ease-in-out
```

---

## Components Status

### Implemented (Attio-style)
- ✅ KaraokeText - Word-by-word reveal effect
- ✅ StickyScroll - Sticky storytelling sections
- ✅ ContainerScroll - 3D perspective hero
- ✅ DotPattern - Diagonal line pattern background
- ✅ AIThinkingShimmer - Gradient text shimmer
- ✅ BorderBeam - Animated border effect

### Missing / Could Add
- ❌ Data table grid (Attio uses CSS Grid with fixed row heights)
- ❌ Floating section transitions (CSS masking)
- ❌ Smooth sidebar navigation animations

---

## Priority Fixes

### High Priority
1. Update foreground colors to Attio specs
2. Reduce card border-radius from 24px to 12px
3. Consider shadow → border transition for cleaner look

### Medium Priority
1. Add JetBrains Mono for data/code values
2. Add serif font for testimonials
3. Increase whitespace in sections

### Low Priority
1. Implement Attio data table component
2. Add section masking transitions
3. Fine-tune animation timings

---

## Quick Reference: Attio Color Tokens

```css
:root {
  /* Attio Exact Colors */
  --attio-surface-main: #FFFFFF;
  --attio-surface-soft: #FAFAFB;
  --attio-border-subtle: #EEEFF1;
  --attio-text-primary: #1C1D1F;
  --attio-text-secondary: #5C5E63;
  --attio-text-tertiary: #75777C;
  --attio-action-blue: #407FF2;
}
```
