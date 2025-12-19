"use client";

import React, { useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/CustomButton";
import { AnimatePresence, motion } from "framer-motion";

export type ChatPosition = "bottom-right" | "bottom-left";
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

const chatConfig = {
    dimensions: {
        sm: "sm:w-[384px] sm:h-[500px]",
        md: "sm:w-[448px] sm:h-[600px]",
        lg: "sm:w-[512px] sm:h-[700px]",
        xl: "sm:w-[576px] sm:h-[800px]",
        full: "sm:w-full sm:h-full",
    },
    positions: {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
    },
    chatPositions: {
        "bottom-right": "sm:bottom-[80px] sm:right-0",
        "bottom-left": "sm:bottom-[80px] sm:left-0",
    },
};

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: ChatPosition;
    size?: ChatSize;
    icon?: React.ReactNode;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
    className,
    position = "bottom-right",
    size = "md",
    icon,
    children,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div
            className={cn(`fixed ${chatConfig.positions[position]} z-[9999] flex flex-col items-end gap-4`, className)}
            {...props}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "flex flex-col bg-white/80 backdrop-blur-xl border border-white/20 sm:rounded-2xl shadow-2xl overflow-hidden sm:absolute sm:origin-bottom-right fixed inset-0 w-full h-full sm:inset-auto",
                            chatConfig.chatPositions[position],
                            chatConfig.dimensions[size],
                            className,
                        )}
                        style={{
                            boxShadow: "0 20px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2) inset"
                        }}
                    >
                        {children}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 sm:hidden text-foreground/50 hover:text-foreground"
                            onClick={toggleChat}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ExpandableChatToggle
                icon={icon}
                isOpen={isOpen}
                toggleChat={toggleChat}
            />
        </div>
    );
};

ExpandableChat.displayName = "ExpandableChat";

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => (
    <div
        className={cn("flex items-center justify-between p-5 border-b border-black/5 bg-white/50 backdrop-blur-md", className)}
        {...props}
    />
);

ExpandableChatHeader.displayName = "ExpandableChatHeader";

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => <div className={cn("flex-grow overflow-y-auto custom-scrollbar", className)} {...props} />;

ExpandableChatBody.displayName = "ExpandableChatBody";

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => <div className={cn("border-t border-black/5 p-4 bg-white/50 backdrop-blur-md", className)} {...props} />;

ExpandableChatFooter.displayName = "ExpandableChatFooter";

interface ExpandableChatToggleProps {
    icon?: React.ReactNode;
    isOpen: boolean;
    toggleChat: () => void;
    className?: string;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
    className,
    icon,
    isOpen,
    toggleChat,
}) => (
    <motion.button
        onClick={toggleChat}
        animate={isOpen ? { y: 0 } : { y: [0, -5, 0] }}
        transition={{
            y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
            "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative group z-50 overflow-hidden",
            "bg-white text-foreground border border-border-subtle",
            "hover:text-white hover:border-transparent",
            className,
        )}
    >
        {/* Gradient Hover Effect Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

        {/* Glow Effect (Hover) */}
        <div className="absolute inset-0 bg-brand blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <X className="h-6 w-6" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {icon || (
                            <div className="relative">
                                <MessageCircle className="h-6 w-6" />
                                {/* Status Dot - Only show on white background (default), hide on hover (purple bg) */}
                                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white group-hover:border-transparent transition-colors duration-300" />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.button>
);

ExpandableChatToggle.displayName = "ExpandableChatToggle";

export {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
};
