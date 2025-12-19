"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ContainerScrollProps {
    children: React.ReactNode;
    titleComponent: React.ReactNode;
}

export const ContainerScroll = ({
    children,
    titleComponent,
}: ContainerScrollProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const scaleDimensions: [number, number] = isMobile ? [0.7, 0.9] : [1.05, 1];

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions);
    const translate = useTransform(scrollYProgress, [0, 1], [-100, 0]);

    return (
        <div
            className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 pt-20 md:p-20" // Tall container for scroll space, pt-20 for mobile header clearance
            ref={containerRef}
        >
            <div
                className="py-10 md:py-40 w-full relative"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

interface HeaderProps {
    translate: MotionValue<number>;
    titleComponent: React.ReactNode;
}

export const Header = ({ translate, titleComponent }: HeaderProps) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="div max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

interface CardProps {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    children: React.ReactNode;
}

export const Card = ({
    rotate,
    scale,
    children,
}: CardProps) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
            }}
            className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full perspective-1000"
        >
            {children}
        </motion.div>
    );
};
