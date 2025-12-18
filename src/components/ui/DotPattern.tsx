"use client";

import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  /**
   * Pattern type:
   * - "svg": Uses SVG circles (original Attio style, best for large areas)
   * - "gradient": Uses CSS repeating-linear-gradient (lightweight, current implementation)
   */
  variant?: "svg" | "gradient";
  /**
   * Dot color - defaults to Attio's subtle grey
   */
  color?: string;
  /**
   * Spacing between dots in pixels
   */
  spacing?: number;
  /**
   * Dot size in pixels (only for SVG variant)
   */
  dotSize?: number;
  /**
   * Opacity of the pattern (0-100)
   */
  opacity?: number;
  /**
   * Gradient angle in degrees (only for gradient variant)
   */
  angle?: number;
}

/**
 * Dot Pattern Background Component
 * Replicates Attio's subtle textured background pattern
 *
 * Two variants available:
 * 1. SVG: Uses actual circles - best for larger viewports, more precise
 * 2. Gradient: Uses CSS repeating-linear-gradient - lightweight, performant
 */
export function DotPattern({
  className,
  variant = "gradient",
  color = "#EEEFF1",
  spacing = 20,
  dotSize = 1,
  opacity = 30,
  angle = 125,
}: DotPatternProps) {
  if (variant === "svg") {
    return (
      <svg
        width="100%"
        height="100%"
        className={cn(
          "pointer-events-none fixed inset-0",
          className
        )}
        style={{ opacity: opacity / 100 }}
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSize}
              cy={dotSize}
              r={dotSize / 2}
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    );
  }

  // Gradient variant (lightweight CSS-based)
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      style={{
        opacity: opacity / 100,
        backgroundImage: `repeating-linear-gradient(${angle}deg, transparent, transparent 6px, ${color} 6px, ${color} 7px)`,
      }}
    />
  );
}

/**
 * Fixed Dot Pattern - for page-wide backgrounds
 */
export function FixedDotPattern({
  className,
  ...props
}: DotPatternProps) {
  return (
    <DotPattern
      {...props}
      className={cn("fixed inset-0 z-0", className)}
    />
  );
}

/**
 * Attio-style striped pattern with specific angle
 */
export function AttioStripedPattern({
  className,
  opacity = 40,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      style={{
        opacity: opacity / 100,
        backgroundImage: `repeating-linear-gradient(125deg, transparent, transparent 6px, #dee2e6 6px, #dee2e6 7px)`,
      }}
    />
  );
}

export default DotPattern;
