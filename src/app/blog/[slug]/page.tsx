
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { PortableText, PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { BlogCodeBlock } from "@/components/blog/BlogCodeBlock";

const TABLE_DIVIDER_RE = /\|\s*-{3,}\s*\|/;

const unescapeMarkdown = (value: string) =>
    value.replace(/\\([_[\](){}/])/g, "$1");

const extractTableCode = (block: { _type?: string; style?: string; listItem?: string; children?: Array<{ text?: string }> }) => {
    if (!block || block._type !== "block" || block.style !== "normal" || block.listItem) {
        return null;
    }

    const rawText = Array.isArray(block.children)
        ? block.children.map((child) => child.text || "").join("")
        : "";

    if (!rawText || !rawText.includes("|") || !TABLE_DIVIDER_RE.test(rawText)) {
        return null;
    }

    const normalized = rawText
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/&nbsp;/gi, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");

    const segments = normalized
        .split("|")
        .map((segment) => segment.trim())
        .filter(Boolean);

    const contentSegments = segments.filter((segment) => !/^[-–—]+$/.test(segment));
    if (contentSegments.length !== 1) {
        return null;
    }

    const code = unescapeMarkdown(contentSegments[0]).trim();
    return code || null;
};

const normalizeBody = (body: Array<{ _type?: string; code?: string; language?: string; _key?: string }>): PortableTextBlock[] => {
    const converted = body.map((block, index) => {
        const code = extractTableCode(block as { _type?: string; style?: string; listItem?: string; children?: Array<{ text?: string }> });
        if (!code) {
            return { ...block, _type: block._type || "block" };
        }
        return {
            _key: (block as { _key?: string })._key || `code-${index}`,
            _type: "codeBlock" as const,
            code,
            language: "text",
        };
    });

    return extractFaqGroups(dedupeCodeBlocks(converted));
};

const dedupeCodeBlocks = (body: Array<{ _type: string; code?: string; _key?: string }>) => {
    const cleaned: Array<{ _type: string; code?: string; _key?: string }> = [];
    for (const block of body) {
        const prev = cleaned[cleaned.length - 1];
        if (block?._type === "codeBlock" && prev?._type === "codeBlock" && prev.code === block.code) {
            continue;
        }
        cleaned.push(block);
    }
    return cleaned;
};

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
    types: {
        codeBlock: ({ value }: { value: { code?: string; language?: string } }) => (
            <BlogCodeBlock code={value.code || ""} language={value.language} />
        ),
        code: ({ value }: { value: { code?: string; language?: string } }) => (
            <BlogCodeBlock code={value.code || ""} language={value.language} />
        ),
        faqGroup: ({ value }: { value: { title?: string; items?: { question: string; answer: PortableTextBlock[] }[] } }) => (
            <FaqGroup value={value} />
        ),
        image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
            <div className="my-8">
                <Image
                    src={urlFor(value).url()}
                    alt={value.alt || 'Blog image'}
                    width={800}
                    height={450}
                    sizes="(min-width: 1024px) 768px, (min-width: 768px) 640px, 100vw"
                    className="rounded-2xl w-full h-auto shadow-sm"
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
        code: ({ children }) => (
            <BlogCodeBlock
                code={Array.isArray(children) ? children.join("") : typeof children === "string" ? children : ""}
            />
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand pl-4 italic my-6 text-foreground-secondary">
                {children}
            </blockquote>
        ),
        normal: ({ children, value }) => {
            const code = extractTableCode(value as { _type?: string; style?: string; listItem?: string; children?: Array<{ text?: string }> });
            if (code) {
                return <BlogCodeBlock code={code} />;
            }
            return <p className="my-4 leading-relaxed">{children}</p>;
        },
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

function extractFaqGroups(
    body: Array<{ _type?: string; style?: string; listItem?: string; children?: Array<{ text?: string }> }>
) {
    const getText = (block: { children?: Array<{ text?: string }> }) =>
        (block.children || []).map((child) => child.text || "").join("").trim();

    const isFaqHeading = (block: { _type?: string; style?: string; children?: Array<{ text?: string }> }) => {
        if (block._type !== "block" || block.style !== "h2") return false;
        const text = getText(block).toLowerCase();
        return text === "faq" || text === "faqs";
    };

    const isSectionBoundary = (block: { _type?: string; style?: string }) =>
        block._type === "block" && (block.style === "h1" || block.style === "h2");

    const transformed: Array<PortableTextBlock | { _type: string; _key?: string; title: string; items: { question: string; answer: PortableTextBlock[] }[] }> = [];

    for (let i = 0; i < body.length; i += 1) {
        const block = body[i];
        if (!isFaqHeading(block)) {
            transformed.push(block as PortableTextBlock);
            continue;
        }

        const items: { question: string; answer: PortableTextBlock[] }[] = [];
        let currentQuestion = "";
        let currentAnswer: PortableTextBlock[] = [];
        let j = i + 1;

        for (; j < body.length; j += 1) {
            const next = body[j];
            if (isSectionBoundary(next)) {
                break;
            }
            if (next?._type === "block" && next.style === "h3") {
                if (currentQuestion) {
                    items.push({ question: currentQuestion, answer: currentAnswer });
                }
                currentQuestion = getText(next);
                currentAnswer = [];
                continue;
            }
            if (currentQuestion) {
                currentAnswer.push(next as PortableTextBlock);
            }
        }

        if (currentQuestion) {
            items.push({ question: currentQuestion, answer: currentAnswer });
        }

        if (items.length > 0) {
            transformed.push({
                _type: "faqGroup",
                _key: (block as { _key?: string })._key,
                title: getText(block) || "FAQs",
                items,
            });
        } else {
            transformed.push(block as PortableTextBlock);
        }

        i = j - 1;
    }

    return transformed as PortableTextBlock[];
}

function FaqGroup({ value }: { value: { title?: string; items?: { question: string; answer: PortableTextBlock[] }[] } }) {
    const items = Array.isArray(value?.items) ? value.items : [];
    if (!items.length) return null;

    const faqComponents: PortableTextComponents = {
        ...portableTextComponents,
        types: {
            ...portableTextComponents.types,
            faqGroup: undefined,
        },
    };

    return (
        <div className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{value.title || "FAQs"}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <details
                        key={`${item.question}-${index}`}
                        className="group rounded-2xl border border-border-subtle bg-white shadow-sm overflow-hidden"
                    >
                        <summary className="faq-summary flex items-start justify-between gap-4 px-6 py-5 cursor-pointer text-lg font-semibold text-foreground">
                            {item.question}
                            <ChevronDown className="h-5 w-5 text-foreground-secondary transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-6 pb-6 text-foreground-secondary">
                            <PortableText value={item.answer} components={faqComponents} />
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}

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

// Generate static params for all blog posts at build time (SSG)
export async function generateStaticParams() {
    const posts = await client.fetch(`*[_type == "blogPost"] { "slug": slug.current }`);
    return posts.map((post: { slug: string }) => ({ slug: post.slug }));
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

    const body = Array.isArray(post.body) ? normalizeBody(post.body) : [];

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

                        <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 mb-12 sm:flex-row sm:items-center sm:justify-between">
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
                            <div className="text-left text-sm text-foreground-secondary sm:text-right">
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
                <Section className="pt-0">
                    <Container className="max-w-5xl">
                        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl border border-border-subtle bg-background-secondary shadow-lg">
                            <Image
                                src={urlFor(post.mainImage).url()}
                                alt={post.title}
                                fill
                                sizes="(min-width: 1024px) 960px, (min-width: 768px) 700px, 100vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </Container>
                </Section>
            )}

            {/* Content */}
            <Section>
                <Container className="max-w-3xl">
                    <div className="max-w-none text-foreground">
                        <PortableText value={body} components={portableTextComponents} />
                    </div>
                </Container>
            </Section>
        </article>
    );
}
