import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/ui/BlogCard";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY, CATEGORIES_QUERY, FEATURED_POST_QUERY } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
    const posts = await client.fetch(POSTS_QUERY);
    const categories = await client.fetch(CATEGORIES_QUERY);
    const featuredPost = await client.fetch(FEATURED_POST_QUERY);

    // Filter out featured post from main list if it's the same
    const otherPosts = posts.filter((p: any) => p.slug.current !== featuredPost?.slug);

    return (
        <div className="min-h-screen">
            <Section className="pb-12 pt-[140px] md:pt-[160px]">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-default pb-8">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                                Latest news and insights
                            </h1>
                            <p className="text-xl text-foreground-secondary">
                                Learn about subscription monetization, app growth, and Adapty updates.
                            </p>
                        </div>

                        {/* Categories (Horizontal Scroll) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <Button variant="secondary" className="bg-foreground text-background border-foreground hover:bg-foreground/90">All</Button>
                            {categories.map((cat: any) => (
                                <Button key={cat._id} variant="secondary" className="whitespace-nowrap">
                                    {cat.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {featuredPost && (
                        <div className="mb-20">
                            <BlogCard post={featuredPost} featured={true} />
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {otherPosts.map((post: any) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>

                    {!featuredPost && otherPosts.length === 0 && (
                        <div className="text-center py-20 text-foreground-secondary">
                            No posts found. Start writing in Sanity CMS!
                        </div>
                    )}
                </Container>
            </Section>
        </div>
    );
}
