"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { TheInfiniteGrid } from "@/components/ui/TheInfiniteGrid";
import { cn } from "@/lib/utils";

type FeatureScrollStackItem = {
    title: string;
    description: string;
    content: React.ReactNode;
};

interface FeatureScrollStackProps {
    content: FeatureScrollStackItem[];
    className?: string;
}

interface CardProps {
    item: FeatureScrollStackItem;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
    range: [number, number];
}

export const FeatureScrollStack = ({ content, className }: FeatureScrollStackProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className={cn("relative min-h-[300vh] bg-background", className)}>
            <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none select-none opacity-[0.8] mask-fade-sides z-0 flex justify-center">
                <TheInfiniteGrid className="!static w-full h-full text-foreground/10" />
            </div>

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="w-full h-full max-w-7xl mx-auto px-6 relative flex flex-col justify-center">
                    {content.map((item, index) => {
                        const stepSize = 1 / content.length;
                        const start = stepSize * index;
                        const end = start + stepSize;

                        return (
                            <Card
                                key={`${item.title}-${index}`}
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

const Card = ({ item, index, total, scrollYProgress, range }: CardProps) => {
    const isFirst = index === 0;
    const entryStart = range[0] - 0.25;
    const entryEnd = range[0];
    const scaleTarget = 1 - (total - index - 1) * 0.05;

    const translateY = useTransform(scrollYProgress, [entryStart, entryEnd], ["100vh", "0vh"]);
    const opacity = useTransform(scrollYProgress, [entryStart, entryEnd], [0, 1]);
    const scale = useTransform(scrollYProgress, [range[0], 1], [1, scaleTarget]);

    return (
        <motion.div
            style={{
                scale,
                y: isFirst ? 0 : translateY,
                opacity: isFirst ? 1 : opacity,
                zIndex: index,
            }}
            className="absolute w-full h-full flex items-center justify-center p-4"
        >
            <div className="w-full max-w-5xl h-[60vh] bg-white rounded-[32px] border border-border-subtle shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-background-secondary/30">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground tracking-tight">
                        {item.title}
                    </h3>
                    <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
                        {item.description}
                    </p>

                    <div className="border-t border-border mt-auto pt-6 flex items-center gap-2 text-sm font-medium text-foreground">
                        <span className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs">
                            {index + 1}
                        </span>
                        Step {index + 1}
                    </div>
                </div>

                <div className="w-full md:w-3/5 bg-background-tertiary relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-50 pointer-events-none">
                        <TheInfiniteGrid className="!static w-full h-full text-foreground/10" />
                    </div>

                    <div className="relative z-10 p-8 w-full h-full flex items-center justify-center">
                        {item.content}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

