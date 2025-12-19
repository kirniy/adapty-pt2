import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

const baseUrl = "https://adapty-pt2.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all blog posts from Sanity
    const posts = await client.fetch<{ slug: string; updatedAt: string }[]>(`
        *[_type == "blogPost"] | order(publishedAt desc) {
            "slug": slug.current,
            "updatedAt": _updatedAt
        }
    `);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];

    // Dynamic blog post pages
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...blogPages];
}
