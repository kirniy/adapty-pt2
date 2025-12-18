"use client";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function GridSpotlight({ className }: { className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("absolute inset-0 z-0 overflow-hidden", className)}
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

            {/* The Interactive Highlight Grid (Revealed by Mouse) */}
            <div
                className="absolute inset-0 bg-transparent transition-opacity duration-300"
                style={{
                    opacity,
                    // The grid of blue dots
                    backgroundImage: "radial-gradient(#407FF2 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    // The mask that reveals them around the mouse
                    maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`
                }}
            ></div>
        </div>
    );
}
