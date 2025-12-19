"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import {
    ChatBubble,
    ChatBubbleMessage,
    ChatBubbleActionWrapper,
    ChatBubbleAction,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/CustomButton";
import { Send, Copy, Sparkles, User, RotateCcw, Square, Check, Maximize2, Minimize2 } from "lucide-react";

const SUGGESTED_PROMPTS = [
    { label: "SDK Integration", prompt: "How do I integrate the Adapty SDK into my app?" },
    { label: "Pricing Plans", prompt: "What are Adapty's pricing plans?" },
    { label: "A/B Testing", prompt: "How does paywall A/B testing work?" },
    { label: "Analytics", prompt: "What analytics and metrics does Adapty provide?" },
];

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

type ChatSize = "md" | "lg" | "xl" | "full";

const STORAGE_KEY = "adapty-chat-history";

const WELCOME_MESSAGE: Message = {
    id: "welcome",
    role: "assistant",
    content:
        "Hi! I'm Adapty AI. Ask me anything about in-app subscriptions, paywalls, A/B testing, our SDK integration, or pricing. How can I help you today?",
};

export function AIChatWidget() {
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [chatSize, setChatSize] = useState<ChatSize>("lg");
    const abortControllerRef = useRef<AbortController | null>(null);
    const hasLoadedRef = useRef(false);

    const cycleChatSize = useCallback(() => {
        setChatSize((prev) => {
            const sizes: ChatSize[] = ["md", "lg", "xl", "full"];
            const currentIndex = sizes.indexOf(prev);
            return sizes[(currentIndex + 1) % sizes.length];
        });
    }, []);

    // Load messages from localStorage on mount
    useEffect(() => {
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;

        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as Message[];
                if (parsed.length > 0) {
                    setMessages(parsed);
                }
            }
        } catch {
            // Ignore localStorage errors
        }
    }, []);

    // Save messages to localStorage when they change
    useEffect(() => {
        if (!hasLoadedRef.current) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch {
            // Ignore localStorage errors
        }
    }, [messages]);

    const handleSubmit = useCallback(
        async (e?: React.FormEvent, promptOverride?: string) => {
            e?.preventDefault();
            const text = (promptOverride ?? input).trim();
            if (!text || isLoading) return;

            const userMessage: Message = {
                id: `user-${Date.now()}`,
                role: "user",
                content: text,
            };

            setMessages((prev) => [...prev, userMessage]);
            setInput("");
            setIsLoading(true);

            // Create abort controller for this request
            abortControllerRef.current = new AbortController();

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messages: [...messages, userMessage].map((m) => ({
                            role: m.role,
                            content: m.content,
                        })),
                    }),
                    signal: abortControllerRef.current.signal,
                });

                // Handle streaming response
                const reader = response.body?.getReader();
                if (!reader) throw new Error("No reader");

                const decoder = new TextDecoder();
                let fullText = "";

                const assistantMessage: Message = {
                    id: `assistant-${Date.now()}`,
                    role: "assistant",
                    content: "",
                };
                setMessages((prev) => [...prev, assistantMessage]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    fullText += decoder.decode(value, { stream: true });
                    setMessages((prev) =>
                        prev.map((m) =>
                            m.id === assistantMessage.id
                                ? { ...m, content: fullText }
                                : m
                        )
                    );
                }
            } catch (err) {
                if ((err as Error).name === "AbortError") {
                    // Request was cancelled - don't show error
                    return;
                }
                const errorMessage: Message = {
                    id: `error-${Date.now()}`,
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again.",
                };
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        },
        [input, isLoading, messages]
    );

    const handleStopGeneration = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setIsLoading(false);
        }
    }, []);

    const handleClearChat = useCallback(() => {
        setMessages([WELCOME_MESSAGE]);
        setInput("");
        setIsLoading(false);
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    const handleCopy = useCallback((content: string, id: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSubmit();
        }
    };

    return (
        <ExpandableChat
            size={chatSize}
            position="bottom-right"
            className="font-sans"
            icon={
                <div className="relative">
                    <Sparkles className="h-6 w-6" />
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white group-hover:border-transparent transition-colors duration-300 animate-pulse" />
                </div>
            }
        >
            <ExpandableChatHeader className="bg-white/50 backdrop-blur-md border-b border-black/5">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-violet-600 flex items-center justify-center shadow-inner">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-foreground">
                                Adapty AI
                            </h3>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[11px] font-medium text-muted-foreground">
                                    Powered by Gemini
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={cycleChatSize}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-full"
                            aria-label={chatSize === "full" ? "Minimize chat" : "Expand chat"}
                        >
                            {chatSize === "full" ? (
                                <Minimize2 className="w-4 h-4" />
                            ) : (
                                <Maximize2 className="w-4 h-4" />
                            )}
                        </Button>
                        {messages.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleClearChat}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-full"
                                aria-label="Clear chat"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </ExpandableChatHeader>

            <ExpandableChatBody className="bg-transparent p-4 relative flex flex-col">
                <ChatMessageList>
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => {
                            const isUser = message.role === "user";
                            return (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                    transition={{
                                        duration: 0.2,
                                        delay: index === messages.length - 1 ? 0.05 : 0,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                >
                                    <ChatBubble
                                        variant={isUser ? "sent" : "received"}
                                    >
                                        {/* Custom Avatar */}
                                        <div
                                            className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                                                isUser
                                                    ? "bg-zinc-100 text-zinc-600 border border-zinc-200"
                                                    : "bg-gradient-to-br from-brand to-violet-600 text-white"
                                            }`}
                                        >
                                            {isUser ? (
                                                <User className="w-4 h-4" />
                                            ) : (
                                                <Sparkles className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 w-full max-w-[85%]">
                                            <ChatBubbleMessage
                                                variant={isUser ? "sent" : "received"}
                                                className={
                                                    isUser
                                                        ? "shadow-md !bg-[#6720FF]"
                                                        : "bg-white/80 backdrop-blur-sm shadow-sm border border-black/5"
                                                }
                                                style={isUser ? { backgroundColor: "#6720FF", color: "#ffffff" } : undefined}
                                            >
                                                {isUser ? (
                                                    <span style={{ color: "#ffffff" }}>{message.content}</span>
                                                ) : (
                                                    <div className="prose prose-sm prose-zinc max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                                                        <ReactMarkdown
                                                            components={{
                                                                a: ({ ...props }) => (
                                                                    <a
                                                                        {...props}
                                                                        className="text-brand hover:underline"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    />
                                                                ),
                                                                strong: ({ ...props }) => (
                                                                    <strong {...props} className="font-semibold text-zinc-900" />
                                                                ),
                                                                ul: ({ ...props }) => (
                                                                    <ul {...props} className="list-disc pl-4 my-2 space-y-1" />
                                                                ),
                                                                ol: ({ ...props }) => (
                                                                    <ol {...props} className="list-decimal pl-4 my-2 space-y-1" />
                                                                ),
                                                                li: ({ ...props }) => (
                                                                    <li {...props} className="text-zinc-700" />
                                                                ),
                                                                p: ({ ...props }) => (
                                                                    <p {...props} className="text-zinc-700 my-2" />
                                                                ),
                                                                h3: ({ ...props }) => (
                                                                    <h3 {...props} className="text-base font-semibold text-zinc-900 mt-3 mb-1" />
                                                                ),
                                                                code: ({ ...props }) => (
                                                                    <code {...props} className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800" />
                                                                ),
                                                            }}
                                                        >
                                                            {message.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                )}
                                            </ChatBubbleMessage>

                                            {!isUser &&
                                                message.content &&
                                                message.id !== "welcome" && (
                                                    <ChatBubbleActionWrapper>
                                                        <ChatBubbleAction
                                                            icon={
                                                                copiedId === message.id ? (
                                                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                                ) : (
                                                                    <Copy className="w-3.5 h-3.5" />
                                                                )
                                                            }
                                                            onClick={() => handleCopy(message.content, message.id)}
                                                        />
                                                    </ChatBubbleActionWrapper>
                                                )}
                                        </div>
                                    </ChatBubble>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Suggested prompts - show only when just welcome message */}
                    {messages.length === 1 && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap gap-2 mt-4 px-1"
                        >
                            {SUGGESTED_PROMPTS.map((item) => (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => void handleSubmit(undefined, item.prompt)}
                                    className="px-3 py-1.5 text-xs font-medium text-brand bg-brand/5 hover:bg-brand/10 border border-brand/20 rounded-full transition-colors duration-200"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {isLoading && (
                        <ChatBubble variant="received">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand to-violet-600 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <ChatBubbleMessage
                                isLoading
                                className="bg-white/80 border border-black/5"
                            />
                        </ChatBubble>
                    )}
                </ChatMessageList>
            </ExpandableChatBody>

            <ExpandableChatFooter className="bg-white/50 backdrop-blur-md p-3 border-t border-black/5">
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-end gap-2 pt-2"
                >
                    <div className="relative flex-1 rounded-2xl border border-black/5 bg-white/80 focus-within:ring-2 focus-within:ring-brand/20 p-1 shadow-sm transition-all focus-within:shadow-md focus-within:bg-white">
                        <ChatInput
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything…"
                            className="min-h-12 resize-none rounded-xl bg-transparent border-0 p-3 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
                        />
                    </div>

                    {isLoading ? (
                        <Button
                            type="button"
                            size="icon"
                            onClick={handleStopGeneration}
                            className="h-11 w-11 bg-zinc-800 hover:bg-zinc-700 rounded-full shrink-0 mb-1 shadow-lg transition-all"
                            aria-label="Stop generation"
                        >
                            <Square className="w-4 h-4 text-white fill-white" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            size="icon"
                            className="h-11 w-11 !bg-brand hover:!bg-brand-hover rounded-full shrink-0 mb-1 shadow-lg hover:shadow-brand/25 transition-all"
                            style={{ backgroundColor: '#6720FF', color: '#ffffff' }}
                            disabled={!input.trim()}
                            aria-label="Send message"
                        >
                            <Send className="w-5 h-5 ml-0.5 text-white" />
                        </Button>
                    )}
                </form>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}
