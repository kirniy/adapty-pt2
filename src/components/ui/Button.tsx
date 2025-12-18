import * as React from "react"
import { cn } from "@/lib/utils"
import { SnakeBorder } from "./SnakeBorder"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'text' | 'beam'
    size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles = cn(
            "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-smooth disabled:pointer-events-none disabled:opacity-50 active:scale-95",
            "rounded-[10px] w-full",
            size === 'sm' && "h-8 px-3 text-xs",
            size === 'md' && "h-10 px-[12px] text-[15px]",
            size === 'lg' && "h-12 px-6 text-[16px]",
            variant === 'primary' && "bg-brand text-white hover:bg-brand-hover hover:shadow-card hover:translate-y-[-1px]",
            variant === 'secondary' && "bg-transparent border border-border text-foreground hover:bg-background-secondary hover:border-foreground-muted",
            variant === 'text' && "bg-transparent text-foreground hover:bg-background-secondary",
            // Beam specific inner styles
            variant === 'beam' && "bg-brand text-white hover:bg-brand-hover"
        )

        if (variant === 'beam') {
            return (
                <button ref={ref} className={cn("p-0 border-0 outline-none bg-transparent rounded-[12px]", className)} {...props}>
                    <SnakeBorder className="rounded-[12px]" color="#ffffff">
                        <div className={baseStyles}>
                            {props.children}
                        </div>
                    </SnakeBorder>
                </button>
            )
        }

        return (
            <button
                className={cn(baseStyles, className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
