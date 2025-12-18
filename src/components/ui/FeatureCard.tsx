import { cn } from "@/lib/utils"
import Link from "next/link"

interface FeatureCardProps {
    title: string
    description: string
    icon?: React.ReactNode
    image?: React.ReactNode
    className?: string
    href?: string
}

export function FeatureCard({ title, description, icon, image, className, href }: FeatureCardProps) {
    const Wrapper = href ? Link : 'div'

    return (
        <Wrapper
            href={href || '#'}
            className={cn(
                "group relative overflow-hidden bg-white border border-border-subtle rounded-3xl shadow-sm transition-all duration-300 ease-smooth hover:shadow-card hover:translate-y-[-4px] flex flex-col h-full",
                className
            )}
        >
            <div className="p-8 flex flex-col h-full z-10 relative">
                <div className="flex items-start justify-between mb-4">
                    {icon && (
                        <div className="w-12 h-12 rounded-xl bg-background-secondary flex items-center justify-center text-foreground-secondary group-hover:text-brand transition-colors duration-300">
                            {icon}
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
                <p className="text-foreground-secondary text-[15px] leading-relaxed mb-8">
                    {description}
                </p>

                {image && (
                    <div className="mt-auto -mx-8 -mb-8 rounded-t-xl overflow-hidden shadow-inner bg-background-tertiary">
                        {image}
                    </div>
                )}
            </div>
        </Wrapper>
    )
}
