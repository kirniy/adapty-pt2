import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { RoleCards } from "@/components/sections/RoleCards";
import { SDKGrid } from "@/components/sections/SDKGrid";
import { IntegrationsMarquee } from "@/components/sections/IntegrationsMarquee";
import Image from "next/image";
import Link from "next/link";
import { AnimatedPill } from "@/components/ui/AnimatedPill";
import { ArrowRight, Check, BarChart2, Smartphone, DollarSign, Layers } from "lucide-react";
import { Stats } from "@/components/sections/Stats";
import { SDKCodeSnippet } from "@/components/sections/SDKCodeSnippet";
import { G2Badges } from "@/components/sections/G2Badges";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Enterprise } from "@/components/sections/Enterprise";

import { FadeIn } from "@/components/animations/FadeIn";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-[140px] pb-24 md:pt-[180px] md:pb-32 text-center bg-gradient-to-b from-white to-background-tertiary/30">
        <FadeIn>
          <Container>
            <div className="mb-8 flex justify-center">
              <AnimatedPill>
                <span className="flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  New: AI-Powered Paywall Builder
                </span>
              </AnimatedPill>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 max-w-5xl mx-auto leading-[1.1]">
              Revenue management <br />
              for in-app purchases
            </h1>

            <p className="text-xl md:text-2xl text-foreground-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
              Adapty helps mobile apps analyze and grow in-app subscription revenue
              with paywall A/B testing, instant analytics, and server-side purchase
              validation across iOS, Android, and cross-platform frameworks.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <div className="relative w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="h-12 pl-4 pr-12 rounded-[10px] border border-border-default w-full sm:w-[320px] focus:outline-none focus:border-brand transition-colors shadow-sm"
                />
              </div>
              <Button size="lg" className="w-full sm:w-auto group shadow-brand/25 shadow-lg">
                Start for free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border-default bg-white max-w-5xl mx-auto mb-24 transition-transform hover:scale-[1.01] duration-700 ease-out">
              <Image
                src="/images/hero-overview.webp"
                alt="Adapty Dashboard Overview"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="flex flex-col items-center gap-8 border-t border-border-subtle pt-16">
              <p className="text-sm font-medium text-foreground-muted uppercase tracking-widest">
                Trusted by 15,000+ apps worldwide
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {['bumble', 'feeld', 'hubx', 'almus', 'weewoo'].map((logo) => (
                  <Image
                    key={logo}
                    src={`/logos/trusted-by/${logo}.svg`}
                    alt={logo}
                    width={120}
                    height={40}
                    className="h-8 md:h-10 w-auto object-contain hover:scale-110 transition-transform duration-300"
                  />
                ))}
              </div>
            </div>
          </Container>
        </FadeIn>
      </Section>

      {/* Stats Section */}
      <Stats />

      {/* SDK Code Snippet */}
      <FadeIn>
        <SDKCodeSnippet />
      </FadeIn>

      {/* SDK Grid */}
      <FadeIn delay={0.2}>
        <SDKGrid />
      </FadeIn>

      {/* Role Cards (Tabs) */}
      <Section className="bg-white">
        <Container>
          <FadeIn direction="up">
            <RoleCards />
          </FadeIn>
        </Container>
      </Section>

      {/* Feature Section: Paywall Builder */}
      <Section className="bg-background-secondary border-y border-border-subtle overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border-subtle bg-white group">
                <Image
                  src="/images/feature-paywall.webp"
                  alt="Paywall Builder Interface"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Interactive Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Button size="sm">Edit Paywall</Button>
                </div>
              </div>
            </FadeIn>
            <div className="order-1 lg:order-2">
              <FadeIn delay={0.1} direction="left">
                <div className="inline-flex items-center gap-2 mb-6 text-brand font-semibold bg-brand-light px-3 py-1 rounded-full text-sm">
                  <Layers className="w-4 h-4" />
                  <span>Paywall Builder</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} direction="left">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Build paywalls <br /> without code
                </h2>
              </FadeIn>
              <FadeIn delay={0.3} direction="left">
                <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
                  Design, test, and deploy paywalls in minutes. Use our drag-and-drop builder to create native paywalls that look perfect on every device.
                </p>
              </FadeIn>
              <FadeIn delay={0.4} direction="left">
                <ul className="space-y-4 mb-8">
                  {[
                    'Drag-and-drop visual editor',
                    'Pre-built high-converting templates',
                    'Real-time preview on device',
                    'Instant updates without app release'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={0.5} direction="left">
                <Button variant="secondary" className="border-border-default shadow-sm hover:bg-white">Learn more about Paywalls</Button>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* Feature Section: A/B Testing */}
      <Section className="bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn delay={0.1} direction="right">
                <div className="inline-flex items-center gap-2 mb-6 text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full text-sm">
                  <Layers className="w-4 h-4" />
                  <span>A/B Testing for Paywalls</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} direction="right">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Experiment to find <br /> what works best
                </h2>
              </FadeIn>
              <FadeIn delay={0.3} direction="right">
                <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
                  Run prices, offers, and paywall experiments with statistical significance. Adapty automatically calculates the winner and can apply it for you.
                </p>
              </FadeIn>
              <FadeIn delay={0.4} direction="right">
                <ul className="space-y-4 mb-8">
                  {[
                    'Price testing for subscriptions',
                    'Trial duration experiments',
                    'Paywall layout A/B tests',
                    'Target specific audiences'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={0.5} direction="right">
                <Button variant="secondary" className="border-border-default shadow-sm hover:bg-white">Start A/B Testing</Button>
              </FadeIn>
            </div>
            <FadeIn direction="left" className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border-subtle bg-white group">
                <Image
                  src="/images/feature-ab.webp"
                  alt="A/B Testing Interface"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Feature Section: Analytics (Flipped Layout: Image Left) */}
      <Section className="bg-background-secondary border-y border-border-subtle">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border-subtle bg-white group">
                <Image
                  src="/images/feature-analytics.webp"
                  alt="Analytics Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </FadeIn>
            <FadeIn direction="left" className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-6 text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full text-sm">
                <BarChart2 className="w-4 h-4" />
                <span>Real-time Analytics</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Understand your subscription business
              </h2>
              <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
                Get real-time insights into your revenue, churn, and user behavior with 99.9% accuracy. Make data-driven decisions to grow your app.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'MRR / ARR', value: '$42.5k' },
                  { label: 'Active Subs', value: '1,240' },
                  { label: 'Trial Conv.', value: '14.2%' },
                  { label: 'Churn Rate', value: '3.1%' },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 rounded-2xl border border-border-subtle bg-white hover:shadow-md transition-all duration-200">
                    <div className="text-sm text-foreground-secondary mb-1 font-medium">{stat.label}</div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="border-border-default shadow-sm hover:bg-white">Explore Analytics</Button>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Integrations Marquee */}
      <IntegrationsMarquee />

      {/* G2 Badges */}
      <G2Badges />

      {/* Case Studies */}
      <FadeIn>
        <CaseStudies />
      </FadeIn>

      {/* Enterprise Section */}
      <FadeIn>
        <Enterprise />
      </FadeIn>

      {/* Bento Grid Features */}
      <Section className="bg-background-tertiary/50">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything you need to scale</h2>
              <p className="text-xl text-foreground-secondary">Powerful tools for developers, marketers, and product managers to grow mobile apps.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Cross-platform SDK"
                description="One SDK for iOS, Android, Flutter, React Native, and Unity. Implement in minutes."
                icon={<Smartphone className="w-6 h-6" />}
                className="md:col-span-1"
              />
              <FeatureCard
                title="A/B Testing"
                description="Run experiments on paywalls, prices, and offers with statistical significance."
                icon={<Layers className="w-6 h-6" />}
                image={
                  <Image src="/images/feature-ab.webp" alt="A/B Testing" width={400} height={200} className="w-full h-auto" />
                }
                className="md:col-span-1"
              />
              <FeatureCard
                title="Refund Saver"
                description="Automatically contact users who request refunds to recover revenue."
                icon={<DollarSign className="w-6 h-6" />}
                className="md:col-span-1"
              />
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="bg-white">
        <Container>
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight">Loved by product teams</h2>
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              <TestimonialCard
                quote="Adapty helped us increase our trial-to-paid conversion by 34%. The paywall builder saved us months of development time."
                author={{ name: "Alex Z.", role: "CEO", company: "Moonlight Apps" }}
              />
              <TestimonialCard
                quote="The analytics are incredible. We finally understand our subscription metrics and can make data-driven decisions."
                author={{ name: "Sarah J.", role: "Product Lead", company: "FitBody" }}
              />
              <TestimonialCard
                quote="Switching to Adapty was the best decision we made. Setup took less than a day and everything just works."
                author={{ name: "Mike R.", role: "CTO", company: "Scanner Pro" }}
              />
              <TestimonialCard
                quote="The best revenue data accuracy on the market. We trust Adapty with our entire business."
                author={{ name: "Jessica K.", role: "Founder", company: "Mindful" }}
              />
              <TestimonialCard
                quote="Their support team is amazing. They helped us migrate from a competitor in record time."
                author={{ name: "David L.", role: "Lead Dev", company: "Health+" }}
              />
              <TestimonialCard
                quote="The A/B testing features are a game changer. We've doubled our revenue in 6 months."
                author={{ name: "Emily W.", role: "Growth", company: "Yoga Daily" }}
              />
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="py-24 md:py-32">
        <Container>
          <FadeIn direction="up">
            <div className="bg-brand rounded-[32px] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-brand/20">
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                  Ready to grow your revenue?
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                  Join 15,000+ apps using Adapty to power their subscription business.
                  Start for free, no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="bg-white text-brand hover:bg-gray-50 shadow-xl border-0 h-14 px-8 text-lg">
                    Get started free
                  </Button>
                  <Button size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg backdrop-blur-sm">
                    Schedule a demo
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
