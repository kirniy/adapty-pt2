"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const card = ref.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const dx = x - xc;
        const dy = y - yc;

        // Rotate based on mouse position relative to center
        // Reduced divisor for subtle effect (Attio is subtle)
        card.style.transform = `perspective(1000px) rotateX(${-dy / 25}deg) rotateY(${dx / 25}deg)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("transition-transform duration-200 ease-out will-change-transform", className)}
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
        </div>
    );
}
