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

            {/* Dots Layer */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(#EEEFF1 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            ></div>

            {/* The Spotlight Reveal */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    opacity,
                    backgroundImage: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(64, 127, 242, 0.08), transparent 80%)`
                }}
            ></div>
        </div>
    );
}
