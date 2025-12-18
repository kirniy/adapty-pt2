"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
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
    return <StickyScrollReal content={content} contentClassName={contentClassName} />;
};

export const StickyScrollReal = ({ content, contentClassName }: StickyScrollProps) => {
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
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

    return (
        <motion.div
            ref={ref}
            className="relative flex justify-center gap-10 px-4 md:px-10"
        >
            {/* Text content on the left */}
            <div className="relative flex items-start">
                <div className="max-w-xl">
                    {content.map((item, index) => (
                        <div
                            key={item.title + index}
                            className="min-h-[60vh] flex flex-col justify-center py-20"
                        >
                            <motion.h2
                                initial={{ opacity: 0.3 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0.3 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-lg md:text-xl text-foreground-secondary max-w-md mt-6 leading-relaxed"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    <div className="h-[30vh]" />
                </div>
            </div>

            {/* Sticky image container on the right */}
            <div
                className={cn(
                    "hidden lg:block h-[500px] w-[700px] rounded-2xl bg-background-secondary sticky top-[calc(50vh-250px)] overflow-hidden border border-border-subtle shadow-elevated",
                    contentClassName
                )}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCard}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {content[activeCard].content ?? null}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default StickyScrollReal;
