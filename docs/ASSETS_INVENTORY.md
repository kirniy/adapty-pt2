# Assets Inventory - Adapty Redesign

Complete inventory of assets from the original Adapty project that need to be copied to the new project.

---

## Source Locations

| Category | Source Path |
|----------|-------------|
| Fonts | `/Users/kirniy/dev/adapty/src/assets/fonts/` |
| Icons | `/Users/kirniy/dev/adapty/src/assets/icons/` |
| Flags | `/Users/kirniy/dev/adapty/src/assets/flags/` |
| Logos | `/Users/kirniy/dev/adapty/src/assets/logos/` |
| Images | `/Users/kirniy/dev/adapty/src/assets/images/` |
| Public Assets | `/Users/kirniy/dev/adapty/public/assets/` |

---

## Fonts (Gilroy Family)

**Location**: `/src/assets/fonts/`
**Count**: 70+ files

### Required Weights
| Weight | File Pattern |
|--------|--------------|
| Regular (400) | `Gilroy-Regular.*` |
| Medium (500) | `Gilroy-Medium.*` |
| SemiBold (600) | `Gilroy-SemiBold.*` |
| Bold (700) | `Gilroy-Bold.*` |
| ExtraBold (800) | `Gilroy-ExtraBold.*` |

### Formats
- WOFF2 (preferred for web)
- WOFF (fallback)
- EOT (legacy IE support - optional)
- TTF (general fallback)

---

## Icons

**Location**: `/src/assets/icons/`

| Icon | Filename | Usage |
|------|----------|-------|
| Arrow Right | `arrow-right.svg` | Links, CTAs |
| Arrow Down | `arrow-down.svg` | Dropdowns |
| Chevron | `chevron.svg` | Navigation |
| Discord | `discord.svg` | Social |
| GitHub | `github.svg` | Social |
| LinkedIn | `linkedin.svg` | Social |
| X (Twitter) | `x.svg` | Social |
| YouTube | `youtube.svg` | Social |
| Check | `check.svg` | Lists, features |
| Close | `close.svg` | Modals |
| Menu | `menu.svg` | Mobile nav |

---

## Flags (Language Switcher)

**Location**: `/src/assets/flags/`
**Format**: SVG

| Language | Filename |
|----------|----------|
| English | `en.svg` |
| German | `de.svg` |
| Spanish | `es.svg` |
| French | `fr.svg` |
| Indonesian | `id.svg` |
| Japanese | `ja.svg` |
| Korean | `ko.svg` |
| Portuguese | `pt.svg` |
| Turkish | `tr.svg` |
| Vietnamese | `vi.svg` |
| Chinese | `zh.svg` |

---

## Logos

### Adapty Brand

**Location**: `/src/assets/logos/`

| Asset | Filename | Format |
|-------|----------|--------|
| Logo Black | `adapty-logo-black.svg` | SVG |
| Logo White | `adapty-logo-white.svg` | SVG |
| Symbol Only | `adapty-symbol.svg` | SVG |
| Logo (alt) | `logo.svg` | SVG |
| Logo White (alt) | `logo-white.svg` | SVG |

### Trusted By Logos

**Location**: `/src/assets/logos/trusted-by/`

| Company | Filename |
|---------|----------|
| Almus | `almus.svg` |
| AppNation | `appnation.svg` |
| Bumble | `bumble.svg` |
| Feeld | `feeld.svg` |
| HubX | `hubx.svg` |
| Impala Studios | `impala-studios.svg` |
| WeeWoo | `weewoo.svg` |

### Integration Logos

**Location**: `/src/assets/logos/integrations/`

Common integrations to include:
- Amplitude
- AppsFlyer
- Adjust
- Branch
- Firebase
- Mixpanel
- OneSignal
- Braze
- And more...

### SDK Platform Logos

**Location**: `/src/assets/logos/sdk/`

| Platform | Filename |
|----------|----------|
| iOS/Swift | `swift.svg` |
| Android/Kotlin | `kotlin.svg` |
| Flutter | `flutter.svg` |
| React Native | `react-native.svg` |
| Unity | `unity.svg` |
| Stripe | `stripe.svg` |
| Capacitor | `capacitor.svg` |
| KMP | `kmp.svg` |
| FlutterFlow | `flutterflow.svg` |
| Web | `web.svg` |

---

## Images

### Hero Section

**Location**: `/src/assets/images/hero/` or `/src/assets/images/`

| Image | Filename | Dimensions |
|-------|----------|------------|
| Hero Overview | `hero-overview.webp` | Large |
| Hero Paywall | `hero-paywall.webp` | Medium |

### Feature Images

**Location**: `/src/assets/images/` and `/src/assets/images/features/`

| Feature | Filename | Usage |
|---------|----------|-------|
| A/B Testing | `feature-ab.webp` | A/B testing section |
| Analytics | `feature-analytics.webp` | Analytics section |
| Paywall | `feature-paywall.webp` | Paywall section |

### Role Cards

**Location**: `/src/assets/images/`

| Role | Filename |
|------|----------|
| Developers | `role-developers.webp` |
| Marketers | `role-marketers.webp` |
| App Owners | `role-app-owners.webp` |

### SDK Icons

**Location**: `/src/assets/images/sdks/`

| Platform | Filename |
|----------|----------|
| Capacitor | `capacitor.svg` |
| Flutter | `flutter.svg` |
| FlutterFlow | `flutterflow.svg` |
| KMP | `kmp.svg` |
| Kotlin | `kotlin.svg` |
| React Native | `react-native.svg` |
| Stripe | `stripe.svg` |
| Swift | `swift.svg` |
| Unity | `unity.svg` |
| Web | `web.svg` |

### G2 Badges

**Location**: `/src/assets/images/g2-badges/`

| Badge | Filename |
|-------|----------|
| High Performer | `high-performer.svg` |
| Easiest to Use | `easiest-to-use.svg` |
| Best Support | `best-support.svg` |
| Users Love Us | `users-love-us.svg` |
| Fastest Implementation | `fastest-implementation.svg` |

### Testimonials

**Location**: `/src/assets/images/testimonials/`

Contains author photos and company logos for testimonial section.

### Case Studies

**Location**: `/src/assets/images/case-studies/` and `/public/assets/cases/`

App icons and screenshots for case study cards.

---

## Public Assets

### Integration Logos

**Location**: `/public/assets/integrations/`

24 integration platform logos (SVG format):
- Analytics platforms
- Attribution providers
- Push notification services
- Cloud storage
- Marketing tools

### Case Study Assets

**Location**: `/public/assets/cases/`

App icons and promotional images for featured case studies.

---

## Copy Commands

### Full Asset Copy

```bash
# Create destination directories
mkdir -p /Users/kirniy/dev/adapty-pt2/public/fonts
mkdir -p /Users/kirniy/dev/adapty-pt2/public/icons
mkdir -p /Users/kirniy/dev/adapty-pt2/public/flags
mkdir -p /Users/kirniy/dev/adapty-pt2/public/logos
mkdir -p /Users/kirniy/dev/adapty-pt2/public/images
mkdir -p /Users/kirniy/dev/adapty-pt2/public/assets

# Copy fonts
cp -r /Users/kirniy/dev/adapty/src/assets/fonts/* /Users/kirniy/dev/adapty-pt2/public/fonts/

# Copy icons
cp -r /Users/kirniy/dev/adapty/src/assets/icons/* /Users/kirniy/dev/adapty-pt2/public/icons/

# Copy flags
cp -r /Users/kirniy/dev/adapty/src/assets/flags/* /Users/kirniy/dev/adapty-pt2/public/flags/

# Copy logos
cp -r /Users/kirniy/dev/adapty/src/assets/logos/* /Users/kirniy/dev/adapty-pt2/public/logos/

# Copy images
cp -r /Users/kirniy/dev/adapty/src/assets/images/* /Users/kirniy/dev/adapty-pt2/public/images/

# Copy public assets (integrations, cases)
cp -r /Users/kirniy/dev/adapty/public/assets/* /Users/kirniy/dev/adapty-pt2/public/assets/
```

---

## Asset Optimization Notes

### Images
- Use WebP format for photographs
- Use SVG for logos and icons
- Implement Next.js Image component for automatic optimization
- Set appropriate width/height to prevent layout shift

### Fonts
- Use `font-display: swap` for better performance
- Subset fonts if possible (latin characters only)
- Preload critical font weights (Regular, Bold)

### SVGs
- Inline critical SVGs (logo, icons)
- Use `next/image` for larger SVGs
- Consider sprite sheet for repeated icons

---

## File Size Summary

| Category | Estimated Size |
|----------|----------------|
| Fonts | ~5-10 MB |
| Icons | ~50 KB |
| Flags | ~100 KB |
| Logos | ~1-2 MB |
| Images | ~5-10 MB |
| **Total** | **~12-23 MB** |

---

## Verification Checklist

After copying, verify:

- [ ] All font weights load correctly
- [ ] Social icons display
- [ ] Language flags show
- [ ] Adapty logo renders (black and white versions)
- [ ] Trusted-by logos visible
- [ ] SDK platform icons display
- [ ] Integration logos load
- [ ] Feature images render
- [ ] G2 badges show
- [ ] Testimonial photos load
- [ ] Case study images display
