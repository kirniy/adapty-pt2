"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
    id: string;
    label: string;
}

interface AttioTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function AttioTabs({ tabs, activeTab, onTabChange, className }: AttioTabsProps) {
    return (
        <div className={cn("flex bg-[#F4F5F6] p-1 rounded-[10px] gap-x-1 relative", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className="relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 z-10"
                    style={{ color: activeTab === tab.id ? '#1C1D1F' : '#5C5E63' }}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-tab-pill" // Shared layout ID
                            className="absolute inset-0 bg-white rounded-[7px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] -z-10"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }} // Attio Spec
                        />
                    )}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
