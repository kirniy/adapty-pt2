# Content Structure - Adapty Redesign

This document outlines all content sections for the homepage and blog, with actual copy from adapty.io to be redesigned.

---

## Homepage Structure

### 1. Header / Navigation

**Logo**: Adapty logo (left)

**Navigation Items**:
- Product (dropdown)
  - Subscriptions SDK
  - Paywall Builder
  - A/B Testing
  - Analytics
  - Integrations
- Solutions (dropdown)
  - For Developers
  - For Marketers
  - For App Owners
  - For Indie
  - For Startups
  - For Enterprise
- Resources (dropdown)
  - Blog
  - Documentation
  - Case Studies
  - Ebooks
  - Webinars
  - Community
- Pricing
- Docs

**CTA Buttons**: "Log in" | "Sign up" (primary)

---

### 2. Hero Section

**Headline**:
"Grow your in-app subscription revenue"

**Subheadline**:
"The complete subscription monetization platform. Build paywalls, run A/B tests, and analyze performance—all without writing code."

**CTA**:
- Primary: "Start for free" button
- Secondary: "Schedule a demo" link

**Email Input**:
- Placeholder: "Enter your work email"
- Button: "Get started"

**Social Proof**: "Trusted by 15,000+ apps worldwide"

---

### 3. Trusted By / Logo Cloud

**Section Title**: "Powering subscription apps worldwide"

**Logos** (from /assets/logos/):
- Calm
- Zing
- JEFIT
- Drops
- Mimo
- PhotoRoom
- RocketMoney
- ELSA
- Headway
- And more...

---

### 4. Role Cards Section

**Section Title**: "Built for everyone on your team"

**Cards (3)**:

**For Developers**
- Icon: Code bracket icon
- Title: "For Developers"
- Description: "Integrate subscriptions in minutes with our SDK. Handle receipt validation, manage entitlements, and sync purchase data automatically."
- Features:
  - Native SDKs for iOS, Android, Flutter, React Native, Unity
  - Server-side API for custom integrations
  - Webhook events for real-time updates

**For Marketers**
- Icon: Chart/Growth icon
- Title: "For Marketers"
- Description: "Design paywalls, run A/B tests, and optimize conversions without engineering help. Launch campaigns in minutes, not weeks."
- Features:
  - No-code paywall builder
  - A/B testing with statistical significance
  - Audience targeting and segmentation

**For App Owners**
- Icon: Dashboard icon
- Title: "For App Owners"
- Description: "Get real-time visibility into your subscription business. Track revenue, understand user behavior, and make data-driven decisions."
- Features:
  - Revenue and LTV analytics
  - Cohort analysis
  - Custom dashboards and reports

---

### 5. SDK Grid Section

**Section Title**: "One SDK for every platform"
**Subtitle**: "Integrate Adapty in minutes with native SDKs"

**Platforms**:
| Platform | Icon | Status |
|----------|------|--------|
| iOS | Swift icon | Available |
| Android | Kotlin icon | Available |
| Flutter | Flutter icon | Available |
| React Native | React icon | Available |
| Unity | Unity icon | Available |
| Web | Web icon | Available |
| Stripe | Stripe icon | Available |
| Capacitor | Capacitor icon | Available |
| KMP | Kotlin icon | Available |
| FlutterFlow | FlutterFlow icon | Available |

**Code Example**:
```swift
// Initialize Adapty SDK
Adapty.activate("YOUR_API_KEY")

// Check subscription status
Adapty.getProfile { result in
    if let profile = try? result.get() {
        let isPremium = profile.accessLevels["premium"]?.isActive ?? false
    }
}
```

---

### 6. Feature Sections

#### 6A. Paywall Builder

**Section Title**: "Build paywalls without code"
**Subtitle**: "Design, test, and deploy paywalls in minutes"

**Key Points**:
- Drag-and-drop visual builder
- Pre-built templates
- Real-time preview on device
- Instant updates without app release

**Image**: Paywall builder UI screenshot

---

#### 6B. A/B Testing

**Section Title**: "Test your way to higher conversions"
**Subtitle**: "Run experiments with statistical confidence"

**Key Points**:
- Test paywalls, pricing, and offers
- Statistical significance calculator
- Audience segmentation
- Automatic winner selection

**Metrics Display**:
- Conversion Rate: +23%
- Revenue per User: +18%
- Trial-to-Paid: +31%

---

#### 6C. Analytics Dashboard

**Section Title**: "Understand your subscription business"
**Subtitle**: "Real-time insights into revenue and user behavior"

**Key Metrics**:
- MRR / ARR
- LTV by cohort
- Churn rate
- Trial conversion
- Refund rate

**Image**: Analytics dashboard screenshot

---

#### 6D. Refund Saver

**Section Title**: "Recover revenue automatically"
**Subtitle**: "Reduce refunds with intelligent intervention"

**Stats**:
- "Save up to 40% of refund requests"
- "Automated customer recovery"

---

### 7. Integrations Section

**Section Title**: "Connect with your favorite tools"
**Subtitle**: "Send subscription data to analytics, attribution, and marketing platforms"

**Integration Logos** (24 total):
- Analytics: Amplitude, Mixpanel, Firebase, AppMetrica
- Attribution: AppsFlyer, Adjust, Branch, Singular
- Marketing: Braze, OneSignal, Pushwoosh
- Storage: Amazon S3, Google Cloud
- Other: Webhook, Stripe

---

### 8. Testimonials Section

**Section Title**: "Loved by product teams worldwide"

**Testimonials** (carousel):

1. **Testimonial 1**
   - Quote: "Adapty helped us increase our trial-to-paid conversion by 34%. The paywall builder saved us months of development time."
   - Author: [Name]
   - Role: [Title]
   - Company: [Company]
   - Avatar: testimonial photo

2. **Testimonial 2**
   - Quote: "The analytics are incredible. We finally understand our subscription metrics and can make data-driven decisions."
   - Author: [Name]
   - Role: [Title]
   - Company: [Company]

3. **Testimonial 3**
   - Quote: "Switching to Adapty was the best decision we made. Setup took less than a day."
   - Author: [Name]
   - Role: [Title]
   - Company: [Company]

---

### 9. Case Studies Section

**Section Title**: "Trusted by thousands of scaling apps"

**Case Study Cards** (9 real Adapty case studies):

| App | Category | Metric | Description | URL |
|-----|----------|--------|-------------|-----|
| Productivity app | Productivity | +50% | How pricing tests unlocked app's potential | adapty.io/case-studies/productivity-app-and-autopilot/ |
| Text on Pic | Photo & Video | +30% | How to boost revenue with the right experiments | adapty.io/case-studies/photo-editing-app-and-autopilot/ |
| Trip planning | Travel | +102% | New onboarding and pricing strategy doubled revenue per user | adapty.io/case-studies/travel-app/ |
| Going Merry | App publisher | 5x | How to scale subscription revenue with Paywall Builder | adapty.io/case-studies/going-merry/ |
| Shmoody | Mental health | $2M | How to grow from a free app to $2M ARR with Adapty | adapty.io/case-studies/shmoody/ |
| Lively | Health & Fitness | -83% | Saved 82% of potentially lost revenue | adapty.io/case-studies/lively/ |
| Glam AI | Makeup & Beauty | 108% | How to scale to $1.2M ARR in 3 months | adapty.io/case-studies/glam-ai/ |
| Pepapp | Health & Fitness | 400% | How to make Adapty free with Refund Saver | adapty.io/case-studies/pepapp/ |
| Fotorama | Photo & Video | -40% | How to decrease the refund rate with Adapty | adapty.io/case-studies/fotorama/ |

**Card Structure**:
- App logo/icon (stored in /public/images/case-studies/)
- Category badge
- Key metric headline (large, bold)
- Brief description
- "Read story" link (opens external Adapty case study)

**Assets**: All app logos downloaded to `/public/images/case-studies/`

---

### 10. G2 Badges Section

**Section Title**: "Top-rated on G2"

**Badges**:
- High Performer
- Easiest to Use
- Best Support
- Fastest Implementation
- Users Love Us

---

### 11. Enterprise Section

**Section Title**: "Enterprise-ready infrastructure"
**Subtitle**: "Built for scale, security, and compliance"

**Features**:
- SOC 2 Type II certified
- GDPR compliant
- 99.99% uptime SLA
- Dedicated support
- Custom contracts

**CTA**: "Contact sales"

---

### 12. Final CTA Section

**Headline**: "Ready to grow your subscription revenue?"
**Subheadline**: "Start for free. No credit card required."

**CTAs**:
- Primary: "Get started free"
- Secondary: "Schedule a demo"

---

### 13. Footer

**Columns**:

**Product**
- Subscriptions SDK
- Paywall Builder
- A/B Testing
- Analytics
- Integrations
- Pricing

**Solutions**
- For Developers
- For Marketers
- For App Owners
- For Indie
- For Startups
- For Enterprise

**Resources**
- Blog
- Documentation
- Case Studies
- Ebooks
- Webinars
- Community
- Changelog

**Company**
- About Us
- Careers
- Contact
- Partners
- Terms
- Privacy

**Social Icons**: GitHub, LinkedIn, X (Twitter), Discord, YouTube

**Copyright**: "© 2025 Adapty. All rights reserved."

---

## Blog Structure

### Blog Listing Page (/blog)

**Header**: "Latest news and insights from Adapty"

**Category Filter Bar**:
| Category | Count |
|----------|-------|
| All categories | 333 |
| Analytics | 26 |
| Android | 18 |
| General | 13 |
| iOS | 41 |
| Money | 43 |
| Paywall Newsletter | 27 |
| Podcast | 18 |
| Product-releases | 60 |
| Trends-insights | 65 |
| Tutorial | 105 |

**Blog Card Component**:
```
┌─────────────────────────────────┐
│  [Featured Image - 16:9]       │
├─────────────────────────────────┤
│  [Category Badge]               │
│                                 │
│  [Title - H3, max 2 lines]     │
│                                 │
│  [Date] • [X min read]          │
│                                 │
│  [Excerpt - max 2 lines]        │
└─────────────────────────────────┘
```

**Grid Layout**:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Pagination**: "Load more" button or numbered pages

---

### Sample Blog Posts (for CMS)

**Post 1**:
- Title: "What does 'Restore purchase' mean?"
- Category: General
- Date: December 5, 2025
- Read time: 4 min
- Excerpt: "Imagine this: a user buys a subscription, switches devices, reinstalls your app, and suddenly loses access. That's exactly why the 'Restore purchase' exists."
- Image: restore-purchase-cover.webp

**Post 2**:
- Title: "Why 45% of users delete your app in 24 hours — and how onboarding can save you"
- Category: General
- Date: December 1, 2025
- Read time: 9 min
- Excerpt: "First impressions matter. Learn how to build onboarding flows that convert and retain users."
- Image: onboarding-cover.webp

**Post 3**:
- Title: "Mobile app analytics stack: UA, monetization & product metrics explained"
- Category: Analytics
- Date: November 4, 2025
- Read time: 4 min
- Excerpt: "Understanding the complete analytics stack for mobile apps."
- Image: analytics-stack-cover.webp

**Post 4**:
- Title: "Going from $10K to $100K MRR: 7 questions that unlock app growth"
- Category: General
- Date: October 22, 2025
- Read time: 9 min
- Excerpt: "Proven strategies to break past the $10K ceiling."
- Image: growth-mrr-cover.webp

**Post 5**:
- Title: "How to add Android in-app purchases to your app in 10 minutes"
- Category: Android
- Date: June 2025
- Read time: 17 min
- Excerpt: "Step-by-step guide to implementing in-app purchases on Android."
- Image: android-iap-cover.webp

---

### Blog Post Categories (for CMS schema)

```typescript
const categories = [
  { name: 'Analytics', slug: 'analytics', color: '#3B82F6' },
  { name: 'Android', slug: 'android', color: '#22C55E' },
  { name: 'General', slug: 'general', color: '#6366F1' },
  { name: 'iOS', slug: 'ios', color: '#F59E0B' },
  { name: 'Money', slug: 'money', color: '#10B981' },
  { name: 'Paywall Newsletter', slug: 'paywall-newsletter', color: '#8B5CF6' },
  { name: 'Podcast', slug: 'podcast', color: '#EC4899' },
  { name: 'Product-releases', slug: 'product-releases', color: '#06B6D4' },
  { name: 'Trends-insights', slug: 'trends-insights', color: '#F97316' },
  { name: 'Tutorial', slug: 'tutorial', color: '#14B8A6' },
];
```

---

## Content Migration Checklist

### Homepage Content to Extract
- [ ] Hero headline and subtext
- [ ] Trusted by logos
- [ ] Feature descriptions
- [ ] Testimonial quotes
- [ ] Case study data
- [ ] G2 badge images
- [ ] Integration logos
- [ ] Footer links

### Blog Content to Extract
- [ ] 12-20 recent blog posts (metadata only)
- [ ] Category structure
- [ ] Featured images
- [ ] Author information

---

## SEO Metadata

### Homepage
```html
<title>Adapty - Grow Your In-App Subscription Revenue</title>
<meta name="description" content="The complete subscription monetization platform. Build paywalls, run A/B tests, and analyze performance—all without writing code.">
<meta property="og:image" content="/og-image.png">
```

### Blog Listing
```html
<title>Blog - Latest News and Insights | Adapty</title>
<meta name="description" content="Learn about in-app subscriptions, mobile monetization, and app growth strategies.">
```
