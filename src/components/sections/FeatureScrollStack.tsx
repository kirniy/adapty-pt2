"use client";

import React, { useRef } from "react";
import { useScroll, transform, motion } from "framer-motion";
import { TheInfiniteGrid } from "@/components/ui/TheInfiniteGrid";
import { cn } from "@/lib/utils";

interface FeatureScrollStackProps {
    content: {
        title: string;
        description: string;
        content: React.ReactNode;
    }[];
    className?: string;
}

export const FeatureScrollStack = ({ content, className }: FeatureScrollStackProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className={cn("relative min-h-[300vh] bg-background", className)}>
            <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none select-none opacity-[0.4] mask-fade-sides z-0">
                <TheInfiniteGrid className="!static w-full h-full text-foreground/5" />
            </div>

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="w-full h-full max-w-7xl mx-auto px-6 relative flex flex-col justify-center">

                    {content.map((item, index) => {
                        // Calculate scroll range for this card
                        const stepSize = 1 / content.length;
                        const start = stepSize * index;
                        const end = start + stepSize;

                        return (
                            <Card
                                key={index}
                                item={item}
                                index={index}
                                total={content.length}
                                scrollYProgress={scrollYProgress}
                                range={[start, end]}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Card = ({ item, index, total, scrollYProgress, range }: any) => {
    // Transform logic: 
    // Come in from bottom (y: 100vh -> 0)
    // Scale down slightly as next one comes on top (scale: 1 -> 0.95)
    // Fade out slightly (opacity: 1 -> 0.5)

    // We use a custom transform based on the range
    // 1. Enter phase: when progress is before 'range[0]', it's below view.
    // 2. Main phase: when progress is within 'range', it's active.
    // 3. Exit phase: when progress is after 'range[1]', it's scaling down behind the next one.

    // Simplified stacking logic:
    // Each card is absolute.
    // y position is driven by progress.

    // Since useScroll gives 0..1 for the whole container:
    // Card i enters at start of its range? No, Stacking cards usually means they pile up.
    // Let's try the "Card Stack" effect where they slide up and stick.

    const targetScale = 1 - ((total - index - 1) * 0.05);

    const y = transform(scrollYProgress,
        [range[0] - 0.25, range[0]], // Enters slightly before its turn
        ["100vh", "0vh"]
    );

    // Only the "active" and "previous" cards need care.
    // Actually, simpler: drive layout by index.

    // Standard Card Stack approach:
    // Card `i` moves from y=1000 to y=index*Offset based on global scroll?
    // Or simpler: The container is sticky. We map scroll 0..1 to card positions.

    // Let's use a simpler mapping for "Stacking":
    // card 0 starts at center.
    // card 1 starts below. scrolls up to cover card 0.
    // card 2 starts below. scrolls up to cover card 1.

    // range[0] is when this card SHOULD be fully visible.
    // range[0] - 0.1 is when it starts entering.

    // Let's try:
    // 0 -> 1 progress.
    // Card 0: Always there (or fades in).
    // Card 1: Enters at 0.33
    // Card 2: Enters at 0.66

    const step = 1 / total;
    const startOfEntry = range[0];

    // Dynamic transforms
    // y: 100% -> 0% as scroll goes from (startOfEntry - 0.1) to startOfEntry
    // But wait, card 0 is startOfEntry=0. So it's already there (y=0 ?).

    // We need to use `useTransform` hook. 
    // Since we are in a sub-component, we can use `useTransform(scrollYProgress, ...)`
    // But hooks shouldn't be conditional.

    const scale = transform(scrollYProgress, [range[0], 1], [1, targetScale]); // Scales down as we scroll past

    // Calculate entry Y
    // For first card, it's always visible? Or slides up?
    // Let's have first card fixed, others slide up.

    const cardY = transform(scrollYProgress,
        [range[0] - step, range[0]],
        ["100vh", "0vh"]
    );

    // Opacity fade as it goes back?
    const opacity = transform(scrollYProgress, [range[0], range[0] + 0.1], [1, 1]); // Keep opaque mostly

    // Only apply transforms if index > 0. First card logic is different?
    // Actually, create a hook-based style.

    // Style for Framer motion
    /* eslint-disable react-hooks/rules-of-hooks */
    const styleY = index === 0 ? "0vh" : cardY;
    // But `cardY` returns a value, we need a MotionValue.

    // Let's rethink. `sticky-scroll-reveal` is tricky to do perfectly custom without `useTransform` on MotionValues.
    // Let's assume `scrollYProgress` is a MotionValue passed down.

    return (
        <CardInternal index={index} range={range} scrollYProgress={scrollYProgress} total={total} item={item} />
    )
}

import { useTransform } from "framer-motion";

const CardInternal = ({ index, range, scrollYProgress, total, item }: any) => {
    // 1. Scale: As scroll progresses BEYOND this card's section, it scales down.
    const endRange = range[1];
    const scale = useTransform(scrollYProgress, [range[0], 1], [1, 1 - (total - index - 1) * 0.05]);

    // 2. Y Position: 
    // Card 0: Fixed at 0? Or moves slightly?
    // Card > 0: Slides in from bottom.
    // Enters when progress is between (range[0]-0.25) and range[0].

    const startScroll = range[0] - 0.25;
    const endScroll = range[0];

    const translateY = useTransform(scrollYProgress,
        [startScroll, endScroll],
        ["100vh", "0vh"]
    );

    const opacity = useTransform(scrollYProgress, [startScroll, endScroll], [0, 1]);

    const isFirst = index === 0;

    return (
        <motion.div
            style={{
                scale: scale,
                y: isFirst ? 0 : translateY,
                opacity: isFirst ? 1 : opacity,
                zIndex: index
            }}
            className="absolute w-full h-full flex items-center justify-center p-4"
        >
            <div className="w-full max-w-5xl h-[60vh] bg-white rounded-[32px] border border-border-subtle shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Content Left */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-background-secondary/30">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground tracking-tight">{item.title}</h3>
                    <p className="text-lg text-foreground-secondary leading-relaxed mb-8">{item.description}</p>
                    <div className="border-t border-border mt-auto pt-6 flex items-center gap-2 text-sm font-medium text-foreground">
                        <span className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs">
                            {index + 1}
                        </span>
                        Step {index + 1}
                    </div>
                </div>

                {/* Visual Right */}
                <div className="w-full md:w-3/5 bg-background-tertiary relative overflow-hidden flex items-center justify-center">
                    {/* Infinite Grid inside card for consistency */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <TheInfiniteGrid className="!static w-full h-full text-foreground/5" />
                    </div>

                    <div className="relative z-10 p-8 w-full h-full flex items-center justify-center">
                        {item.content}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
