"use client";

import { FeatureSection } from "./FeatureSection";

export function FunnelFox() {
    return (
        <FeatureSection
            flipped={true} // Image Left
            className="bg-background-tertiary"
            image={{
                src: "/images/sections/funnelfox.webp",
                alt: "FunnelFox Dashboard",
                className: "bg-[#F4F4F5]"
            }}
            title={
                <>
                    Boost app revenue fast <br />
                    with web funnels
                </>
            }
            description="Build and launch web-to-app funnels, integrate payments, optimize with A/B testing and scale globally — all in one platform, no coding needed."
            cta={{
                text: "Explore FunnelFox",
                href: "https://funnelfox.io",
                external: true
            }}
        // No testimonial for FunnelFox in design
        />
    );
}
