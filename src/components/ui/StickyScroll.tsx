"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}

export const StickyScroll = ({ content, contentClassName }: StickyScrollProps) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        // target: ref,
        container: ref,
        offset: ["start start", "end start"],
    });

    const cardLength = content.length;

    useTransform(
        scrollYProgress,
        [0, 1],
        [0, 100] // just for hook usage, logic is in onScroll
    );

    // Manual scroll listener to determine active card because useScroll with container is tricky for precise breakpoints sometimes
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        const scrollHeight = e.currentTarget.scrollHeight;
        const clientHeight = e.currentTarget.clientHeight;

        // Calculate index
        const sectionHeight = scrollHeight / cardLength;
        const index = Math.round(scrollTop / (sectionHeight / 2)); // rough approximation

        // Better: find which section is closest to top
        const scrollPos = scrollTop;
        // Each section is essentially full height? No, we scroll text blocks.

        // Let's use intersection observer simplified approach or generic scroll percentage
        // Actually the standard Sticky Scroll implementation usually just maps scrollY of the window
        // But here we might want a contained scroll or window scroll. 
        // Attio uses window scroll. 
    };

    // Re-implementing using Window Scroll for the "Attio" feel
    // The component receives content, renders text on left, and a sticky area on right.

    return (
        <motion.div
            className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide"
            ref={ref}
            onScroll={(e) => {
                // simple active card logic based on scroll position of this container
                const target = e.currentTarget;
                const index = Math.round(target.scrollTop / 300); // assuming text block height
                // This is too simpler. Let's do it better below.
            }}
        >
            {/* Placeholder for standard exported component, see below for real impl */}
        </motion.div>
    );
};

// Proper Implementation
export const StickyScrollReal = ({ content, contentClassName }: StickyScrollProps) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const cardLength = content.length;

    useTransform(
        scrollYProgress,
        [0, 1],
        [0, cardLength - 1]
    ).on("change", (latest) => {
        const cardIndex = Math.round(latest * (cardLength - 0.5)); // slight adjustment
        // Clamp
        const index = Math.min(Math.max(cardIndex, 0), cardLength - 1);
        if (index !== activeCard) {
            setActiveCard(index);
        }
    });

    const backgroundColors = [
        "var(--slate-900)",
        "var(--black)",
        "var(--neutral-900)",
    ];

    // Attio has a white background, so we don't change BG color usually, but we swap content

    return (
        <motion.div
            ref={ref}
            className="h-[300vh] relative flex justify-center space-x-10 rounded-md p-10" // tall container
        >
            <div className="div relative flex items-start px-4">
                <div className="max-w-2xl">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-20 h-[80vh] flex flex-col justify-center">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-xl text-foreground-secondary max-w-sm mt-4 leading-relaxed"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    <div className="h-40" />
                </div>
            </div>

            {/* Sticky Visual Side */}
            <div
                className={cn(
                    "hidden lg:block h-[600px] w-[800px] rounded-2xl bg-white sticky top-24 overflow-hidden border border-border-subtle shadow-elevated",
                    contentClassName
                )}
            >
                {content[activeCard].content ?? null}
            </div>
        </motion.div>
    );
};

export default StickyScrollReal;
