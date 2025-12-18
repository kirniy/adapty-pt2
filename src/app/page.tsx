
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
import { AnimatedCheck } from "@/components/ui/AnimatedCheck";
import { FadeIn } from "@/components/animations/FadeIn";
import { StickyScrollReal as StickyScroll } from "@/components/ui/StickyScroll";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { KaraokeText } from "@/components/ui/KaraokeText";

export default function Home() {
  const stickyContent = [
    {
      title: "Build paywalls without code",
      description: "Design, test, and deploy paywalls in minutes. Use our drag-and-drop builder to create native paywalls that look perfect on every device.",
      content: (
        <Image
          src="/images/feature-paywall.webp"
          alt="Paywall Builder"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      title: "Experiment with A/B Testing",
      description: "Run prices, offers, and paywall experiments with statistical significance. Adapty automatically calculates the winner and can apply it for you.",
      content: (
        <Image
          src="/images/feature-ab.webp"
          alt="A/B Testing"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      title: "Real-time Analytics",
      description: "Get real-time insights into your revenue, churn, and user behavior with 99.9% accuracy. Make data-driven decisions to grow your app.",
      content: (
        <Image
          src="/images/feature-analytics.webp"
          alt="Analytics"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      ),
    },
  ];

  return (
    <>
      {/* Container Scroll Hero */}
      <div className="bg-gradient-to-b from-white to-background-tertiary/30 relative overflow-hidden">
        {/* Dotted Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(125deg, transparent, transparent 6px, #dee2e6 6px, #dee2e6 7px)`
          }}
        />

        <ContainerScroll
          titleComponent={
            <div className="mb-8">
              <div className="mb-8 flex justify-center">
                <AnimatedPill>
                  <span className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    New: AI-Powered Paywall Builder
                  </span>
                </AnimatedPill>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1]">
                Revenue management <br />
                for in-app purchases
              </h1>

              <p className="text-xl md:text-2xl text-foreground-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
                Adapty helps mobile apps analyze and grow in-app subscription revenue
                with paywall A/B testing, instant analytics, and server-side purchase
                validation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                <Button size="lg" className="w-full sm:w-auto group shadow-brand/25 shadow-lg relative z-10">
                  Start for free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          }
        >
          <Image
            src="/images/hero-overview.webp"
            alt="Adapty Dashboard"
            width={1400}
            height={720}
            className="w-full h-full object-cover object-left-top"
            priority
          />
        </ContainerScroll>
      </div>

      {/* Trusted By */}
      <Section className="py-12 border-b border-border-subtle bg-white">
        <Container>
          <div className="flex flex-col items-center gap-8">
            <p className="text-sm font-medium text-foreground-muted uppercase tracking-widest text-center">
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
      </Section>

      <Stats />

      <div className="py-24 bg-white relative">
        <Container>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            Everything you need <br /> to scale your app
          </h2>
        </Container>
        <StickyScroll content={stickyContent} />
      </div>

      <SDKCodeSnippet />

      <Section className="bg-background-secondary py-32 border-y border-border-subtle relative overflow-hidden">
        {/* Dotted Background for Testimonials */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(125deg, transparent, transparent 6px, #dee2e6 6px, #dee2e6 7px)`
          }}
        />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <KaraokeText
              text="When I first opened Adapty, I instantly got the feeling this was the next generation of revenue cat."
              className="text-4xl md:text-6xl font-serif font-medium leading-tight text-foreground tracking-tight mb-8"
            />
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                {/* Placeholder for avatar */}
                <div className="w-full h-full bg-gradient-to-br from-brand to-purple-500" />
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">Margaret Shen</div>
                <div className="text-foreground-secondary text-sm">Head of Business Operations, Modal</div>
              </div>
            </div>
          </div>

          <RoleCards />
        </Container>
      </Section>

      {/* Grid Features */}
      <Section className="bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Powerful tools for everyone</h2>
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

      <IntegrationsMarquee />
      <G2Badges />
      <CaseStudies />
      <Enterprise />


      {/* Final CTA */}
      <Section className="py-24 md:py-32">
        <Container>
          <FadeIn direction="up">
            <div className="bg-brand rounded-[32px] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-brand/20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              <div className="relative z-10">
                <KaraokeText
                  text="Ready to grow your revenue?"
                  className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter justify-center text-center"
                />

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
