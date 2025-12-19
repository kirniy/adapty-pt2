"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const RESOURCES = {
    LEARN: [
        { title: "Blog", href: "https://adapty.io/blog/", icon: "/images/menu-icons/icon-24x24-newsletter.svg" },
        { title: "Podcasts", href: "https://adapty.io/podcasts/", icon: "/images/menu-icons/icon-24x24-23n.svg" },
        { title: "Glossary", href: "https://adapty.io/glossary/", icon: "/images/menu-icons/icon-24x24-difference.svg" },
    ],
    CONNECT: [
        { title: "Community", href: "https://adapty.io/community/", icon: "/images/menu-icons/icon-20x20-bug-report.svg" },
        { title: "Webinars", href: "https://adapty.io/webinars/", icon: "/images/menu-icons/icon-20x20-neurology.svg" },
        { title: "Events", href: "https://adapty.io/events/", icon: "/images/menu-icons/icon-24x24-23n.svg" },
        { title: "Careers", href: "https://adapty.io/careers/", icon: "/images/menu-icons/icon-assistant-dp24w4g0.svg" },
    ],
    DISCOVER: [
        { title: "Paywall newsletter", href: "https://adapty.io/paywall-newsletter/", icon: "/images/menu-icons/icon-24x24-newsletter.svg" },
        { title: "Apple receipt validation", href: "https://adapty.io/apple-receipt-validation/", icon: "/images/menu-icons/icon-20x20-receipt.svg" },
        { title: "Apple fiscal calendar", href: "https://adapty.io/apple-fiscal-calendar/", icon: "/images/menu-icons/icon-24x24-newsletter.svg" },
        { title: "Apple ads manager", href: "https://adapty.io/apple-ads-manager/", icon: "/images/menu-icons/icon-finance-blue-20dp-300w.svg" },
        { title: "LTV prediction model", href: "https://adapty.io/ltv-prediction-model/", icon: "/images/menu-icons/icon-24x24-21n.svg" },
        { title: "Subscription calculator", href: "https://adapty.io/subscription-calculator/", icon: "/images/menu-icons/icon-24x24-4n.svg" },
        { title: "Refund calculator", href: "https://adapty.io/refund-calculator/", icon: "/images/menu-icons/icon-20x20-currency-exchange.svg" },
        { title: "Paywall library", href: "https://adapty.io/paywall-library/", icon: "/images/menu-icons/icon-24x24-1n.svg" },
        { title: "Comparing alternatives", href: "https://adapty.io/alternative-comparison/", icon: "/images/menu-icons/icon-24x24-difference.svg" },
    ],
    EBOOKS: [
        { title: "Grow your app from $10K to $100K MRR", href: "https://adapty.io/ebooks/10k-100k-mrr/", icon: "/images/menu-icons/icon-24x24-doc.svg" },
        { title: "Turn your weekend app into a $1K/mo business", href: "https://adapty.io/ebooks/weekend-app-1k-mo/", icon: "/images/menu-icons/icon-24x24-doc.svg" },
        { title: "Scale your app from $1K to $10K MRR", href: "https://adapty.io/ebooks/1k-10k-mrr/", icon: "/images/menu-icons/icon-24x24-doc.svg" },
        { title: "A refund guide to saving your app revenue", href: "https://adapty.io/ebooks/refund-guide/", icon: "/images/menu-icons/icon-24x24-doc.svg" },
    ],
    RESEARCH: [
        { title: "Onboarding A/B test ideas checklist", href: "https://adapty.io/ebooks/onboarding-ab-test-ideas/", icon: "/images/menu-icons/icon-mobile-menu-dp24w4g0.svg", badge: "new" },
        { title: "State of in-app subscriptions 2025", href: "https://adapty.io/ebooks/state-of-in-app-subscriptions-2024/", icon: "/images/menu-icons/icon-24x24-doc.svg" },
        { title: "Adapty pricing index", href: "https://adapty.io/ebooks/pricing-index/", icon: "/images/menu-icons/icon-24x24-10n.svg" }, // Fallback icon
    ]
};

function ResourceLink({ item }: { item: { title: string, href: string, icon: string, badge?: string } }) {
    return (
        <Link
            href={item.href}
            className="group flex items-center gap-2.5 p-1 -ml-1 rounded-lg hover:bg-background-secondary/50 transition-colors"
        >
            <div className="w-5 h-5 flex-shrink-0 relative opacity-70 group-hover:opacity-100 transition-opacity">
                <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                />
            </div>
            <span className="text-[14px] font-medium text-foreground group-hover:text-brand transition-colors flex items-center gap-2">
                {item.title}
                {item.badge && (
                    <span className="bg-[#EBE5FF] text-[#6720FF] text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-[4px] leading-none">
                        {item.badge}
                    </span>
                )}
            </span>
        </Link>
    )
}

export function ResourcesMenu() {
    return (
        <div className="flex w-[1100px] bg-white rounded-2xl shadow-xl overflow-hidden border border-border-subtle p-8 gap-12">
            {/* Column 1: Learn & Connect */}
            <div className="flex flex-col gap-10 w-[220px] flex-shrink-0">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-1">LEARN</h3>
                    {RESOURCES.LEARN.map(i => <ResourceLink key={i.title} item={i} />)}
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-1">CONNECT</h3>
                    {RESOURCES.CONNECT.map(i => <ResourceLink key={i.title} item={i} />)}
                </div>
            </div>

            {/* Column 2: Discover */}
            <div className="flex flex-col gap-3 w-[280px] flex-shrink-0">
                <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-1">DISCOVER</h3>
                {RESOURCES.DISCOVER.map(i => <ResourceLink key={i.title} item={i} />)}
            </div>

            {/* Column 3: Ebooks & Research */}
            <div className="flex-1 flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-1">EBOOKS</h3>
                    {RESOURCES.EBOOKS.map(i => <ResourceLink key={i.title} item={i} />)}
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-1">RESEARCH</h3>
                    {RESOURCES.RESEARCH.map(i => <ResourceLink key={i.title} item={i} />)}
                </div>
            </div>
        </div>
    );
}
