"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode;
    }[];
    contentClassName?: string;
}

export const StickyScrollFixed = ({ content, contentClassName }: StickyScrollProps) => {
    return (
        <>
            <div className="lg:hidden">
                <MobileLayout content={content} contentClassName={contentClassName} />
            </div>
            <div className="hidden lg:block w-full">
                <DesktopLayout content={content} contentClassName={contentClassName} />
            </div>
        </>
    );
};

const MobileLayout = ({ content, contentClassName }: StickyScrollProps) => {
    return (
        <div className="flex flex-col space-y-16 px-4 py-8">
            {content.map((item, index) => (
                <div key={item.title + index} className="flex flex-col space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {item.title}
                        </h2>
                        <p className="text-lg text-foreground-secondary leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                    <div className={cn(
                        "w-full h-[250px] sm:h-[350px] rounded-2xl bg-white border border-border-subtle shadow-sm overflow-hidden relative",
                        contentClassName
                    )}>
                        <div className="w-full h-full flex items-center justify-center">
                            {/* 
                      Note: We simply render item.content. 
                      The parent (page.tsx) handles the dark background wrapper if needed.
                      However, we must ensure the container here doesn't clip or mess it up.
                   */}
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const DesktopLayout = ({ content, contentClassName }: StickyScrollProps) => {
    const [activeCard, setActiveCard] = useState(0);

    return (
        <div className="w-full relative flex flex-row justify-center space-x-10 p-10 box-border">
            {/* LEFT COLUMN: SCROLLABLE TEXT */}
            <div className="w-1/2 relative flex flex-col items-start px-4 z-10">
                {content.map((item, index) => (
                    <div key={item.title + index} className="w-full">
                        <TextSection
                            title={item.title}
                            description={item.description}
                            index={index}
                            setActiveCard={setActiveCard}
                        />
                    </div>
                ))}
                {/* Spacer to allow full scroll of last item */}
                <div className="h-[40vh]" />
            </div>

            {/* RIGHT COLUMN: STICKY DISPLAY */}
            <div className="w-1/2 relative">
                <div className="sticky top-0 h-screen flex items-center justify-center">
                    <div className={cn(
                        "w-[600px] h-[500px] rounded-2xl bg-white border border-border-subtle shadow-elevated overflow-hidden relative",
                        contentClassName
                    )}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full flex items-center justify-center p-0"
                            >
                                {content[activeCard].content}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Scroll Spy Helper
interface TextSectionProps {
    title: string;
    description: string;
    index: number;
    setActiveCard: React.Dispatch<React.SetStateAction<number>>;
}

function TextSection({ title, description, index, setActiveCard }: TextSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Native IntersectionObserver is most reliable
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveCard(index);
                    }
                });
            },
            {
                threshold: 0.5, // 50% must be visible
                rootMargin: "-10% 0px -10% 0px" // Trigger slightly before center
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [index, setActiveCard]);

    return (
        // min-h-screen ensures each section is TALL enough to own the viewport for a moment
        <div ref={ref} className="min-h-[50vh] flex flex-col justify-center py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 transition-colors duration-300">
                {title}
            </h2>
            <p className="text-xl text-foreground-secondary max-w-md leading-relaxed">
                {description}
            </p>
        </div>
    );
}
