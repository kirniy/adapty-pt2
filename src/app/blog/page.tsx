
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { formatDate } from "@/lib/utils";

type BlogPostListItem = {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: unknown;
    publishedAt?: string;
    readTime?: number;
    author?: { name?: string; image?: unknown };
    category?: { name?: string };
};

async function getPosts(): Promise<BlogPostListItem[]> {
    return client.fetch<BlogPostListItem[]>(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      readTime,
      "author": author->{name, image},
      "category": category->{name}
    }
  `);
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="pt-32 pb-24">
            <Section>
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mb-16">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                                Blog
                            </h1>
                            <p className="text-xl text-foreground-secondary leading-relaxed">
                                Insights, updates, and guides on mobile app growth and monetization.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <FadeIn key={post._id} delay={index * 0.1}>
                                <Link
                                    href={`/blog/${post.slug.current}`}
                                    className="group flex flex-col h-full bg-white rounded-2xl border border-border-subtle overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 ease-smooth"
                                >
                                    <div className="relative h-48 w-full bg-background-secondary overflow-hidden">
                                        {post.mainImage ? (
                                            <Image
                                                src={urlFor(post.mainImage).url()}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-foreground-secondary/20 font-bold text-4xl">
                                                Aa
                                            </div>
                                        )}
                                        {post.category && (
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-foreground">
                                                {post.category.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-xs text-foreground-secondary mb-3 font-medium">
                                            {post.publishedAt && (
                                                <time dateTime={post.publishedAt}>
                                                    {formatDate(post.publishedAt)}
                                                </time>
                                            )}
                                            <span>•</span>
                                            <span>{post.readTime || 5} min read</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-foreground-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-border-subtle/50">
                                            {post.author?.image ? (
                                                <Image
                                                    src={urlFor(post.author.image).url()}
                                                    alt={post.author.name || 'Author'}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full"
                                                />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center text-brand text-xs font-bold">
                                                    {post.author?.name?.[0] || 'A'}
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-foreground">{post.author?.name || 'Adapty Team'}</span>
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </Section>
        </main>
    );
}
