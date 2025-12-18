import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";

interface BlogCardProps {
    post: {
        title: string;
        excerpt: string;
        slug: { current: string };
        mainImage?: any;
        category?: { name: string; color?: string };
        publishedAt: string;
        readTime?: number;
    };
    className?: string;
    featured?: boolean;
}

export function BlogCard({ post, className, featured = false }: BlogCardProps) {
    const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Link
            href={`/blog/${post.slug.current}`}
            className={cn(
                "group flex flex-col bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-200 ease-smooth hover:translate-y-[-2px]",
                featured ? "md:grid md:grid-cols-2 md:gap-8 md:items-center p-0 md:border-0 md:bg-transparent md:shadow-none md:hover:shadow-none md:hover:translate-y-0" : "h-full",
                className
            )}
        >
            {/* Image */}
            <div className={cn(
                "relative overflow-hidden bg-background-tertiary",
                featured ? "aspect-[16/9] md:aspect-[3/2] w-full rounded-2xl shadow-card" : "aspect-[16/9] w-full"
            )}>
                {post.mainImage && (
                    <Image
                        src={urlFor(post.mainImage).width(800).height(500).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>

            {/* Content */}
            <div className={cn(
                "flex flex-col",
                featured ? "py-6 md:py-0" : "p-6 flex-grow"
            )}>
                <div className="flex items-center gap-3 mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                    {post.category && (
                        <span className="text-brand">{post.category.name}</span>
                    )}
                    <span>•</span>
                    <span>{date}</span>
                </div>

                <h3 className={cn(
                    "font-bold text-foreground mb-3 group-hover:text-brand transition-colors",
                    featured ? "text-3xl md:text-4xl leading-tight" : "text-xl leading-snug"
                )}>
                    {post.title}
                </h3>

                <p className={cn(
                    "text-foreground-secondary leading-relaxed mb-4 line-clamp-3",
                    featured ? "text-lg" : "text-[15px]"
                )}>
                    {post.excerpt}
                </p>

                {featured && (
                    <div className="mt-4 font-medium text-brand">Read article &rarr;</div>
                )}
            </div>
        </Link>
    );
}
