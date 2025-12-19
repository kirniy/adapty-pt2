"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage, ChatBubbleActionWrapper, ChatBubbleAction } from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/CustomButton";
import { Send, Bot, User, Paperclip, Mic, Copy, RefreshCw, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AIChatWidget() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, reload, stop } = useChat({
        api: "/api/chat",
        initialMessages: [
            {
                id: "welcome",
                role: "assistant",
                content: "Hi! I'm the Adapty AI Assistant. Ask me anything about the design system, documentation, or implementation code!",
            }
        ]
    });

    // Auto-scroll logic is handled by ChatMessageList internally now

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <ExpandableChat size="lg" position="bottom-right" className="font-sans">
            <ExpandableChatHeader className="bg-white/50 backdrop-blur-md border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-violet-600 flex items-center justify-center shadow-inner">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-foreground">Adapty AI</h3>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[11px] font-medium text-muted-foreground">Gemini 3.0 Flash</p>
                        </div>
                    </div>
                </div>
            </ExpandableChatHeader>

            <ExpandableChatBody className="bg-transparent p-4 relative flex flex-col">
                <ChatMessageList>
                    {messages.map((message: any) => (
                        <ChatBubble
                            key={message.id}
                            variant={message.role === "user" ? "sent" : "received"}
                        >
                            <ChatBubbleAvatar
                                src={message.role === "user" ? undefined : undefined} // Add user avatar if available
                                fallback={message.role === "user" ? "US" : "AI"}
                                className={message.role === "assistant" ? "bg-gradient-to-br from-brand to-violet-600 text-white" : "bg-white text-foreground border border-black/5"}
                            />
                            <div className="flex flex-col gap-1 w-full max-w-[85%]">
                                <ChatBubbleMessage
                                    variant={message.role === "user" ? "sent" : "received"}
                                    isLoading={false}
                                    className={message.role === "user"
                                        ? "bg-brand text-white shadow-md"
                                        : "bg-white/80 backdrop-blur-sm shadow-sm border border-black/5 text-foreground"
                                    }
                                >
                                    {message.content}
                                </ChatBubbleMessage>

                                {message.role === "assistant" && (
                                    <ChatBubbleActionWrapper>
                                        <ChatBubbleAction
                                            icon={<Copy className="w-3.5 h-3.5" />}
                                            onClick={() => navigator.clipboard.writeText(message.content)}
                                        />
                                        <ChatBubbleAction
                                            icon={<RefreshCw className="w-3.5 h-3.5" />}
                                            onClick={() => reload()}
                                        />
                                    </ChatBubbleActionWrapper>
                                )}
                            </div>
                        </ChatBubble>
                    ))}

                    {isLoading && (
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar fallback="AI" className="bg-brand/10 text-brand" />
                            <ChatBubbleMessage isLoading />
                        </ChatBubble>
                    )}
                </ChatMessageList>
            </ExpandableChatBody>

            <ExpandableChatFooter className="bg-white/50 backdrop-blur-md p-3 border-t border-black/5">
                <form onSubmit={handleSubmit} className="relative flex items-end gap-2 pt-2">
                    <div className="relative flex-1 rounded-2xl border border-black/5 bg-white/80 focus-within:ring-2 focus-within:ring-brand/20 p-1 shadow-sm transition-all focus-within:shadow-md focus-within:bg-white">
                        <ChatInput
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Gemini 3.0..."
                            className="min-h-12 resize-none rounded-xl bg-transparent border-0 p-3 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
                        />
                        <div className="flex items-center p-2 px-3 justify-between">
                            <div className="flex">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    className="h-8 w-8 text-muted-foreground hover:bg-black/5 rounded-full"
                                >
                                    <Paperclip className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        className="h-11 w-11 bg-brand hover:bg-brand-600 text-white rounded-full shrink-0 mb-1 shadow-lg hover:shadow-brand/25 transition-all"
                        disabled={isLoading || !input.trim()}
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </Button>
                </form>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}
