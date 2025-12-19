"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const SIDEBAR_LINKS = [
    { title: "Product", href: "https://adapty.io/product/" },
    { title: "Solution", href: "https://adapty.io/solutions/" },
    { title: "Adapty SDK", href: "https://adapty.io/docs/sdk/" },
    { title: "Integrations", href: "https://adapty.io/integrations/" },
    { title: "Why Adapty?", href: "https://adapty.io/why-adapty/", secondary: true },
    { title: "Product changelog", href: "https://adapty.io/changelog/", secondary: true },
    { title: "System status", href: "https://status.adapty.io/", secondary: true },
];

const COLUMNS = [
    {
        title: "TECH",
        items: [
            { title: "Subscriptions SDK", href: "https://adapty.io/sdk/", icon: "/images/menu-icons/icon-20x20-sdk.svg" },
            { title: "Subscribers sync", href: "https://adapty.io/subscription-sync/", icon: "/images/menu-icons/icon-24x24-2n.svg" },
            { title: "Fallback paywalls", href: "https://adapty.io/fallback-paywalls/", icon: "/images/menu-icons/icon-24x24-3n.svg" },
            { title: "Refund saver", href: "https://adapty.io/refund-saver/", icon: "/images/menu-icons/icon-20x20-currency-exchange.svg" },
        ]
    },
    {
        title: "PAYWALLS",
        items: [
            { title: "Paywall builder", href: "https://adapty.io/paywall-builder/", icon: "/images/menu-icons/icon-24x24-1n.svg" },
            { title: "Onboarding builder", href: "https://adapty.io/onboarding-builder/", icon: "/images/menu-icons/icon-mobile-menu-dp24w4g0.svg" },
            { title: "AI generator", href: "https://adapty.io/ai-paywall-generator/", icon: "/images/menu-icons/icon-20x20-neurology.svg" },
            { title: "A/B testing", href: "https://adapty.io/paywall-ab-testing/", icon: "/images/menu-icons/icon-20x20-bug-report.svg" },
            { title: "Autopilot", href: "https://adapty.io/autopilot/", icon: "/images/menu-icons/icon-assistant-dp24w4g0.svg", badge: "new" },
            { title: "Targeting", href: "https://adapty.io/paywall-targeting/", icon: "/images/menu-icons/icon-24x24-9n.svg" },
            { title: "Localizations", href: "https://adapty.io/paywall-localization/", icon: "/images/menu-icons/icon-24x24-10n.svg" },
            { title: "Remote config", href: "https://adapty.io/remote-config/", icon: "/images/menu-icons/icon-24x24-11n.svg" },
        ]
    },
    {
        title: "ANALYTICS",
        items: [
            { title: "Revenue analytics", href: "https://adapty.io/revenue-analytics/", icon: "/images/menu-icons/icon-24x24-4n.svg" },
            { title: "LTV analytics", href: "https://adapty.io/ltv-analytics/", icon: "/images/menu-icons/icon-24x24-5n.svg" },
            { title: "AI LTV and revenue predictions", href: "https://adapty.io/predictive-analytics/", icon: "/images/menu-icons/icon-24x24-12n.svg" },
            { title: "LTV prediction model", href: "https://adapty.io/ltv-prediction-model/", icon: "/images/menu-icons/icon-24x24-21n.svg" },
            { title: "Apple ads manager", href: "https://adapty.io/apple-ads-manager/", icon: "/images/menu-icons/icon-finance-blue-20dp-300w.svg" },
        ]
    }
];

export function ProductMenu() {
    return (
        <div className="flex w-[900px] bg-white rounded-2xl shadow-xl overflow-hidden border border-border-subtle p-2">
            {/* Sidebar */}
            <div className="w-[200px] flex-shrink-0 flex flex-col gap-1 p-4 border-r border-border-subtle/50">
                {SIDEBAR_LINKS.map((link, i) => (
                    <Link
                        key={link.title}
                        href={link.href}
                        className={cn(
                            "text-[15px] font-medium py-2 px-3 rounded-lg transition-colors hover:bg-background-secondary block",
                            // Add spacing before secondary links group
                            link.title === "Why Adapty?" && "mt-4",
                            link.secondary ? "text-foreground-secondary hover:text-foreground text-[14px]" : "text-foreground"
                        )}
                    >
                        {link.title}
                    </Link>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-3 gap-8 p-8 bg-white">
                {COLUMNS.map((col) => (
                    <div key={col.title} className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-2">
                            {col.title}
                        </h3>
                        <div className="flex flex-col gap-3">
                            {col.items.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group flex items-start gap-3 p-1 -ml-1 rounded-lg hover:bg-background-secondary/50 transition-colors"
                                >
                                    <div className="mt-0.5 w-5 h-5 flex-shrink-0 relative">
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-medium text-foreground group-hover:text-brand transition-colors flex items-center gap-2">
                                            {item.title}
                                            {item.badge && (
                                                <span className="bg-[#EBE5FF] text-[#6720FF] text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-[4px] leading-none">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
