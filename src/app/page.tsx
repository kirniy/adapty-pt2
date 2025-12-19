import { Container } from "@/components/ui/Container";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { FeatureScrollStack } from "@/components/sections/FeatureScrollStack";
import { Section } from "@/components/ui/Section";
import { AIChatWidget } from "@/components/ui/AIChatWidget";
import { RoleCards } from "@/components/sections/RoleCards";
import { IntegrationsMarquee } from "@/components/sections/IntegrationsMarquee";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EmailCTA } from "@/components/ui/EmailCTA";
import { Marquee } from "@/components/ui/Marquee";
import { Stats } from "@/components/sections/Stats";
import { SDKCodeSnippet } from "@/components/sections/SDKCodeSnippet";
import { G2Badges } from "@/components/sections/G2Badges";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Enterprise } from "@/components/sections/Enterprise";
import { FadeIn } from "@/components/animations/FadeIn";
import { AttioBadge } from "@/components/ui/AttioBadge";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { KaraokeText } from "@/components/ui/KaraokeText";
import { TheInfiniteGrid } from "@/components/ui/TheInfiniteGrid";

// Authentic content from adapty.io
const stickyContent = [
  {
    title: "No-code paywall builder",
    description: "Build beautiful native paywalls for iOS, Android, Flutter, and React Native without a dev team.",
    content: (
      <Image
        src="/images/feature-paywall.webp"
        alt="No Code Paywall Builder"
        width={1600}
        height={1200}
        className="w-full h-auto object-contain"
      />
    ),
  },
  {
    title: "Increase subscription revenue without app releases",
    description: "Manage, target, localize and personalize paywalls without leaving your browser.",
    content: (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 p-8">
        <Image
          src="/images/feature-ab.webp"
          alt="Paywall A/B Testing"
          width={1600}
          height={1200}
          className="w-full h-auto object-contain"
        />
      </div>
    ),
  },
  {
    title: "Know your subscription numbers at any moment",
    description: "Measure your in-app economy from trials to refunds with a ready-to-go, real-time subscription BI.",
    content: (
      <Image
        src="/images/feature-analytics.webp"
        alt="App Monetization Strategies"
        width={1600}
        height={1200}
        className="w-full h-auto object-contain"
      />
    ),
  },
];

// Authentic trusted-by logos from adapty.io
const trustedByLogos = [
  { name: 'feeld', file: 'feeld.svg' },
  { name: 'bumble', file: 'bumble.svg' },
  { name: 'weewoo', file: 'weewoo.svg' },
  { name: 'appnation', file: 'appnation.svg' },
  { name: 'almus', file: 'almus.svg' },
  { name: 'impala-studios', file: 'impala-studios.svg' },
  { name: 'hubx', file: 'hubx.svg' },
];

export default function Home() {
  return (
    <>
      {/* Container Scroll Hero */}
      <div className="min-h-screen bg-background relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-white to-background-tertiary/30 relative overflow-hidden">
          {/* Replaced bg-noise/dotted/spotlight with TheInfiniteGrid */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
            <TheInfiniteGrid className="!fixed inset-0 h-full w-full pointer-events-none" />
          </div>

          <ContainerScroll
            titleComponent={
              <div className="mb-8">
                <div className="mb-8 flex justify-center relative z-20">
                  <Link href="https://adapty.io/ebooks/100k-app-playbook/">
                    <AttioBadge className="cursor-pointer">
                      <span className="text-[13px] font-medium text-shimmer-subtle flex items-center gap-1">
                        Ebook: $100K playbook | download
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="m5.5 4 3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </AttioBadge>
                  </Link>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1]">
                  Revenue management <br />
                  for in-app purchases
                </h1>

                <p className="text-xl md:text-2xl text-foreground-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
                  Save months on integrating subscriptions and double your app revenue with paywall management.
                </p>

                <div className="flex justify-center mb-20 relative z-10">
                  <EmailCTA variant="light" />
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
        <Section className="py-12 border-b border-border-subtle bg-white overflow-hidden">
          <Container>
            <div className="flex flex-col items-center gap-8">
              <p className="text-sm font-medium text-foreground-muted uppercase tracking-widest text-center">
                Trusted by 15,000+ apps and the world&apos;s largest app publishers
              </p>
              <div className="relative w-full mask-fade-sides">
                <Marquee pauseOnHover speed={25} gap="4rem" className="py-4">
                  {trustedByLogos.map((logo) => (
                    <Image
                      key={logo.name}
                      src={`/logos/trusted-by/${logo.file}`}
                      alt={logo.name}
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
                      style={{ width: "auto" }}
                    />
                  ))}
                </Marquee>
              </div>
            </div>
          </Container>
        </Section>

        {/* Role Cards Section */}
        <Section className="py-24 bg-white">
          <Container>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight leading-tight">
              Help your team run the mobile <br className="hidden md:block" />
              subscription business. <br className="hidden md:block" />
              Faster and cheaper.
            </h2>
            <RoleCards />
          </Container>
        </Section>

        <Stats />

        <div className="bg-background-secondary/20 border-b border-border-subtle relative">
          <Container className="pt-24 pb-12 text-center z-10 relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Everything you need <br /> to grow your app
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              The infrastructure that scales with you.
            </p>
          </Container>
          <FeatureScrollStack content={stickyContent} />
        </div>

        <SDKCodeSnippet />

        {/* Testimonials Section */}
        <Section className="bg-background-secondary py-32 border-y border-border-subtle relative overflow-hidden">
          {/* Dotted Background for Testimonials */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(125deg, transparent, transparent 6px, #dee2e6 6px, #dee2e6 7px)`
            }}
          />
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
                Developers from all kinds of apps move to Adapty to grow their revenue
              </h2>
            </div>

            {/* Featured Testimonial */}
            <div className="max-w-4xl mx-auto text-center mb-24">
              <KaraokeText
                text="We've been working with Adapty since 2021 and I couldn't be happier about it. They have the best analytics on the market and all the integrations you can think of."
                className="text-3xl md:text-5xl font-serif font-medium leading-tight text-foreground tracking-tight mb-8"
              />
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/images/testimonials/chris-bick.webp"
                    alt="Chris Bick"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground">Chris Bick</div>
                  <div className="text-foreground-secondary text-sm">Founder and CEO, Bickster</div>
                </div>
                <Image
                  src="/images/testimonials/logos/bickster.png"
                  alt="Bickster"
                  width={80}
                  height={24}
                  className="h-6 w-auto ml-4 opacity-80"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Feature Sections with Testimonials */}
        <Section className="bg-white py-24">
          <Container>
            <FadeIn direction="up">
              <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                    Cut refund rate by 40%
                  </h3>
                  <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
                    Stop losing revenue on refunds – Adapty automatically shares user activity data with Apple for refund requests and reduces it.
                  </p>
                  <Link href="https://adapty.io/refund-saver/" className="text-brand font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                    Set up Refund Saver <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="mt-12 p-6 bg-background-secondary rounded-2xl">
                    <div className="flex items-start gap-4">
                      <Image
                        src="https://adapty.io/assets/uploads/2024/12/app-icon-fotorama-original.webp"
                        alt="Fotorama"
                        width={48}
                        height={48}
                        className="rounded-xl"
                      />
                      <div>
                        <div className="font-semibold text-foreground">Fotorama</div>
                        <div className="text-sm text-foreground-secondary">Photo and video</div>
                      </div>
                    </div>
                    <p className="mt-4 text-foreground-secondary italic">
                      &ldquo;I never thought that doing something about refunds could make such a difference. We just flipped the switch, set it up, and suddenly, it felt like we stopped letting money slip away.&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Image
                        src="https://adapty.io/assets/uploads/2024/12/avatar-berk-cagatay-gray@3x.webp"
                        alt="Berk Çağatay Albayrak"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium text-sm">Berk Çağatay Albayrak</div>
                        <div className="text-xs text-foreground-secondary">Sr. Product Manager</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="https://adapty.io/assets/uploads/2025/05/refund-rate@2x-768x576.webp"
                    alt="Refund Rate"
                    width={768}
                    height={576}
                    className="rounded-2xl shadow-elevated"
                  />
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        <IntegrationsMarquee />
        <G2Badges />
        <CaseStudies />
        <Enterprise />

        {/* Final CTA - Premium Dark Card Design */}
        <Section className="py-24 md:py-32">
          <Container>
            <div className="rounded-[32px] bg-[#0A0A0A] overflow-hidden relative shadow-2xl border border-white/10 p-12 md:p-24 text-center group">
              {/* Effects Layers */}
              <BorderBeam size={400} duration={10} colorFrom="#6720FF" colorTo="#FF5B59" className="opacity-100" />

              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <TheInfiniteGrid className="!static w-full h-full text-white/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <KaraokeText
                  text="Get started today or schedule a demo for your personal onboarding"
                  className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
                />

                <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-lg">
                  {/* Using Hero-style EmailCTA in dark mode */}
                  <EmailCTA
                    variant="dark"
                    className="w-full justify-center scale-110"
                    buttonText="Start for free"
                    showBookDemo={false} // We will render it manually below for better styling control
                  />

                  <Link
                    href="https://adapty.io/schedule-demo/"
                    className="text-white/60 hover:text-white font-medium text-sm transition-colors flex items-center gap-1 group/link"
                  >
                    Or schedule a demo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
      <AIChatWidget />
    </>
  );
}
