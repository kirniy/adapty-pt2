"use client";

import React, { useRef, useState } from "react";
import { useScroll, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
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
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Map scroll progress to card index
        const cardIndex = Math.min(
            Math.floor(latest * cardLength),
            cardLength - 1
        );
        setActiveCard(cardIndex);
    });

    return (
        <div
            ref={containerRef}
            className="relative"
        >
            <div className="flex justify-center gap-10 px-4 md:px-10">
                {/* Text content on the left */}
                <div className="relative max-w-xl">
                    {content.map((item, index) => (
                        <div
                            key={item.title + index}
                            className="min-h-screen flex flex-col justify-center py-20"
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
                </div>

                {/* Sticky image container on the right */}
                <div
                    className={cn(
                        "hidden lg:flex h-[500px] w-[700px] rounded-2xl bg-[#1a1a2e] sticky top-[calc(50vh-250px)] self-start overflow-hidden border border-white/10 shadow-elevated items-center justify-center",
                        contentClassName
                    )}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {content[activeCard]?.content ?? null}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default StickyScrollReal;
