import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

export const CaseStudies = () => {
    // Real case studies from adapty.io
    const cases = [
        {
            company: "Productivity app",
            category: "Productivity",
            logo: "/images/case-studies/productivity-app.webp",
            metric: "+50%",
            description: "How pricing tests unlocked app's potential",
            href: "https://adapty.io/case-studies/productivity-app-and-autopilot/",
        },
        {
            company: "Text on Pic",
            category: "Photo & Video",
            logo: "/images/case-studies/text-on-pic.webp",
            metric: "+30%",
            description: "How to boost revenue with the right experiments",
            href: "https://adapty.io/case-studies/photo-editing-app-and-autopilot/",
        },
        {
            company: "Trip planning",
            category: "Travel",
            logo: "/images/case-studies/trip-planning.webp",
            metric: "+102%",
            description: "New onboarding and pricing strategy doubled revenue per user",
            href: "https://adapty.io/case-studies/travel-app/",
        },
        {
            company: "Going Merry",
            category: "App publisher",
            logo: "/images/case-studies/going-merry.webp",
            metric: "5x",
            description: "How to scale subscription revenue with Paywall Builder",
            href: "https://adapty.io/case-studies/going-merry/",
        },
        {
            company: "Shmoody",
            category: "Mental health",
            logo: "/images/case-studies/shmoody.webp",
            metric: "$2M",
            description: "How to grow from a free app to $2M ARR with Adapty",
            href: "https://adapty.io/case-studies/shmoody/",
        },
        {
            company: "Lively",
            category: "Health & Fitness",
            logo: "/images/case-studies/lively.png",
            metric: "-83%",
            description: "Saved 82% of potentially lost revenue",
            href: "https://adapty.io/case-studies/lively/",
        },
        {
            company: "Glam AI",
            category: "Makeup & Beauty",
            logo: "/images/case-studies/glam-ai.webp",
            metric: "108%",
            description: "How to scale to $1.2M ARR in 3 months",
            href: "https://adapty.io/case-studies/glam-ai/",
        },
        {
            company: "Pepapp",
            category: "Health & Fitness",
            logo: "/images/case-studies/pepapp.webp",
            metric: "400%",
            description: "How to make Adapty free with Refund Saver",
            href: "https://adapty.io/case-studies/pepapp/",
        },
        {
            company: "Fotorama",
            category: "Photo & Video",
            logo: "/images/case-studies/fotorama.webp",
            metric: "-40%",
            description: "How to decrease the refund rate with Adapty",
            href: "https://adapty.io/case-studies/fotorama/",
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
                    {cases.map((study) => (
                        <a
                            key={study.company}
                            href={study.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col p-8 rounded-3xl bg-background-tertiary border border-transparent hover:border-border-subtle hover:bg-white hover:shadow-card hover:-translate-y-1 transition-all duration-300 ease-smooth"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-10 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Image
                                        src={study.logo}
                                        alt={study.company}
                                        width={120}
                                        height={40}
                                        className="h-full w-auto object-contain object-left"
                                    />
                                </div>
                                <span className="text-xs font-medium text-foreground-tertiary bg-background-secondary px-3 py-1 rounded-full">
                                    {study.category}
                                </span>
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
                        </a>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
