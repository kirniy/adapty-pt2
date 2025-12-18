import React from "react";
import { cn } from "@/lib/utils";

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

            {/* The Animated Beam Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="animate-beam-rotate absolute inset-[-150%] [background:conic-gradient(from_0deg,transparent_0,transparent_20%,#407FF2_50%,transparent_80%,transparent_100%)]"></div>
            </div>
        </div>
    );
}
