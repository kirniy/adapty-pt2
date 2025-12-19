import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sanity client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'r5c34qsa',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-18',
  token: process.env.SANITY_API_TOKEN, // Required for write operations
  useCdn: false,
});

// Read blog posts JSON
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, 'blog-posts.json'), 'utf8'));

// Category colors
const categoryColors = {
  'Analytics': '#3B82F6',
  'Android': '#22C55E',
  'General': '#6366F1',
  'iOS': '#F59E0B',
  'Money': '#10B981',
  'Paywall Newsletter': '#8B5CF6',
  'Podcast': '#EC4899',
  'Product-releases': '#06B6D4',
  'Trends-insights': '#F97316',
  'Tutorial': '#14B8A6',
};

// Parse date string to ISO format
function parseDate(dateStr) {
  // Handle formats like "December 5, 2025" or "June 2025"
  const months = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  const match = dateStr.match(/(\w+)\s+(\d+)?,?\s*(\d{4})/);
  if (match) {
    const month = months[match[1]] || '01';
    const day = match[2] ? match[2].padStart(2, '0') : '01';
    const year = match[3];
    return `${year}-${month}-${day}T00:00:00Z`;
  }
  return new Date().toISOString();
}

// Parse read time to number
function parseReadTime(readTimeStr) {
  const match = readTimeStr?.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
}

// Slugify a string
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function importData() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.log('\nTo get a token:');
    console.log('1. Go to https://www.sanity.io/manage/project/r5c34qsa/api');
    console.log('2. Click "Add API token"');
    console.log('3. Name it "Import Script"');
    console.log('4. Set permissions to "Editor" or "Deploy Studio + Write"');
    console.log('5. Copy the token and run:');
    console.log('\n   SANITY_API_TOKEN=your_token_here node scripts/import-to-sanity.mjs\n');
    process.exit(1);
  }

  console.log('🚀 Starting Sanity import...\n');

  // Step 1: Create categories
  console.log('📁 Creating categories...');
  const categoryMap = {};

  for (const category of blogData.categories) {
    const categoryId = `category-${slugify(category.name)}`;
    const doc = {
      _id: categoryId,
      _type: 'category',
      name: category.name,
      slug: { _type: 'slug', current: category.slug },
      color: categoryColors[category.name] || '#6366F1',
    };

    try {
      await client.createOrReplace(doc);
      categoryMap[category.name] = categoryId;
      console.log(`  ✓ ${category.name}`);
    } catch (err) {
      console.log(`  ✗ ${category.name}: ${err.message}`);
    }
  }

  // Step 2: Create authors
  console.log('\n👤 Creating authors...');
  const authorMap = {};

  for (const author of blogData.authors) {
    const authorId = `author-${author.slug}`;
    const doc = {
      _id: authorId,
      _type: 'author',
      name: author.name,
      slug: { _type: 'slug', current: author.slug },
      bio: author.bio,
      role: 'Content Writer',
    };

    try {
      await client.createOrReplace(doc);
      authorMap[author.name] = authorId;
      console.log(`  ✓ ${author.name}`);
    } catch (err) {
      console.log(`  ✗ ${author.name}: ${err.message}`);
    }
  }

  // Add default author
  const defaultAuthorId = 'author-adapty-team';
  await client.createOrReplace({
    _id: defaultAuthorId,
    _type: 'author',
    name: 'Adapty Team',
    slug: { _type: 'slug', current: 'adapty-team' },
    bio: 'The Adapty Team helps mobile apps grow with subscription analytics and monetization tools.',
    role: 'Content Team',
  });
  console.log('  ✓ Adapty Team (default)');

  // Step 3: Upload images and create blog posts
  console.log('\n📝 Creating blog posts...');
  let successCount = 0;
  let errorCount = 0;

  for (const post of blogData.posts) {
    try {
      // Upload the image
      let imageAsset = null;
      const imagePath = path.join(__dirname, '..', 'public', post.imageLocal?.replace(/^\//, '') || '');

      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const filename = path.basename(imagePath);
        imageAsset = await client.assets.upload('image', imageBuffer, { filename });
      }

      // Create the blog post
      const postId = `post-${post.slug}`;
      const authorId = post.author ? authorMap[post.author] || defaultAuthorId : defaultAuthorId;
      const categoryId = categoryMap[post.category] || categoryMap['General'];

      const doc = {
        _id: postId,
        _type: 'blogPost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        publishedAt: parseDate(post.date),
        readTime: parseReadTime(post.readTime),
        author: { _type: 'reference', _ref: authorId },
        category: { _type: 'reference', _ref: categoryId },
        body: [
          {
            _type: 'block',
            _key: 'intro',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'intro-span',
                text: post.excerpt || 'Read the full article on the Adapty blog.',
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      };

      // Add image if uploaded
      if (imageAsset) {
        doc.mainImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageAsset._id },
        };
      }

      await client.createOrReplace(doc);
      console.log(`  ✓ ${post.title.substring(0, 50)}...`);
      successCount++;
    } catch (err) {
      console.log(`  ✗ ${post.title.substring(0, 50)}...: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n✅ Import complete!');
  console.log(`   ${successCount} posts imported successfully`);
  if (errorCount > 0) {
    console.log(`   ${errorCount} posts failed`);
  }
  console.log('\n🔗 View your content at: https://adapty-pt2.sanity.studio/');
}

importData().catch(console.error);
