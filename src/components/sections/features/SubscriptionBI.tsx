"use client";

import { FeatureSection } from "./FeatureSection";

export function SubscriptionBI() {
    return (
        <FeatureSection
            flipped={true} // Image Left
            image={{
                src: "/images/sections/analytics.webp",
                alt: "Subscription Analytics Dashboard",
                className: "bg-[#B4ABF9]" // Purple background
            }}
            title={
                <>
                    Know your subscription <br />
                    numbers at any moment
                </>
            }
            description="Measure your in-app economy from trials to refunds with a ready-to-go, real-time subscription BI."
            cta={{
                text: "See subscription BI",
                href: "https://adapty.io/ltv-analytics/"
            }}
            testimonial={{
                quote: "Adapty's analytics provides invaluable insights into our app's performance. With detailed real-time metrics like revenue, ARPU, and churn rate, we make informed decisions to optimize our monetization strategy.",
                company: {
                    name: "Moonly",
                    category: "Moon calendar app",
                    logo: "/images/sections/moonly-icon.svg"
                },
                author: {
                    name: "Nikolay Chebotarev",
                    role: "Head of UA at Moonly.app",
                    avatar: "/images/sections/nikolay.png"
                }
            }}
        />
    );
}
