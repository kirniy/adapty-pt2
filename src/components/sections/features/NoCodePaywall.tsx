"use client";

import { FeatureSection } from "./FeatureSection";

export function NoCodePaywall() {
    return (
        <FeatureSection
            flipped={false} // Image Right
            className="bg-[#FFD4CE]/30" // Subtle peach tint
            image={{
                src: "/images/sections/paywall-builder.webp",
                alt: "Paywall Builder Interface",
                className: "bg-transparent shadow-none border-none overflow-visible" // Clean look for phone mockup
            }}
            title="No-code paywall builder"
            description="Build beautiful native paywalls for iOS, Android, Flutter, and React Native without a dev team."
            cta={{
                text: "Create paywalls within minutes",
                href: "https://adapty.io/paywall-builder/"
            }}
            testimonial={{
                quote: "Adapty's Paywall Builder and A/B testing tools paired together are a game changer for anyone trying to do high-velocity testing and find quick wins.",
                company: {
                    name: "Moodworks Inc",
                    category: "Mental health apps",
                    logo: "/images/sections/cat-icon.png"
                },
                author: {
                    name: "Mike McSweeney",
                    role: "Chief Product Officer",
                    avatar: "/images/sections/mike.webp"
                }
            }}
        />
    );
}
