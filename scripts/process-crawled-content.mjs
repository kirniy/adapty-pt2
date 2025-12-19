#!/usr/bin/env node
/**
 * Processes crawled blog content and imports to Sanity
 * Usage: node scripts/process-crawled-content.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4xpx1ym2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

// Read our blog posts JSON to get the list of posts we want
const blogPostsPath = path.join(__dirname, 'blog-posts.json');
const { posts: targetPosts } = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));

// Read the crawled content
const crawledPath = path.join(__dirname, 'crawled-content-raw.json');
const rawContent = fs.readFileSync(crawledPath, 'utf-8');

// Parse the nested JSON structure
let crawledData;
try {
  const parsed = JSON.parse(rawContent);
  // It's an array with one element containing {type: "text", text: "<json string>"}
  if (Array.isArray(parsed) && parsed[0]?.text) {
    crawledData = JSON.parse(parsed[0].text);
  } else {
    crawledData = parsed;
  }
} catch (e) {
  console.error('Error parsing crawled content:', e.message);
  process.exit(1);
}

console.log(`Crawl status: ${crawledData.status}`);
console.log(`Total pages crawled: ${crawledData.total}`);

/**
 * Generates a random key for Portable Text blocks
 */
function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Extracts the slug from a URL (strips query params)
 */
function extractSlug(url) {
  if (!url) return null;
  // Remove query string first
  const urlWithoutQuery = url.split('?')[0];
  const match = urlWithoutQuery.match(/\/blog\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

/**
 * Extracts the main article content from markdown
 * Removes navigation, share buttons, footer, related posts
 */
function extractArticleContent(markdown, title) {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  let startIndex = 0;
  let endIndex = lines.length;

  // Find start: after "min read" line
  for (let i = 0; i < Math.min(50, lines.length); i++) {
    const line = lines[i].toLowerCase();
    if (line.includes('min read') && !line.includes('#')) {
      startIndex = i + 1;
      break;
    }
  }

  // Find end: before footer/related content
  const stopPhrases = [
    'related posts',
    'continue reading',
    'recommended for you',
    'you may also like',
    'share this',
    'subscribe to',
    'try adapty',
    'get started with adapty',
    '© adapty',
    'privacy policy',
    'terms of service',
    'book a demo',
    '### learn more',
    '### related',
    '## share',
    '[home]',
    '[blog]',
    '[pricing]',
    '---\n\n[',
    'disha sharma',  // Author bio section
    'victoria kharlan',
    'dmitry shestoperov',
    'kirill potekhin',
  ];

  for (let i = lines.length - 1; i > startIndex; i--) {
    const line = lines[i].toLowerCase();
    for (const phrase of stopPhrases) {
      if (line.includes(phrase)) {
        endIndex = i;
        break;
      }
    }
  }

  // Extract content
  let content = lines.slice(startIndex, endIndex).join('\n');

  // Clean up: remove share links at the start
  content = content.replace(/^\s*-\s*\[X\].*?\n/gm, '');
  content = content.replace(/^\s*-\s*\[LinkedIn\].*?\n/gm, '');
  content = content.replace(/^\s*-\s*\[Facebook\].*?\n/gm, '');
  content = content.replace(/^\s*-\s*\[Telegram\].*?\n/gm, '');
  content = content.replace(/^\s*-\s*\[Email\].*?\n/gm, '');
  content = content.replace(/^\s*-\s*\[WhatsApp\].*?\n/gm, '');

  // Remove author bylines at the start
  content = content.replace(/^by\s*\n*\[!\[.*?\]\(.*?\)\].*?\n*/gmi, '');
  content = content.replace(/^\[.*?\]\(https:\/\/adapty\.io\/author\/.*?\)\s*\n*/gmi, '');

  // Remove duplicate title at start
  if (title) {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(`^#\\s*${escapedTitle}\\s*\\n+`, 'i'), '');
  }

  // Remove leading/trailing whitespace
  content = content.trim();

  // Remove consecutive blank lines (more than 2)
  content = content.replace(/\n{3,}/g, '\n\n');

  return content;
}

/**
 * Converts markdown to Sanity Portable Text blocks
 */
function markdownToPortableText(markdown) {
  if (!markdown) return [];

  const blocks = [];
  const lines = markdown.split('\n');
  let currentParagraph = [];
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeLanguage = '';
  let markDefs = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text && text.length > 1) {
        const { children, defs } = parseInlineMarkup(text);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          markDefs: defs,
          children
        });
      }
      currentParagraph = [];
    }
  }

  function parseInlineMarkup(text) {
    const children = [];
    const defs = [];
    let remaining = text;

    // Simple text - no markup
    if (!/(\*\*|\*|`|\[)/.test(remaining)) {
      return {
        children: [{ _type: 'span', _key: generateKey(), text: remaining, marks: [] }],
        defs: []
      };
    }

    // Handle bold, italic, code, links
    let lastIndex = 0;
    // Match: **bold**, *italic*, `code`, [text](url)
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let match;

    while ((match = regex.exec(remaining)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        const beforeText = remaining.substring(lastIndex, match.index);
        if (beforeText) {
          children.push({
            _type: 'span',
            _key: generateKey(),
            text: beforeText,
            marks: []
          });
        }
      }

      const matched = match[0];

      if (matched.startsWith('**') && matched.endsWith('**')) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: matched.slice(2, -2),
          marks: ['strong']
        });
      } else if (matched.startsWith('*') && matched.endsWith('*') && !matched.startsWith('**')) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: matched.slice(1, -1),
          marks: ['em']
        });
      } else if (matched.startsWith('`') && matched.endsWith('`')) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: matched.slice(1, -1),
          marks: ['code']
        });
      } else if (matched.startsWith('[')) {
        const linkMatch = matched.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const linkKey = generateKey();
          defs.push({
            _type: 'link',
            _key: linkKey,
            href: linkMatch[2]
          });
          children.push({
            _type: 'span',
            _key: generateKey(),
            text: linkMatch[1],
            marks: [linkKey]
          });
        }
      }

      lastIndex = match.index + matched.length;
    }

    // Remaining text
    if (lastIndex < remaining.length) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: remaining.substring(lastIndex),
        marks: []
      });
    }

    return {
      children: children.length > 0 ? children : [{ _type: 'span', _key: generateKey(), text: remaining, marks: [] }],
      defs
    };
  }

  for (const line of lines) {
    // Code block
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block - create proper codeBlock object
        if (codeBlockContent.length > 0) {
          blocks.push({
            _type: 'codeBlock',
            _key: generateKey(),
            code: codeBlockContent.join('\n'),
            language: codeLanguage || 'text'
          });
        }
        inCodeBlock = false;
        codeBlockContent = [];
        codeLanguage = '';
      } else {
        flushParagraph();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushParagraph();
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headerMatch) {
      flushParagraph();
      const level = headerMatch[1].length;
      const headerText = headerMatch[2].trim();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: `h${level}`,
        markDefs: [],
        children: [{ _type: 'span', _key: generateKey(), text: headerText, marks: [] }]
      });
      continue;
    }

    // Bullet list
    if (line.match(/^[-*]\s+/)) {
      flushParagraph();
      const text = line.replace(/^[-*]\s+/, '').trim();
      const { children, defs } = parseInlineMarkup(text);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: defs,
        children
      });
      continue;
    }

    // Numbered list (handles both "1." and "1\.")
    if (line.match(/^\d+\\?\.\s+/)) {
      flushParagraph();
      const text = line.replace(/^\d+\\?\.\s+/, '').trim();
      const { children, defs } = parseInlineMarkup(text);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'number',
        level: 1,
        markDefs: defs,
        children
      });
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushParagraph();
      const text = line.slice(2).trim();
      const { children, defs } = parseInlineMarkup(text);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        markDefs: defs,
        children
      });
      continue;
    }

    // Skip images (handled separately if needed)
    if (line.startsWith('![') || /!\[.*?\]\(.*?\)/.test(line)) {
      continue;
    }

    // Skip horizontal rules
    if (line.match(/^---+$/) || line.match(/^\*\*\*+$/)) {
      continue;
    }

    // Regular text
    currentParagraph.push(line);
  }

  flushParagraph();

  return blocks;
}

// Build a map of URL -> crawled content
const crawledMap = new Map();
if (crawledData.data) {
  for (const page of crawledData.data) {
    const url = page.metadata?.url || page.metadata?.sourceURL;
    const slug = extractSlug(url);
    if (slug && page.markdown) {
      crawledMap.set(slug, {
        url,
        markdown: page.markdown,
        title: page.metadata?.title
      });
    }
  }
}

console.log(`\nMatched ${crawledMap.size} URLs to content`);

// Process each target post
const processedPosts = [];
const withFullContent = [];
const withExcerptOnly = [];

for (const post of targetPosts) {
  const crawled = crawledMap.get(post.slug);

  let portableText;
  let bodyPreview;
  let hasFullContent = false;

  if (crawled) {
    // Extract the article body from crawled content
    const articleContent = extractArticleContent(crawled.markdown, post.title);

    if (articleContent && articleContent.length > 200) {
      portableText = markdownToPortableText(articleContent);
      bodyPreview = articleContent.substring(0, 200) + '...';
      hasFullContent = true;
      withFullContent.push(post.slug);
    }
  }

  // Skip posts without full content
  if (!hasFullContent) {
    withExcerptOnly.push(post.slug);
    continue;
  }

  processedPosts.push({
    slug: post.slug,
    title: post.title,
    author: post.author,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    excerpt: post.excerpt,
    imageLocal: post.imageLocal,
    body: portableText,
    bodyPreview,
    blockCount: portableText.length,
    hasFullContent
  });
}

console.log(`\nProcessed ${processedPosts.length} posts`);
console.log(`With full content: ${withFullContent.length}`);
console.log(`With excerpt only: ${withExcerptOnly.length}`);

// Save processed content
const outputPath = path.join(__dirname, 'processed-blog-content.json');
fs.writeFileSync(outputPath, JSON.stringify({
  processedAt: new Date().toISOString(),
  totalPosts: processedPosts.length,
  withFullContent: withFullContent.length,
  withExcerptOnly: withExcerptOnly.length,
  excerptOnlySlugs: withExcerptOnly,
  posts: processedPosts
}, null, 2));

console.log(`\nSaved processed content to: ${outputPath}`);

// Show sample
if (processedPosts.length > 0) {
  const sample = processedPosts[0];
  console.log(`\nSample post: ${sample.title}`);
  console.log(`  Blocks: ${sample.blockCount}`);
  console.log(`  Preview: ${sample.bodyPreview.substring(0, 100)}...`);
}

// If SANITY_API_TOKEN is set, update Sanity
if (process.env.SANITY_API_TOKEN) {
  console.log('\n--- Updating Sanity ---');

  for (const post of processedPosts) {
    try {
      // Find the document by slug
      const doc = await client.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]`,
        { slug: post.slug }
      );

      if (!doc) {
        console.log(`  [SKIP] ${post.slug} - not found in Sanity`);
        continue;
      }

      // Update the body field
      await client.patch(doc._id)
        .set({ body: post.body })
        .commit();

      console.log(`  [OK] ${post.slug} - updated with ${post.blockCount} blocks`);
    } catch (err) {
      console.error(`  [ERR] ${post.slug}:`, err.message);
    }
  }

  console.log('\n--- Done ---');
} else {
  console.log('\nTo import to Sanity, set SANITY_API_TOKEN environment variable');
}
