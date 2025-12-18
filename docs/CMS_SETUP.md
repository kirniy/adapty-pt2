# CMS Setup Guide - Sanity.io

This guide covers the complete setup of Sanity CMS for the Adapty blog.

---

## Why Sanity?

- **Free Tier**: 100K API requests/month, 10GB bandwidth, 1M documents
- **Next.js Integration**: Official support, excellent DX
- **Real-time Editing**: Live preview and collaboration
- **TypeScript**: Full type safety
- **Portable Text**: Rich content format
- **Image Optimization**: Built-in CDN and transformations

---

## Setup Instructions

### Step 1: Create Sanity Account

1. Go to https://sanity.io
2. Sign up with GitHub or Google
3. Create a new project named "adapty-blog"

### Step 2: Initialize Sanity in Project

```bash
cd /Users/kirniy/dev/adapty-pt2

# Install Sanity CLI globally (if not installed)
npm install -g sanity@latest

# Initialize Sanity in project
npx sanity@latest init --env

# Follow prompts:
# - Select "Create new project"
# - Name: "adapty-blog"
# - Dataset: "production"
# - Output path: ./sanity
# - Template: "Clean project with no predefined schemas"
```

### Step 3: Install Dependencies

```bash
npm install @sanity/client @sanity/image-url next-sanity
npm install -D @sanity/types
```

---

## Schema Definitions

Create the following schema files in `/sanity/schemas/`:

### Category Schema

```typescript
// sanity/schemas/category.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for category badge',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
})
```

### Author Schema

```typescript
// sanity/schemas/author.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
    },
  },
})
```

### Blog Post Schema

```typescript
// sanity/schemas/blogPost.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary for blog cards (max 200 chars)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'Swift', value: 'swift' },
              { title: 'Kotlin', value: 'kotlin' },
              { title: 'Dart', value: 'dart' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      media: 'featuredImage',
      date: 'publishedAt',
    },
    prepare({ title, category, media, date }) {
      return {
        title,
        subtitle: `${category || 'No category'} • ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
        media,
      }
    },
  },
})
```

### Schema Index

```typescript
// sanity/schemas/index.ts
import category from './category'
import author from './author'
import blogPost from './blogPost'

export const schemaTypes = [category, author, blogPost]
```

---

## Sanity Configuration

### sanity.config.ts

```typescript
// sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'adapty-blog',
  title: 'Adapty Blog',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool(),
    visionTool(), // For testing GROQ queries
  ],

  schema: {
    types: schemaTypes,
  },
})
```

---

## Next.js Integration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token  # Optional for drafts
```

### Sanity Client

```typescript
// lib/sanity/client.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for production
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

### GROQ Queries

```typescript
// lib/sanity/queries.ts

// Get all blog posts for listing
export const allPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featuredImage,
    excerpt,
    publishedAt,
    readTime,
    "category": category->{
      name,
      slug,
      color
    },
    "author": author->{
      name,
      avatar
    }
  }
`

// Get posts by category
export const postsByCategoryQuery = `
  *[_type == "blogPost" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featuredImage,
    excerpt,
    publishedAt,
    readTime,
    "category": category->{
      name,
      slug,
      color
    }
  }
`

// Get all categories with post count
export const categoriesQuery = `
  *[_type == "category"] {
    _id,
    name,
    slug,
    color,
    "postCount": count(*[_type == "blogPost" && references(^._id)])
  }
`

// Get featured posts
export const featuredPostsQuery = `
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    featuredImage,
    excerpt,
    publishedAt,
    readTime,
    "category": category->{
      name,
      slug,
      color
    }
  }
`
```

### Data Fetching (App Router)

```typescript
// app/blog/page.tsx
import { client } from '@/lib/sanity/client'
import { allPostsQuery, categoriesQuery } from '@/lib/sanity/queries'
import { BlogCard } from '@/components/blog/BlogCard'
import { CategoryFilter } from '@/components/blog/CategoryFilter'

// Enable static generation
export const revalidate = 3600 // Revalidate every hour

async function getPosts() {
  return client.fetch(allPostsQuery)
}

async function getCategories() {
  return client.fetch(categoriesQuery)
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ])

  return (
    <main>
      <h1>Latest news and insights from Adapty</h1>
      <CategoryFilter categories={categories} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
```

---

## TypeScript Types

```typescript
// types/sanity.ts

export interface Category {
  _id: string
  name: string
  slug: { current: string }
  color?: string
  postCount?: number
}

export interface Author {
  _id: string
  name: string
  avatar?: SanityImage
  role?: string
  bio?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  featuredImage: SanityImage
  category: Category
  author?: Author
  publishedAt: string
  readTime: number
  excerpt: string
  content?: any[] // Portable Text blocks
  featured?: boolean
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}
```

---

## Sample Data

### Categories to Create

```javascript
// Run in Sanity Studio or via script
const categories = [
  { name: 'Analytics', slug: 'analytics', color: '#3B82F6' },
  { name: 'Android', slug: 'android', color: '#22C55E' },
  { name: 'General', slug: 'general', color: '#6366F1' },
  { name: 'iOS', slug: 'ios', color: '#F59E0B' },
  { name: 'Money', slug: 'money', color: '#10B981' },
  { name: 'Paywall Newsletter', slug: 'paywall-newsletter', color: '#8B5CF6' },
  { name: 'Podcast', slug: 'podcast', color: '#EC4899' },
  { name: 'Product-releases', slug: 'product-releases', color: '#06B6D4' },
  { name: 'Trends-insights', slug: 'trends-insights', color: '#F97316' },
  { name: 'Tutorial', slug: 'tutorial', color: '#14B8A6' },
]
```

### Authors to Create

```javascript
const authors = [
  {
    name: 'Victoria Kharlan',
    slug: 'victoria-kharlan',
    role: 'Content Writer',
    bio: 'Lessons I wish I had. Now yours.',
  },
  {
    name: 'Adapty Team',
    slug: 'adapty-team',
    role: 'Team',
    bio: 'The Adapty team sharing insights on subscription monetization.',
  },
]
```

---

## Sanity Studio Access

### Running Locally

```bash
cd sanity
npm run dev
# Opens at http://localhost:3333
```

### Deploying Studio

```bash
npx sanity deploy
# Creates hosted studio at https://adapty-blog.sanity.studio
```

---

## Image Handling

### Optimized Image Component

```typescript
// components/SanityImage.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImage as SanityImageType } from '@/types/sanity'

interface Props {
  image: SanityImageType
  alt?: string
  width: number
  height: number
  className?: string
}

export function SanityImage({ image, alt, width, height, className }: Props) {
  const imageUrl = urlFor(image)
    .width(width)
    .height(height)
    .fit('crop')
    .url()

  return (
    <Image
      src={imageUrl}
      alt={alt || image.alt || ''}
      width={width}
      height={height}
      className={className}
    />
  )
}
```

---

## Verification Checklist

- [ ] Sanity project created
- [ ] Schemas defined and working
- [ ] Environment variables set
- [ ] Client configured in Next.js
- [ ] Queries returning data
- [ ] Images rendering correctly
- [ ] Categories created in CMS
- [ ] Sample blog posts added
- [ ] Static generation working (view-source shows content)
