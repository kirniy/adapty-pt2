"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShineBeamProps {
    className?: string; // Container class
    size?: number;      // Size of the rotating gradient square (needs to be large enough to cover the container)
    duration?: number;  // Rotation duration in seconds
    color?: string;     // Beam color (defaults to #407FF2)
    borderWidth?: number; // Visual border width (simulated by mask padding)
}

export function ShineBeam({
    className,
    size = 400,
    duration = 5,
    color = "#6720FF",
}: ShineBeamProps) {
    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]", className)}>
            <motion.div
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[60px]"
                style={{
                    width: size,
                    height: size,
                    // A wide, soft beam ("Laser" spotlight)
                    background: `conic-gradient(from 0deg, transparent 0deg, transparent 320deg, ${color} 360deg)`
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: duration,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
        </div>
    );
}

// Wrapper to create a "bordered" look with the beam
export function ShineBorder({
    children,
    className,
    color,
    duration,
    borderRadius = 12,
    borderWidth = 1.5,
}: {
    children: React.ReactNode;
    className?: string;
    color?: string;
    duration?: number;
    borderRadius?: number;
    borderWidth?: number;
}) {
    return (
        <div className={cn("relative group p-[1px] overflow-hidden bg-transparent", className)} style={{ borderRadius }}>
            {/* The Beam Background */}
            <ShineBeam color={color} duration={duration} />

            {/* The Inner Content with Background to mask the center */}
            <div
                className="relative z-10 bg-white h-full w-full"
                style={{
                    borderRadius: borderRadius - 1,
                    margin: borderWidth - 1 // Adjustment to fine tune the visible border
                }}
            >
                {children}
            </div>
        </div>
    );
}
