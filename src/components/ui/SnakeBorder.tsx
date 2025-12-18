"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SnakeBorderProps {
    children: React.ReactNode;
    className?: string;
    duration?: number;
    width?: string;
    visible?: 'always' | 'hover';
    color?: string;
}

export function SnakeBorder({
    children,
    className,
    duration = 4,
    visible = 'always',
    color = "#407FF2" // Attio Blue
}: SnakeBorderProps) {
    return (
        <div className={cn("relative group p-[1px] overflow-hidden", className)}>
            {/* Inner Content */}
            <div className="relative z-10 w-full h-full rounded-[inherit] overflow-hidden">
                {children}
            </div>

            {/* The Animated Beam Layer */}
            <div
                className={cn(
                    "absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]",
                    visible === 'hover' && "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}
            >
                <motion.div
                    className="absolute top-[50%] left-[50%] w-[1000%] aspect-square -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, transparent 280deg, ${color} 360deg)`
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: duration,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />
            </div>
        </div>
    );
}
