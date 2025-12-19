"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}

export const StickyScrollFixed = ({ content, contentClassName }: StickyScrollProps) => {
    const [activeCard, setActiveCard] = useState(0);

    return (
        // PARENT CONTAINER
        // This div defines the "track" for the sticky element. 
        // It must be relative and have sufficient height.
        <div className="w-full relative flex flex-col lg:flex-row justify-center space-x-0 lg:space-x-10 p-10 box-border">

            {/* LEFT COLUMN: SCROLLABLE TEXT */}
            <div className="w-full lg:w-1/2 relative flex flex-col items-start px-4 z-10">
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
            {/* 
          1. h-screen: Occupies full viewport height
          2. sticky: pins to top
          3. top-0: sticks at top of viewport
      */}
            <div className="hidden lg:block w-full lg:w-1/2 relative">
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
function TextSection({ title, description, index, setActiveCard }: any) {
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
        <div ref={ref} className="min-h-[100vh] flex flex-col justify-center py-10">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 transition-colors duration-300">
                {title}
            </h2>
            <p className="text-xl text-foreground-secondary max-w-md leading-relaxed">
                {description}
            </p>
        </div>
    );
}
