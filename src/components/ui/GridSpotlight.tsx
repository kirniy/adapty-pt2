"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export function GridSpotlight({ className }: { className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={divRef}
            className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
        >
            <div className="absolute inset-0 bg-white"></div>

            {/* Base Grey Grid (Always Visible) */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(#EEEFF1 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                }}
            ></div>

            {/* The Interactive Highlight Grid (Revealed by CSS Variables) */}
            <div
                className="absolute inset-0 bg-transparent transition-opacity duration-300 opacity-0 group-hover/hero:opacity-100"
                style={{
                    // The grid of blue dots
                    backgroundImage: "radial-gradient(#407FF2 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    // The mask that reveals them around the mouse
                    // USES GLOBAL CSS VARIABLES --x and --y
                    maskImage: `radial-gradient(300px circle at var(--x) var(--y), black, transparent)`,
                    WebkitMaskImage: `radial-gradient(300px circle at var(--x) var(--y), black, transparent)`
                }}
            ></div>
        </div>
    );
}
