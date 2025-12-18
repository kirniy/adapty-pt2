"use client";

import { useEffect } from "react";

export function CursorTracker() {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.body.style.setProperty("--x", `${e.clientX}px`);
            document.body.style.setProperty("--y", `${e.clientY}px`);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null;
}
