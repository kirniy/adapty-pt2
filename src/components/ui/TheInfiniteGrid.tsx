"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    motion,
    useMotionValue,
    useMotionTemplate,
    useAnimationFrame,
    type MotionValue
} from "framer-motion";

interface TheInfiniteGridProps {
    title?: string;
    description?: string;
    className?: string;
    children?: React.ReactNode;
}

export const TheInfiniteGrid = ({
    title,
    description,
    className,
    children
}: TheInfiniteGridProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Use clientX/Y directly for a fixed/screen-covering background
            // This works perfectly when the grid is 'fixed' or covering the viewport
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const gridOffsetX = useMotionValue(0);
    const gridOffsetY = useMotionValue(0);

    // Slowed down slightly for less chaotic movement
    const speedX = 0.2;
    const speedY = 0.2;

    useAnimationFrame(() => {
        const currentX = gridOffsetX.get();
        const currentY = gridOffsetY.get();
        // Using 40 as grid size
        gridOffsetX.set((currentX + speedX) % 40);
        gridOffsetY.set((currentY + speedY) % 40);
    });

    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full overflow-hidden pointer-events-none",
                className
            )}
        >
            {/* Base Grid (Very Faint) */}
            <div className="absolute inset-0 z-0 opacity-[0.03]">
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </div>

            {/* Revealed Grid (Stronger) */}
            <motion.div
                className="absolute inset-0 z-0 opacity-100" // Increased opacity for the reveal
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-blue-500/10 opacity-20" /> {/* Subtle tint */}
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} className="text-brand/50" />
            </motion.div>

            {/* Ambient Background Blobs (Adapty Colors) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-brand/30 blur-[120px]" />
                <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-purple-500/20 blur-[100px]" />
                <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[120px]" />
            </div>

            {/* Content - Only render if provided */}
            {(title || description || children) && (
                <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto space-y-6 pointer-events-none">
                    {(title || description) && (
                        <div className="space-y-4">
                            {title && (
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
                                    {title}
                                </h1>
                            )}
                            {description && (
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex gap-4 pointer-events-auto pt-4">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

const GridPattern = ({
    offsetX,
    offsetY,
    className,
}: {
    offsetX: MotionValue<number>;
    offsetY: MotionValue<number>;
    className?: string;
}) => {
    return (
        <svg className={cn("w-full h-full", className)}>
            <defs>
                <motion.pattern
                    id="grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    x={offsetX}
                    y={offsetY}
                >
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-foreground"
                    />
                </motion.pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
    );
};
