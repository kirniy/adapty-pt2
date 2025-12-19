#!/usr/bin/env node
/**
 * Updates blog posts in Sanity with full article content
 *
 * Usage:
 *   SANITY_API_TOKEN=your_token node scripts/update-post-content.mjs
 *
 * Get a token from: https://www.sanity.io/manage/project/r5c34qsa/api#tokens
 * Create a token with "Editor" permissions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check for token
if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
  console.error('');
  console.error('Get a token from:');
  console.error('  https://www.sanity.io/manage/project/r5c34qsa/api#tokens');
  console.error('');
  console.error('Then run:');
  console.error('  SANITY_API_TOKEN=your_token node scripts/update-post-content.mjs');
  process.exit(1);
}

// Sanity client
const client = createClient({
  projectId: 'r5c34qsa',
  dataset: 'production',
  apiVersion: '2025-12-19',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

// Read processed content
const contentPath = path.join(__dirname, 'processed-blog-content.json');
if (!fs.existsSync(contentPath)) {
  console.error('❌ Error: processed-blog-content.json not found');
  console.error('Run: node scripts/process-crawled-content.mjs first');
  process.exit(1);
}

const { posts, withFullContent, excerptOnlySlugs } = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

console.log(`📝 Updating ${posts.length} posts with full content...\n`);
console.log(`   Posts with full content: ${withFullContent}`);
console.log(`   Posts pending (excerpt only): ${excerptOnlySlugs?.length || 0}\n`);

let updated = 0;
let notFound = 0;
let errors = 0;

for (const post of posts) {
  try {
    // Find the document by slug
    const doc = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]`,
      { slug: post.slug }
    );

    if (!doc) {
      console.log(`  [SKIP] ${post.slug} - not found in Sanity`);
      notFound++;
      continue;
    }

    // Update the body field
    await client.patch(doc._id)
      .set({ body: post.body })
      .commit();

    console.log(`  ✓ ${post.slug} (${post.blockCount} blocks)`);
    updated++;
  } catch (err) {
    console.error(`  ✗ ${post.slug}: ${err.message}`);
    errors++;
  }
}

console.log(`\n--- Summary ---`);
console.log(`✓ Updated: ${updated}`);
console.log(`⊘ Not found: ${notFound}`);
console.log(`✗ Errors: ${errors}`);

if (excerptOnlySlugs && excerptOnlySlugs.length > 0) {
  console.log(`\n⚠️  ${excerptOnlySlugs.length} posts still need full content:`);
  excerptOnlySlugs.slice(0, 5).forEach(slug => console.log(`   - ${slug}`));
  if (excerptOnlySlugs.length > 5) {
    console.log(`   ... and ${excerptOnlySlugs.length - 5} more`);
  }
  console.log('\nSee CLAUDE.md for instructions on fetching remaining posts.');
}
