import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedPillProps {
    children: React.ReactNode;
    className?: string;
}

export function AnimatedPill({ children, className }: AnimatedPillProps) {
    return (
        <div className="animated-gradient-border inline-flex p-[1px] rounded-full">
            <div className={cn("bg-white rounded-full px-4 py-1.5 text-sm font-medium relative z-10", className)}>
                {children}
            </div>
        </div>
    );
}
