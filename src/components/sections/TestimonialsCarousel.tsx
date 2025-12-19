"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
    {
        id: "cem",
        image: "/images/testimonials/cem.webp",
        quote:
            "Migrating off RevenueCat was not an easy decision for us. We've chosen Adapty because we believe they are a better partner as we grow. Looking back it was the right call. Despite some hiccups, the Adapty team was always there to help us during the migration and afterward, and their support is top-notch. I recommend Adapty as a reliable partner.",
        name: "Cem Ortabas",
        position: "Co-founder and CEO, HubX",
        logo: "/images/testimonials/logos/logo-hubx-white.svg",
    },
    {
        id: "chris",
        image: "/images/testimonials/chris.webp",
        quote:
            "We've been working with Adapty since 2021 and I couldn't be happier about it. We've tried other subscription management platforms in the past so I can compare. Adapty introduced numerous features over the years and constantly helped us grow. They have the best analytics on the market and all the integrations you can think of. If you are looking to boost the revenue of your app, I definitely recommend Adapty.",
        name: "Chris Bick",
        position: "Founder and CEO, Bickster",
        logo: "/images/testimonials/logos/logo-bickster.png",
    },
    {
        id: "asman",
        image: "/images/testimonials/asman.webp",
        quote:
            "We chose Adapty for its powerful paywall A/B testing capabilities, which helped us optimize our monetization strategy effectively. The user-friendly platform, flexible pricing, and exceptional customer support make Adapty a superior choice over competitors.",
        name: "Yalcin Ozdemir",
        position: "Founder and CEO, AppNation",
        logo: "/images/testimonials/logos/logo-appnation-white.png",
    },
    {
        id: "kyle",
        image: "/images/testimonials/kyle.webp",
        quote:
            "Adapty's platform makes it easy for non-developers to create and manage A/B tests, paywalls, product mix and pricing structure. They have a great external API that makes it easy to pass related events to other analytics tools like Amplitude and Mixpanel.",
        name: "Kyle Smith",
        position: "Head of data at Smitten Dating",
        logo: "/images/testimonials/logos/logo-smitten.webp",
    },
    {
        id: "roi",
        image: "/images/testimonials/roi.webp",
        quote:
            "We've tested more than three hundred paywalls in the space of four months. Adapty allows testing basically any element of the paywall, and we took advantage of that. We've tested them all: products, title text, CTA buttons, images, videos, etc. With Adapty's A/B testing, we managed to double our monthly revenue. I wasn't sure if one instrument could make such an impact, but I witnessed it myself.",
        name: "Roi Mulia",
        position: "Founder and CEO, SocialKit",
        logo: "/images/testimonials/logos/logo-socialkit-white.svg",
    },
];

const AUTOPLAY_MS = 8500;

export const TestimonialsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    useEffect(() => {
        const timer = window.setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, AUTOPLAY_MS);

        return () => window.clearInterval(timer);
    }, []);

    const active = TESTIMONIALS[activeIndex];

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
        }),
    };

    return (
        <Section className="bg-background-secondary py-24 border-y border-border-subtle relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(125deg, transparent, transparent 6px, #dee2e6 6px, #dee2e6 7px)",
                }}
            />
            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Developers from all kind of apps move to Adapty to grow their revenue
                    </h2>
                    <p className="text-foreground-secondary text-lg">
                        Honest feedback from teams shipping subscription-first products.
                    </p>
                </div>

                <div className="relative rounded-[32px] bg-white/90 backdrop-blur border border-border-subtle shadow-elevated p-6 md:p-10 overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={active.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 },
                            }}
                            className="grid md:grid-cols-2 gap-10 items-center"
                        >
                            <div className="order-2 md:order-1">
                                <div className="relative w-full max-w-[360px] mx-auto aspect-[3/4] rounded-[28px] overflow-hidden shadow-elevated">
                                    <Image
                                        src={active.image}
                                        alt={active.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground mb-8">
                                    &ldquo;{active.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div>
                                        <div className="font-semibold text-foreground">{active.name}</div>
                                        <div className="text-sm text-foreground-secondary">{active.position}</div>
                                    </div>
                                    <div className="ml-auto rounded-xl bg-foreground p-2">
                                        <Image
                                            src={active.logo}
                                            alt={active.name}
                                            width={140}
                                            height={40}
                                            className="h-6 w-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="h-10 w-10 rounded-full border border-border-subtle bg-white text-foreground hover:bg-[#6720FF] hover:text-white hover:border-[#6720FF] transition-all duration-200 shadow-sm flex items-center justify-center group"
                                aria-label="Previous testimonial"
                            >
                                <ArrowLeft className="w-4 h-4 mx-auto group-hover:text-white transition-colors" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="h-10 w-10 rounded-full border border-border-subtle bg-white text-foreground hover:bg-[#6720FF] hover:text-white hover:border-[#6720FF] transition-all duration-200 shadow-sm flex items-center justify-center group"
                                aria-label="Next testimonial"
                            >
                                <ArrowRight className="w-4 h-4 mx-auto group-hover:text-white transition-colors" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <button
                                    key={testimonial.id}
                                    type="button"
                                    onClick={() => {
                                        setDirection(index > activeIndex ? 1 : -1);
                                        setActiveIndex(index);
                                    }}
                                    className={cn(
                                        "h-2.5 rounded-full transition-all duration-300",
                                        index === activeIndex
                                            ? "bg-brand w-6"
                                            : "bg-foreground/20 hover:bg-foreground/40 w-2.5"
                                    )}
                                    aria-label={`Go to ${testimonial.name} testimonial`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
