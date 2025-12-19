"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShineBeam } from "@/components/ui/ShineBeam";

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
                    className="flex flex-col bg-background-secondary relative hover:shadow-2xl transition-all duration-300 rounded-[32px] overflow-hidden group border border-border-subtle h-full"
                >
                    {/* Hover Beam Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 overflow-hidden rounded-[32px]">
                        <ShineBeam size={800} duration={5} color="#6720FF" className="opacity-60" />
                    </div>

                    {/* Image Area */}
                    <div className="relative h-[240px] w-full bg-[#F3F4F6] p-4 flex items-center justify-center overflow-hidden z-10">
                        <Image
                            src={role.image}
                            alt={role.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-1 bg-background-secondary relative z-20">
                        <div className="flex items-center justify-between mb-8 group-hover:translate-x-1 transition-transform">
                            <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand flex items-center gap-1.5">
                                {role.title}
                            </h3>
                            <ArrowRight className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors" />
                        </div>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {role.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground-secondary border border-black/5 shadow-sm text-center leading-snug whitespace-normal"
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
