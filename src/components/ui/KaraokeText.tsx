"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface KaraokeTextProps {
    text: string;
    className?: string;
}

export function KaraokeText({ text, className }: KaraokeTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "end 0.5"], // Adjusted offset for better visibility timing
    });

    const words = text.split(" ");

    return (
        <div ref={containerRef} className={cn("relative z-10", className)}>
            <p className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em]">
                {words.map((word, index) => (
                    <Word
                        key={index}
                        word={word}
                        index={index}
                        totalWords={words.length}
                        scrollProgress={scrollYProgress}
                    />
                ))}
            </p>
        </div>
    );
}

interface WordProps {
    word: string;
    index: number;
    totalWords: number;
    scrollProgress: MotionValue<number>;
}

function Word({ word, index, totalWords, scrollProgress }: WordProps) {
    // Calculate specific range for this word to animate
    // Stagger the start times based on word index
    const step = 1 / totalWords;
    const start = index * step;
    const end = start + step;

    const opacity = useTransform(scrollProgress, [start, end], [0.1, 1]);
    const y = useTransform(scrollProgress, [start, end], ["20%", "0%"]);
    // Optional: subtle color shift from gray to black/current
    // We can let opacity handle the "grayness" or be explicit

    return (
        <span className="relative overflow-hidden inline-block pb-1">
            <motion.span
                className="inline-block mr-[0.05em]"
                style={{ opacity, y }}
            >
                {word}
            </motion.span>
        </span>
    );
}
