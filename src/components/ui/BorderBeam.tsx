"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
}

export function BorderBeam({
    className,
    size = 300,
    duration = 8,
    borderWidth = 1.5,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
}: BorderBeamProps) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 rounded-[inherit]",
                className
            )}
            style={{ border: `${borderWidth}px solid transparent` }}
        >
            <div
                className={cn(
                    "absolute inset-0 rounded-[inherit]",
                    // The Mask: Content Box (White) excluded from Border Box (White) leaves the Border
                    "[mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]",
                    "[mask-composite:exclude]",
                    "![mask-composite:exclude] ![-webkit-mask-composite:xor]"
                )}
            >
                <motion.div
                    className="absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 bg-transparent"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0 300deg, ${colorFrom} 340deg, ${colorTo} 360deg)`
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
