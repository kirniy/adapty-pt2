"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShineBeamProps {
    className?: string; // Container class
    size?: number;      // Size of the rotating gradient square (needs to be large enough to cover the container)
    duration?: number;  // Rotation duration in seconds
    color?: string;     // Beam color (defaults to #407FF2)
    borderWidth?: number; // Width of the beam border
}

export function ShineBeam({
    className,
    size = 400,
    duration = 4,
    color = "#407FF2",
    borderWidth = 1.5,
}: ShineBeamProps) {
    return (
        <div className={cn("absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-20", className)}>
            <div
                className="absolute inset-0 rounded-[inherit]"
                style={{
                    // Mask the center to leave only the border
                    mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: borderWidth,
                }}
            >
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square"
                    style={{
                        width: "200%", // Ensure it covers the corners when rotating
                        background: `conic-gradient(from 0deg, transparent 0deg, transparent 300deg, ${color} 360deg)`
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
