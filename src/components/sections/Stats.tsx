import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import React from "react";

export const Stats = () => {
    return (
        <Section className="py-16 border-y border-border-subtle bg-white">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: '$1B+', label: 'Revenue tracked' },
                        { value: '15,000+', label: 'Apps powered' },
                        { value: '99.9%', label: 'Uptime SLA' },
                        { value: '<50ms', label: 'API response' },
                    ].map((stat, i) => (
                        <div
                            key={stat.label}
                            className="opacity-0 animate-slide-up fill-mode-forwards"
                            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                        >
                            <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground-secondary">
                                {stat.value}
                            </div>
                            <div className="text-foreground-secondary mt-2 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
