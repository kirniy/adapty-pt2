import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LOGOS = [
    { name: "Airbridge", file: "airbridge.svg" },
    { name: "Adjust", file: "adjust.svg" },
    { name: "Amazon S3", file: "amazon-s3.svg" },
    { name: "Amplitude", file: "amplitude.svg" },
    { name: "Apple Search Ads", file: "apple-ads.svg" },
    { name: "AppsFlyer", file: "appsflyer.svg" },
    { name: "AppMetrica", file: "appmetrica.svg" },
    { name: "Asapty", file: "asapty.svg" },
    { name: "Branch", file: "branch.svg" },
    { name: "Braze", file: "braze.svg" },
    { name: "Facebook", file: "facebook.svg" },
    { name: "Firebase", file: "firebase-ga.svg" },
    { name: "Google Cloud", file: "google-cloud-storage.svg" },
    { name: "Mixpanel", file: "mixpanel.svg" },
    { name: "OneSignal", file: "onesignal.svg" },
    { name: "PostHog", file: "posthog.svg" },
    { name: "Pushwoosh", file: "pushwoosh.svg" },
    { name: "SplitMetrics", file: "splitmetrics.svg" },
    { name: "Singular", file: "singular.svg" },
    { name: "Stripe", file: "stripe.svg" },
    { name: "Tenjin", file: "tenjin.svg" },
    { name: "Webhooks", file: "webhook.svg" },
];

export const RevenueSync = () => {
    return (
        <Section className="py-24 bg-white border-b border-border-subtle">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-3xl bg-[#0B0B0C] text-white p-8 md:p-10 overflow-hidden border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed22,transparent_60%)]" />
                        <div className="relative z-10">
                            <div className="text-xs uppercase tracking-widest text-white/60">
                                In-app-purchase events
                            </div>
                            <div className="mt-6 flex items-center justify-center text-white/50 text-2xl">↓</div>
                            <div className="mt-4 flex items-center justify-center">
                                <Image
                                    src="/integrations/adapty-logo-white.svg"
                                    alt="Adapty"
                                    width={140}
                                    height={32}
                                    className="h-8 w-auto"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-center text-white/50 text-2xl">↓</div>
                            <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {LOGOS.map((logo) => (
                                    <div
                                        key={logo.name}
                                        className="rounded-xl bg-white/95 p-3 flex items-center justify-center"
                                    >
                                        <Image
                                            src={`/integrations/${logo.file}`}
                                            alt={logo.name}
                                            width={80}
                                            height={32}
                                            className="h-6 w-auto object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                            Sync revenue data across the team
                        </h2>
                        <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
                            Forward subscription events to analytics and attribution services without coding.
                            Keep marketing, product, and data teams aligned.
                        </p>
                        <Link
                            href="https://adapty.io/integrations/"
                            className="text-brand font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
                        >
                            Explore integrations
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <div className="mt-10 rounded-2xl border border-border-subtle bg-background-secondary p-6">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/images/testimonials/logos/logo-bickster.png"
                                    alt="Bickster"
                                    width={120}
                                    height={40}
                                    className="h-6 w-auto object-contain"
                                />
                            </div>
                            <p className="mt-4 text-foreground-secondary italic">
                                &ldquo;They have a great external API that makes it easy to pass related events to other
                                analytics tools such as Amplitude and Mixpanel.&rdquo;
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-white border border-border-subtle">
                                    <Image
                                        src="/images/testimonials/chris.webp"
                                        alt="Chris Bick"
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Chris Bick</div>
                                    <div className="text-xs text-foreground-secondary">Founder and CEO</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
