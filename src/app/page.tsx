import { Container } from "@/components/ui/Container";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { PaywallABTesting } from "@/components/sections/features/PaywallABTesting";
import { RefundSaver } from "@/components/sections/features/RefundSaver";
import { SubscriptionBI } from "@/components/sections/features/SubscriptionBI";
import { NoCodePaywall } from "@/components/sections/features/NoCodePaywall";
import { FunnelFox } from "@/components/sections/features/FunnelFox";
import { RevenueSync } from "@/components/sections/RevenueSync";
import { Section } from "@/components/ui/Section";
import { AIChatWidget } from "@/components/ui/AIChatWidget";
import { RoleCards } from "@/components/sections/RoleCards";
import { IntegrationsMarquee } from "@/components/sections/IntegrationsMarquee";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
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
import { AttioBadge } from "@/components/ui/AttioBadge";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { KaraokeText } from "@/components/ui/KaraokeText";
import { TheInfiniteGrid } from "@/components/ui/TheInfiniteGrid";
import { MagneticText } from "@/components/ui/morphing-cursor";

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
      <div className="min-h-screen bg-background relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-white to-background-tertiary/30 relative overflow-x-hidden overflow-y-visible pt-8">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
            <TheInfiniteGrid className="!fixed inset-0 h-full w-full pointer-events-none" />
          </div>

          <ContainerScroll
            titleComponent={
              <div className="mb-8">
                <div className="mb-8 flex justify-center relative z-20">
                  <Link href="https://adapty.io/ebooks/100k-app-playbook/">
                    <AttioBadge className="cursor-pointer">
                      <span className="text-[13px] font-medium text-foreground-secondary flex items-center gap-1">
                        Ebook: $100K playbook | download
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="m5.5 4 3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </AttioBadge>
                  </Link>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1] flex flex-col items-center">
                  <MagneticText text="Revenue management" className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]" />
                  <MagneticText text="for in-app purchases" className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]" />
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
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-full h-full border-4 border-[#6C6C6C] p-2 bg-[#222222] rounded-[30px] shadow-2xl relative z-10">
                <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl border border-gray-700">
                  <Image
                    src="/images/hero-overview.webp"
                    alt="Adapty Dashboard"
                    width={1400}
                    height={720}
                    className="w-full h-full object-cover object-left-top"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -right-4 md:-right-16 -bottom-10 md:-bottom-20 z-20 w-[200px] md:w-[280px] pointer-events-none">
                <Image
                  src="/images/hero-phone.webp"
                  alt="Adapty Mobile App"
                  width={300}
                  height={600}
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
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

        {/* Feature Sections */}
        <div className="flex flex-col">
          <PaywallABTesting />
          <RefundSaver />
          <SubscriptionBI />
          <NoCodePaywall />
          <FunnelFox />
          <RevenueSync />
        </div>

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

        <SDKCodeSnippet />

        <TestimonialsCarousel />

        <G2Badges />
        <CaseStudies />
        <Enterprise />

        {/* Final CTA */}
        <Section className="py-24 md:py-32">
          <Container>
            <div className="rounded-[32px] bg-[#0A0A0A] overflow-hidden relative shadow-2xl border border-white/10 p-12 md:p-24 text-center group">
              <BorderBeam size={400} duration={10} colorFrom="#6720FF" colorTo="#FF5B59" className="opacity-100" />
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <TheInfiniteGrid className="!static w-full h-full text-white/20" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <KaraokeText
                  text="Get started today or schedule a demo for your personal onboarding"
                  className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
                />
                <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-lg">
                  <EmailCTA
                    variant="dark"
                    className="w-full justify-center scale-110"
                    buttonText="Start for free"
                    showBookDemo={false}
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
