"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface FeatureSectionProps {
    flipped?: boolean;
    image: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
        className?: string;
    };
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    description: React.ReactNode;
    cta: {
        text: string;
        href: string;
        external?: boolean;
    };
    testimonial?: {
        quote: string;
        author: {
            name: string;
            role: string;
            avatar: string;
        };
        company?: {
            name: string;
            logo: string; // URL or path
            category?: string;
        };
        logo?: string; // Alternative simple large logo if not card header
    };
    badge?: string;
    className?: string; // Added className to interface
}

export function FeatureSection({
    flipped = false,
    image,
    title,
    subtitle,
    description,
    cta,
    testimonial,
    badge,
    className,
}: FeatureSectionProps) {
    return (
        <Section className={cn("py-24 md:py-32 overflow-hidden", className)}>
            <Container>
                <div className={cn(
                    "grid lg:grid-cols-2 gap-12 lg:gap-24 items-center",
                )}>
                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "flex flex-col gap-8",
                            flipped ? "lg:order-2" : "lg:order-1"
                        )}
                    >
                        <div>
                            {badge && (
                                <div className="inline-flex items-center rounded-md border border-border-subtle bg-background-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-6">
                                    {badge}
                                </div>
                            )}
                            <h2 className="text-4xl md:text-[56px] leading-[1.1] font-bold tracking-tight mb-6">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-xl md:text-2xl font-medium text-foreground mb-4">
                                    {subtitle}
                                </p>
                            )}
                            <div className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
                                {description}
                            </div>
                        </div>

                        <Link
                            href={cta.href}
                            target={cta.external ? "_blank" : undefined}
                            rel={cta.external ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center text-lg font-semibold text-foreground hover:text-brand transition-colors"
                        >
                            {cta.text}
                            {cta.external ? (
                                <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            ) : (
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            )}
                        </Link>

                        {/* Testimonial / Quote Area */}
                        {testimonial && (
                            <div className="mt-8 pt-8 border-t border-border-subtle">
                                {/* Case A: Full Card Testimonial (No Company Logo stand-alone) */}
                                {testimonial.company ? (
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border-subtle max-w-md">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={testimonial.company.logo}
                                                    alt={testimonial.company.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground leading-tight">
                                                    {testimonial.company.name}
                                                </div>
                                                {testimonial.company.category && (
                                                    <div className="text-sm text-foreground-secondary">
                                                        {testimonial.company.category}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-foreground-secondary leading-relaxed mb-6 font-medium">
                                            “{testimonial.quote}”
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={testimonial.author.avatar}
                                                    alt={testimonial.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-foreground">
                                                    {testimonial.author.name}
                                                </div>
                                                <div className="text-xs text-foreground-secondary">
                                                    {testimonial.author.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Case B: Simple Quote with Large Logo (Paywall Section style) */
                                    <div className="space-y-6">
                                        {testimonial.logo && (
                                            <div className="relative h-8 w-40">
                                                <Image
                                                    src={testimonial.logo}
                                                    alt="Company Logo"
                                                    fill
                                                    className="object-contain object-left"
                                                />
                                            </div>
                                        )}
                                        <p className="text-xl font-medium leading-relaxed text-foreground">
                                            “{testimonial.quote}”
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-white shadow-sm">
                                                <Image
                                                    src={testimonial.author.avatar}
                                                    alt={testimonial.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground">
                                                    {testimonial.author.name}
                                                </div>
                                                <div className="text-sm text-foreground-secondary">
                                                    {testimonial.author.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={cn(
                            "relative",
                            flipped ? "lg:order-1" : "lg:order-2"
                        )}
                    >
                        <div className={cn(
                            "relative rounded-3xl overflow-hidden shadow-2xl border border-border-subtle bg-background-secondary",
                            image.className // Allow custom aspect ratios or sizing
                        )}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={image.width || 800}
                                height={image.height || 600}
                                className="w-full h-auto"
                            />
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
