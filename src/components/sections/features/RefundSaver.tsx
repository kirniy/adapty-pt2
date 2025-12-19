"use client";

import { FeatureSection } from "./FeatureSection";

export function RefundSaver() {
    return (
        <FeatureSection
            flipped={false} // Image Right (Zig-Zag)
            className="bg-[#D1F2E8]/30" // Subtle green tint background
            image={{
                src: "/images/sections/refund-rate.webp",
                alt: "Refund Rate Chart",
                className: "bg-white p-4 md:p-8" // White card inside for the chart
            }}
            title="Cut refund rate by 40%"
            description="Stop losing revenue on refunds — Adapty automatically shares user activity data with Apple for refund requests and reduces it."
            cta={{
                text: "Set up Refund Saver",
                href: "https://adapty.io/refund-saver/"
            }}
            testimonial={{
                quote: "I never thought that doing something about refunds could make such a difference. We just flipped the switch, set it up, and suddenly, it felt like we stopped letting money slip away.",
                company: {
                    name: "Fotorama",
                    category: "Photo and video",
                    logo: "/images/sections/fotorama.webp"
                },
                author: {
                    name: "Berk Çağatay Albayrak",
                    role: "Sr. Product Manager",
                    avatar: "/images/sections/berk.webp"
                }
            }}
        />
    );
}
