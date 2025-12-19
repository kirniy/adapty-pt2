"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CASES = [
    {
        name: "Productivity app",
        desc: "+50% revenue with Adapty Autopilot",
        icon: "/images/case-studies/productivity-app.webp",
        href: "https://adapty.io/clients/productivity-app/"
    },
    {
        name: "Text on Pic",
        desc: "Reignited growth with Autopilot",
        icon: "/images/case-studies/text-on-pic.webp",
        href: "https://adapty.io/clients/text-on-pic/"
    },
    {
        name: "Trip planning",
        desc: "Doubled revenue per user",
        icon: "/images/case-studies/trip-planning.webp",
        href: "https://adapty.io/clients/trip-planning/"
    },
    {
        name: "Going Merry",
        desc: "5x revenue growth using Paywall Builder",
        icon: "/images/case-studies/going-merry.webp",
        href: "https://adapty.io/clients/going-merry/"
    },
    {
        name: "Shmoody",
        desc: "Grew from $0 to $2M ARR with Adapty",
        icon: "/images/case-studies/shmoody.webp",
        href: "https://adapty.io/clients/shmoody/"
    },
    {
        name: "Lively",
        desc: "Saved 82% of potentially lost revenue",
        icon: "/images/case-studies/lively.png",
        href: "https://adapty.io/clients/lively/"
    },
    {
        name: "Glam AI",
        desc: "Tripled revenue, same installs",
        icon: "/images/case-studies/glam-ai.webp",
        href: "https://adapty.io/clients/glam-ai/"
    },
    {
        name: "Pepapp",
        desc: "How to make Adapty free",
        icon: "/images/case-studies/pepapp.webp",
        href: "https://adapty.io/clients/pepapp/"
    },
    {
        name: "Fotorama",
        desc: "How to decrease the refund rate with Adapty",
        icon: "/images/case-studies/fotorama.webp",
        href: "https://adapty.io/clients/fotorama/"
    },
    {
        name: "Wave",
        desc: "From $0 to $4M ARR in 8 months",
        icon: "/images/case-studies/wave.png",
        href: "https://adapty.io/clients/wave/"
    },
    {
        name: "Impala",
        desc: "Migrated to Adapty from a competitor",
        icon: "/logos/impala.svg",
        href: "https://adapty.io/clients/impala-studios/"
    },
];

export function CasesMenu() {
    return (
        <div className="w-[1000px] bg-white rounded-2xl shadow-xl border border-border-subtle p-8 flex flex-col gap-8">
            <h3 className="text-xs font-semibold text-foreground-muted tracking-widest uppercase mb-2">
                USER STORIES
            </h3>

            <div className="grid grid-cols-3 gap-x-8 gap-y-8">
                {CASES.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-start gap-4 p-2 -ml-2 rounded-xl hover:bg-background-secondary/50 transition-colors"
                    >
                        <div className="w-12 h-12 flex-shrink-0 relative overflow-hidden rounded-[14px] border border-black/5 shadow-sm">
                            <Image
                                src={item.icon}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[15px] font-bold text-foreground group-hover:text-brand transition-colors">
                                {item.name}
                            </span>
                            <span className="text-[13px] text-foreground-secondary leading-snug">
                                {item.desc}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-border-subtle mt-2">
                <Link
                    href="https://adapty.io/clients/"
                    className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand transition-colors group"
                >
                    View all case studies
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
