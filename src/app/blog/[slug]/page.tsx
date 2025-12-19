
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { PortableText, PortableTextComponents } from "next-sanity";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

const LANGUAGE_ALIASES: Record<string, string> = {
    "objective c": "Objective-C",
    "objective-c": "Objective-C",
    "react native": "React Native",
    "c#": "C#",
    "csharp": "C#",
    "js": "JavaScript",
    "ts": "TypeScript",
};

const KNOWN_LANGUAGES = new Set([
    "Swift",
    "Kotlin",
    "Objective-C",
    "Java",
    "JavaScript",
    "TypeScript",
    "React Native",
    "Flutter",
    "Dart",
    "C#",
    "Python",
    "Ruby",
    "PHP",
    "Go",
    "Rust",
    "SQL",
    "Bash",
    "Shell",
    "JSON",
    "HTML",
    "CSS",
]);

const normalizeCodeBlock = (code: string, language?: string) => {
    let label = language && language !== "text" ? language : "";
    let normalized = code;

    if (!label) {
        const lines = code.split("\n");
        const firstLineIndex = lines.findIndex((line) => line.trim() !== "");
        if (firstLineIndex >= 0) {
            const raw = lines[firstLineIndex].trim();
            const lower = raw.toLowerCase();
            const mapped = LANGUAGE_ALIASES[lower] || raw;
            if (KNOWN_LANGUAGES.has(mapped)) {
                label = mapped;
                lines.splice(0, firstLineIndex + 1);
                if (lines[0] === "") {
                    lines.shift();
                }
                normalized = lines.join("\n");
            }
        }
    }

    return { code: normalized, label };
};

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

const normalizeBody = (body: Array<{ _type?: string; code?: string; language?: string; _key?: string }>) => {
    const converted = body.map((block) => {
        const code = extractTableCode(block as { _type?: string; style?: string; listItem?: string; children?: Array<{ text?: string }> });
        if (!code) {
            return block;
        }
        return {
            _key: (block as { _key?: string })._key,
            _type: "codeBlock",
            code,
            language: "text",
        };
    });

    return dedupeCodeBlocks(converted);
};

const dedupeCodeBlocks = (body: Array<{ _type?: string; code?: string }>) => {
    const cleaned: Array<{ _type?: string; code?: string }> = [];
    for (const block of body) {
        const prev = cleaned[cleaned.length - 1];
        if (block?._type === "codeBlock" && prev?._type === "codeBlock" && prev.code === block.code) {
            continue;
        }
        cleaned.push(block);
    }
    return cleaned;
};

const CodeBlock = ({ code, language }: { code: ReactNode; language?: string }) => {
    const normalized = typeof code === "string" ? normalizeCodeBlock(code, language) : { code, label: "" };
    const label = normalized.label;
    const classLanguage = label || (language && language !== "text" ? language : "text");

    return (
        <div className="my-6">
            {label && (
                <div className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-2">
                    {label}
                </div>
            )}
            <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono">
                <code className={`language-${classLanguage} whitespace-pre`}>
                    {normalized.code}
                </code>
            </pre>
        </div>
    );
};

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
    types: {
        codeBlock: ({ value }: { value: { code?: string; language?: string } }) => (
            <CodeBlock code={value.code || ''} language={value.language} />
        ),
        code: ({ value }: { value: { code?: string; language?: string } }) => (
            <CodeBlock code={value.code || ''} language={value.language} />
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
        code: ({ children }) => <CodeBlock code={children} />,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand pl-4 italic my-6 text-foreground-secondary">
                {children}
            </blockquote>
        ),
        normal: ({ children, value }) => {
            const code = extractTableCode(value as { _type?: string; style?: string; listItem?: string; children?: Array<{ text?: string }> });
            if (code) {
                return <CodeBlock code={code} />;
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
                        <PortableText value={body} components={portableTextComponents} />
                    </div>
                </Container>
            </Section>
        </article>
    );
}
