"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AttioBadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function AttioBadge({ children, className }: AttioBadgeProps) {
    return (
        <div className={cn("relative group p-[1px] rounded-[13px] overflow-hidden bg-[#EEEFF1]", className)}>
            {/* Inner Content */}
            <div className="relative z-10 flex items-center gap-x-1 rounded-[12px] bg-white px-3 py-1.5 transition-colors group-hover:bg-[#FBFBFC]">
                {children}
            </div>

            {/* The Animated Beam Layer (Constant) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-[50%] left-[50%] w-[1000%] aspect-square -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, #407FF2 360deg)"
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />
            </div>
        </div>
    );
}
