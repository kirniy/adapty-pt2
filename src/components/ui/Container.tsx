import * as React from "react"
import { cn } from "@/lib/utils"

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-12", className)}
            {...props}
        />
    )
)
Container.displayName = "Container"

export { Container }
