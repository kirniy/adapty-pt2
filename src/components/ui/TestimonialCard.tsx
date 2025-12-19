import { cn } from "@/lib/utils"
import Image from "next/image"

interface TestimonialCardProps {
    quote: string
    author: {
        name: string
        role: string
        company: string
        avatar?: string
    }
    className?: string
}

export function TestimonialCard({ quote, author, className }: TestimonialCardProps) {
    return (
        <div className={cn(
            "break-inside-avoid mb-6 p-6 rounded-xl bg-white border border-border-subtle shadow-sm hover:shadow-card transition-shadow duration-200",
            className
        )}>
            <div className="flex flex-col gap-4">
                <p className="text-[15px] leading-relaxed text-foreground font-medium">
                    “{quote}”
                </p>
                <div className="flex items-center gap-3">
                    {author.avatar ? (
                        <Image
                            src={author.avatar}
                            alt={author.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-background-tertiary" />
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{author.name}</span>
                        <span className="text-xs text-foreground-secondary">{author.role} at {author.company}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
