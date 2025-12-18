import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

export const CaseStudies = () => {
    const cases = [
        {
            company: "Bumble",
            logo: "/logos/trusted-by/bumble.svg",
            metric: "+15%",
            description: "Increase in subscription revenue",
        },
        {
            company: "PhotoRoom",
            // Fallback/placeholder if no logo exists, but we have some. Let's use what we have or generic text.
            // Actually I should check what logos I have. I know I have 'bumble', 'feeld', 'hubx', 'almus', 'weewoo' from page.tsx.
            logo: "/logos/trusted-by/feeld.svg",
            metric: "2.5x",
            description: "Faster paywall iteration speed",
        },
        {
            company: "HubX",
            logo: "/logos/trusted-by/hubx.svg",
            metric: "-20%",
            description: "Reduction in churn rate",
        },
    ];

    return (
        <Section className="py-24 bg-white border-b border-border-subtle">
            <Container>
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl">
                        Trusted by thousands of <br /> scaling apps
                    </h2>
                    <div className="hidden md:block">
                        <a href="#" className="flex items-center gap-2 font-medium text-brand hover:text-brand-hover transition-colors">
                            Read all case studies <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cases.map((study, index) => (
                        <div
                            key={study.company}
                            className="group flex flex-col p-8 rounded-3xl bg-background-tertiary border border-transparent hover:border-border-subtle hover:bg-white hover:shadow-card hover:-translate-y-1 transition-all duration-300 ease-smooth cursor-pointer"
                        >
                            <div className="h-10 mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
                                <Image
                                    src={study.logo}
                                    alt={study.company}
                                    width={120}
                                    height={40}
                                    className="h-full w-auto object-contain object-left"
                                />
                            </div>
                            <div className="text-5xl font-bold text-foreground mb-4 tracking-tight">
                                {study.metric}
                            </div>
                            <div className="text-xl text-foreground-secondary leading-relaxed mb-8">
                                {study.description}
                            </div>
                            <div className="mt-auto flex items-center gap-2 font-medium text-foreground group-hover:text-brand transition-colors">
                                Read story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
