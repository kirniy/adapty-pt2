"use client";

import { motion } from "framer-motion";

interface BeamConnectorProps {
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
    curvature?: number; // How curvy the path is
}

// Simplified version assuming it fills a container
export function BeamConnector({ startX = 0, startY = 50, endX = 100, endY = 50, curvature = 50 }: BeamConnectorProps) {
    // Logic to calculate a smooth Curvier path
    // Since we assume simple container usage for now, let's just make a generic S-curve
    const path = `M 0 50 C 50 50, 50 50, 100 50`;

    // Dynamic path based on props (if we were passing absolute coords)
    const d = `M ${startX} ${startY} C ${startX + curvature} ${startY}, ${endX - curvature} ${endY}, ${endX} ${endY}`;

    return (
        <svg className="absolute inset-0 overflow-visible pointer-events-none w-full h-full">
            {/* Background Track */}
            <path
                d={d}
                fill="none"
                stroke="#EEEFF1"
                strokeWidth="2"
            />
            {/* The Data Packet */}
            <motion.path
                d={d}
                fill="none"
                stroke="#407FF2"
                strokeWidth="2"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={{
                    pathLength: 0.15, // The length of the "data packet"
                    pathOffset: [0, 1] // Moves from start to end
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </svg>
    );
}
