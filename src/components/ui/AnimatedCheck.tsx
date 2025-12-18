"use client";

import { motion } from "framer-motion";

interface AnimatedCheckProps {
    className?: string;
    delay?: number;
}

export function AnimatedCheck({ className, delay = 0 }: AnimatedCheckProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
                className="w-full h-full"
            >
                <motion.path d="M20 6L9 17l-5-5" />
            </motion.svg>
        </div>
    );
}
