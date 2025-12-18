"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "framer-motion";
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
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    // We track the scroll progress of the entire container
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Basic mapping: logic is simply dividing the scroll into N segments
        // and finding which segment we are in.
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        "var(--slate-900)",
        "var(--black)",
        "var(--neutral-900)",
    ];

    return (
        <motion.div
            ref={ref}
            className="flex justify-center relative space-x-10 p-10 box-border"
        >
            {/* Left Column: Text Content */}
            <div className="relative flex items-start px-4 w-full md:w-1/2">
                <div className="max-w-2xl w-full">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="min-h-screen flex flex-col justify-center my-10">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl text-foreground-secondary max-w-sm mt-4 leading-relaxed"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    {/* Extra spacer at bottom to allow last item to scroll out/finish */}
                    <div className="h-[20vh]" />
                </div>
            </div>

            {/* Right Column: Sticky Image */}
            {/* h-screen sticky top-0 puts it exactly in viewport view */}
            <div
                className={cn(
                    "hidden lg:flex w-1/2 sticky top-[120px] h-[calc(100vh-120px)] items-center justify-center overflow-hidden",
                    contentClassName
                )}
            >
                <div className="w-[600px] h-[500px] relative rounded-2xl bg-white border border-border-subtle shadow-elevated overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCard}
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center p-4"
                        >
                            {content[activeCard].content ?? null}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};
