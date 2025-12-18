import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'text'
    size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-smooth disabled:pointer-events-none disabled:opacity-50",
                    "rounded-[10px]",
                    size === 'sm' && "h-8 px-3 text-xs",
                    size === 'md' && "h-10 px-[12px] text-[15px]",
                    size === 'lg' && "h-12 px-6 text-[16px]",
                    variant === 'primary' && "bg-brand text-white hover:bg-brand-hover hover:shadow-card hover:translate-y-[-1px]",
                    variant === 'secondary' && "bg-transparent border border-border text-foreground hover:bg-background-secondary hover:border-foreground-muted",
                    variant === 'text' && "bg-transparent text-foreground hover:bg-background-secondary",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
