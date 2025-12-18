"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const ROLES = [
    {
        id: "developers",
        label: "Developers",
        title: "Implement in minutes, not months",
        description: "Open-source SDKs for every platform. Complete documentation and support.",
        image: "/images/role-developers.webp",
        features: ["iOS, Android, Flutter, RN, Unity", "99.99% uptime SLA", "Sandbox testing environment"]
    },
    {
        id: "marketers",
        label: "Marketers",
        title: "Run experiments without updates",
        description: "Test paywalls, prices, and offers on the fly. No app releases required.",
        image: "/images/role-marketers.webp",
        features: ["Visual paywall builder", "A/B testing engine", "Real-time personalization"]
    },
    {
        id: "owners",
        label: "App Owners",
        title: "Maximize your LTV",
        description: "Get accurate revenue data and insights to scale your subscription business.",
        image: "/images/role-app-owners.webp",
        features: ["Cohort analysis", "Revenue predictions", "Subscription analytics"]
    }
];

export function RoleCards() {
    const [activeRole, setActiveRole] = useState(ROLES[0]);

    return (
        <div className="flex flex-col items-center">
            {/* Tabs */}
            <div className="flex p-1 bg-background-tertiary rounded-xl mb-12">
                {ROLES.map((role) => (
                    <button
                        key={role.id}
                        onClick={() => setActiveRole(role)}
                        className={cn(
                            "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                            activeRole.id === role.id
                                ? "bg-white text-foreground shadow-sm"
                                : "text-foreground-secondary hover:text-foreground"
                        )}
                    >
                        {role.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 key={activeRole.id}">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{activeRole.title}</h3>
                    <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
                        {activeRole.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                        {activeRole.features.map(feature => (
                            <li key={feature} className="flex items-center gap-3 text-foreground font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated border border-border-subtle bg-white group animate-in fade-in zoom-in-95 duration-500 key={activeRole.id}-img">
                    <Image
                        src={activeRole.image}
                        alt={activeRole.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
}
