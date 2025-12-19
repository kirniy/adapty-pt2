"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ROLES = [
    {
        title: "For developers",
        image: "/images/role-developers-new.webp",
        link: "https://adapty.io/for-developers/", // Linking to real site for now as per instructions or placeholder
        tags: ["Subscriptions SDK", "Refund Saver", "Remote config", "Fallback paywalls"]
    },
    {
        title: "For app owners",
        image: "/images/role-owners-new.webp",
        link: "https://adapty.io/for-app-owners/",
        tags: ["Revenue analytics", "LTV analytics", "AI LTV and revenue predictions"]
    },
    {
        title: "For marketers",
        image: "/images/role-marketers-new.webp",
        link: "https://adapty.io/for-marketers/",
        tags: ["A/B testing", "No-code Builder", "Localizations", "Targeting"]
    }
];

export function RoleCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1240px] mx-auto">
            {ROLES.map((role) => (
                <Link
                    key={role.title}
                    href={role.link}
                    className="flex flex-col bg-white relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-[32px] overflow-hidden group border border-border-subtle hover:border-brand/20 h-full"
                >
                    {/* Subtle gradient accent on hover */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image Area */}
                    <div className="relative h-[240px] w-full bg-gradient-to-b from-zinc-100 to-zinc-50 p-4 flex items-center justify-center overflow-hidden">
                        <Image
                            src={role.image}
                            alt={role.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-1 bg-white relative">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand flex items-center gap-1.5">
                                {role.title}
                            </h3>
                            <div className="h-8 w-8 rounded-full bg-zinc-100 group-hover:bg-brand flex items-center justify-center transition-colors duration-300">
                                <ArrowRight className="w-4 h-4 text-foreground/50 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {role.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-zinc-50 group-hover:bg-brand/5 rounded-full text-sm font-medium text-foreground-secondary group-hover:text-foreground border border-black/5 transition-colors duration-300 text-center leading-snug whitespace-normal"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
