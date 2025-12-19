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
        <Section className="py-16 border-b border-border-subtle bg-gradient-to-b from-background-secondary/30 to-white">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Trusted for usability and customer service
                    </h2>
                    <p className="text-foreground-secondary mt-2">
                        Recognized by G2 in Winter 2025 reports
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                    {badges.map((badge, index) => (
                        <div
                            key={badge}
                            className="group opacity-0 animate-fade-in fill-mode-forwards p-4 rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                            <Image
                                src={`/images/g2-badges/${badge}.svg`}
                                alt="G2 Badge"
                                width={100}
                                height={120}
                                className="h-24 w-auto object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
