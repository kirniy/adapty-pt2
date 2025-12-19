"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NumberTicker } from "@/components/ui/NumberTicker";
import React from "react";

// Authentic stats from adapty.io
const stats = [
    { value: 2, prefix: "$", suffix: "B+", label: "tracked revenue" },
    { value: 99.99, suffix: "%", label: "historical uptime", decimalPlaces: 2 },
    { value: 2.5, suffix: "B+", label: "users served", decimalPlaces: 1 },
    { value: 60, suffix: "B+", label: "API calls / month" },
];

export const Stats = () => {
    return (
        <Section className="py-20 border-y border-border-subtle bg-gradient-to-b from-white to-zinc-50/50">
            <Container>
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Adapty processes subscription revenue <br className="hidden md:block" />
                        with the industry&apos;s highest SLA Rate
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="group opacity-0 animate-slide-up relative p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                            style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: 'forwards' }}
                        >
                            {/* Divider line between stats on desktop */}
                            {i < stats.length - 1 && (
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-border-subtle" />
                            )}
                            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                                <NumberTicker
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    decimalPlaces={stat.decimalPlaces || 0}
                                    delay={0.2 + i * 0.1}
                                    className="tracking-tight"
                                />
                            </div>
                            <div className="text-foreground-secondary mt-3 font-medium text-sm md:text-base">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
