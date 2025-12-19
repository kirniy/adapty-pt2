"use client";

import React, { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
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
import { Send, Paperclip, Copy, Sparkles, User } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export function AIChatWidget() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hi! I'm Adapty AI. Ask me anything about in-app subscriptions, paywalls, A/B testing, our SDK integration, or pricing. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();
            const text = input.trim();
            if (!text || isLoading) return;

            const userMessage: Message = {
                id: `user-${Date.now()}`,
                role: "user",
                content: text,
            };

            setMessages((prev) => [...prev, userMessage]);
            setInput("");
            setIsLoading(true);

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
            } catch {
                const errorMessage: Message = {
                    id: `error-${Date.now()}`,
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again.",
                };
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        },
        [input, isLoading, messages]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSubmit();
        }
    };

    return (
        <ExpandableChat
            size="lg"
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
            </ExpandableChatHeader>

            <ExpandableChatBody className="bg-transparent p-4 relative flex flex-col">
                <ChatMessageList>
                    {messages.map((message) => {
                        const isUser = message.role === "user";
                        return (
                            <ChatBubble
                                key={message.id}
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
                                                        <Copy className="w-3.5 h-3.5" />
                                                    }
                                                    onClick={() =>
                                                        navigator.clipboard.writeText(
                                                            message.content
                                                        )
                                                    }
                                                />
                                            </ChatBubbleActionWrapper>
                                        )}
                                </div>
                            </ChatBubble>
                        );
                    })}

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
                        <div className="flex items-center p-2 px-3 justify-between">
                            <div className="flex">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    className="h-8 w-8 text-muted-foreground hover:bg-black/5 rounded-full"
                                    disabled={isLoading}
                                    aria-label="Attach file"
                                >
                                    <Paperclip className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        className="h-11 w-11 !bg-brand hover:!bg-brand-hover rounded-full shrink-0 mb-1 shadow-lg hover:shadow-brand/25 transition-all"
                        style={{ backgroundColor: '#6720FF', color: '#ffffff' }}
                        disabled={isLoading || !input.trim()}
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5 ml-0.5 text-white" />
                    </Button>
                </form>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}
