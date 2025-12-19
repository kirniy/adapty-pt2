"use client";

import { FeatureSection } from "./FeatureSection";

export function PaywallABTesting() {
    return (
        <FeatureSection
            flipped={true} // Image Left
            image={{
                src: "/images/sections/paywall-ab-testing.webp",
                alt: "Paywall A/B Testing Interface",
                className: "bg-[#2A594F]" // Custom background for the card
            }}
            title={
                <>
                    Increase subscription <br />
                    revenue without <br />
                    app releases
                </>
            }
            description="Manage, target, localize and personalize paywalls without leaving your browser."
            cta={{
                text: "Increase app revenue",
                href: "https://adapty.io/paywall-ab-testing/"
            }}
            testimonial={{
                logo: "/images/sections/smartist-logo.png",
                quote: "Whether it's A/B testing paywalls, predicting LTV, or analyzing subscription metrics, Adapty is the ultimate toolkit for app success.",
                author: {
                    name: "Ilgar Tali",
                    role: "Founder & Chief Vision Officer",
                    avatar: "/images/sections/ilgar-tali.webp"
                }
            }}
        />
    );
}
