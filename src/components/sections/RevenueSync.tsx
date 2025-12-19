"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LOGOS = [
    { name: "Airbridge", file: "logo-airbridge.svg", aspect: "video" },
    { name: "Adjust", file: "logo-adjust.svg", aspect: "video" },
    { name: "Amazon S3", file: "logo-amazon-s3.svg", aspect: "video" },
    { name: "Amplitude", file: "logo-amplitude.svg", aspect: "video" },
    { name: "Apple Search Ads", file: "icon-apple-ads-text.svg", aspect: "video" },
    { name: "AppsFlyer", file: "logo-appsflyer.svg", aspect: "video" },
    { name: "AppMetrica", file: "logo-appmetrica.svg", aspect: "video" },
    { name: "Asapty", file: "logo-asapty.svg", aspect: "video" },
    { name: "Branch", file: "logo-branch.svg", aspect: "video" },
    { name: "Braze", file: "logo-braze.svg", aspect: "video" },
    { name: "Facebook", file: "logo-facebook-blue-text.svg", aspect: "video" },
    { name: "Firebase", file: "logo-firebase-and-ga.svg", aspect: "video" },
    { name: "Google Cloud", file: "logo-google-cloud-storage.svg", aspect: "video" },
    { name: "Mixpanel", file: "logo-mixpanel.svg", aspect: "video" },
    { name: "OneSignal", file: "logo-onesignal.svg", aspect: "video" },
    { name: "PostHog", file: "posthog-logo-colorfull.svg", aspect: "video" },
    { name: "Pushwoosh", file: "logo-pushwoosh.svg", aspect: "video" },
    { name: "SplitMetrics", file: "logo-split-metrics.svg", aspect: "video" },
    { name: "Singular", file: "singular-logo-block.svg", aspect: "video" },
    { name: "Stripe", file: "icon-stripe-logo.svg", aspect: "video" },
    { name: "Tenjin", file: "tenjin_logo_color.svg", aspect: "video" },
    { name: "Webhooks", file: "logo-webhook.svg", aspect: "video" },
];

export const RevenueSync = () => {
    const [litIndex, setLitIndex] = useState<number | null>(null);

    // Mosaic twinkle effect
    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * LOGOS.length);
            setLitIndex(randomIndex);

            // Turn off after a short duration
            setTimeout(() => {
                setLitIndex(null);
            }, 800); // Shorter duration for more "twinkly" feel
        }, 1200); // Faster frequency

        return () => clearInterval(interval);
    }, []);

    return (
        <Section className="py-24 bg-white border-b border-border-subtle overflow-hidden">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Side (Mosaic) */}
                    <div className="relative rounded-[32px] bg-[#00A3B5] p-8 md:p-10 shadow-2xl overflow-hidden order-last lg:order-first min-h-[600px] flex flex-col items-center justify-center">
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center w-full">
                            {/* Top Flow */}
                            <div className="bg-white rounded-lg px-6 py-3 shadow-md mb-6">
                                <span className="text-sm font-bold text-foreground tracking-wide">In-app-purchase events</span>
                            </div>

                            <div className="flex flex-col items-center gap-3 mb-6">
                                <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <Image src="/images/logo-white.svg" alt="Adapty" width={120} height={32} className="h-8 w-auto" />
                                </div>
                                <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>

                            {/* Mosaic Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 w-full max-w-md mx-auto">
                                {LOGOS.slice(0, 15).map((logo, index) => (
                                    <div
                                        key={logo.name}
                                        className={cn(
                                            "aspect-[2/1] rounded-xl bg-white border border-white/20 shadow-sm flex items-center justify-center p-3 transition-all duration-500 transform",
                                            "hover:scale-105 hover:shadow-lg hover:grayscale-0",
                                            litIndex === index ? "grayscale-0 scale-105 shadow-md ring-2 ring-white/50" : "grayscale opacity-90"
                                        )}
                                    >
                                        <Image
                                            src={`/images/integrations/${logo.file}`}
                                            alt={logo.name}
                                            width={100}
                                            height={40}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
                            Sync purchase data <br />
                            <span className="text-foreground-secondary">with other services</span>
                        </h2>
                        <p className="text-xl text-foreground-secondary mb-10 leading-relaxed max-w-lg">
                            Forward subscription events to analytics and attribution services without coding.
                        </p>

                        <div className="mb-12">
                            <Link
                                href="https://adapty.io/integrations/"
                                className="inline-flex items-center gap-2 text-lg font-semibold text-brand hover:gap-3 transition-all group"
                            >
                                Explore integrations
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="rounded-[24px] border border-border-subtle bg-white p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/testimonials/logos/logo-bickster.png"
                                    alt="Bickster"
                                    width={100}
                                    height={30}
                                    className="h-7 w-auto object-contain"
                                />
                            </div>
                            <p className="text-lg text-foreground font-medium italic mb-6 leading-relaxed">
                                &ldquo;They have a great external API that makes it easy to pass related events to other
                                analytics tools such as Amplitude and Mixpanel.&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden border border-border-subtle">
                                    <Image
                                        src="/images/testimonials/chris.webp"
                                        alt="Chris Bick"
                                        width={48}
                                        height={48}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-foreground">Chris Bick</div>
                                    <div className="text-sm text-foreground-secondary">Founder and CEO</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
