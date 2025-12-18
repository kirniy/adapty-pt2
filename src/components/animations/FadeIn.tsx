"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    fullWidth?: boolean;
}

export function FadeIn({
    children,
    delay = 0,
    className,
    direction = "up",
    fullWidth = false
}: FadeInProps) {
    const { ref, isVisible } = useScrollAnimation(0.1);

    const getDirectionClass = () => {
        switch (direction) {
            case "up": return "animate-in slide-in-from-bottom-8 fade-in";
            case "down": return "animate-in slide-in-from-top-8 fade-in";
            case "left": return "animate-in slide-in-from-right-8 fade-in"; // Enters from right to left? No, usually "enter left" means from left.
            // But "FadeIn direction=left" usually implies moving TOWARDS left? Or appearing ON left?
            // Standard convention: "FadeInUp" means moves UP.
            // So "direction=up" -> slide-in-from-bottom.
            // "direction=right" -> slide-in-from-left.
            // "direction=left" -> slide-in-from-right.
            case "right": return "animate-in slide-in-from-left-8 fade-in";
            default: return "animate-in zoom-in-95 fade-in";
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                "opacity-0 duration-700 ease-out fill-mode-forwards motion-reduce:transition-none motion-reduce:hover:transform-none",
                isVisible && getDirectionClass(),
                className
            )}
            style={{
                animationDelay: `${delay}s`,
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
}
