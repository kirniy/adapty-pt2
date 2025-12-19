"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ShineBeam } from "./ShineBeam";

interface AttioBadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function AttioBadge({ children, className }: AttioBadgeProps) {
    return (
        <div className={cn("relative group p-[1px] rounded-full overflow-hidden bg-[#EEEFF1]", className)}>
            {/* Inner Content */}
            <div className="relative z-10 flex items-center gap-x-1 rounded-full bg-white px-3 py-1.5 transition-colors group-hover:bg-[#FBFBFC]">
                {children}
            </div>

            {/* The Animated Beam Layer using the unified component */}
            <ShineBeam size={600} duration={3} color="#407FF2" className="opacity-60" />
        </div>
    );
}
