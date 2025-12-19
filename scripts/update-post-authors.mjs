#!/usr/bin/env node
/**
 * Updates Sanity blogPost author references based on scripts/blog-posts.json
 * and ensures author documents exist.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN required');
  process.exit(1);
}

const client = createClient({
  projectId: 'r5c34qsa',
  dataset: 'production',
  apiVersion: '2025-12-19',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

const blogPostsPath = path.join(__dirname, 'blog-posts.json');
const blogData = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));

const authors = blogData.authors || [];
const posts = blogData.posts || [];

function pickAuthorSlug(post, nameToSlug) {
  if (post.authorSlug) return post.authorSlug;
  if (post.author && nameToSlug.has(post.author)) return nameToSlug.get(post.author);
  return null;
}

async function ensureAuthor(author) {
  const existing = await client.fetch(
    '*[_type == "author" && slug.current == $slug][0]',
    { slug: author.slug }
  );

  if (!existing) {
    await client.create({
      _id: `author-${author.slug}`,
      _type: 'author',
      name: author.name,
      slug: { _type: 'slug', current: author.slug },
      bio: author.bio || '',
      role: 'Content Writer'
    });
    return `author-${author.slug}`;
  }

  await client.patch(existing._id)
    .set({
      name: author.name,
      slug: { _type: 'slug', current: author.slug },
      bio: author.bio || existing.bio || '',
      role: existing.role || 'Content Writer'
    })
    .commit();

  return existing._id;
}

async function main() {
  const nameToSlug = new Map(authors.map(a => [a.name, a.slug]));
  const slugToId = new Map();

  console.log('👤 Ensuring authors exist...');
  for (const author of authors) {
    const authorId = await ensureAuthor(author);
    slugToId.set(author.slug, authorId);
    console.log(`  ✓ ${author.name}`);
  }

  console.log('\n📝 Updating post author references...');
  let updated = 0;
  let skipped = 0;
  let missing = 0;

  for (const post of posts) {
    const slug = post.slug;
    const authorSlug = pickAuthorSlug(post, nameToSlug);
    if (!authorSlug) {
      console.log(`  [SKIP] ${slug} - no author`);
      skipped++;
      continue;
    }

    const authorId = slugToId.get(authorSlug);
    if (!authorId) {
      console.log(`  [MISS] ${slug} - author slug not found: ${authorSlug}`);
      missing++;
      continue;
    }

    const doc = await client.fetch(
      '*[_type == "blogPost" && slug.current == $slug][0]',
      { slug }
    );

    if (!doc) {
      console.log(`  [MISS] ${slug} - post not found`);
      missing++;
      continue;
    }

    await client.patch(doc._id)
      .set({ author: { _type: 'reference', _ref: authorId } })
      .commit();

    console.log(`  ✓ ${slug} -> ${authorSlug}`);
    updated++;
  }

  console.log('\n--- Summary ---');
  console.log(`✓ Updated: ${updated}`);
  console.log(`⊘ Skipped: ${skipped}`);
  console.log(`✗ Missing: ${missing}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
