"use client";

import { cn } from "@/lib/utils";

interface AIThinkingShimmerProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
}

/**
 * AI Thinking Shimmer Effect
 * Replicates Attio's premium "AI is thinking..." state with gradient text animation
 *
 * The gradient flows from pink (#DC8FA5) to blue (#70A1F0) and back,
 * creating a smooth, high-end visual feedback for async AI operations.
 */
export function AIThinkingShimmer({
  text = "AI is thinking...",
  className,
  size = "md",
  showDot = true,
}: AIThinkingShimmerProps) {
  const sizeClasses = {
    sm: "text-xs gap-x-1 px-2 py-1",
    md: "text-sm gap-x-1.5 px-3 py-1.5",
    lg: "text-base gap-x-2 px-4 py-2",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <div
      className={cn(
        "relative flex items-center rounded-lg overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            "rounded-full bg-gradient-to-r from-[#DC8FA5] to-[#70A1F0] animate-pulse",
            dotSizeClasses[size]
          )}
        />
      )}
      <span className="font-medium tracking-tight">
        <span
          className="bg-clip-text text-transparent animate-ai-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(131.88deg, #DC8FA5 0%, #70A1F0 50%, #DC8FA5 100%)",
            backgroundSize: "300%",
          }}
        >
          {text}
        </span>
      </span>
    </div>
  );
}

/**
 * AI Thinking Inline - for inline text usage
 */
export function AIThinkingInline({
  text = "thinking",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent animate-ai-shimmer font-medium",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(131.88deg, #DC8FA5 0%, #70A1F0 50%, #DC8FA5 100%)",
        backgroundSize: "300%",
      }}
    >
      {text}
    </span>
  );
}

/**
 * AI Processing Bar - a loading bar variant with shimmer effect
 */
export function AIProcessingBar({
  className,
  width = "100%",
}: {
  className?: string;
  width?: string | number;
}) {
  return (
    <div
      className={cn("h-1 rounded-full overflow-hidden bg-gray-100", className)}
      style={{ width }}
    >
      <div
        className="h-full w-full animate-ai-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, #DC8FA5 25%, #70A1F0 50%, #DC8FA5 75%, transparent 100%)",
          backgroundSize: "300%",
        }}
      />
    </div>
  );
}

export default AIThinkingShimmer;
