
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { PortableText, PortableTextComponents } from "next-sanity";
import { ArrowLeft } from "lucide-react";

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
    types: {
        codeBlock: ({ value }: { value: { code: string; language?: string } }) => (
            <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-4 overflow-x-auto my-6 text-sm">
                <code className={`language-${value.language || 'text'}`}>
                    {value.code}
                </code>
            </pre>
        ),
        image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
            <div className="my-8">
                <Image
                    src={urlFor(value).url()}
                    alt={value.alt || 'Blog image'}
                    width={800}
                    height={450}
                    className="rounded-2xl"
                />
            </div>
        ),
    },
    marks: {
        code: ({ children }) => (
            <code className="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        ),
        link: ({ value, children }) => (
            <a href={value?.href} className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand pl-4 italic my-6 text-foreground-secondary">
                {children}
            </blockquote>
        ),
        normal: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
        number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
};

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
                    <div className="max-w-none text-foreground">
                        <PortableText value={post.body} components={portableTextComponents} />
                    </div>
                </Container>
            </Section>
        </article>
    );
}
