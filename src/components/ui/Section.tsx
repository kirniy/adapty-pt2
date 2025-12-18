import * as React from "react"
import { cn } from "@/lib/utils"

const Section = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <section
            ref={ref}
            className={cn("py-[72px] md:py-[96px]", className)}
            {...props}
        />
    )
)
Section.displayName = "Section"

export { Section }
