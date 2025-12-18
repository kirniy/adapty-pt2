
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { PortableText } from "next-sanity";
import { ArrowLeft } from "lucide-react";

async function getPost(slug: string) {
    return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      title,
      excerpt,
      mainImage,
      publishedAt,
      readTime,
      body,
      "author": author->{name, image, role},
      "category": category->{title}
    }
  `, { slug });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post not found</h1>
                    <Link href="/blog" className="text-brand hover:underline">Back to Blog</Link>
                </div>
            </div>
        )
    }

    return (
        <article className="pt-32 pb-24">
            {/* Header */}
            <Section>
                <Container className="max-w-4xl">
                    <FadeIn>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-foreground mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        {post.category && (
                            <div className="text-brand font-semibold mb-4 text-sm tracking-wide uppercase">
                                {post.category.title}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between border-b border-border-subtle pb-8 mb-12">
                            <div className="flex items-center gap-4">
                                {post.author?.image ? (
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand text-lg font-bold">
                                        {post.author?.name?.[0] || 'A'}
                                    </div>
                                )}
                                <div>
                                    <div className="font-bold text-foreground">{post.author?.name || 'Adapty Team'}</div>
                                    <div className="text-sm text-foreground-secondary">{post.author?.role || 'Team'}</div>
                                </div>
                            </div>
                            <div className="text-right text-sm text-foreground-secondary">
                                {post.publishedAt && (
                                    <div className="mb-1">
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                )}
                                <div>{post.readTime || 5} min read</div>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </Section>

            {/* Hero Image */}
            {post.mainImage && (
                <div className="w-full h-[400px] md:h-[600px] relative mb-16 bg-background-secondary">
                    <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Content */}
            <Section>
                <Container className="max-w-3xl">
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand prose-img:rounded-2xl">
                        <PortableText value={post.body} />
                    </div>
                </Container>
            </Section>
        </article>
    );
}
