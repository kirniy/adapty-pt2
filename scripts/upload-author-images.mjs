#!/usr/bin/env node
/**
 * Uploads author images to Sanity and updates author documents
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

const authorsDir = path.join(__dirname, '../public/authors');

// Map local filenames to author slugs (as they exist in Sanity)
const authorMap = {
  'dmitry-shestoperov.webp': 'dshestoperov',
  'kirill-potekhin.webp': 'kirill-potekhin',
  'victoria-kharlan.jpg': 'vkharlan',
  'disha-sharma.jpg': 'disha-sharma',
  'disha-sharma.webp': 'disha-sharma',
};

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);

  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: filename.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
  });

  return asset;
}

async function main() {
  console.log('📷 Uploading author images to Sanity...\n');

  const files = fs.readdirSync(authorsDir).filter(f =>
    f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png')
  );

  console.log(`Found ${files.length} image files\n`);

  for (const file of files) {
    const slug = authorMap[file];
    if (!slug) {
      console.log(`  [SKIP] ${file} - no mapping`);
      continue;
    }

    try {
      // Find author by slug
      const author = await client.fetch(
        `*[_type == "author" && slug.current == $slug][0]`,
        { slug }
      );

      if (!author) {
        console.log(`  [SKIP] ${file} - author "${slug}" not found`);
        continue;
      }

      // Upload image
      const filePath = path.join(authorsDir, file);
      const asset = await uploadImage(filePath);

      // Update author with image reference
      await client.patch(author._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }
        })
        .commit();

      console.log(`  ✓ ${author.name} - image uploaded`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  console.log('\n✅ Done');
}

main().catch(console.error);
