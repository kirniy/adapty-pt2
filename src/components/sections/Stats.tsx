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
        <Section className="py-16 border-y border-border-subtle bg-white">
            <Container>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Adapty processes subscription revenue with the industry's highest SLA Rate
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="opacity-0 animate-slide-up fill-mode-forwards"
                            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-foreground">
                                <NumberTicker
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    decimalPlaces={stat.decimalPlaces || 0}
                                    delay={0.2 + i * 0.1}
                                    className="!text-black"
                                />
                            </div>
                            <div className="text-foreground-secondary mt-2 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
