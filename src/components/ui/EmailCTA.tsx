"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface EmailCTAProps {
  className?: string;
  variant?: "light" | "dark";
  buttonText?: string;
  placeholder?: string;
  showBookDemo?: boolean;
  onSubmit?: (email: string) => void;
}

/**
 * Email CTA Component
 * Matches the original Adapty design with email input + embedded button
 */
export function EmailCTA({
  className,
  variant = "light",
  buttonText = "Start for free",
  placeholder = "Email address",
  showBookDemo = true,
  onSubmit,
}: EmailCTAProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onSubmit) {
      onSubmit(email);
    }
    // Default behavior: redirect to signup with email
    if (email) {
      window.location.href = `https://app.adapty.io/signup?email=${encodeURIComponent(email)}`;
    }
  };

  const isLight = variant === "light";

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-4", className)}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full sm:w-auto">
        <div
          className={cn(
            "flex items-center rounded-full border overflow-hidden transition-all duration-200",
            "focus-within:ring-2 focus-within:ring-brand/20",
            isLight
              ? "bg-white border-border hover:border-foreground-muted"
              : "bg-white/10 border-white/20 hover:border-white/40"
          )}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "w-[200px] sm:w-[240px] px-5 py-3.5 text-[15px] bg-transparent outline-none",
              isLight
                ? "text-foreground placeholder:text-foreground-muted"
                : "text-white placeholder:text-white/50"
            )}
            required
          />
          <button
            type="submit"
            className={cn(
              "flex items-center gap-2 px-5 py-3 mr-1.5 rounded-full font-medium text-[15px] transition-all duration-200",
              "hover:translate-x-0.5 active:scale-95",
              isLight
                ? "bg-brand text-white hover:bg-brand-hover"
                : "bg-white text-foreground hover:bg-white/90"
            )}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {showBookDemo && (
        <a
          href="/demo"
          className={cn(
            "flex items-center gap-1 font-medium text-[15px] transition-all duration-200 hover:gap-2",
            isLight
              ? "text-foreground hover:text-brand"
              : "text-white hover:text-white/80"
          )}
        >
          Book a demo
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

/**
 * Compact Email Input - just the input field for inline usage
 */
export function EmailInput({
  className,
  variant = "light",
  placeholder = "Email address",
}: {
  className?: string;
  variant?: "light" | "dark";
  placeholder?: string;
}) {
  const [email, setEmail] = useState("");
  const isLight = variant === "light";

  return (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "w-full px-5 py-3.5 text-[15px] rounded-full border outline-none transition-all duration-200",
        "focus:ring-2 focus:ring-brand/20",
        isLight
          ? "bg-white border-border text-foreground placeholder:text-foreground-muted hover:border-foreground-muted"
          : "bg-white/10 border-white/20 text-white placeholder:text-white/50 hover:border-white/40",
        className
      )}
    />
  );
}

export default EmailCTA;
