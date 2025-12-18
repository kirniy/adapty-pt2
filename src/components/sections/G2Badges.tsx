import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import React from "react";

export const G2Badges = () => {
    const badges = [
        'g2-winter-2025-1',
        'g2-winter-2025-2',
        'g2-winter-2025-3',
        'g2-winter-2025-4',
        'g2-winter-2025-5',
    ];

    return (
        <Section className="py-12 border-b border-border-subtle bg-background-secondary/50">
            <Container>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {badges.map((badge, index) => (
                        <div
                            key={badge}
                            className="opacity-0 animate-fade-in fill-mode-forwards hover:scale-105 transition-transform duration-300"
                            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                            <Image
                                src={`/images/g2-badges/${badge}.svg`}
                                alt="G2 Badge"
                                width={100}
                                height={120}
                                className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
